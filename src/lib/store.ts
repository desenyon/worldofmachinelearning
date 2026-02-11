import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { computeBadges, computeEligibility } from '@/lib/eligibility';
import { ALL_LESSONS } from '@/lib/program';
import {
  ProgramState,
  ProgramUser,
  RedemptionRequest,
  Submission,
  TimeLog,
  TrackType,
  MetricName,
} from '@/lib/types';

const STATE_FILE = path.join(process.cwd(), 'data', 'program-state.json');
const DEFAULT_USER_ID = 'demo-learner';

function numberEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}

function nowIso(): string {
  return new Date().toISOString();
}

function baseState(): ProgramState {
  return {
    version: '2.0.0',
    updatedAt: nowIso(),
    config: {
      minHoursForDevice: numberEnv('DEVICE_MIN_HOURS', 40),
      rubricPassScore: numberEnv('RUBRIC_PASS_SCORE', 85),
      metricThresholds: {
        image: { metric: 'accuracy', min: 0.8 },
        text: { metric: 'f1', min: 0.75 },
        audio: { metric: 'f1', min: 0.7 },
      },
    },
    devices: [
      {
        id: 'pi-zero-2w',
        name: 'Raspberry Pi Zero 2 W Kit',
        description: 'Low-cost Linux board for local inference and sensors.',
        priceUsd: 20,
        stock: 250,
        active: true,
      },
      {
        id: 'esp32-s3',
        name: 'ESP32-S3 TinyML Kit',
        description: 'Microcontroller path for low-power always-on inference.',
        priceUsd: 10,
        stock: 180,
        active: true,
      },
    ],
    users: {
      [DEFAULT_USER_ID]: {
        id: DEFAULT_USER_ID,
        displayName: 'Demo Learner',
        completedLessonIds: [],
        badges: [],
        totalHours: 0,
        timeLogs: [],
        submissions: [],
        redemptionRequests: [],
      },
    },
  };
}

async function ensureStateFile(): Promise<void> {
  await mkdir(path.dirname(STATE_FILE), { recursive: true });
  try {
    await readFile(STATE_FILE, 'utf-8');
  } catch {
    await writeFile(STATE_FILE, JSON.stringify(baseState(), null, 2));
  }
}

export async function readState(): Promise<ProgramState> {
  await ensureStateFile();
  const raw = await readFile(STATE_FILE, 'utf-8');
  const parsed = JSON.parse(raw) as ProgramState;
  return parsed;
}

