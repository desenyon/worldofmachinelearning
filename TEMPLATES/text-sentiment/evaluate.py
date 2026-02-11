import argparse
import json
from pathlib import Path

import joblib
from sklearn.metrics import f1_score, classification_report

from data_loader import load_data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    args = parser.parse_args()

    model = joblib.load(args.model)
    _, X_test, _, y_test = load_data()

    preds = model.predict(X_test)
    f1 = f1_score(y_test, preds)

    report = {
        "f1": float(f1),
        "summary": classification_report(y_test, preds, output_dict=True),
    }

    out = Path("models") / "eval.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"f1: {f1:.4f}")


if __name__ == "__main__":
    main()
