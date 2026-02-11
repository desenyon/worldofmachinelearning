import Link from 'next/link';
import { formatMetric } from '@/lib/client-api';
import { getProgramSnapshot } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const snapshot = await getProgramSnapshot();

  return (
    <div className="section-shell">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Project Workspace</h1>
          <p className="mt-1 text-slate-600">Submit final projects, then track reviewer decisions and rubric scores.</p>
        </div>
        <Link href="/projects/new" className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white">
          New submission
        </Link>
      </div>

      <div className="space-y-3">
        {snapshot.user.submissions.length === 0 && (
          <div className="card p-4 text-sm text-slate-700">No submissions yet. Start with one of the templates in `/TEMPLATES`.</div>
        )}
        {snapshot.user.submissions.map((submission) => (
          <article key={submission.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-slate-900">{submission.title}</h2>
              <span className="pill bg-slate-100 text-slate-700">{submission.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Track: {submission.track} · {formatMetric(submission.metricName, submission.metricValue)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Link href={`/projects/${submission.id}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">
                View details
              </Link>
              <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">
                Repo
              </a>
              <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">
                Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
