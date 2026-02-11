import argparse
import json

import joblib
import numpy as np


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--sample", required=True)
    args = parser.parse_args()

    model = joblib.load(args.model)

    with open(args.sample, "r", encoding="utf-8") as fh:
        payload = json.load(fh)

    vector = np.array(payload["features"], dtype=float).reshape(1, -1)
    pred = int(model.predict(vector)[0])

    print(json.dumps({"prediction": pred}))


if __name__ == "__main__":
    main()
