# Test On Device

## Run Benchmark

```bash
python ml-pipeline/device-harness/benchmark.py --model models/best.tflite --runs 50
```

Sample output:

```text
latency_ms_p50: 122.4
latency_ms_p95: 175.8
peak_memory_mb: 88.1
```

## Run Live Inference

```bash
python ml-pipeline/device-harness/run_live.py --model models/best.tflite --input data/device/live_sample.json
```

## Proof Requirements

- Terminal output screenshot/log
- Video clip showing input -> prediction path
- Commit hash of deployed model artifact
