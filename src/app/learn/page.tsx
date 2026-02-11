'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, ProgramSnapshot } from '@/lib/client-api';
import { LESSON_CONTENT, LESSON_LOOKUP } from '@/lib/lesson-content';

interface LessonCompleteResponse {
  completedLessons: string[];
}

function phaseOneLessons() {
  return LESSON_CONTENT;
}

export default function LearnPage() {
  const [snapshot, setSnapshot] = useState<ProgramSnapshot | null>(null);
  const [activeLessonId, setActiveLessonId] = useState('01-intro');
  const [status, setStatus] = useState<string>('Loading curriculum...');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiGet<ProgramSnapshot>('/api/program/state');
      setSnapshot(data);
      setStatus('');
      if (!LESSON_LOOKUP[activeLessonId] && data.lessons.length > 0) {
        setActiveLessonId(data.lessons[0].id);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load lessons.');
    }
  }, [activeLessonId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function completeCurrentLesson() {
    if (!snapshot) {
      return;
    }

    setBusy(true);
    setStatus('Saving completion...');
    try {
      await apiPost<LessonCompleteResponse>('/api/program/lesson', { lessonId: activeLessonId });
      const next = await apiGet<ProgramSnapshot>('/api/program/state');
      setSnapshot(next);
      setStatus('Lesson marked complete. Keep shipping.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not mark lesson complete.');
    } finally {
      setBusy(false);
    }
  }

  const lesson = LESSON_LOOKUP[activeLessonId] ?? LESSON_CONTENT[0];

  const progress = useMemo(() => {
    if (!snapshot) {
      return 0;
    }
    const required = phaseOneLessons().length;
    const completed = phaseOneLessons().filter((entry) => snapshot.user.completedLessonIds.includes(entry.id)).length;
    return Math.round((completed / required) * 100);
  }, [snapshot]);

  const completedIds = new Set(snapshot?.user.completedLessonIds ?? []);

  return (
    <div className="section-shell">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Phase 1: Guided Curriculum</h1>
          <p className="mt-1 text-slate-600">
            Every lesson includes objective, visual, code, quiz, checkpoint, and a demo command.
          </p>
        </div>
        <div className="card p-4 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Progress</p>
          <p className="text-2xl font-black text-[--color-red]">{progress}%</p>
          <div className="progress-track mt-2 h-2 w-44">
            <div className="progress-fill h-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {status && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{status}</div>
      )}

      <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
        <aside className="card p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Lessons</p>
          <div className="space-y-2">
            {phaseOneLessons().map((entry) => {
              const active = entry.id === activeLessonId;
              const done = completedIds.has(entry.id);
              return (
                <button
                  key={entry.id}
                  onClick={() => setActiveLessonId(entry.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                    active
                      ? 'border-[--color-red] bg-[--color-red] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-sm font-semibold">{entry.title}</p>
                  <p className={`text-xs ${active ? 'text-white/80' : 'text-slate-500'}`}>{entry.objective}</p>
                  <p className={`mt-1 text-[11px] ${active ? 'text-white/80' : 'text-slate-400'}`}>
                    {done ? 'Completed' : 'Not completed'}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        <article className="card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="pill bg-[--color-red] text-white">{lesson.id}</span>
            <span className="pill bg-slate-100 text-slate-700">Learning objective</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900">{lesson.title}</h2>
          <p className="mt-2 text-slate-700">{lesson.objective}</p>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Why this matters</h3>
            <p className="mt-2 text-slate-700">{lesson.whyItMatters}</p>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Visual</h3>
            <pre className="ascii-box mt-2">{lesson.visual}</pre>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Code block (Python)</h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
              <code>{lesson.code}</code>
            </pre>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Try it now</h3>
            <ul className="mt-2 space-y-2">
              {lesson.demo.map((command) => (
                <li key={command}>
                  <code className="rounded bg-slate-100 px-2 py-1 text-sm text-slate-800">{command}</code>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Checkpoint</h3>
            <ul className="mt-2 space-y-2 text-slate-700">
              {lesson.checkpoints.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[7px] h-2 w-2 rounded-full bg-[--color-green]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Mini quiz</h3>
            <div className="mt-2 space-y-3">
              {lesson.quiz.map((quiz) => (
                <details key={quiz.question} className="rounded-lg border border-slate-200 bg-white p-3">
                  <summary className="cursor-pointer font-semibold text-slate-900">{quiz.question}</summary>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                    {quiz.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm font-semibold text-[--color-red]">Answer: {quiz.answer}</p>
                  <p className="text-sm text-slate-600">{quiz.explanation}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Troubleshooting</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {lesson.troubleshooting.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-lg border border-[--color-blue] bg-sky-50 p-4">
            <h3 className="text-lg font-bold text-slate-900">Ship it task</h3>
            <p className="mt-1 text-slate-700">{lesson.shipItTask}</p>
          </section>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-600">Complete this lesson to unlock redemption eligibility faster.</p>
            <button
              disabled={busy}
              onClick={completeCurrentLesson}
              className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d72f46] disabled:opacity-60"
            >
              {busy ? 'Saving...' : 'Mark complete'}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
