---
title: "Types"
---

# Instrument Types

## Available Types
In *Ocarina of Time* and *Majora's Mask*, there are two types of instruments available in instrument banks:

- Channel-based instruments
- Key-based instruments

Instrument banks contain two key-based instruments and up to 254 channel-based instruments. This makes channel-based instruments the most used instrument type in music. Below are the details of the two types of instruments.

## Channel-Based Instruments
Channel-based instruments — often called "instruments" — assign three audio samples to three distinct key regions of the virtual MIDI keyboard. The size of each key region depends on two values in the instrument's data. The first value determines the size of the first key region, while the second value determines the size of the third key region. Any remaining keys between the first and third key regions are assigned to the second key region. Samples are assigned to every key in their specified key region.

### Special Channel-Based Instruments
In *Ocarina of Time* and *Majora's Mask*, there exists a set of special channel-based instruments. These instruments are often called "synth wave", "wave", "waveform", or "chiptune" instruments. The audio sample data for these instruments exists outside of any in-game instrument bank. As a result, these instruments are available at all times, regardless of the instrument bank used by a sequence file.

:::info[Wave Instruments]

More detailed information on these instruments and how to assign them to a sequence channel in a sequence can be found on [this page](#).

:::

## Key-Based Instruments
Key-based instruments — often called "drums" or "sound effects" — assign audio samples to individual keys within a specified range on the virtual MIDI keyboard. Like channel-based instruments, key-based instruments are assigned to sequence channels. However, their name comes from the way they handle audio samples. Unlike channel-based instruments, key-based instruments use a single key region. Each sample is assigned to a corresponding key in this region.

### Key Range
The range of keys in this region spans from key 21 to key 21 plus the number of drums, minus one:

$$
21+(n-1)
$$

For example, if $n=64$, the range spans from key 21 to key 84.