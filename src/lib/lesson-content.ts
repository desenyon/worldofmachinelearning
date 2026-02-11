export interface QuizItem {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  objective: string;
  whyItMatters: string;
  visual: string;
  code: string;
  demo: string[];
  checkpoints: string[];
  quiz: QuizItem[];
  troubleshooting: string[];
  shipItTask: string;
}

export const LESSON_CONTENT: LessonContent[] = [
  {
    id: '01-intro',
    title: 'Intro to Practical ML',
    objective: 'Map the end-to-end ML lifecycle and define what success looks like before writing code.',
    whyItMatters:
      'Most beginner projects fail because they skip planning. Great ML starts with clear scope, measurable outcomes, and known constraints.',
    visual: `ML Lifecycle\n+------------+    +------------+    +------------+\n| Problem    | -> | Data       | -> | Features   |\n+------------+    +------------+    +------------+\n        |                                 |\n        v                                 v\n+------------+ <- +------------+ <- +------------+\n| Deploy     |    | Evaluate   |    | Train      |\n+------------+    +------------+    +------------+`,
    code: `# quick_project_brief.py\nproject = {\n    "problem": "Detect spoiled fruit from phone photos",\n    "metric": "accuracy",\n    "target": 0.85,\n    "latency_budget_ms": 120,\n    "device": "Raspberry Pi Zero 2 W"\n}\n\nfor k, v in project.items():\n    print(f"{k}: {v}")`,
    demo: ['python quick_project_brief.py', 'echo "Ship only what you can measure."'],
    checkpoints: [
      'I can describe the 7-stage workflow in order.',
      'I picked one concrete prediction task.',
      'I selected one primary metric and target value.',
    ],
    quiz: [
      {
        question: 'What should be chosen before model training?',
        options: ['GPU type', 'Primary metric', 'UI theme', 'Cloud provider'],
        answer: 'Primary metric',
        explanation: 'Without a metric you cannot compare experiments objectively.',
      },
      {
        question: 'Which phrase best describes deployment-ready ML?',
        options: ['Highest benchmark only', 'Works within real constraints', 'Newest model only', 'Most parameters'],
        answer: 'Works within real constraints',
        explanation: 'Real projects require speed, reliability, and reproducibility, not just high score.',
      },
      {
        question: 'Why define latency budget early?',
        options: ['For better CSS', 'To avoid impossible model choices later', 'To reduce dataset size only', 'For easier naming'],
        answer: 'To avoid impossible model choices later',
        explanation: 'Hardware limits shape model architecture decisions.',
      },
    ],
    troubleshooting: [
      'If scope feels huge, narrow to one target label first.',
      'If metric is unclear, choose a baseline metric by task type (accuracy/f1/mae).',
      'If deployment seems scary, define a local CLI inference as your first deploy target.',
    ],
    shipItTask: 'Write a 5-line project brief and commit it as `project-brief.md`.',
  },
  {
    id: '02-problem-discovery',
    title: 'Problem Discovery and Scoping',
    objective: 'Turn a broad idea into a supervised learning problem statement with measurable boundaries.',
    whyItMatters: 'Good framing prevents wasted time on data that cannot answer your question.',
    visual: `Problem Framing Grid\n+----------------+---------------------------+\n| Field          | Example                   |\n+----------------+---------------------------+\n| User           | School cafeteria staff    |\n| Prediction     | Is item spoiled?          |\n| Input          | Camera image + timestamp  |\n| Decision       | Keep / discard            |\n+----------------+---------------------------+`,
    code: `# framing_template.py\nproblem_statement = {\n    "user": "students managing donation pantry",\n    "prediction": "item category and freshness",\n    "decision_window": "under 2 seconds",\n    "risk": "false fresh predictions are costly"\n}\n\nassert "prediction" in problem_statement\nprint(problem_statement)`,
    demo: ['python framing_template.py'],
    checkpoints: [
      'I identified the end user and decision they will make.',
      'I listed failure impact of false positives vs false negatives.',
      'I wrote a one-sentence model contract.',
    ],
    quiz: [
      {
        question: 'What is a model contract?',
        options: ['A legal PDF', 'A clear promise of input/output/constraints', 'A training loop', 'A dataset license'],
        answer: 'A clear promise of input/output/constraints',
        explanation: 'It defines what your model accepts, predicts, and under what limits.',
      },
      {
        question: 'Why compare false positive and false negative cost?',
        options: ['For gradient descent', 'To align the model with real-world risk', 'For prettier charts', 'For SQL indexing'],
        answer: 'To align the model with real-world risk',
        explanation: 'Different errors carry different consequences.',
      },
      {
        question: 'Best first scope for beginners?',
        options: ['Open-ended chat model', 'One binary decision task', 'Large multimodal agent', 'Realtime video segmentation'],
        answer: 'One binary decision task',
        explanation: 'A narrow task is easier to validate and deploy.',
      },
    ],
    troubleshooting: [
      'If your task has too many labels, collapse into coarse classes first.',
      'If you cannot describe input format exactly, your problem is not yet scoped.',
      'If you need private data you do not have, pick a different dataset now.',
    ],
    shipItTask: 'Write `model-contract.json` with input schema, output schema, and latency target.',
  },
  {
    id: '03-data-collection-cleaning',
    title: 'Dataset Sourcing and Cleaning',
    objective: 'Collect, validate, and clean data without introducing leakage.',
    whyItMatters: 'Model quality is usually capped by data quality, not model complexity.',
    visual: `Cleaning Pipeline\nraw -> dedupe -> null audit -> label audit -> split -> train_ready`,
    code: `import pandas as pd\n\ndf = pd.read_csv("data/raw/train.csv")\nprint("rows before", len(df))\n\ndf = df.drop_duplicates()\nmissing = df.isna().mean().sort_values(ascending=False)\nprint("top missing")\nprint(missing.head(5))\n\ndf.to_csv("data/processed/clean.csv", index=False)\nprint("rows after", len(df))`,
    demo: ['python scripts/clean_data.py', 'python -m http.server 8000 --directory data/processed'],
    checkpoints: [
      'I documented dataset source and license.',
      'I measured missingness and duplicates.',
      'I saved a clean dataset snapshot reproducibly.',
    ],
    quiz: [
      {
        question: 'Which step should happen before fitting imputers/scalers?',
        options: ['Train/test split', 'Hyperparameter tuning', 'Deployment', 'Confusion matrix'],
        answer: 'Train/test split',
        explanation: 'Fitting on full data leaks information into training.',
      },
      {
        question: 'Why store raw and processed separately?',
        options: ['For decoration', 'For reproducibility and traceability', 'To increase RAM', 'For faster CSS'],
        answer: 'For reproducibility and traceability',
        explanation: 'You need to rebuild transformations reliably.',
      },
      {
        question: 'Most dangerous cleaning mistake?',
        options: ['Short variable names', 'Data leakage', 'Too many comments', 'Local paths'],
        answer: 'Data leakage',
        explanation: 'Leakage inflates metrics and fails in production.',
      },
    ],
    troubleshooting: [
      'If class labels are imbalanced, track counts before and after cleaning.',
      'If columns have >70% missing values, justify dropping vs imputing.',
      'If data drift appears, freeze a training snapshot and version it.',
    ],
    shipItTask: 'Commit `data_audit.md` with missing-value table and cleaning decisions.',
  },
  {
    id: '04-feature-engineering',
    title: 'Feature Engineering',
    objective: 'Build informative features and justify each transform with evidence.',
    whyItMatters: 'Thoughtful features can outperform more complex models on small hardware budgets.',
    visual: `Feature Table\ninput: [age, income, clicks]\nengineered: [log_income, clicks_per_day, age_bucket]`,
    code: `import numpy as np\nimport pandas as pd\n\ndf = pd.read_csv("data/processed/clean.csv")\n\ndf["log_income"] = np.log1p(df["income"])\ndf["age_bucket"] = pd.cut(df["age"], bins=[0, 18, 30, 50, 100], labels=["teen", "young", "adult", "senior"])\ndf["clicks_per_day"] = df["clicks"] / df["active_days"].clip(lower=1)\n\nprint(df[["log_income", "age_bucket", "clicks_per_day"]].head())`,
    demo: ['python scripts/features.py'],
    checkpoints: [
      'I created at least 2 engineered features with rationale.',
      'I avoided target leakage in feature definitions.',
      'I measured whether features improve validation metric.',
    ],
    quiz: [
      {
        question: 'What is target leakage in features?',
        options: ['Unused columns', 'Feature includes future/target information', 'Missing data', 'Bad plotting'],
        answer: 'Feature includes future/target information',
        explanation: 'Leaky features make validation unreliable.',
      },
      {
        question: 'Why use `log1p` for skewed numeric columns?',
        options: ['Randomness', 'Compresses outliers and stabilizes scale', 'For one-hot encoding', 'To fix labels'],
        answer: 'Compresses outliers and stabilizes scale',
        explanation: 'Log transforms often improve model behavior on heavy-tailed values.',
      },
      {
        question: 'How do you justify a new feature?',
        options: ['It sounds cool', 'It improves validated performance or interpretability', 'It adds many columns', 'It runs slower'],
        answer: 'It improves validated performance or interpretability',
        explanation: 'Engineering choices should be evidence-driven.',
      },
    ],
    troubleshooting: [
      'If metric drops, inspect collinearity and noisy transforms.',
      'If one-hot explosion occurs, reduce high-cardinality categories.',
      'If inference is slow, prefer lightweight arithmetic features.',
    ],
    shipItTask: 'Add a `feature_report.md` with before/after metric comparison.',
  },
  {
    id: '05-model-design-training',
    title: 'Model Design and Training',
    objective: 'Train a reproducible baseline and improved model with clean experiment tracking.',
    whyItMatters: 'You need a stable baseline to avoid “random improvements” that do not generalize.',
    visual: `Experiment Log\nrun_01: LogisticRegression acc=0.78\nrun_02: RandomForest acc=0.82\nrun_03: RF+features acc=0.84`,
    code: `from sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nfrom sklearn.ensemble import RandomForestClassifier\nimport pandas as pd\n\ndf = pd.read_csv("data/processed/model_input.csv")\nX = df.drop(columns=["target"])\ny = df["target"]\n\nX_train, X_valid, y_train, y_valid = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\nmodel = RandomForestClassifier(n_estimators=200, random_state=42)\nmodel.fit(X_train, y_train)\npreds = model.predict(X_valid)\nprint("accuracy", accuracy_score(y_valid, preds))`,
    demo: ['python templates/image-classifier/train.py --epochs 8', 'python templates/text-sentiment/train.py'],
    checkpoints: [
      'I fixed random seeds and documented model hyperparameters.',
      'I compared at least two model families.',
      'I logged metrics in a reproducible artifact.',
    ],
    quiz: [
      {
        question: 'Why keep a baseline model?',
        options: ['To avoid writing docs', 'To measure real improvements', 'To reduce dataset size', 'To skip evaluation'],
        answer: 'To measure real improvements',
        explanation: 'Without baseline, better/worse comparisons are meaningless.',
      },
      {
        question: 'Best place to set random seeds?',
        options: ['Everywhere relevant in one setup block', 'Never', 'Only UI code', 'Only README'],
        answer: 'Everywhere relevant in one setup block',
        explanation: 'Consistent seed setup improves reproducibility.',
      },
      {
        question: 'What makes experiment logs useful?',
        options: ['Long names only', 'Params + metrics + timestamp + artifact path', 'Screenshots only', 'Single final score'],
        answer: 'Params + metrics + timestamp + artifact path',
        explanation: 'You need enough context to reproduce outcomes.',
      },
    ],
    troubleshooting: [
      'If train score is high but valid score low, reduce overfitting with regularization.',
      'If training crashes, cut batch size and inspect malformed rows.',
      'If metrics fluctuate heavily, increase validation size or use cross-validation.',
    ],
    shipItTask: 'Save `experiments.csv` with at least 3 runs and commit it.',
  },
  {
    id: '06-metrics-evaluation',
    title: 'Metrics and Evaluation',
    objective: 'Use task-appropriate metrics and error analysis to make model decisions.',
    whyItMatters: 'Accuracy alone can hide failure on minority classes and real-world edge cases.',
    visual: `Confusion Matrix\n          Pred 0   Pred 1\nTrue 0      41        6\nTrue 1      12       23`,
    code: `from sklearn.metrics import classification_report, confusion_matrix, f1_score\n\ncm = confusion_matrix(y_valid, preds)\nprint(cm)\nprint(classification_report(y_valid, preds))\nprint("f1", f1_score(y_valid, preds))`,
    demo: ['python scripts/evaluate.py --model models/best.pkl'],
    checkpoints: [
      'I can explain precision, recall, and F1 in my own words.',
      'I generated a confusion matrix and identified failure patterns.',
      'I documented one mitigation plan for observed errors.',
    ],
    quiz: [
      {
        question: 'When is F1 usually better than raw accuracy?',
        options: ['Balanced classes with no cost differences', 'Class imbalance and asymmetric error costs', 'Only regression', 'Never'],
        answer: 'Class imbalance and asymmetric error costs',
        explanation: 'F1 balances precision/recall and is less fooled by majority-class dominance.',
      },
      {
        question: 'What does confusion matrix reveal?',
        options: ['CSS bugs', 'Error distribution by class', 'Training speed only', 'Disk usage'],
        answer: 'Error distribution by class',
        explanation: 'It shows where predictions are getting confused.',
      },
      {
        question: 'Best immediate action after finding low recall?',
        options: ['Ignore it', 'Adjust threshold / rebalance / collect more positives', 'Increase logo size', 'Delete test set'],
        answer: 'Adjust threshold / rebalance / collect more positives',
        explanation: 'You need targeted changes for the failure mode.',
      },
    ],
    troubleshooting: [
      'If metrics disagree, prioritize the one tied to product risk.',
      'If validation split is tiny, confidence intervals may be noisy.',
      'If predictions are all one class, inspect label encoding and threshold logic.',
    ],
    shipItTask: 'Add `error-analysis.md` with 5 failure examples and proposed fixes.',
  },
  {
    id: '07-deployment-basics',
    title: 'Deployment Basics',
    objective: 'Package the model for local inference and expose a reproducible CLI test path.',
    whyItMatters: 'Shipping ML means people can run it repeatedly outside notebooks.',
    visual: `Local Deploy Flow\nmodel.pt -> export.py -> model.onnx -> infer.py --input sample.json`,
    code: `# infer.py\nimport json\nimport joblib\n\nmodel = joblib.load("models/best.joblib")\n\nwith open("sample.json", "r", encoding="utf-8") as f:\n    sample = json.load(f)\n\npred = model.predict([sample])[0]\nprint({"prediction": int(pred)})`,
    demo: ['python infer.py', 'python -m http.server 8080 --directory demo'],
    checkpoints: [
      'I can run inference from terminal without notebook state.',
      'I versioned model artifact and input schema.',
      'I wrote a one-command smoke test.',
    ],
    quiz: [
      {
        question: 'Why keep CLI inference even with web UI?',
        options: ['No reason', 'Reliable debug/smoke-test path', 'For animations', 'To avoid docs'],
        answer: 'Reliable debug/smoke-test path',
        explanation: 'CLI helps isolate backend behavior quickly.',
      },
      {
        question: 'What should be versioned with model artifact?',
        options: ['Only logo', 'Input schema and preprocessing config', 'Browser history', 'Slack messages'],
        answer: 'Input schema and preprocessing config',
        explanation: 'Inference correctness depends on exact feature preprocessing.',
      },
      {
        question: 'Best smoke test output?',
        options: ['Human memory', 'Deterministic sample with expected prediction', 'Random test each run', 'No output'],
        answer: 'Deterministic sample with expected prediction',
        explanation: 'Deterministic tests catch regressions early.',
      },
    ],
    troubleshooting: [
      'If inference differs from notebook, verify preprocessing parity.',
      'If model fails to load, check artifact path and serialization format.',
      'If latency is too high, measure preprocessing vs model runtime separately.',
    ],
    shipItTask: 'Create `make smoke` (or npm script) that runs end-to-end local inference check.',
  },
  {
    id: '08-final-project',
    title: 'Final Project Spec',
    objective: 'Prepare final project artifacts for reviewer rubric + device eligibility checks.',
    whyItMatters: 'Clear submission packets make review fast and unlock hardware redemption quickly.',
    visual: `Final Packet\n[repo link]\n[demo link]\n[metric report]\n[rubric checklist]\n[time logs + proof]`,
    code: `final_submission = {\n  "track": "image",\n  "metric_name": "accuracy",\n  "metric_value": 0.84,\n  "rubric_target": 85,\n  "hours_logged": 42.0,\n  "demo": "https://your-demo.example"\n}\nprint(final_submission)`,
    demo: ['python -c "print(\"submit packet ready\")"', 'curl -X GET http://localhost:3000/api/program/state'],
    checkpoints: [
      'I attached repo, demo, model artifact path, and summary.',
      'I logged required hours with proof links.',
      'I verified metric threshold for my track.',
    ],
    quiz: [
      {
        question: 'What unlocks redemption?',
        options: ['Any single quiz pass', 'All gating checks: lessons, hours, metrics, rubric', 'Only high XP', 'Only a demo video'],
        answer: 'All gating checks: lessons, hours, metrics, rubric',
        explanation: 'Redemption is intentionally gated on complete learning outcomes.',
      },
      {
        question: 'Reviewer can approve with poor reproducibility?',
        options: ['Yes always', 'No, reproducibility is part of rubric', 'Only on weekends', 'If design is nice'],
        answer: 'No, reproducibility is part of rubric',
        explanation: 'Reproducibility is core to the program quality bar.',
      },
      {
        question: 'Most useful submission summary style?',
        options: ['One sentence only', 'Problem -> data -> model -> metric -> deployment evidence', 'No summary', 'Only screenshots'],
        answer: 'Problem -> data -> model -> metric -> deployment evidence',
        explanation: 'Structured summaries speed up review and reduce back-and-forth.',
      },
    ],
    troubleshooting: [
      'If not eligible, open dashboard checklist and resolve failing gate one by one.',
      'If metric name mismatches track threshold, re-run evaluation with correct metric.',
      'If reviewer asks changes, update submission and resubmit with changelog.',
    ],
    shipItTask: 'Submit your project through `/projects/new` and pass review in `/admin/review`.',
  },
];

export const LESSON_LOOKUP = Object.fromEntries(LESSON_CONTENT.map((lesson) => [lesson.id, lesson]));
