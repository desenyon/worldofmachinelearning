export const runtime = 'nodejs';

import { completeLesson } from '@/lib/store';
import { fail, ok, parseJson } from '@/lib/api';

interface Body {
  lessonId?: string;
}

export async function POST(request: Request) {
  const body = await parseJson<Body>(request);

  if (!body?.lessonId) {
    return fail('Missing lessonId.', 'Send { lessonId: "01-intro" }.');
  }

  try {
    const result = await completeLesson(body.lessonId);
    return ok(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not complete lesson.';
    return fail(message, 'Check the lesson id from /api/program/state.');
  }
}
