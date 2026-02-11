import json
from pathlib import Path

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.pipeline import Pipeline

from data_loader import load_data


def train_model():
    X_train, X_test, y_train, y_test = load_data()

    model = Pipeline(
        [
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
            ("clf", LogisticRegression(max_iter=400, random_state=42)),
        ]
    )

    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    f1 = f1_score(y_test, preds)
    return model, f1


def main():
    model, f1 = train_model()
    models_dir = Path("models")
    models_dir.mkdir(exist_ok=True)

    model_path = models_dir / "best.joblib"
    metrics_path = models_dir / "metrics.json"

    joblib.dump(model, model_path)
    metrics_path.write_text(json.dumps({"f1": float(f1)}, indent=2), encoding="utf-8")

    print(f"saved: {model_path}")
    print(f"f1: {f1:.4f}")


if __name__ == "__main__":
    main()
