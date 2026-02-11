'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { apiGet, apiPost, ProgramSnapshot } from '@/lib/client-api';

interface RedemptionData {
  requests: Array<{
    id: string;
    status: string;
    createdAt: string;
    shippingName: string;
    country: string;
  }>;
}

export default function RedeemPage() {
  const [snapshot, setSnapshot] = useState<ProgramSnapshot | null>(null);
  const [shippingName, setShippingName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Loading redemption state...');
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet<ProgramSnapshot>('/api/program/state');
      setSnapshot(data);
      setStatus('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load redemption state.');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function submitRequest(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus('Submitting redemption request...');

    try {
      await apiPost<RedemptionData>('/api/redeem/request', {
        shippingName,
        email,
        country,
        notes,
      });
      setShippingName('');
      setEmail('');
      setCountry('');
      setNotes('');
      await refresh();
      setStatus('Request submitted. You will receive a follow-up form after staff review.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not submit request.');
    } finally {
      setLoading(false);
    }
  }

  const blocked = snapshot ? !snapshot.eligibility.readyToRedeem : true;

  return (
    <div className="section-shell">
      <h1 className="text-3xl font-black text-slate-900">Device Redemption</h1>
      <p className="mt-1 max-w-3xl text-slate-700">
        Redeem a hardware kit after completing the curriculum, meeting hour and metric gates, and passing final rubric review.
      </p>

      {status && <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{status}</div>}

      <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Eligibility Snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Phase 1 complete</span>
              <strong>{snapshot?.eligibility.phaseOneComplete ? 'PASS' : 'PENDING'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Hours logged</span>
              <strong>
                {(snapshot?.user.totalHours ?? 0).toFixed(1)} / {snapshot?.config.minHoursForDevice ?? 40}
              </strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Metric threshold</span>
              <strong>{snapshot?.eligibility.metricMet ? 'PASS' : 'PENDING'}</strong>
            </li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Rubric score 85+</span>
              <strong>{snapshot?.eligibility.rubricMet ? 'PASS' : 'PENDING'}</strong>
            </li>
          </ul>

          {blocked && (
            <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p className="font-semibold">Still blocked by:</p>
              <ul className="mt-1 list-disc pl-5">
                {(snapshot?.eligibility.reasons ?? []).map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Request Form</h2>
          <p className="mt-1 text-sm text-slate-600">
            Once you pass all gates, submit this form to request your hardware kit shipment.
          </p>
          <form className="mt-4 space-y-3" onSubmit={submitRequest}>
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <input
                value={shippingName}
                onChange={(event) => setShippingName(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                disabled={blocked}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                disabled={blocked}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Country
              <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                disabled={blocked}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Notes
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                disabled={blocked}
                placeholder="Preferred kit, shipping constraints, etc."
              />
            </label>
            <button
              type="submit"
              disabled={blocked || loading}
              className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit device request'}
            </button>
          </form>
        </article>
      </section>

      <section className="mt-5 card p-5">
        <h2 className="text-xl font-bold text-slate-900">Request History</h2>
        <div className="mt-3 space-y-2">
          {(snapshot?.user.redemptionRequests ?? []).length === 0 && (
            <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">No redemption requests yet.</p>
          )}
          {(snapshot?.user.redemptionRequests ?? []).map((request) => (
            <div key={request.id} className="rounded-md border border-slate-200 p-3 text-sm text-slate-700">
              <p className="font-semibold">{request.shippingName}</p>
              <p>Status: {request.status}</p>
              <p>Country: {request.country}</p>
              <p>Created: {new Date(request.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
