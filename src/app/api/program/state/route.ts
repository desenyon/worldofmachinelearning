export const runtime = 'nodejs';

import { ok, fail } from '@/lib/api';
import { getProgramSnapshot } from '@/lib/store';

export async function GET() {
  try {
    const snapshot = await getProgramSnapshot();
    return ok(snapshot);
  } catch {
    return fail(
      'Could not load program state.',
      'Try refreshing. If this persists, check that data/program-state.json is writable.',
      500
    );
  }
}
