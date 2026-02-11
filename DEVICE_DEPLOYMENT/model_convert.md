# Model Conversion

## ONNX Export

```bash
python ml-pipeline/export/to_onnx.py \
  --input models/best.pt \
  --output models/best.onnx
```

## TFLite Export

```bash
python ml-pipeline/export/to_tflite.py \
  --input models/best.pt \
  --output models/best.tflite \
  --quantize int8
```

## Verification

```bash
python ml-pipeline/device-harness/verify.py --model models/best.onnx --sample data/device/sample.json
python ml-pipeline/device-harness/verify.py --model models/best.tflite --sample data/device/sample.json
```

Expected output includes deterministic prediction and basic timing stats.
