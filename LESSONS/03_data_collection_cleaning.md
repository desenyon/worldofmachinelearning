# 03 - Dataset Sourcing and Cleaning

## Learning Objective
Collect and clean data reproducibly while avoiding leakage.

## Why This Matters
Data quality sets your model ceiling.

## Visual Example
```text
raw -> dedupe -> null audit -> label audit -> split -> train-ready
```

## Code (Python)
```python
import pandas as pd

df = pd.read_csv("data/raw/train.csv")
df = df.drop_duplicates()
print(df.isna().mean().sort_values(ascending=False).head())
```

## Try It Now
```bash
python scripts/clean_data.py
```

## Checkpoint
- Dataset source + license documented.
- Duplicate and missing-value checks complete.
- Processed snapshot saved with script.

## Mini Quiz
1. Most dangerous cleaning bug?
   - A. Leakage
   - B. Long filenames
2. Split should happen before:
   - A. fitting scalers/imputers
   - B. writing README
3. Keep raw and processed folders separate?
   - A. Yes
   - B. No

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If data is heavily imbalanced, log class counts pre/post cleaning.
- If >70% missing in a feature, justify drop vs impute.
