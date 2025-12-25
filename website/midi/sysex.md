---
title: "SysEx Messages"
tags: ["MIDI"]
---

# SysEx Messages

:::danger[SEQ64 Support]

    SEQ64 supports only the Universal Realtime System Exclusive message for Master Volume.

:::

## About
MIDI consists of two types of messages:

- Channel messages: These manage operations that affect individual MIDI channels, such as MIDI Note On, Note Off, and Control Change messages.
- System messages: These manage operations that affect the entire MIDI system, including System Exclusive messages, the MIDI clock, and other system functions.

### System Exclusive Messages
System Exclusive (SysEx) messages communicate information about specific functions in MIDI hardware from different manufacturers. These messages are defined by the manufacturer. Unlike regular MIDI messages, SysEx messages are sent as a string. This makes them more complex than regular MIDI messages.

This page does not cover every possible SysEx message, but it covers universal SysEx messages common to all MIDI hardware.

## Universal Realtime
Below are the Universal Realtime System Exclusive messages and information about them. Despite being labeled "exclusive", they are *not* truly exclusive messages. Every piece of MIDI hardware recognizes and uses them in the same way. That is why they are "universal" SysEx messages.

### Master Volume
The Master Volume SysEx message controls the overall volume of every MIDI channel. This allows the volume of the entire music sequence to be adjusted.

#### Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

:::info

    Only the `llH` and `mmH` values need to be edited, as they correspond to the LSB and MSB of the command itself.

:::

#### String Value Information
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

### Master Fine-Tune
The Master Fine-Tune SysEx message controls the overall fine-tune of every MIDI channel. This allows the fine-tune of the entire music sequence to be adjusted.

#### Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

:::info

    Only the `llH` and `mmH` values need to be edited, as they correspond to the LSB and MSB of the command itself.

:::

#### String Value Information
| Byte | Decription |
| --- | --- |
| `F0H` | SysEx start |
| `7FH` | ID number (Universal realtime message) |
| `7FH` | Device ID (Broadcast) |
| `04H` | Sub ID#1 (Device Control) |
| `03H` | Sub ID#2 (Master Volume) |
| `llH` | Master Fine Tuning LSB |
| `mmH` | Master Fine Tuning MSB |
| `F7H` | SysEx end |

### Master Coarse-Tune
The Master Coarse-Tune SysEx message controls the overall coarse-tune of every MIDI channel. This allows the coarse-tune of the entire music sequence to be adjusted.

#### Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

:::info

    Only the `llH` and `mmH` values need to be edited, as they correspond to the LSB and MSB of the command itself.

:::

#### String Value Information
| Byte | Decription |
| --- | --- |
| `F0H` | SysEx start |
| `7FH` | ID number (Universal realtime message) |
| `7FH` | Device ID (Broadcast) |
| `04H` | Sub ID#1 (Device Control) |
| `03H` | Sub ID#2 (Master Volume) |
| `llH` | Master Coarse Tuning LSB |
| `mmH` | Master Coarse Tuning MSB |
| `F7H` | SysEx end |

<!-- ## Global Parameter Control
{{ doc_stub() }}

### Scale Tuning Adjustment
{{ doc_stub() }}

#### Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

#### String Value Information
| Byte | Decription |
| --- | --- |
| `F0H` | SysEx start |
| `7FH` | ID number (Universal realtime message) |
| `7FH` | Device ID (Broadcast) |
| `04H` | Sub ID#1 (Device Control) |
| `03H` | Sub ID#2 (Master Volume) |
| `llH` | Master Fine Tuning LSB |
| `mmH` | Master Fine Tuning MSB |
| `F7H` | SysEx end |

### Key-based Instrument Controllers
{{ doc_stub() }}

#### Message String
| Status | 2nd Byte | 3rd Byte |
| --- | --- | --- |
| `F0H` | `7FH 7FH 04H 01H llH mmH` | `F7H` |

#### String Value Information
| Byte | Decription |
| --- | --- |
| `F0H` | SysEx start |
| `7FH` | ID number (Universal realtime message) |
| `7FH` | Device ID (Broadcast) |
| `04H` | Sub ID#1 (Device Control) |
| `03H` | Sub ID#2 (Master Volume) |
| `llH` | Master Fine Tuning LSB |
| `mmH` | Master Fine Tuning MSB |
| `F7H` | SysEx end | -->