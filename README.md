# POC - Bleno BLE Custom Service

Bleno Peripheral - Bluetooth Low Energy POC
--

This is an example program demonstrating BLE connectivity between a peripheral running bleno, and a central running Android.

The peripheral has the following service and characteristics UUID:
* Service uuid: 4fafc2011fb5459e8fccc5c9c331914b
* Characteristic uuid: beb5483e36e14688b7f5ea07361b26a8
- This charactesristica could be writ / read / notify. The value notified is the incremental number between 1 and 255 that is increased each second.

To run the peripheral example:
    node peripheral


It uses [bleno](https://github.com/abandonware/bleno/) and is based on [node-exemples](https://github.com/abandonware/bleno/tree/master/examples) and requires bleno to be working in your environment.
