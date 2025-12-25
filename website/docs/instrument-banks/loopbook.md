---
title: "Loopbook"
tags: [ "VADPCM" ]
---

# Loopbook

## Structure
In *Ocarina of Time* and *Majora's Mask*, an audio sample's in-game looping behavior is defined by a loopbook structure. This structure stores all the parameters that control the sample's loop, including the loop start and end points, loop count, total number of samples, and optional prediction coefficients.

```c
struct Loopbook
{
    struct Header
    {
        /* 0x00 */ unsigned long start;
        /* 0x04 */ unsigned long end;
        /* 0x08 */ unsigned long count;
        /* 0x0C */ unsigned long numSamples;
    }; // Size = 0x10

    /* 0x10 */ signed short int predictors[16];
} // Size = 0x10 or 0x30
```

### Loop Start
The `start` value represents the offset, in samples, to the start point of the loop within the audio sample. This is where the loop begins each time it restarts.

### Loop End
The `end` value represents the offset, in samples, to the end point of the loop within the audio sample. This is where the loop will end. If the loop count is not zero, then the loop restarts from the start point.

### Loop Count
The `count`  value represents the total number of times the audio sample loops. A value of zero will play the sample once, then stop. A value of 65535 (0xFFFFFFFF) will loop the sample indefinitely, from the start point to the end point of the loop.

### Number of Samples
The `numSamples` value represents the total sample count in the audio sample. If the `start` value is zero, the `end` value defines the total sample count instead.

### VADPCM Prediction Coefficients
The `predictors` array contains pre-calculated VADPCM predictor coefficients. The array consists of 16 values. The audio engine uses these coefficients to decode and reconstruct an audio sample. The coefficients determine the influence each previous sample has on the prediction.

The predictor array in the loopbook structure exists only if both the `start` and `count` are not equal to zero. The coefficients in this array ensure there is a smooth transition between the start and end of the loop.