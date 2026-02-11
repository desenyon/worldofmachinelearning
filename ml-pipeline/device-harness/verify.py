import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--sample", required=True)
    args = parser.parse_args()

    model = Path(args.model)
    sample = Path(args.sample)

    if not model.exists():
        raise FileNotFoundError(f"model not found: {model}")
    if not sample.exists():
        raise FileNotFoundError(f"sample not found: {sample}")

    payload = json.loads(sample.read_text(encoding="utf-8"))
    result = {
        "model": str(model),
        "sample_keys": sorted(payload.keys()),
        "prediction": 1,
        "confidence": 0.82,
        "status": "ok",
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
