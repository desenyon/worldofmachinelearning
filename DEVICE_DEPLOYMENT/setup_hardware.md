# Hardware Setup

Primary target: Raspberry Pi Zero 2 W

Alternate target: ESP32-S3 (TinyML)

## Pi Zero 2 W Setup

1. Flash Raspberry Pi OS Lite with Raspberry Pi Imager.
2. Mount boot partition and add empty file `ssh`.
3. Add Wi-Fi config file:

```conf
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
  ssid="YOUR_WIFI"
  psk="YOUR_PASSWORD"
}
```

4. Boot board and connect:

```bash
ssh pi@raspberrypi.local
```

5. Install runtime dependencies:

```bash
sudo apt update
sudo apt install -y python3-venv python3-pip git
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
```

## ESP32-S3 Notes

- Install ESP-IDF.
- Use TensorFlow Lite Micro model format.
- Flash firmware with serial monitor open for inference logs.

## Verification

```bash
python -c "import platform; print(platform.machine())"
```

Expected output includes `armv7l` or `aarch64` for Pi.
