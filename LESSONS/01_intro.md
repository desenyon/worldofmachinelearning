# 01 - Intro to Practical ML

## Learning Objective
Understand the complete ML lifecycle and define a measurable success target before training.

## Why This Matters
Teams lose weeks when they start training before deciding what “good” means.

## Visual Example
```text
Problem -> Data -> Features -> Train -> Evaluate -> Deploy -> Improve
```

## Code (Python)
```python
project = {
    "problem": "Classify recyclable vs non-recyclable waste",
    "metric": "f1",
    "target": 0.78,
    "latency_budget_ms": 200
}
print(project)
```

## Try It Now
```bash
python -c "print('WorldOfML kickoff ✅')"
```

## Checkpoint
- I can explain each lifecycle stage in one sentence.
- I selected one primary metric.
- I wrote a 4-line project brief.

## Mini Quiz
1. What should be chosen first?
   - A. Batch size
   - B. Primary metric
   - C. Number of layers
2. Why define latency budget early?
   - A. UI reasons
   - B. Hardware constraints affect model choices
3. Is a higher score always better?
   - A. Yes
   - B. Only if it still meets runtime and reliability constraints

### Answer Key
1. B
2. B
3. B

## Troubleshooting
- If the problem statement is vague, rewrite it as one prediction + one user decision.
- If metric is unclear, start with accuracy (balanced) or F1 (imbalanced).
