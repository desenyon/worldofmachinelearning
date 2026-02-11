# 06 - Metrics and Evaluation

## Learning Objective
Choose metrics aligned to risk and perform structured error analysis.

## Why This Matters
Accuracy can hide failures on critical classes.

## Visual Example
```text
Confusion Matrix
          Pred0 Pred1
True0       42    5
True1       13   21
```

## Code (Python)
```python
from sklearn.metrics import confusion_matrix, classification_report, f1_score

print(confusion_matrix(y_val, pred))
print(classification_report(y_val, pred))
print(f1_score(y_val, pred))
```

## Try It Now
```bash
python scripts/evaluate.py --model models/best.pkl
```

## Checkpoint
- Confusion matrix generated.
- Precision/recall/F1 explained.
- Top failure slices documented.

## Mini Quiz
1. For imbalanced classes, often prioritize:
   - A. F1
   - B. raw accuracy only
2. Confusion matrix helps with:
   - A. error pattern localization
   - B. dependency installs
3. Low recall often suggests:
   - A. threshold or class balance adjustments
   - B. ignore minority class

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If metrics conflict, use the one tied to real-world harm.
- If all predictions are same class, audit threshold + label encoding.
