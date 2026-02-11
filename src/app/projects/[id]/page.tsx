import Link from 'next/link';
import { formatMetric } from '@/lib/client-api';
import { getProgramSnapshot } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snapshot = await getProgramSnapshot();
  const submission = snapshot.user.submissions.find((entry) => entry.id === id);

  return (
    <div className="section-shell">
      {!submission && (
        <div className="card p-5">
          <h1 className="text-2xl font-bold text-slate-900">Submission not found</h1>
          <p className="mt-2 text-slate-600">The project id may be invalid or was not created yet.</p>
          <Link href="/projects" className="mt-4 inline-block rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white">
            Back to projects
          </Link>
        </div>
      )}

      {submission && (
        <article className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-3xl font-black text-slate-900">{submission.title}</h1>
            <span className="pill bg-slate-100 text-slate-700">{submission.status}</span>
          </div>

          <p className="mt-2 text-slate-700">
            Track: <strong>{submission.track}</strong> · {formatMetric(submission.metricName, submission.metricValue)}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100">
              Open repository
            </a>
            <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100">
              Open demo
            </a>
          </div>

          <section className="mt-5">
            <h2 className="text-xl font-bold text-slate-900">Summary</h2>
            <p className="mt-2 whitespace-pre-wrap text-slate-700">{submission.summary}</p>
          </section>

          <section className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Reviewer Feedback</h3>
            <p className="mt-2 text-sm text-slate-700">{submission.feedback ?? 'Awaiting review.'}</p>
            <p className="mt-1 text-sm text-slate-700">
              Rubric Score: {submission.rubricScore === undefined ? 'Pending' : `${submission.rubricScore}/100`}
            </p>
            <p className="mt-1 text-sm text-slate-700">Model Artifact: {submission.modelArtifact}</p>
          </section>
        </article>
      )}
    </div>
  );
}