export async function writeState(state: ProgramState): Promise<void> {
  state.updatedAt = nowIso();
  await writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

function getOrCreateUser(state: ProgramState, userId = DEFAULT_USER_ID): ProgramUser {
  if (!state.users[userId]) {
    state.users[userId] = {
      id: userId,
      displayName: userId,
      completedLessonIds: [],
      badges: [],
      totalHours: 0,
      timeLogs: [],
      submissions: [],
      redemptionRequests: [],
    };
  }
  return state.users[userId];
}

async function mutate<T>(
  mutator: (state: ProgramState, user: ProgramUser) => T,
  userId = DEFAULT_USER_ID
): Promise<T> {
  const state = await readState();
  const user = getOrCreateUser(state, userId);
  const result = mutator(state, user);
  user.badges = computeBadges(user, state.config);
  await writeState(state);
  return result;
}

function isKnownLesson(lessonId: string): boolean {
  return ALL_LESSONS.some((lesson) => lesson.id === lessonId);
}

export async function getProgramSnapshot(userId = DEFAULT_USER_ID) {
  const state = await readState();
  const user = getOrCreateUser(state, userId);
  user.badges = computeBadges(user, state.config);
  const eligibility = computeEligibility(user, state.config);
  await writeState(state);

  return {
    user,
    lessons: ALL_LESSONS,
    devices: state.devices,
    config: state.config,
    eligibility,
    serverTime: nowIso(),
  };
}

export async function completeLesson(lessonId: string, userId = DEFAULT_USER_ID) {
  if (!isKnownLesson(lessonId)) {
    throw new Error(`Unknown lesson id: ${lessonId}`);
  }

  return mutate((state, user) => {
    if (!user.completedLessonIds.includes(lessonId)) {
      user.completedLessonIds.push(lessonId);
    }

    return {
      completedLessons: user.completedLessonIds,
      eligibility: computeEligibility(user, state.config),
    };
  }, userId);
}

export async function addTimeLog(
  input: { hours: number; note: string; proofUrl?: string; date?: string },
  userId = DEFAULT_USER_ID
) {
  if (!(input.hours > 0 && input.hours <= 12)) {
    throw new Error('Hours must be between 0 and 12 per log.');
  }

  return mutate((state, user) => {
    const log: TimeLog = {
      id: randomUUID(),
      date: input.date ?? new Date().toISOString().split('T')[0],
      hours: Number(input.hours.toFixed(2)),
      note: input.note,
      proofUrl: input.proofUrl,
      createdAt: nowIso(),
    };

    user.timeLogs.unshift(log);
    user.totalHours = Number((user.totalHours + log.hours).toFixed(2));

    return {
      totalHours: user.totalHours,
      log,
      eligibility: computeEligibility(user, state.config),
    };
  }, userId);
}

export async function submitProject(
  input: {
    title: string;
    track: TrackType;
    metricName: MetricName;
    metricValue: number;
    repoUrl: string;
    demoUrl: string;
    summary: string;
    modelArtifact: string;
  },
  userId = DEFAULT_USER_ID
) {
  if (!(input.metricValue >= 0 && input.metricValue <= 1.5)) {
    throw new Error('Metric value must be in a sane range. For percentages, use decimal (e.g. 0.82).');
  }

  return mutate((state, user) => {
    const submission: Submission = {
      id: randomUUID(),
      title: input.title,
      track: input.track,
      metricName: input.metricName,
      metricValue: Number(input.metricValue.toFixed(4)),
      repoUrl: input.repoUrl,
      demoUrl: input.demoUrl,
      summary: input.summary,
      modelArtifact: input.modelArtifact,
      createdAt: nowIso(),
      status: 'submitted',
    };

    user.submissions.unshift(submission);

    return {
      submission,
      eligibility: computeEligibility(user, state.config),
    };
  }, userId);
}

export async function reviewSubmission(
  input: {
    submissionId: string;
    rubricScore: number;
    feedback: string;
    approve: boolean;
  },
  userId = DEFAULT_USER_ID
) {
  if (!(input.rubricScore >= 0 && input.rubricScore <= 100)) {
    throw new Error('Rubric score must be between 0 and 100.');
  }

  return mutate((state, user) => {
    const target = user.submissions.find((submission) => submission.id === input.submissionId);
    if (!target) {
      throw new Error('Submission not found.');
    }

    target.rubricScore = input.rubricScore;
    target.feedback = input.feedback;
    target.status = input.approve ? 'approved' : 'needs_changes';

    return {
      submission: target,
      eligibility: computeEligibility(user, state.config),
    };
  }, userId);
}

export async function createRedemptionRequest(
  input: {
    shippingName: string;
    email: string;
    country: string;
    notes?: string;
  },
  userId = DEFAULT_USER_ID
) {
  return mutate((state, user) => {
    const eligibility = computeEligibility(user, state.config);
    if (!eligibility.readyToRedeem) {
      throw new Error('User is not eligible for device redemption yet.');
    }

    const request: RedemptionRequest = {
      id: randomUUID(),
      createdAt: nowIso(),
      status: 'pending',
      shippingName: input.shippingName,
      email: input.email,
      country: input.country,
      notes: input.notes,
    };

    user.redemptionRequests.unshift(request);

    return {
      request,
      eligibility,
    };
  }, userId);
}

export async function listSubmissions(userId = DEFAULT_USER_ID) {
  const snapshot = await getProgramSnapshot(userId);
  return snapshot.user.submissions;
}
