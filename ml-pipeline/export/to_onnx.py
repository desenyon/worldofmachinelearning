import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    src = Path(args.input)
    dst = Path(args.output)

    if not src.exists():
        raise FileNotFoundError(f"input checkpoint not found: {src}")

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(f"ONNX placeholder generated from {src.name}\n", encoding="utf-8")
    print(f"exported onnx: {dst}")


if __name__ == "__main__":
    main()
