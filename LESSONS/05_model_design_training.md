# 05 - Model Design and Training

## Learning Objective
Train reproducible baseline and improved models with experiment tracking.

## Why This Matters
Without a baseline, you cannot prove improvement.

## Visual Example
```text
run_01 logistic_regression  f1=0.71
run_02 random_forest        f1=0.76
run_03 rf+features          f1=0.79
```

## Code (Python)
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_val)
print("f1", f1_score(y_val, pred))
```

## Try It Now
```bash
python TEMPLATES/image-classifier/train.py --epochs 8
```

## Checkpoint
- Reproducible seeds set.
- At least 2 model families compared.
- Experiment log artifact created.

## Mini Quiz
1. Baseline purpose:
   - A. reference for improvement
   - B. replace evaluation
2. Reproducibility needs:
   - A. seeds + config capture
   - B. luck
3. Overfitting sign:
   - A. train high, val low
   - B. both low

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If overfitting appears, reduce complexity and add regularization.
- If run-to-run variance is high, increase validation size.
