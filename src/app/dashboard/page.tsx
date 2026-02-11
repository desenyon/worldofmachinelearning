'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, ProgramSnapshot, formatMetric } from '@/lib/client-api';
import { BADGE_DEFINITIONS } from '@/lib/program';

interface AddHoursResult {
  totalHours: number;
}

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState<ProgramSnapshot | null>(null);
  const [note, setNote] = useState('');
  const [hours, setHours] = useState('1.0');
  const [proofUrl, setProofUrl] = useState('');
  const [status, setStatus] = useState('Loading dashboard...');
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet<ProgramSnapshot>('/api/program/state');
      setSnapshot(data);
      setStatus('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load dashboard state.');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function submitHours(event: FormEvent) {
    event.preventDefault();
    if (!hours || !note.trim()) {
      setStatus('Add both hours and a short proof note.');
      return;
    }

    setLoading(true);
    setStatus('Saving time log...');
    try {
      await apiPost<AddHoursResult>('/api/program/hours', {
        hours: Number(hours),
        note,
        proofUrl: proofUrl || undefined,
      });
      setNote('');
      setHours('1.0');
      setProofUrl('');
      await refresh();
      setStatus('Time log saved. Nice progress.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save time log.');
    } finally {
      setLoading(false);
    }
  }

  const requiredLessonCount = useMemo(
    () => snapshot?.lessons.filter((lesson) => lesson.phase === 1 && lesson.required).length ?? 0,
    [snapshot]
  );

  const completedRequiredCount = useMemo(() => {
    if (!snapshot) {
      return 0;
    }

    const required = snapshot.lessons.filter((lesson) => lesson.phase === 1 && lesson.required).map((lesson) => lesson.id);
    return required.filter((id) => snapshot.user.completedLessonIds.includes(id)).length;
  }, [snapshot]);

  const lessonProgress = requiredLessonCount === 0 ? 0 : Math.round((completedRequiredCount / requiredLessonCount) * 100);

  return (
    <div className="section-shell">
      <h1 className="text-3xl font-black text-slate-900">Learner Dashboard</h1>
      <p className="mt-1 text-slate-600">
        Track lessons, logged hours, submission status, badges, and device redemption readiness.
      </p>

      {status && <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{status}</div>}

      <section className="mt-5 grid gap-4 md:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Phase 1 Progress</p>
          <p className="mt-1 text-3xl font-black text-[--color-red]">{lessonProgress}%</p>
          <p className="text-xs text-slate-500">{completedRequiredCount}/{requiredLessonCount} required lessons</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Hours Logged</p>
          <p className="mt-1 text-3xl font-black text-[--color-blue]">{snapshot?.user.totalHours ?? 0}</p>
          <p className="text-xs text-slate-500">Need {snapshot?.config.minHoursForDevice ?? 40}h minimum</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Submissions</p>
          <p className="mt-1 text-3xl font-black text-[--color-green]">{snapshot?.user.submissions.length ?? 0}</p>
          <p className="text-xs text-slate-500">Approved projects unlock redemption</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Redeem Status</p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {snapshot?.eligibility.readyToRedeem ? 'Ready' : 'In Progress'}
          </p>
          <p className="text-xs text-slate-500">Check full gate list below</p>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Log Build Hours</h2>
          <p className="mt-1 text-sm text-slate-600">Attach proof links to commits, demo clips, or notes.</p>
          <form className="mt-4 space-y-3" onSubmit={submitHours}>
            <label className="block text-sm font-semibold text-slate-700">
              Hours
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="12"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Note
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                rows={3}
                required
                placeholder="What did you build or debug?"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Proof URL (optional)
              <input
                type="url"
                value={proofUrl}
                onChange={(event) => setProofUrl(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="https://github.com/..."
              />
            </label>
            <button
              disabled={loading}
              className="rounded-lg bg-[--color-blue] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              type="submit"
            >
              {loading ? 'Saving...' : 'Add Time Log'}
            </button>
          </form>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Eligibility Gates</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Phase 1 lessons complete</span>
              <strong>{snapshot?.eligibility.phaseOneComplete ? 'PASS' : 'PENDING'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Minimum hours met</span>
              <strong>{snapshot?.eligibility.hoursMet ? 'PASS' : 'PENDING'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Metric threshold met</span>
              <strong>{snapshot?.eligibility.metricMet ? 'PASS' : 'PENDING'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Rubric pass (85+)</span>
              <strong>{snapshot?.eligibility.rubricMet ? 'PASS' : 'PENDING'}</strong>
            </li>
          </ul>

          {!snapshot?.eligibility.readyToRedeem && (
            <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <p className="font-semibold">Still blocked by:</p>
              <ul className="mt-1 list-disc pl-5">
                {(snapshot?.eligibility.reasons ?? []).map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Project Submissions</h2>
          <div className="mt-3 space-y-3">
            {(snapshot?.user.submissions ?? []).length === 0 && (
              <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
                No submissions yet. Start from `/projects/new`.
              </p>
            )}
            {(snapshot?.user.submissions ?? []).map((submission) => (
              <div key={submission.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{submission.title}</p>
                  <span className="pill bg-slate-100 text-slate-700">{submission.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Track: {submission.track} · {formatMetric(submission.metricName, submission.metricValue)}
                </p>
                {submission.rubricScore !== undefined && (
                  <p className="text-sm text-slate-600">Rubric: {submission.rubricScore}/100</p>
                )}
                {submission.feedback && <p className="mt-1 text-sm text-slate-700">Feedback: {submission.feedback}</p>}
              </div>
            ))}
          </div>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Badges</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(BADGE_DEFINITIONS).map(([badgeId, description]) => {
              const earned = snapshot?.user.badges.includes(badgeId);
              return (
                <div
                  key={badgeId}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    earned ? 'border-[--color-green] bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-500'
                  }`}
                >
                  <p className="font-semibold">{badgeId}</p>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}
