import argparse
import json
from pathlib import Path

import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

from data_loader import load_data


def train_model(random_state: int = 42):
    X_train, X_test, y_train, y_test = load_data(random_state=random_state)
    model = LogisticRegression(max_iter=1200, solver="lbfgs", random_state=random_state)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    return model, acc


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs", type=int, default=5, help="Unused placeholder for interface consistency.")
    parser.add_argument("--random-state", type=int, default=42)
    args = parser.parse_args()

    model, acc = train_model(random_state=args.random_state)

    models_dir = Path("models")
    models_dir.mkdir(exist_ok=True)

    model_path = models_dir / "best.joblib"
    metrics_path = models_dir / "metrics.json"

    joblib.dump(model, model_path)
    metrics_path.write_text(json.dumps({"accuracy": float(acc)}, indent=2), encoding="utf-8")

    print(f"saved: {model_path}")
    print(f"accuracy: {acc:.4f}")


if __name__ == "__main__":
    main()
