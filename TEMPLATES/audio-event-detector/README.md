# Audio Event Detector Template

Track: `audio`

## Commands

```bash
python train.py
python evaluate.py --model models/best.joblib
python export.py --model models/best.joblib --format tflite
python infer.py --model models/best.joblib --sample sample.json
```

## Notes
- Uses synthetic MFCC-like features for starter workflow.
- Replace with real extracted features for final project.
