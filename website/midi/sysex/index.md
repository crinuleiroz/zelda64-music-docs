---
title: "SysEx Messages"
tags: [ "SysEx", "MIDI", ]
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

## Universal Realtime

<!-- TODO: Write more information about Universal Realtime -->
Below are the Universal Realtime System Exclusive messages and information about them. Despite being labeled "exclusive", they are *not* truly exclusive messages. Every piece of MIDI hardware recognizes and uses them in the same way. That is why they are "universal" SysEx messages.

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

<DocCardList />