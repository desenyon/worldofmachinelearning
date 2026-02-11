export const runtime = 'nodejs';

import { addTimeLog } from '@/lib/store';
import { fail, ok, parseJson } from '@/lib/api';

interface Body {
  hours?: number;
  note?: string;
  proofUrl?: string;
  date?: string;
}

export async function POST(request: Request) {
  const body = await parseJson<Body>(request);

  if (!body || typeof body.hours !== 'number' || !body.note?.trim()) {
    return fail(
      'Missing required fields for time logging.',
      'Send { hours: number, note: string, proofUrl?: string, date?: YYYY-MM-DD }.'
    );
  }

  try {
    const result = await addTimeLog({
      hours: body.hours,
      note: body.note.trim(),
      proofUrl: body.proofUrl?.trim(),
      date: body.date,
    });
    return ok(result, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to log hours.';
    return fail(message, 'Keep each entry under 12 hours and include a clear build note.');
  }
}
