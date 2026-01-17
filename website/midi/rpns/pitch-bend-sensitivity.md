---
title: "Pitch Bend Sensitivity"
tags: [ "RPNs", "MIDI", ]
---

# Pitch Bend Sensitivity

## About
The Pitch Bend Sensitivity RPN adjusts the pitch bend semitone range for the MIDI channel where the RPN and Data Entry messages are sent. Both Data Entry messages are required to set the pitch bend range. The MIDI specification does not define the full allowable range, so the available range depends on the MIDI hardware or software.

:::info[SEQ64 Pitch Bend Sequence Messages]

    The default MIDI pitch bend sensitivity is ±2 semitones. Sequences in *Ocarina of Time* and *Majora's Mask* can use three different pitch bend ranges:

    - `0xDE`: ASEQ Pitch Bend Custom channel message
    - `0xD3`: ASEQ Pitch Bend ±12 channel message
    - `0xEE`: ASEQ Pitch Bend ±2 channel and note layer message

    SEQ64 versions 1.0 and 1.5 default to the ASEQ Pitch Bend ±12 sequence message, which cannot be changed. In SEQ64 version 2.0 and higher, the ABI file controls which sequence message will be used for MIDI Pitch Bend messages.

    Using RPNs, the pitch bend range within a MIDI file can be adjusted to align with the pitch bend range used by SEQ64.

:::

## Message Values
| RPN MSB | RPN LSB | Data Entry MSB | Data Entry LSB |
| --- | --- | --- | --- |
| `00H` | `00H` | `mmH` | `llH` |

<dl>
    <dt>**RPN MSB**</dt>
    <dd>

    When set to a value of 0 alongside RPN LSB, this sets parameter to edit as Pitch Bend Sensitivity

    </dd>

    <dt>**RPN LSB**</dt>
    <dd>

    When set to a value of 0 alongside RPN MSB, this sets parameter to edit as Pitch Bend Sensitivity

    </dd>

    <dt>**Data Entry MSB**</dt>
    <dd>

    Semitone range

    </dd>

    <dt>**Data Entry LSB**</dt>
    <dd>

    Cent range

    </dd>
</dl>