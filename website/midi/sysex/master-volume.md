---
title: "Master Volume"
tags: [ "SysEx", "MIDI", ]
---

# Master Volume

## About
The Master Volume SysEx message controls the overall volume of every MIDI channel. This allows the volume of the entire music sequence to be adjusted.

## Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

:::info

    Only the `llH` and `mmH` values need to be edited, as they correspond to the LSB and MSB of the command itself.

:::

## String Value Information
| Byte | Decription |
| --- | --- |
| `F0H` | SysEx start |
| `7FH` | ID number (Universal realtime message) |
| `7FH` | Device ID (Broadcast) |
| `04H` | Sub ID#1 (Device Control) |
| `01H` | Sub ID#2 (Master Volume) |
| `llH` | Master Volume LSB |
| `mmH` | Master Volume MSB |
| `F7H` | SysEx end |