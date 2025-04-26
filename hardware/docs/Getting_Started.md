# Getting Started!

This guide will help you get started with the Dimmer firmware. This firmware runs on the ESPF32-C3 DevKit C-02 microcontroller.

## VS Code Setup Procedure

**TLDR**: Watch this link and note these changes below: [ESP-IDF Setup Video](https://www.youtube.com/watch?v=XDDcS7HQNlI)
1. COM Port: Check the one that is available on your computer by checking the device manager.
2. Esspressif Device Target: Set it to esp32-c3. If you don't, it won't flash onto the microcontroller. Also, make sure you are using UART.

Steps:
1. On Windows, install the "ESP-IDF" extension in the extensions tab.
    1. In the Command Palette (Ctrl+Shift+P) search for "Configure ESP-IDF Extension."
    2. Click on the matching result and select express installation option.
    3. Do not select the latest version, there is an error with python in this one. Use version 5.0.8 (this worked for me) and click               install.
3. Clone this repo.
4. Open this repo by clicking File>Open Folder.. and navigate to where you cloned the repo.
5. In the search bar of the VS Code Screen type `>esp-idf: menuconfig` and press enter
6. Search for the flash size and check the box that says `Detect flash size when flashing bootloader`
7. Search for the bluetooth options and make sure `Bluedroid - Dual-mode is selected`

### Troubleshooting

1. Check that your MicroUSB cable supports data transfer. Many MicroUSB cables are power-only.
2. Disable your antivirus.
3. Ensure that you are using the correct COM Port. You can verify this by checking your Device Manager under `Ports`
4. Ensure that the Esspressif Device Target is set to `esp32c3`
5. Ensure that the flash method is via `UART`
7. Make sure both power cables from the dimmer are plugged in.
