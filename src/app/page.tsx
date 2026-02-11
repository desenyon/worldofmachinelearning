import Link from 'next/link';

const highlights = [
  '8 guided curriculum lessons with quizzes, checkpoints, and demos',
  '3 project tracks: image, text sentiment, and audio event detection',
  'On-device deployment path for Raspberry Pi Zero 2 W and ESP32-S3',
  'Eligibility-based redemption workflow for physical hardware kits',
];

const phases = [
  {
    phase: 'Phase 1',
    title: 'Guided ML Curriculum',
    detail:
      'Learn problem discovery, data cleaning, feature engineering, model design, metrics, and deployment basics through structured lessons and project checkpoints.',
    cta: '/learn',
    ctaLabel: 'Start lessons',
  },
  {
    phase: 'Phase 2',
    title: 'Run Your Model on Device',
    detail:
      'Train your custom model, optimize with quantization/pruning, export to ONNX/TFLite, and prove local inference on low-cost hardware.',
    cta: '/device',
    ctaLabel: 'Open device path',
  },
];

export default function HomePage() {
  return (
    <div className="grid-bg">
      <section className="section-shell py-10 sm:py-14">
        <div className="card overflow-hidden">
          <div className="bg-[--color-red] px-6 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            Hack Club YSWS Program
          </div>
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.35fr_1fr]">
            <div>
              <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
                WorldOfML v2.0
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
                Build real machine learning projects, ship local inference, and unlock a physical device kit once
                you meet curriculum, hours, metric, and rubric milestones.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/learn"
                  className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d72f46]"
                >
                  Enter curriculum
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  View dashboard
                </Link>
              </div>
            </div>

            <div className="card bg-slate-900 p-5 text-sm text-slate-100">
              <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Program Highlights</p>
              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[3px] inline-block h-2 w-2 rounded-full bg-[--color-green]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-12">
        <div className="grid gap-5 md:grid-cols-2">
          {phases.map((phase) => (
            <article key={phase.phase} className="card p-6">
              <span className="pill bg-slate-100 text-slate-700">{phase.phase}</span>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{phase.title}</h2>
              <p className="mt-3 text-slate-700">{phase.detail}</p>
              <Link
                href={phase.cta}
                className="mt-6 inline-flex rounded-lg bg-[--color-blue] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                {phase.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
