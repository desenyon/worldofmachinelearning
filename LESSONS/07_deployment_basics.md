# 07 - Deployment Basics

## Learning Objective
Package inference so it runs predictably outside notebooks.

## Why This Matters
Shipping means reproducible inference on fresh environments.

## Visual Example
```text
train.py -> best.ckpt -> export.py -> best.onnx/best.tflite -> infer.py
```

## Code (Python)
```python
import json
import joblib

model = joblib.load("models/best.joblib")
sample = json.load(open("sample.json", "r", encoding="utf-8"))
print(model.predict([sample])[0])
```

## Try It Now
```bash
python infer.py
```

## Checkpoint
- CLI inference works.
- Input schema documented.
- Smoke test command committed.

## Mini Quiz
1. Why keep CLI path?
   - A. deterministic smoke tests
   - B. aesthetics
2. Must version with model artifact:
   - A. preprocessing schema
   - B. only screenshots
3. Inference mismatch vs notebook likely means:
   - A. preprocessing drift
   - B. better model

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If runtime fails, verify artifact path and serialization type.
- If latency too high, profile preprocessing separately from model call.
