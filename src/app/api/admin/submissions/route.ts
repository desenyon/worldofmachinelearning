export const runtime = 'nodejs';

import { fail, ok } from '@/lib/api';
import { listSubmissions } from '@/lib/store';

export async function GET() {
  try {
    const submissions = await listSubmissions();
    return ok({ submissions });
  } catch {
    return fail('Could not load submissions.', 'Check local data file permissions.', 500);
  }
}
