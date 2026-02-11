export type TrackType = 'image' | 'text' | 'audio';
export type MetricName = 'accuracy' | 'f1';

export interface LessonDefinition {
  id: string;
  title: string;
  phase: 1 | 2;
  objective: string;
  estimatedMinutes: number;
  required: boolean;
}

export interface TimeLog {
  id: string;
  date: string;
  hours: number;
  note: string;
  proofUrl?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  title: string;
  track: TrackType;
  metricName: MetricName;
  metricValue: number;
  repoUrl: string;
  demoUrl: string;
  summary: string;
  modelArtifact: string;
  createdAt: string;
  status: 'submitted' | 'approved' | 'needs_changes';
  rubricScore?: number;
  feedback?: string;
}

export interface RedemptionRequest {
  id: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'shipped' | 'rejected';
  shippingName: string;
  email: string;
  country: string;
  notes?: string;
}

export interface ProgramUser {
  id: string;
  displayName: string;
  completedLessonIds: string[];
  badges: string[];
  totalHours: number;
  timeLogs: TimeLog[];
  submissions: Submission[];
  redemptionRequests: RedemptionRequest[];
}

export interface DeviceCatalogItem {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  stock: number;
  active: boolean;
}

export interface ProgramConfig {
  minHoursForDevice: number;
  rubricPassScore: number;
  metricThresholds: {
    image: { metric: MetricName; min: number };
    text: { metric: MetricName; min: number };
    audio: { metric: MetricName; min: number };
  };
}

export interface ProgramState {
  version: string;
  updatedAt: string;
  users: Record<string, ProgramUser>;
  devices: DeviceCatalogItem[];
  config: ProgramConfig;
}

export interface EligibilityCheck {
  phaseOneComplete: boolean;
  hoursMet: boolean;
  metricMet: boolean;
  rubricMet: boolean;
  readyToRedeem: boolean;
  reasons: string[];
}
