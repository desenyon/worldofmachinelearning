# 08 - Final Project Submission

## Learning Objective
Prepare a complete submission packet for rubric review and redemption gates.

## Why This Matters
A clear packet speeds reviewer approval and device unlock.

## Visual Example
```text
submission packet:
- repo URL
- demo URL
- metric report
- model artifact path
- hour logs + proof
```

## Code (Python)
```python
packet = {
  "track": "image",
  "metric": "accuracy",
  "value": 0.84,
  "hours": 42,
  "rubric_target": 85
}
print(packet)
```

## Try It Now
```bash
curl http://localhost:3000/api/program/state
```

## Checkpoint
- Submission created in `/projects/new`.
- Reviewer feedback handled in `/admin/review`.
- Dashboard shows all gates passing.

## Mini Quiz
1. Redemption requires:
   - A. all gates passing
   - B. only one metric screenshot
2. Reviewer approval should check reproducibility?
   - A. Yes
   - B. No
3. Most useful summary structure:
   - A. Problem -> Data -> Model -> Metric -> Device proof
   - B. random notes

### Answer Key
1. A
2. A
3. A

## Troubleshooting
- If blocked, open dashboard eligibility and resolve each failing check.
- If rubric score is low, address feedback and resubmit with changelog.
