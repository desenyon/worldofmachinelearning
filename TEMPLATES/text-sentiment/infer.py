import argparse
import json

import joblib


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--text", required=True)
    args = parser.parse_args()

    model = joblib.load(args.model)
    pred = int(model.predict([args.text])[0])

    print(json.dumps({"prediction": pred, "label": "positive" if pred == 1 else "negative"}))


if __name__ == "__main__":
    main()
