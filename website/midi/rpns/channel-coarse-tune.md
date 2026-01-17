---
title: "Channel Coarse-Tune"
tags: [ "RPNs", "MIDI", ]
---

# Channel Coarse-Tune

## About
The Channel Coarse-Tune RPN adjusts the coarse-tune of instruments for the MIDI channel where the RPN and Data Entry messages are sent. Only the Data Entry MSB message is required to set the coarse-tune.

If the 14-bit value of the Data Entry message is 0x40 (64), no adjustment is made to the channel's coarse-tune. The full range provides ±48 semitones of tuning, which is four octaves.

## Message Values
| RPN MSB | RPN LSB | Data Entry MSB | Data Entry LSB |
| --- | --- | --- | --- |
| `00H` | `02H` | `mmH` | `llH` |

<dl>
    <dt>**RPN MSB**</dt>
    <dd>

    When set to a value of zero alongside RPN LSB, this sets parameter to edit as Channel Coarse-Tuning

    </dd>

    <dt>**RPN LSB**</dt>
    <dd>

    When set to a value of two alongside RPN MSB, this sets parameter to edit as Channel Coarse-Tuning

    </dd>

    <dt>**Data Entry MSB**</dt>
    <dd>

    Number of semitones to increase or decrease the tuning by

    </dd>

    <dt>**Data Entry LSB**</dt>
    <dd>

    Ignored and treated as a value of zero

    </dd>
</dl>