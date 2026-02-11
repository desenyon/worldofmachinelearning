import { PHASE_ONE_LESSONS, BADGE_DEFINITIONS } from '@/lib/program';
import { EligibilityCheck, ProgramConfig, ProgramUser, Submission } from '@/lib/types';

function submissionMeetsTrackThreshold(submission: Submission, config: ProgramConfig): boolean {
  const threshold = config.metricThresholds[submission.track];
  if (submission.metricName !== threshold.metric) {
    return false;
  }
  return submission.metricValue >= threshold.min;
}

export function computeEligibility(user: ProgramUser, config: ProgramConfig): EligibilityCheck {
  const requiredLessonIds = PHASE_ONE_LESSONS.filter((lesson) => lesson.required).map((lesson) => lesson.id);
  const phaseOneComplete = requiredLessonIds.every((lessonId) => user.completedLessonIds.includes(lessonId));

  const hoursMet = user.totalHours >= config.minHoursForDevice;

  const reviewedSubmissions = user.submissions.filter((submission) => submission.status === 'approved');
  const metricMet = reviewedSubmissions.some((submission) => submissionMeetsTrackThreshold(submission, config));
  const rubricMet = reviewedSubmissions.some(
    (submission) => (submission.rubricScore ?? 0) >= config.rubricPassScore
  );

  const reasons: string[] = [];
  if (!phaseOneComplete) {
    reasons.push('Finish all required Phase 1 lessons.');
  }
  if (!hoursMet) {
    reasons.push(`Log at least ${config.minHoursForDevice} hours of build time with proof.`);
  }
  if (!metricMet) {
    reasons.push('Submit an approved project that meets the track metric threshold.');
  }
  if (!rubricMet) {
    reasons.push(`Receive a rubric score of at least ${config.rubricPassScore}/100.`);
  }

  return {
    phaseOneComplete,
    hoursMet,
    metricMet,
    rubricMet,
    readyToRedeem: reasons.length === 0,
    reasons,
  };
}

export function computeBadges(user: ProgramUser, config: ProgramConfig): string[] {
  const current = new Set(user.badges);

  if (user.completedLessonIds.length > 0) {
    current.add('kickoff');
  }

  const eligibility = computeEligibility(user, config);

  if (eligibility.phaseOneComplete) {
    current.add('phase_one');
  }

  if (user.submissions.length > 0) {
    current.add('builder');
  }

  const hasMetricPass = user.submissions.some((submission) => {
    if (submission.status !== 'approved') {
      return false;
    }
    return submissionMeetsTrackThreshold(submission, config);
  });
  if (hasMetricPass) {
    current.add('benchmarker');
  }

  if (eligibility.readyToRedeem) {
    current.add('device_ready');
  }

  return Object.keys(BADGE_DEFINITIONS).filter((badgeId) => current.has(badgeId));
}
