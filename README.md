# WorldOfML v2.0

WorldOfML v2.0 is a Hack Club YSWS program where learners go from first ML workflow to running custom local inference on low-cost hardware.

## What This Repo Includes

1. Curriculum docs and lesson progression (`/LESSONS`)
2. Local deployment pipeline for low-cost hardware (`/DEVICE_DEPLOYMENT`, `/ml-pipeline`)
3. Rubric + redemption workflow (`RUBRIC.md`, `REDEMPTION_PROCESS.md`, `/src/app/redeem`)
4. Learning dashboard and reviewer tooling (`/src/app/dashboard`, `/src/app/admin/review`)
5. Starter templates for 3 tracks (`/TEMPLATES`)

## Program Phases

### Phase 1: Guided Curriculum
- Problem discovery
- Data sourcing + cleaning
- Feature engineering
- Model design + training
- Metrics + evaluation
- Deployment basics

### Phase 2: On-Device ML
- Hardware setup (Pi Zero 2 W primary, ESP32-S3 alternate)
- Model optimization (pruning + quantization)
- Export (ONNX/TFLite)
- On-device verification harness
- Final project review + redemption gating

## Eligibility Gates for Device Redemption

A learner becomes eligible only if all are true:
- All required Phase 1 lessons complete
- Logged hours >= `DEVICE_MIN_HOURS` (default 40)
- Approved project hits metric threshold:
  - image: accuracy >= 0.80
  - text: f1 >= 0.75
  - audio: f1 >= 0.70
- Rubric score >= `RUBRIC_PASS_SCORE` (default 85)

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS 4
- File-backed local data store in `data/program-state.json` (dev mode)
- Prisma schema included for DB migration path (`/prisma/schema.prisma`)

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Optional Python Setup (for templates + pipeline)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r TEMPLATES/image-classifier/requirements.txt
pip install -r TEMPLATES/text-sentiment/requirements.txt
pip install -r TEMPLATES/audio-event-detector/requirements.txt
```

## Key Routes
- `/learn` - curriculum lessons with checkpoints and quizzes
- `/dashboard` - progress, hours, badges, eligibility
- `/device` - on-device deployment guide and test commands
- `/projects/new` - submission intake
- `/projects` - submission list
- `/redeem` - redemption workflow and request form
- `/admin/review` - rubric review panel (local simulation)

## Data + API

Program state is stored in:
- `data/program-state.json`

Primary API routes:
- `GET /api/program/state`
- `POST /api/program/lesson`
- `POST /api/program/hours`
- `POST /api/projects/submit`
- `POST /api/admin/review`
- `POST /api/redeem/request`

## CI

GitHub Actions in `.github/workflows` run:
- TS + lint checks
- build checks
- Python template tests
- markdown/docs checks

## Hack Club Style Notes

Brand references:
- https://theme.hackclub.com/
- https://hackclub.com/brand/

This repo uses Hack Club-inspired color tokens and an energetic but practical teaching tone.
