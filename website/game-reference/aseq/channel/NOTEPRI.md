---
title: "NOTEPRI"
tags: []
---

<WorkInProgress />

# ASEQ Voice Priority

## Message Description
Sets the voice priority for notes in a sequence channel's note layers.

## Technical Details
<Stub />

## Message Format
The ASEQ Voice priority sequence message consists of two bytes, a status byte and a single data byte:

| Byte | Description |
| --- | --- |
| Status Byte | 0xE9 — corresponds to `ASEQ_OP_CHAN_NOTEPRI` |
| Data Byte | An unsigned bit-packed 8-bit integer |

### Bit-Packed Value Layout
The data byte is split into two 4-bit values, each representing a different voice priority:

| Bits | Field | Range |
| --- | --- | --- |
| 0–3 | `notePriority` | 0–15 |
| 4–7 | `someOtherPriority` | 0–15 |

If either value is non-zero, it updates the corresponding field in the sequence channel. If either value is zero, it defaults to the sequence channel's initial values:

| Field | Default Value |
| --- | --- |
| `notePriority` | 3 |
| `someOtherPriority` | 1 |

### Operation Implementation
The `ASEQ_OP_CHAN_NOTEPRI` (0xE9) opcode[^1]<sup>,</sup>[^2] unpacks the data byte and applies the voice priority to the designated sequence channel:

<Tabs>
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_CHAN_NOTEPRI:
        AudioSeq_SetChannelPriorities(channel, (unsigned char)cmdArgs[0]);
        break;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_CHAN_NOTEPRI:
        AudioScript_SetChannelPriorities(channel, (unsigned char)cmdArgs[0]);
        break;
    ```

    </TabItem>
</Tabs>

### Voice Priority Functions
The `AudioSeq_SetChannelPriorities` and `AudioScript_SetChannelPriorities` functions decode the ASEQ Voice Priority message's data byte and set the appropriate channel fields. The functions[^3]<sup>,</sup>[^4] are as follows:

<Tabs>
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    void AudioSeq_SetChannelPriorities(SequenceChannel* channel, unsigned char priority)
    {
        if ((priority & 0xF) != 0)
        {
            channel->notePriority = priority & 0xF;
        }

        priority = priority >> 4;
        if (priority != 0)
        {
            channel->someOtherPriority = priority;
        }
    }
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c linenums="0" title="seqplayer.c"
    void AudioScript_SetChannelPriorities(SequenceChannel* channel, unsigned char priority)
    {
        if ((priority & 0xF) != 0)
        {
            channel->notePriority = priority & 0xF;
        }

        priority = priority >> 4;
        if (priority != 0)
        {
            channel->someOtherPriority = priority;
        }
    }
    ```

    </TabItem>
</Tabs>

#### Function Variables
| Variable | Description |
| --- | --- |
| **channel** | A sequence channel |
| **priority** | An unsigned bit-packed 8-bit integer that represents the desired voice priority for notes in the sequence channel |

#### Example
To set `notePriority` to 15 and `someOtherPriority` to 4, the data byte must be set to `0x4F`.

Represented in binary, this is:
```linenums="0"
0x4F = 0b01001111
         ↑    ↑
         │    └── Lower 4 bits (0b1111) → notePriority = 15
         └────── Upper 4 bits (0b0100) → someOtherPriority = 4
```

The upper nibble (`0x4`) becomes `someOtherPriority` after a right shift (`priority >> 4`), while the lower nibble (`0xF`) becomes `notePriority` using a bitwise AND operation (`priority & 0xF`).

---

[^1]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L1627-L1629](https://github.com/zeldaret/oot/blob/892bddbccef94eeee66030415b929396a0c18efd/src/audio/internal/seqplayer.c#L1627-L1629)
[^2]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [seqplayer.c#L1573-L1575](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/seqplayer.c#L1573-L1575)
[^3]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L1187-L1196](https://github.com/zeldaret/oot/blob/892bddbccef94eeee66030415b929396a0c18efd/src/audio/internal/seqplayer.c#L1187-L1196)
[^4]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [seqplayer.c#L1135-L1144](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/seqplayer.c#L1135-L1144)