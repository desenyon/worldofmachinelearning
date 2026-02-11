# Image Classifier Template

Track: `image`

## Commands

```bash
python train.py --epochs 5
python evaluate.py --model models/best.joblib
python export.py --model models/best.joblib --format onnx
python infer.py --model models/best.joblib --sample sample.json
```

## Notes
- Uses sklearn digits dataset for local training.
- Replace loader with your own image dataset once baseline works.
