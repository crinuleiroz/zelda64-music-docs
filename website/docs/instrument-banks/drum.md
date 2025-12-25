---
title: "Drum"
---

# Drum

## Structure
In *Ocarina of Time* and *Majora's Mask*, each drum in a key-based instrument is defined by a drum structure. This structure stores all the parameters that control a drum's in-game behavior, including its decay index, panning, audio sample, and envelope.

```c
struct Drum
{
    /* 0x00 */ unsigned char decayIndex;
    /* 0x01 */ unsigned char pan;
    /* 0x02 */ unsigned char isRelocated;
    /* 0x03 */ char padding[1]; // Natural alignment padding

    struct DrumSample
    {
        /* 0x04 */ struct Sample* sample;
        /* 0x08 */ float noteSpeed;
    }; // Size = 0x08

    /*0x0C*/ struct EnvelopePoint* envelope;
}; // Size = 0x10
```

:::info[Padding Byte]

    The drum structure contains a padding byte between `isRelocated` and the `DrumSample` structure to ensure proper memory alignment on MIPS architecture. This is required because both the `DrumSample` structure and the `envelope` pointer include 4-byte value types, which must be aligned to 4-byte boundaries.

:::

### Decay Index
The `decayIndex` value refers to an index in the ADSR decay table. The index's value determines the rate at which a note will decay during its release phase. The higher the decay index, the faster the note will fade out. The lower the decay index, the slower the note will fade out.

:::info[Decay Index in Other Games]

    While some Nintendo 64 games use the same audio system as *Ocarina of Time* and *Majora's Mask*, such as *Super Mario 64* and *Star Fox 64*, the behavior of the decay index may differ from how it works in *Ocarina of Time* and *Majora's Mask*.

:::

### Pan
The `pan` value represents a drum's channel-independent panning. This value is applied to the audio sample when the ASEQ Pan Mix channel message in a sequence is set to zero.

### Relocated
The `isRelocated` value indicates whether the instrument's audio samples are relocated. This value is a boolean flag. A value of zero (false) indicates the samples are in their original location. A value of one (true) indicates they have been relocated.

### Sound Structure
The sound structure represents the audio sample assigned to a drum. Each drum contains a single sound structure. The sound structure contains a sample pointer and a note speed multiplier.

```c title="Sound Structure"
struct Sound
{
    /* 0x00 */ struct Sample* sample;
    /* 0x04 */ float noteSpeed;
};
```

#### Sample Pointer
The first value in the sound structure is a sample pointer. This value points to an audio sample contained in the instrument bank.

#### Note Speed
The second value in the sound structure is the note speed. This floating-point value determines the speed of the note for a drum's assigned key on the virtual MIDI keyboard. A value greater than 1.0 increases the speed, raising the perceived pitch. A value lower than 1.0 decreases the speed, lowering the perceived pitch.

### Envelope Pointer
The `envelope` value is a pointer to an envelope point array in the instrument bank.