---
title: "Tuning"
tags: []
---

# Audio Sample Tuning

## Types of Tuning
In *Ocarina of Time* and *Majora's Mask* there are two different types of tuning:

- Channel-based tuning
- Key-based tuning

All channel-based instruments use channel-based tuning, while all key-based instruments use key-based tuning.

### Channel-Based Tuning
Channel-based instruments apply channel-based tuning to all audio samples assigned to the instrument. As a result, the tuning value of each audio sample represents a note speed multiplier. This multiplier alters the note speed for each key in the corresponding key region. This ensures the audio sample sounds at the correct pitch when a note plays in its corresponding key region.

The value required to correct the pitch of an audio sample is dependent on its root key. If the sample's root key is higher than the root key for the key region, then the multiplier must be less than the note speed of the key region's root key. The opposite is also true. If the sample's root key is lower than the root key for the key region, then the multiplier must be greater than the note speed of the key region's root key.

#### Sequence Player Code
Below is the sequence player code[^1]<sup>,</sup>[^2] that applies the note speed multiplier to the corresponding note:

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation" default>

    ```c title="seqplayer.c" {6}
    if (instrument != NULL)
    {
        tunedSample = Audio_GetInstrumentTunedSample(instrument, semitone);
        sameTunedSample = (tunedSample == layer->tunedSample);
        layer->tunedSample = tunedSample;
        layer->freqScale = gPitchFrequencies[semitone2] * tunedSample->tuning;
    }
    else
    {
        layer->tunedSample = NULL;
        layer->freqScale = gPitchFrequencies[semitone2];
        if (instOrWave >= 0xC0)
        {
            layer->tunedSample = &gAudioCtx.synthesisReverbs[instOrWave - 0xC0].tunedSample;
        }
    }
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c" {6}
    if (instrument != NULL)
    {
        tunedSample = AudioPlayback_GetInstrumentTunedSample(instrument, semitone);
        sameTunedSample = (tunedSample == layer->tunedSample);
        layer->tunedSample = tunedSample;
        layer->freqScale = gPitchFrequencies[semitone2] * tunedSample->tuning;
    } else {
        layer->tunedSample = NULL;
        layer->freqScale = gPitchFrequencies[semitone2];
        if (instOrWave >= 0xC0)
        {
            layer->tunedSample = &gAudioCtx.synthesisReverbs[instOrWave - 0xC0].tunedSample;
        }
    }
    ```

    </TabItem>
</Tabs>

### Key-Based Tuning
Key-based instruments apply key-based tuning to the audio sample assigned to the instrument. As a result, the tuning value of the audio sample represents note speed. This note speed determines how much the sample's pitch should be adjusted relative to its root key in order to match the desired pitch.

The value required to set the pitch of an audio sample is dependent on its root key. If the desired pitch is higher than the sample's root key, then the note speed must be greater than one. The opposite is also true. If the desired pitch is lower than the sample's root key, then the note speed must be less than one. A value of one sets the pitch to the pitch of the sample's root key.

#### Sequence Player Code
Below is the sequence player code[^3]<sup>,</sup>[^4] that sets the note speed for the corresponding note:


<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation" default>

    ```c title="seqplayer.c" {18}
    drum = Audio_GetDrum(channel->fontId, semitone);
    if (drum == NULL)
    {
        layer->muted = true;
        layer->delay2 = layer->delay;
        return PROCESS_SCRIPT_END;
    }

    tunedSample = &drum->tunedSample;
    layer->adsr.envelope = drum->envelope;
    layer->adsr.decayIndex = drum->adsrDecayIndex;
    if (!layer->ignoreDrumPan)
    {
        layer->pan = drum->pan;
    }

    layer->tunedSample = tunedSample;
    layer->freqScale = tunedSample->tuning;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c" {18}
    drum = AudioPlayback_GetDrum(channel->fontId, semitone);
    if (drum == NULL)
    {
        layer->muted = true;
        layer->delay2 = layer->delay;
        return PROCESS_SCRIPT_END;
    }

    tunedSample = &drum->tunedSample;
    layer->adsr.envelope = drum->envelope;
    layer->adsr.decayIndex = drum->adsrDecayIndex;
    if (!layer->ignoreDrumPan)
    {
        layer->pan = drum->pan;
    }

    layer->tunedSample = tunedSample;
    layer->freqScale = tunedSample->tuning;
    ```

    </TabItem>
</Tabs>

## Tuning Calculation
Since there are two types of tuning values, there are also two tuning formulas to calculate the correct tuning value for the correct tuning type. One for channel-based tuning, and the other for key-based tuning.

### Channel-based Tuning Formula
To calculate the tuning value required for an audio sample assigned to a channel-based instrument, use the following formula:

$$
\text{Tuning Value} = 2^{\displaystyle \frac{(\text{Root} + \text{Coarse} + 0.01\text{Fine}) - 60}{-12}} \times (\displaystyle \frac{\text{Sample Rate}}{32000})
$$

<h4>Formula Variables</h4>
This table outlines the variables used in the channel-based tuning formula to determine the note speed multiplier — or pitch correction — to use as the tuning value:

