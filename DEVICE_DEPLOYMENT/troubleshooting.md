# Device Troubleshooting

## SSH Not Working
- Verify `ssh` file exists on boot partition.
- Confirm Pi and laptop are on same network.
- Try direct IP from router dashboard.

## Slow Inference
- Use int8 quantized model.
- Reduce input resolution.
- Benchmark preprocessing separately from model execution.

## Mismatched Predictions
- Ensure same preprocessing pipeline on laptop and device.
- Confirm model artifact hash matches exported file.

## Audio Input Noisy
- Check ground wiring.
- Lower gain and test in quieter environment.
- Add simple denoise pass before inference.
