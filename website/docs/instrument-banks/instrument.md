---
title: "Instrument"
---

# Instrument

## Structure
In *Ocarina of Time* and *Majora's Mask*, each channel-based instrument in an instrument bank is defined by an instrument structure. This structure stores all the parameters that control an instrument's in-game behavior, including its key regions, envelope, decay index, and audio samples.

```c
struct Instrument
{
    /* 0x00 */ unsigned char isRelocated;
    /* 0x01 */ unsigned char keyRegionLow;
    /* 0x02 */ unsigned char keyRegionHigh;
    /* 0x03 */ unsigned char decayIndex;
    /* 0x04 */ struct EnvelopePoint* envelope;

    struct LowRegionSample
    {
        /* 0x08 */ struct Sample* sample;
        /* 0x0B */ float noteSpeedMultiplier;
    }; // Size = 0x08

    struct PrimRegionSample
    {
        /* 0x10 */ struct Sample* sample;
        /* 0x14 */ float noteSpeedMultiplier;
    }; // Size = 0x08

    struct HighRegionSample
    {
        /* 0x18 */ struct Sample* sample;
        /* 0x1C */ float noteSpeedMultiplier;
    }; // Size = 0x08
}; // Size = 0x20
```

### Relocated
The `isRelocated` value indicates whether the instrument's audio samples are relocated. This value is a boolean flag. A value of zero (false) indicates the samples are in their original location. A value of one (true) indicates they have been relocated.

### Key Region Low
The `keyRegionLow` value defines the maximum key value for the low key region on the virtual MIDI keyboard. If this value is zero, the low key region is disabled and the audio sample assigned to the key region will not sound.

### Key Region High
The `keyRegionHigh` value defines the minimum key value for the high key region on the virtual MIDI keyboard. If this value is 127, the high key region is disabled and the audio sample assigned to the key region will not sound.

### Decay Index
The `decayIndex` value refers to an index in the ADSR decay table. The index's value determines the rate at which a note will decay during its release phase. The higher the decay index, the faster the note will fade out. The lower the decay index, the slower the note will fade out.

:::info[Decay Index in Other Games]

    While some Nintendo 64 games use the same audio system as *Ocarina of Time* and *Majora's Mask*, such as *Super Mario 64* and *Star Fox 64*, the behavior of the decay index may differ from how it works in *Ocarina of Time* and *Majora's Mask*.

:::

### Envelope Pointer
The `envelope` value is a pointer to an envelope point array in the instrument bank.

### Sound Structures
The sound structure represents one of the audio samples assigned to an instrument. Each instrument contains three distinct sound structures — one for each key region: low, primary, and high. The first sound structure corresponds to the low key region, second to the primary key region, and third to the high key region. Each sound structure contains a sample pointer and a note speed multiplier.

```c title="Sound Structure"
struct Sound
{
    /* 0x00 */ struct Sample* sample;
    /* 0x04 */ float noteSpeedMultiplier;
}; // Size = 0x08
```

#### Sample Pointer
The first value in the sound structure is a sample pointer. This value points to an audio sample contained in the instrument bank.

#### Note Speed Multiplier
The second value in the sound structure is the note speed multiplier. This floating-point value alters the speed assigned to each key in the sound structure's corresponding key region. A value greater than 1.0 increases the speed, raising the perceived pitch. A value lower than 1.0 decreases the speed, lowering the perceived pitch.