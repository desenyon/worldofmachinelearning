export const runtime = 'nodejs';

import { fail, ok, parseJson } from '@/lib/api';
import { submitProject } from '@/lib/store';
import { MetricName, TrackType } from '@/lib/types';

interface Body {
  title?: string;
  track?: TrackType;
  metricName?: MetricName;
  metricValue?: number;
  repoUrl?: string;
  demoUrl?: string;
  summary?: string;
  modelArtifact?: string;
}

const tracks: TrackType[] = ['image', 'text', 'audio'];
const metrics: MetricName[] = ['accuracy', 'f1'];

export async function POST(request: Request) {
  const body = await parseJson<Body>(request);

  if (!body) {
    return fail('Invalid JSON body.', 'Ensure your request body is valid JSON.');
  }

  if (
    !body.title?.trim() ||
    !body.track ||
    !body.metricName ||
    typeof body.metricValue !== 'number' ||
    !body.repoUrl?.trim() ||
    !body.demoUrl?.trim() ||
    !body.summary?.trim() ||
    !body.modelArtifact?.trim()
  ) {
    return fail(
      'Missing required project submission fields.',
      'Required: title, track, metricName, metricValue, repoUrl, demoUrl, summary, modelArtifact.'
    );
  }

  if (!tracks.includes(body.track)) {
    return fail('Unsupported track.', 'Use one of: image, text, audio.');
  }

  if (!metrics.includes(body.metricName)) {
    return fail('Unsupported metric name.', 'Use one of: accuracy, f1.');
  }

  try {
    const result = await submitProject({
      title: body.title.trim(),
      track: body.track,
      metricName: body.metricName,
      metricValue: body.metricValue,
      repoUrl: body.repoUrl.trim(),
      demoUrl: body.demoUrl.trim(),
      summary: body.summary.trim(),
      modelArtifact: body.modelArtifact.trim(),
    });

    return ok(result, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not submit project.';
    return fail(
      message,
      'Use decimal metrics (ex: 0.84), and include a repo + demo URL that reviewers can open.'
    );
  }
}
