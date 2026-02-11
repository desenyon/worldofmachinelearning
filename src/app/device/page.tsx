import Link from 'next/link';

const wiring = `Raspberry Pi Zero 2 W + I2S Mic (INMP441)

Pi Pin         Sensor Pin
------------------------------
3.3V (Pin 1) -> VDD
GND  (Pin 6) -> GND
GPIO18 (12)  -> SCK
GPIO19 (35)  -> WS
GPIO20 (38)  -> SD
`;

const setupSteps = [
  'Flash Raspberry Pi OS Lite to SD card with Raspberry Pi Imager.',
  'Enable SSH by placing an empty `ssh` file on the boot partition.',
  'Create `wpa_supplicant.conf` on boot for Wi-Fi provisioning.',
  'Boot device and SSH in: `ssh pi@raspberrypi.local`.',
  'Install deps: `sudo apt update && sudo apt install -y python3-venv python3-pip`.',
  'Clone your project and create a dedicated virtual environment.',
];

const optimizeSteps = [
  'Train model on laptop and export baseline checkpoint.',
  'Run pruning pass (`ml-pipeline/common/prune.py`) if model is over target size.',
  'Apply post-training quantization for TFLite/ONNX.',
  'Benchmark latency + memory before and after optimization.',
  'Pick fastest model that still beats minimum metric threshold.',
];

const harnessCommands = [
  'python ml-pipeline/export/to_tflite.py --input models/best.pt --output models/best.tflite',
  'python ml-pipeline/export/to_onnx.py --input models/best.pt --output models/best.onnx',
  'python ml-pipeline/device-harness/benchmark.py --model models/best.tflite --runs 50',
  'python ml-pipeline/device-harness/verify.py --model models/best.tflite --sample data/device/sample.json',
];

export default function DevicePage() {
  return (
    <div className="section-shell">
      <h1 className="text-3xl font-black text-slate-900">Phase 2: Local Model on Device</h1>
      <p className="mt-1 max-w-3xl text-slate-700">
        This path takes your trained model from laptop to low-cost hardware. Follow setup, optimize artifacts,
        run local inference, and submit proof for review.
      </p>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Hardware Setup Guide</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
            {setupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-md border border-sky-200 bg-sky-50 p-3 text-sm text-slate-700">
            Alternative TinyML path: ESP32-S3 is supported for lower-power deployments. See
            `DEVICE_DEPLOYMENT/setup_hardware.md` for firmware flow.
          </p>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Wiring Diagram (ASCII)</h2>
          <pre className="ascii-box mt-3">{wiring}</pre>
          <p className="mt-3 text-sm text-slate-600">
            Keep wire lengths short to reduce noise. Always power off before rewiring GPIO.
          </p>
        </article>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Model Optimization</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {optimizeSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Target: keep median inference under 250 ms on Pi Zero 2 W.
          </div>
        </article>

        <article className="card p-5">
          <h2 className="text-xl font-bold text-slate-900">Test Harness Commands</h2>
          <ul className="mt-3 space-y-2">
            {harnessCommands.map((cmd) => (
              <li key={cmd}>
                <code className="block overflow-x-auto rounded bg-slate-900 px-3 py-2 text-xs text-slate-100">{cmd}</code>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Expected verification output should include `latency_ms`, `peak_memory_mb`, and deterministic prediction checks.
          </p>
        </article>
      </section>

      <section className="mt-5 card p-5">
        <h2 className="text-xl font-bold text-slate-900">Completion Checklist</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Model exported to ONNX and/or TFLite.</li>
          <li>On-device inference command succeeds with sample input.</li>
          <li>Benchmark report saved to `ml-pipeline/device-harness/reports/`.</li>
          <li>Demo video or serial logs uploaded in final project submission.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/projects/new" className="rounded-lg bg-[--color-red] px-4 py-2 text-sm font-semibold text-white">
            Submit project evidence
          </Link>
          <Link href="/redeem" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Check redemption status
          </Link>
        </div>
      </section>
    </div>
  );
}
