---
title: "Codebook"
tags: ["VADPCM"]
---


# Codebook

## Structure
In *Ocarina of Time* and *Majora's Mask*, each sample's VADPCM decoding is defined by a codebook structure. This structure stores all the parameters that control the sample's decoding, including the order, number of predictors, and prediction coefficients.

```c
struct Codebook
{
    struct Header
    {
        /* 0x00 */ signed long order;
        /* 0x04 */ signed long numPredictors;
    }; // Size = 0x08

    /* 0x08 */ signed short int predictors[1];
}; // Size = sizeof(Header) + (0x08 * order * numPredictors)
```

### Order
The `order` value represents the number of previous samples the audio engine uses to predict the next sample in the audio stream.

### Number of Predictors
The `numPredictors` value represents the number of predictor arrays in the codebook structure.

### VADPCM Prediction Coefficients
The `predictors` array contains pre-calculated VADPCM predictor coefficients. This array consists of 16 values for each predictor. The audio engine uses these coefficients to decode and reconstruct an audio sample. The `order` value defines how many previously decoded samples the audio engine uses to predict the next sample to decode. The coefficients determine the influence of each previous sample on the prediction.