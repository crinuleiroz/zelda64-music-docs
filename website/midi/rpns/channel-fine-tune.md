---
title: "Channel Fine-Tune"
tags: [ "RPNs", "MIDI", ]
---

# Channel Fine-Tune

## About
The Channel Fine-Tune RPN adjusts the fine-tune of instruments for the MIDI channel where the RPN and Data Entry messages are sent. Both Data Entry messages are required to set the fine-tune.

If the 14-bit value of the Data Entry messages is 0x2000 (MSB of 64 and LSB of 0), no adjustment is made to the channel's fine-tune. The full range provides ±1 semitone of tuning, as one semitone is equal to 100 cents. Since the distance between the center value and each of its limits is 8192, a single increment corresponds to approximately 0.0122 cents. This can be calculated using the following formula:

$$
\frac{100}{8192} \approx 0.0122 \, \text{cents}
$$

In this formula:

- 100 represents the total number of cents in a full semitone.
- 8192 represents the number of increments within the tuning range for one direction.
- The result of the formula is the value of each individual increment in cents.

## Message Values
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