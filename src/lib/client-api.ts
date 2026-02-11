import { LessonDefinition, ProgramConfig, ProgramUser, DeviceCatalogItem, EligibilityCheck, Submission } from '@/lib/types';

interface SuccessResponse<T> {
  ok: true;
  data: T;
}

interface ErrorResponse {
  ok: false;
  error: {
    message: string;
    hint?: string;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface ProgramSnapshot {
  user: ProgramUser;
  lessons: LessonDefinition[];
  devices: DeviceCatalogItem[];
  config: ProgramConfig;
  eligibility: EligibilityCheck;
  serverTime: string;
}

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  const data = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !data.ok) {
    const message = data.ok ? 'Unknown request error' : data.error.message;
    const hint = data.ok ? '' : data.error.hint;
    throw new Error(hint ? `${message} Hint: ${hint}` : message);
  }
  return data.data;
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !data.ok) {
    const message = data.ok ? 'Unknown request error' : data.error.message;
    const hint = data.ok ? '' : data.error.hint;
    throw new Error(hint ? `${message} Hint: ${hint}` : message);
  }
  return data.data;
}

export function formatMetric(metricName: Submission['metricName'], value: number): string {
  const percentStyle = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  });

  if (metricName === 'accuracy' || metricName === 'f1') {
    return `${metricName.toUpperCase()}: ${percentStyle.format(value)}`;
  }

  return `${metricName}: ${value.toFixed(4)}`;
}
