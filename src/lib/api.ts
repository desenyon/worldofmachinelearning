import { NextResponse } from 'next/server';

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function fail(message: string, hint?: string, status = 400) {
  return NextResponse.json(
    {
      ok: false,
      error: { message, hint },
    },
    { status }
  );
}

export async function parseJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
