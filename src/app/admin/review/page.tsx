'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { apiGet, apiPost, ProgramSnapshot, formatMetric } from '@/lib/client-api';

interface ReviewResult {
  submission: {
    id: string;
    status: string;
    rubricScore?: number;
    feedback?: string;
  };
}

export default function AdminReviewPage() {
  const [snapshot, setSnapshot] = useState<ProgramSnapshot | null>(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');
  const [rubricScore, setRubricScore] = useState('85');
  const [feedback, setFeedback] = useState('Great progress. Please include a clearer benchmark table in README.');
  const [approve, setApprove] = useState(true);
  const [status, setStatus] = useState('Loading review queue...');
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet<ProgramSnapshot>('/api/program/state');
      setSnapshot(data);
      setStatus('');
      setSelectedSubmissionId((current) => (current || data.user.submissions[0]?.id || ''));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load review queue.');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function submitReview(event: FormEvent) {
    event.preventDefault();
    if (!selectedSubmissionId) {
      setStatus('Select a submission first.');
      return;
    }

    setLoading(true);
    setStatus('Saving review...');
    try {
      await apiPost<ReviewResult>('/api/admin/review', {
        submissionId: selectedSubmissionId,
        rubricScore: Number(rubricScore),
        feedback,
        approve,
      });
      await refresh();
      setStatus('Review saved. Dashboard and redemption gates updated.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save review.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-shell">
      <h1 className="text-3xl font-black text-slate-900">Admin Review Queue</h1>
      <p className="mt-1 text-slate-600">
        Simulated reviewer panel for rubric scoring and approval decisions.
      </p>

      {status && <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{status}</div>}

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Submissions</h2>
          <div className="mt-3 space-y-3">
            {(snapshot?.user.submissions ?? []).length === 0 && (
              <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">No submissions to review yet.</p>
            )}
            {(snapshot?.user.submissions ?? []).map((submission) => (
              <button
                type="button"
                key={submission.id}
                onClick={() => setSelectedSubmissionId(submission.id)}
                className={`w-full rounded-lg border p-3 text-left ${
                  selectedSubmissionId === submission.id ? 'border-[--color-red] bg-red-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{submission.title}</p>
                  <span className="pill bg-slate-100 text-slate-700">{submission.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {submission.track} · {formatMetric(submission.metricName, submission.metricValue)}
                </p>
                <p className="mt-1 text-xs text-slate-500">{submission.id}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Apply Review</h2>
          <form className="mt-3 space-y-3" onSubmit={submitReview}>
            <label className="block text-sm font-semibold text-slate-700">
              Submission ID
              <input
                value={selectedSubmissionId}
                onChange={(event) => setSelectedSubmissionId(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Rubric score (0-100)
              <input
                type="number"
                min="0"
                max="100"
                value={rubricScore}
                onChange={(event) => setRubricScore(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Feedback
              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={approve} onChange={(event) => setApprove(event.target.checked)} />
              Approve submission
            </label>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[--color-blue] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save review'}
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
