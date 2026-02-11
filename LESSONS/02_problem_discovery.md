# 02 - Problem Discovery and Scoping

## Learning Objective
Convert broad ideas into a supervised learning task with clear inputs, output, and decision owner.

## Why This Matters
A scoped problem is easier to evaluate, deploy, and defend.

## Visual Example
```text
User: cafeteria manager
Input: food image + metadata
Output: spoiled / safe
Decision: discard or serve
```

## Code (Python)
```python
contract = {
    "input_schema": ["image_path", "temperature_c"],
    "output_schema": ["label", "confidence"],
    "max_latency_ms": 250
}
print(contract)
```

## Try It Now
```bash
python -c "print('model contract ready')"
```

## Checkpoint
- I wrote a model contract.
- I identified highest-risk failure mode.
- I defined what data is available at prediction time.

## Mini Quiz
1. A model contract includes:
   - A. Input/output constraints
   - B. CSS styles
2. Why compare false positive and false negative risk?
   - A. Prioritize real-world impact
   - B. Make code longer
3. Best beginner scope?
   - A. Massive open-ended multimodal task
   - B. One clear classification target

### Answer Key
1. A
2. A
3. B

## Troubleshooting
- If your scope has more than 10 labels, reduce to coarse classes first.
- If input is undefined, your problem is not ready for training.