| Variable | Description |
| --- | --- |
| **Root** | The root key of the audio sample. |
| **Coarse** | The pitch adjustment in semitones. |
| **Fine** | The pitch adjustment in cents. |
| **Sample Rate** | The sample rate of the audio sample. |

:::info[Using the Formula]

    This formula is used to correct the pitch of an audio sample. This ensures the sample plays at the expected pitch for every key in the corresponding key region.

:::

### Key-based Tuning Formula
To calculate the tuning value required for an audio sample assigned to a key-based instrument, use the following formula:

$$
\text{Tuning Value} = 2^{\displaystyle \frac{\text{Coarse} + 0.01\text{Fine}}{-12}} \times (\displaystyle \frac{\text{Sample Rate}}{32000})
$$

<h4>Formula Variables</h4>
This table outlines the variables used in the key-based tuning formula to determine the note speed to use as the tuning value:

| Variable | Description |
| --- | --- |
| **Coarse** | The pitch adjustment in semitones. |
| **Fine** | The pitch adjustment in cents. |
| **Sample Rate** | The sample rate of the audio sample. |

:::info[Using the Forumla]

    This formula is used to find the desired pitch an audio sample should play at. If the desired pitch is the sample's root key, then the value should be left as `1.0`.

:::

### Sample Rate Correction
All Nintendo 64 games use a hardware playback rate — also known as the master sample rate. The hardware playback rate determines the number of samples per second generated by the synthesizer. *Ocarina of Time* and *Majora's Mask* both operate with a hardware playback rate of 32000 Hz. As a result, all in-game audio samples play at this rate, regardless of their original sample rate. This affects the playback speed of audio samples with a different sample rate than the hardware playback rate. A sample rate higher than the hardware playback rate will slow the playback speed, while a lower sample rate will have the opposite effect.

A visual representation of this principle is shown in the images below. In these examples, every audio sample is assumed to be identical except for its sample rate.

<Tabs>
    <TabItem value="16000-hz" label="16000 Hertz">

    ![](/img/samples/waveform-16000hz-light.png#gh-light-mode-only)
    ![](/img/samples/waveform-16000hz-dark.png#gh-dark-mode-only)
    A 16000 Hz audio sample — half the hardware playback rate — tuned without sample rate correction will play at twice the speed, causing its perceived pitch to be higher than intended.

    </TabItem>

    <TabItem value="32000-hz" label="32000 Hertz" default>

    ![](/img/samples/waveform-32000hz-light.png#gh-light-mode-only)
    ![](/img/samples/waveform-32000hz-dark.png#gh-dark-mode-only)
    A 32000 Hz audio sample — matching the hardware playback rate — tuned without sample rate correction will play at the correct speed, with no change in perceived pitch.

    </TabItem>

    <TabItem value="64000-hz" label="64000 Hertz">

    ![](/img/samples/waveform-64000hz-light.png#gh-light-mode-only)
    ![](/img/samples/waveform-64000hz-dark.png#gh-dark-mode-only)
    A 64000 Hz audio sample — twice the hardware playback rate — tuned without sample rate correction will play at half the speed, causing its perceived pitch to be lower than intended.

    </TabItem>
</Tabs>

The reason this occurs is because of the difference in samples per second between the sample rate and the hardware playback rate. The less samples there are to process, the faster the sample will be processed by the audio engine. The more samples there are to process, the slower the sample will be processed by the audio engine. To correct this, a sample rate correction value is applied to the tuning formula. This correction value ensures the audio sample has the correct playback rate without needing to resample it.

#### Sample Rate Correction Formula
The sample rate correction is applied to the tuning formula in one of two ways:

1. $\text{Corrected Tuning Value} = \text{Tuning Value} \times \displaystyle (\frac{\text{Sample Rate}}{32000})$

    - The first way is to use multiplication. With this formula, the sample rate is the numerator, while the hardware rate is the denominator.

2. $\text{Corrected Tuning Value} = \text{Tuning Value} \div \displaystyle (\frac{32000}{\text{Sample Rate}})$

    - The second way is to use division. With this formula, the hardware rate is the numerator, while the sample rate is the denominator.

:::info

    Sample rate correction is always applied to the tuning value after it has been calculated without sample rate correction.

:::

[^1]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot/tree/main), [seqplayer.c#L948-L959](https://github.com/zeldaret/oot/blob/0c5282ba66bec5eba8f11fa5922b893b1deed7e7/src/audio/lib/seqplayer.c#L948-L959)

[^2]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm/tree/main), [seqplayer.c#L968-L979](https://github.com/zeldaret/mm/blob/03f12527e178143bb0f1e3bd41ec748476c77999/src/audio/lib/seqplayer.c#L968-L979)

[^3]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot/tree/main), [seqplayer.c#L832-L847](https://github.com/zeldaret/oot/blob/0c5282ba66bec5eba8f11fa5922b893b1deed7e7/src/audio/lib/seqplayer.c#L832-L847)

[^4]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm/tree/main), [seqplayer.c#L851-L867](https://github.com/zeldaret/mm/blob/03f12527e178143bb0f1e3bd41ec748476c77999/src/audio/lib/seqplayer.c#L851-L867)