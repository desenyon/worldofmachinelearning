# Wiring Diagrams

## Pi Zero 2 W + INMP441 (I2S Mic)

```text
Pi Pin         Mic Pin
---------------------------
3.3V (Pin 1) -> VDD
GND  (Pin 6) -> GND
GPIO18 (12)  -> SCK
GPIO19 (35)  -> WS
GPIO20 (38)  -> SD
```

## Pi Zero 2 W + Camera

```text
CSI cable
[Pi CSI port] ===== [Camera module]
```

## Basic LED Feedback (inference status)

```text
GPIO17 (Pin 11) -> 220ohm resistor -> LED+ 
LED- -> GND
```

## Safety

- Power off before rewiring.
- Do not connect 5V sensors directly to 3.3V GPIO pins.
