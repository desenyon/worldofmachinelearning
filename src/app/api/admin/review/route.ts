export const runtime = 'nodejs';

import { fail, ok, parseJson } from '@/lib/api';
import { reviewSubmission } from '@/lib/store';

interface Body {
  submissionId?: string;
  rubricScore?: number;
  feedback?: string;
  approve?: boolean;
}

export async function POST(request: Request) {
  const body = await parseJson<Body>(request);

  if (
    !body?.submissionId ||
    typeof body.rubricScore !== 'number' ||
    typeof body.approve !== 'boolean' ||
    !body.feedback?.trim()
  ) {
    return fail(
      'Missing review fields.',
      'Send { submissionId, rubricScore, feedback, approve } to review a project.'
    );
  }

  try {
    const result = await reviewSubmission({
      submissionId: body.submissionId,
      rubricScore: body.rubricScore,
      feedback: body.feedback.trim(),
      approve: body.approve,
    });

    return ok(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save review.';
    return fail(message, 'Double-check submission id and rubric score range (0-100).');
  }
}
