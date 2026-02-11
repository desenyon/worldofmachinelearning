# Text Sentiment Template

Track: `text`

## Commands

```bash
python train.py
python evaluate.py --model models/best.joblib
python export.py --model models/best.joblib --format onnx
python infer.py --model models/best.joblib --text "this project is amazing"
```

## Notes
- Uses a tiny built-in dataset for fast local iteration.
- Replace with your own labeled text dataset for final project.
