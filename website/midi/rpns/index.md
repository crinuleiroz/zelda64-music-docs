---
title: "RPNs"
tags: [ "RPNs", "MIDI", ]
---

# Registered Parameter Numbers

:::danger[SEQ64 Support]

    SEQ64 does not support RPNs directly. However, understanding their functions can still benefit creators, ensuring their sequences are accurate.

:::

## About
MIDI Registered Parameter Numbers (RPNs) are a set of MIDI Control Change messages that control specific sound parameters. Unlike standard MIDI Control Change messages, RPNs adjust parameters like pitch bend sensitivity, channel coarse-tuning, and other advanced settings.

## Using RPNs
To use an RPN, the following message pairs must be sent to a MIDI channel:

- MIDI CC#100 and CC#101: This message pair indicates the parameter to adjust.
- MIDI CC#006 and CC#038: This message pair sets the value for the chosen parameter.

The order of the messages within a pair does not matter. However, each message pair must be sent in sequence: first the RPN selector, then the Data Entry messages.

:::tip[Preventing Parameter Modification]

    To prevent modifying RPNs, an RPN Null message pair can be sent to a MIDI channel. The RPN Null message pair represents MIDI CC#100 and CC#101 set to a value of 127. This locks the current parameter's setting and prevents modification of the current RPN until it is reset.

:::

## Available RPNs

<DocCardList />