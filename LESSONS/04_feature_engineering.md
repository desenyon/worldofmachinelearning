# 04 - Feature Engineering

## Learning Objective
Create features that improve signal without leaking target information.

## Why This Matters
Better features often beat bigger models on cheap hardware.

## Visual Example
```text
raw: age, clicks, income
new: age_bucket, clicks_per_day, log_income
```

## Code (Python)
```python
import numpy as np
import pandas as pd

df = pd.read_csv("data/processed/clean.csv")
df["log_income"] = np.log1p(df["income"])
df["clicks_per_day"] = df["clicks"] / df["days"].clip(lower=1)
```

## Try It Now
```bash
python scripts/features.py
```

## Checkpoint
- At least two engineered features with rationale.
- Feature changes measured against baseline.
- Leakage audit complete.

## Mini Quiz
1. Target leakage means:
   - A. feature contains unavailable/future target info
   - B. missing values
2. Good feature rationale requires:
   - A. evidence from validation
   - B. personal preference only
3. For skewed income, common transform:
   - A. log1p
   - B. random noise

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If metric drops, inspect noisy or redundant features.
- If inference slows down, remove heavy transforms.
