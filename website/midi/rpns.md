---
title: "RPNs"
tags: ["MIDI"]
---

# Registered Parameter Numbers

:::danger[SEQ64 Support]

    SEQ64 does not support RPNs directly. However, understanding their functions can still benefit creators, ensuring their sequences are accurate.

:::

## About
MIDI Registered Parameter Numbers (RPNs) are a set of MIDI Control Change messages that control specific sound parameters. Unlike standard MIDI Control Change messages, RPNs adjust parameters like pitch bend sensitivity, channel coarse-tuning, and other advanced settings.

### Using RPNs
To use an RPN, the following message pairs must be sent to a MIDI channel:

- MIDI CC#100 and CC#101: This message pair indicates the parameter to adjust.
- MIDI CC#006 and CC#038: This message pair sets the value for the chosen parameter.

The order of the messages within a pair does not matter. However, each message pair must be sent in sequence: first the RPN selector, then the Data Entry messages.

:::tip[Preventing Parameter Modification]

    To prevent modifying RPNs, an RPN Null message pair can be sent to a MIDI channel. The RPN Null message pair represents MIDI CC#100 and CC#101 set to a value of 127. This locks the current parameter's setting and prevents modification of the current RPN until it is reset.

:::

## Pitch Bend Sensitivity
The Pitch Bend Sensitivity RPN adjusts the pitch bend semitone range for the MIDI channel where the RPN and Data Entry messages are sent. Both Data Entry messages are required to set the pitch bend range. The MIDI specification does not define the full allowable range, so the available range depends on the MIDI hardware or software.

:::info[SEQ64 Pitch Bend Sequence Messages]

    The default MIDI pitch bend sensitivity is ±2 semitones. Sequences in *Ocarina of Time* and *Majora's Mask* can use three different pitch bend ranges:

    - `0xDE`: ASEQ Pitch Bend Custom channel message
    - `0xD3`: ASEQ Pitch Bend ±12 channel message
    - `0xEE`: ASEQ Pitch Bend ±2 channel and note layer message

    SEQ64 versions 1.0 and 1.5 default to the ASEQ Pitch Bend ±12 sequence message, which cannot be changed. In SEQ64 version 2.0 and higher, the ABI file controls which sequence message will be used for MIDI Pitch Bend messages.

    Using RPNs, the pitch bend range within a MIDI file can be adjusted to align with the pitch bend range used by SEQ64.

:::

### Message Values
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

## Channel Fine-Tune
The Channel Fine-Tune RPN adjusts the fine-tune of instruments for the MIDI channel where the RPN and Data Entry messages are sent. Both Data Entry messages are required to set the fine-tune.

If the 14-bit value of the Data Entry messages is 0x2000 (MSB of 64 and LSB of 0), no adjustment is made to the channel's fine-tune. The full range provides ±1 semitone of tuning, as one semitone is equal to 100 cents. Since the distance between the center value and each of its limits is 8192, a single increment corresponds to approximately 0.0122 cents. This can be calculated using the following formula:

$$
\frac{100}{8192} \approx 0.0122 \, \text{cents}
$$

In this formula:

- 100 represents the total number of cents in a full semitone.
- 8192 represents the number of increments within the tuning range for one direction.
- The result of the formula is the value of each individual increment in cents.

### Message Values
| RPN MSB | RPN LSB | Data Entry MSB | Data Entry LSB |
| --- | --- | --- | --- |
| `00H` | `01H` | `mmH` | `llH` |

<dl>
    <dt>**RPN MSB**</dt>
    <dd>

    When set to a value of zero alongside RPN LSB, this sets parameter to edit as Channel Fine-Tuning

    </dd>

    <dt>**RPN LSB**</dt>
    <dd>

    When set to a value of one alongside RPN MSB, this sets parameter to edit as Channel Fine-Tuning

    </dd>

    <dt>**Data Entry MSB**</dt>
    <dd>

    MSB of the 14-bit value

    </dd>

    <dt>**Data Entry LSB**</dt>
    <dd>

    LSB of the 14-bit value

    </dd>
</dl>

## Channel Coarse-Tune
The Channel Coarse-Tune RPN adjusts the coarse-tune of instruments for the MIDI channel where the RPN and Data Entry messages are sent. Only the Data Entry MSB message is required to set the coarse-tune.

If the 14-bit value of the Data Entry message is 0x40 (64), no adjustment is made to the channel's coarse-tune. The full range provides ±48 semitones of tuning, which is four octaves.

### Message Values
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