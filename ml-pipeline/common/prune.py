"""Lightweight placeholder pruning script for curriculum use.

In real projects, replace with framework-specific pruning (PyTorch/TensorFlow).
"""

import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--sparsity", type=float, default=0.3)
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        raise FileNotFoundError(f"input model not found: {input_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        f"pruned artifact from {input_path.name}\nsparsity={args.sparsity}\n",
        encoding="utf-8",
    )

    print(f"wrote pruned artifact: {output_path}")


if __name__ == "__main__":
    main()
