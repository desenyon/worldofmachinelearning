export const runtime = 'nodejs';

import { fail, ok, parseJson } from '@/lib/api';
import { createRedemptionRequest, getProgramSnapshot } from '@/lib/store';

interface Body {
  shippingName?: string;
  email?: string;
  country?: string;
  notes?: string;
}

export async function GET() {
  try {
    const snapshot = await getProgramSnapshot();
    return ok({ requests: snapshot.user.redemptionRequests, eligibility: snapshot.eligibility });
  } catch {
    return fail('Could not load redemption data.', 'Refresh and try again.', 500);
  }
}

export async function POST(request: Request) {
  const body = await parseJson<Body>(request);

  if (!body?.shippingName?.trim() || !body.email?.trim() || !body.country?.trim()) {
    return fail(
      'Missing redemption fields.',
      'Required: shippingName, email, country. Optional: notes.'
    );
  }

  try {
    const result = await createRedemptionRequest({
      shippingName: body.shippingName.trim(),
      email: body.email.trim(),
      country: body.country.trim(),
      notes: body.notes?.trim(),
    });

    return ok(result, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not create redemption request.';
    return fail(message, 'Complete lessons, hours, metrics, and rubric approval first.', 403);
  }
}
