import json
from pathlib import Path

import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score

from data_loader import load_data


def train_model(random_state: int = 42):
    X_train, X_test, y_train, y_test = load_data(random_state=random_state)
    model = RandomForestClassifier(n_estimators=250, random_state=random_state)
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    f1 = f1_score(y_test, pred)
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
