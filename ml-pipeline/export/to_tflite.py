import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--quantize", default="int8")
    args = parser.parse_args()

    src = Path(args.input)
    dst = Path(args.output)

    if not src.exists():
        raise FileNotFoundError(f"input checkpoint not found: {src}")

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(
        f"TFLite placeholder generated from {src.name}\nquantize={args.quantize}\n",
        encoding="utf-8",
    )
    print(f"exported tflite: {dst}")


if __name__ == "__main__":
    main()
