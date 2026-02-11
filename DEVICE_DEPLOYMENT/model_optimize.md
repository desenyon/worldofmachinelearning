# Model Optimization

Goal: reduce latency and memory while preserving minimum metric thresholds.

## Quantization Strategy

1. Train baseline full-precision model.
2. Export checkpoint.
3. Apply post-training quantization.
4. Compare metric drop and runtime gain.

## Pruning Strategy

1. Start from trained checkpoint.
2. Prune low-magnitude weights.
3. Fine-tune briefly.
4. Re-export and benchmark.

## Script Examples

```bash
python ml-pipeline/common/prune.py --input models/best.pt --output models/pruned.pt --sparsity 0.30
python ml-pipeline/export/to_tflite.py --input models/pruned.pt --output models/pruned.tflite --quantize int8
```

## Acceptance Targets

- Latency <= 250 ms (median)
- Memory <= 200 MB peak
- Track metric still above threshold gate
