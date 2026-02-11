import { LessonDefinition } from '@/lib/types';

export const PHASE_ONE_LESSONS: LessonDefinition[] = [
  {
    id: '01-intro',
    title: 'Intro to Practical ML',
    phase: 1,
    objective: 'Understand the full ML workflow and how to define a useful problem.',
    estimatedMinutes: 30,
    required: true,
  },
  {
    id: '02-problem-discovery',
    title: 'Problem Discovery and Scoping',
    phase: 1,
    objective: 'Frame a measurable question and choose success metrics before coding.',
    estimatedMinutes: 45,
    required: true,
  },
  {
    id: '03-data-collection-cleaning',
    title: 'Dataset Sourcing and Cleaning',
    phase: 1,
    objective: 'Source and clean a dataset while avoiding data leakage.',
    estimatedMinutes: 60,
    required: true,
  },
  {
    id: '04-feature-engineering',
    title: 'Feature Engineering',
    phase: 1,
    objective: 'Create robust features and justify your design choices.',
    estimatedMinutes: 60,
    required: true,
  },
  {
    id: '05-model-design-training',
    title: 'Model Design and Training',
    phase: 1,
    objective: 'Train a baseline and an improved model with reproducible scripts.',
    estimatedMinutes: 75,
    required: true,
  },
  {
    id: '06-metrics-evaluation',
    title: 'Metrics and Evaluation',
    phase: 1,
    objective: 'Evaluate with task-appropriate metrics and explain errors clearly.',
    estimatedMinutes: 60,
    required: true,
  },
  {
    id: '07-deployment-basics',
    title: 'Deployment Basics',
    phase: 1,
    objective: 'Package and serve inference locally with a clear CLI or web demo.',
    estimatedMinutes: 45,
    required: true,
  },
  {
    id: '08-final-project',
    title: 'Final Project Spec',
    phase: 1,
    objective: 'Submit a scoped project proposal for phase two device deployment.',
    estimatedMinutes: 40,
    required: true,
  },
];

export const PHASE_TWO_MILESTONES: LessonDefinition[] = [
  {
    id: 'p2-hardware-setup',
    title: 'Hardware + OS Setup',
    phase: 2,
    objective: 'Prepare low-cost hardware and verify remote access.',
    estimatedMinutes: 45,
    required: true,
  },
  {
    id: 'p2-optimize-convert',
    title: 'Optimize + Convert Model',
    phase: 2,
    objective: 'Apply quantization and export to ONNX/TFLite.',
    estimatedMinutes: 75,
    required: true,
  },
  {
    id: 'p2-inference-demo',
    title: 'On-Device Inference Demo',
    phase: 2,
    objective: 'Run inference on-device and capture proof.',
    estimatedMinutes: 45,
    required: true,
  },
];

export const ALL_LESSONS: LessonDefinition[] = [...PHASE_ONE_LESSONS, ...PHASE_TWO_MILESTONES];

export const BADGE_DEFINITIONS = {
  kickoff: 'Started WorldOfML v2.0',
  phase_one: 'Completed Phase 1 curriculum',
  builder: 'Submitted final project',
  benchmarker: 'Passed metric threshold',
  device_ready: 'Eligible for device redemption',
};
