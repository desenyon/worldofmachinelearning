import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--format", choices=["onnx", "tflite"], default="onnx")
    args = parser.parse_args()

    model_path = Path(args.model)
    if not model_path.exists():
      raise FileNotFoundError(f"model not found: {model_path}")

    export_dir = Path("exports")
    export_dir.mkdir(exist_ok=True)
    out = export_dir / f"best.{args.format}"

    # Placeholder export artifact for template scaffolding.
    out.write_text(
        f"placeholder {args.format} artifact generated from {model_path.name}\n",
        encoding="utf-8",
    )

    print(f"exported: {out}")


if __name__ == "__main__":
    main()
