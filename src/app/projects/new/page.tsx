'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/client-api';
import { MetricName, TrackType } from '@/lib/types';

interface SubmitResult {
  submission: {
    id: string;
  };
}

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState<TrackType>('image');
  const [metricName, setMetricName] = useState<MetricName>('accuracy');
  const [metricValue, setMetricValue] = useState('0.80');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [modelArtifact, setModelArtifact] = useState('models/best.tflite');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus('Submitting project...');

    try {
      const result = await apiPost<SubmitResult>('/api/projects/submit', {
        title,
        track,
        metricName,
        metricValue: Number(metricValue),
        repoUrl,
        demoUrl,
        summary,
        modelArtifact,
      });
      setStatus('Submission created. Redirecting...');
      router.push(`/projects/${result.submission.id}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not submit project.');
      setLoading(false);
    }
  }

  return (
    <div className="section-shell">
      <h1 className="text-3xl font-black text-slate-900">New Project Submission</h1>
      <p className="mt-1 max-w-2xl text-slate-600">
        Include enough evidence for rubric review: repo, demo, metric report, and model artifact path.
      </p>

      {status && <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{status}</div>}

      <form onSubmit={onSubmit} className="mt-5 card space-y-4 p-5">
        <label className="block text-sm font-semibold text-slate-700">
          Project title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-semibold text-slate-700">
            Track
            <select value={track} onChange={(event) => setTrack(event.target.value as TrackType)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              <option value="image">Image Classifier</option>
              <option value="text">Text Sentiment</option>
              <option value="audio">Audio Event Detector</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Metric
            <select value={metricName} onChange={(event) => setMetricName(event.target.value as MetricName)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              <option value="accuracy">accuracy</option>
              <option value="f1">f1</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Metric value
            <input
              type="number"
              step="0.0001"
              min="0"
              max="1.5"
              value={metricValue}
              onChange={(event) => setMetricValue(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">
          Repository URL
          <input
            type="url"
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Demo URL (video or live inference)
          <input
            type="url"
            value={demoUrl}
            onChange={(event) => setDemoUrl(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Model artifact path
          <input
            value={modelArtifact}
            onChange={(event) => setModelArtifact(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Technical summary
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            rows={6}
            placeholder="Problem, data, features, model, metrics, on-device results"
            required
          />
        </label>

        <button
          disabled={loading}
          className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d72f46] disabled:opacity-60"
          type="submit"
        >
          {loading ? 'Submitting...' : 'Submit for review'}
        </button>
      </form>
    </div>
  );
}
