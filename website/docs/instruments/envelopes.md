---
title: "Envelopes"
tag: ["ADSR"]
---

# Envelopes

## Standard ADSR Envelopes
<Stub />

![](/img/adsr/adsr-light.png#gh-light-mode-only)
![](/img/adsr/adsr-dark.png#gh-dark-mode-only)

### Envelope Phases

<Tabs>
    <TabItem value="attack" label="Attack" default>

    ![](/img/adsr/adsr-attack-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-attack-dark.png#gh-dark-mode-only)
    <span style={{color: '#f9635d'}}><b>Attack</b></span> refers to the time it takes for the amplitude of an audio sample to increase from zero to the maximum level after initiating a note. A higher attack value results in a slower fade-in, while a lower attack value results in a faster fade-in.

    </TabItem>

    <TabItem value="decay" label="Decay">

    ![](/img/adsr/adsr-decay-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-decay-dark.png#gh-dark-mode-only)
    <span style={{color: '#f1bb3c'}}><b>Decay</b></span> refers to the time it takes for the amplitude of an audio sample to decrease from the attack level to the sustain level when a note enters its decay phase. A higher decay value results in a slower decrease, while a lower decay value results in a faster decrease.

    </TabItem>

    <TabItem value="sustain" label="Sustain">

    ![](/img/adsr/adsr-sustain-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-sustain-dark.png#gh-dark-mode-only)
    <span style={{color: '#5fd093'}}><b>Sustain</b></span> refers to the amplitude an audio sample will maintain until a note enters its release phase. The higher the sustain level, the less the amplitude will decrease from the attack level.

    </TabItem>

    <TabItem value="release" label="Release">

    ![](/img/adsr/adsr-release-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-release-dark.png#gh-dark-mode-only)
    <span style={{color: '#ae5eeb'}}><b>Release</b></span> refers to the time it takes for the amplitude of an audio sample to decrease from the sustain level to zero when a note enters its release phase. A higher release value results in a slower fade-out, while a lower release value results in a faster fade-out.

    </TabItem>

    <TabItem value="hold" label="Hold">

    ![](/img/adsr/adsr-hold-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-hold-dark.png#gh-dark-mode-only)
    <span style={{color: '#3cc0f1'}}><b>Hold</b></span> refers to the time an audio sample remains at the amplitude of the attack level before a note enters the decay phase. The longer the hold value, the longer the audio sample maintains the attack level.

    </TabItem>
</Tabs>

## In Ocarina of Time and Majora's Mask
In *Ocarina of Time* and *Majora's Mask*, the envelopes used by instruments are non-standard multi-point envelope arrays with an indefinite length. An envelope will continue processing until a note enters its release phase or it processes an envelope command. Each point in an envelope array contains two values:

1. A time or envelope command
2. A level or command argument

Each point represents a phase in the envelope's progression. A new phase begins as soon as the previous phase ends. There are three possible phases a point can represent:

- **Increase level phase**: increases the level from its current value
- **Maintain level phase**: maintains the level at its current value
- **Decrease level phase**: decreases the level from its current value

The first point of an envelope always represents the increase phase, which increases the level from zero to the specified value. If the level's current value is at the maximum possible value, the envelope can only enter the maintain and decrease phases. Likewise, if the level's current value is at the minimum possible value, the envelope can only enter the maintain and increase phases.

:::info[About ADSR]

    While the envelopes in *Ocarina of Time* and *Majora's Mask* are non-standard, they still function as ADSR envelopes. ADSR originally stood for attack, decay, sustain, and release, but over time, the term has evolved. It is now used as a general term that can refer to any envelope, regardless of the number or types of phases it contains. Therefore, referring to the envelopes in *Ocarina of Time* and *Majora's Mask* as ADSR is appropriate. In the same vein, the terms attack, decay, and sustain are simply alternate names for the phases of increasing, maintaining, and decreasing amplitude.

:::

### Envelope Phases
The flowchart below outlines the progression of an envelope. It starts with the initial increase phase, followed by two additional phases with all three possible options. The flow then breaks when the note enters its release phase.

![](/img/adsr/adsr-flowchart-light.png#gh-light-mode-only)
![](/img/adsr/adsr-flowchart-dark.png#gh-dark-mode-only)

The most standard envelope in *Ocarina of Time* and *Majora's Mask*, commonly referred to as the "General Use" envelope, follows a standard AHDSR pattern for each phase:

```c title="General Use Envelope"
struct EnvelopePoint
{
    /* 0x00 */ signed short int timeOrOpcode;
    /* 0x02 */ signed short int ampOrIndex;
}; // Size = 0x04

struct EnvelopePoint generalUseEnvelope[] =
{
    { 2, 32700 },     // Attack phase
    { 1, 32700 },     // Hold phase
    { 32700, 29430 }, // Decay phase
    { ADSR_HANG, 0 }, // Sustain phase
};
```

As stated earlier, the initial phase is always an increase phase. In the example envelope:

- In the increase level phase, the amplitude increases from zero to 32700 over 2 units of envelope time. After reaching the level specified, the envelope enters the next phase: the maintain level phase.
- In the maintain level phase, the envelope maintains the level at 32700 for 1 unit of envelope time. After the specified time has passed, the envelope enters the next phase: the decrease level phase.
- In the decrease level phase, the level decreases from 32700 to 29430 over 32700 units of envelope time. After reaching the level specified, the envelope enters the next phase: the `ADSR_HANG` command.
- `ADSR_HANG` is an envelope command that pauses envelope processing. The envelope will maintain the level at 29430 indefinitely until the audio sample enters the release phase.

It is important to note that the release phase can be initiated at any point during envelope processing. When the release phase triggers, the envelope immediately decreases from the current level to zero over the time specified by the decay index. This index corresponds to one of the values in the ADSR decay table.

### Sequence Embedded Envelopes
In *Ocarina of Time* and *Majora's Mask*, envelopes are not only stored in instrument banks, they can also be embedded in sequence files. The ASEQ Change Envelope message can only change the envelope to one embedded in a sequence file.

:::warning[Envelope Alignment]

    Envelopes embedded in sequences must be aligned to 2-byte boundaries because 16-bit values cannot begin at odd-numbered addresses in MIPS. This means the initial point of the array must align with a byte whose value ends in one of the following nibbles: 0x0, 0x2, 0x4, 0x6, 0x8, 0xA, 0xC, or 0xE. If the envelope is not aligned correctly, it can cause the audio engine to crash. If the audio engine does not crash, the audio sample will remain silent.

:::

## ADSR Decay Table
The decay table in *Ocarina of Time* and *Majora's Mask* is initialized with the audio heap. Each index in the decay table corresponds to a specific fade-out velocity, which is calculated using the `AudioHeap_CalculateAdsrDecay` function. The fade-out velocity determines how fast an audio sample will decrease in amplitude once a note enters its release phase.

Below is the audio heap code[^1]<sup>,</sup>[^2] that initializes the ADSR decay table:

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation" default>

    ```c title="heap.c"
    void AudioHeap_InitAdsrDecayTable(void)
    {
        signed long i;

        gAudioCtx.adsrDecayTable[255] = AudioHeap_CalculateAdsrDecay(0.25f);
        gAudioCtx.adsrDecayTable[254] = AudioHeap_CalculateAdsrDecay(0.33f);
        gAudioCtx.adsrDecayTable[253] = AudioHeap_CalculateAdsrDecay(0.5f);
        gAudioCtx.adsrDecayTable[252] = AudioHeap_CalculateAdsrDecay(0.66f);
        gAudioCtx.adsrDecayTable[251] = AudioHeap_CalculateAdsrDecay(0.75f);

        for (i = 128; i < 251; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(251 - i);
        }

        for (i = 16; i < 128; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(4 * (143 - i));
        }

        for (i = 1; i < 16; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(60 * (23 - i));
        }

        gAudioCtx.adsrDecayTable[0] = 0.0f;
    }
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="heap.c"
    void AudioHeap_InitAdsrDecayTable(void)
    {
        signed long i;

        gAudioCtx.adsrDecayTable[255] = AudioHeap_CalculateAdsrDecay(0.25f);
        gAudioCtx.adsrDecayTable[254] = AudioHeap_CalculateAdsrDecay(0.33f);
        gAudioCtx.adsrDecayTable[253] = AudioHeap_CalculateAdsrDecay(0.5f);
        gAudioCtx.adsrDecayTable[252] = AudioHeap_CalculateAdsrDecay(0.66f);
        gAudioCtx.adsrDecayTable[251] = AudioHeap_CalculateAdsrDecay(0.75f);

        for (i = 128; i < 251; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(251 - i);
        }

        for (i = 16; i < 128; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(4 * (143 - i));
        }

        for (i = 1; i < 16; i++)
        {
            gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(60 * (23 - i));
        }

        gAudioCtx.adsrDecayTable[0] = 0.0f;
    }
    ```

    </TabItem>
</Tabs>

### Populating the Decay Table
When the audio heap is initialized, the ADSR decay table calculates the fade-out velocity for every index ranging from zero to 255.

#### Indices 251 to 255
Entries 251 to 255 are predefined with specific decay factors:

- Index `251` has a decay factor of `0.75f`
- Index `252` has a decay factor of `0.66f`
- Index `253` has a decay factor of `0.5f`
- Index `254` has a decay factor of `0.33f`
- Index `255` has a decay factor of `0.25f`

#### Indices 128 to 250
For indices 128 to 250, the decay factor is calculated by subtracting the index from `251`. The result is passed to `AudioHeap_CalculateAdsrDecay` to determine the fade-out velocity:

```c
gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(251 - i);
```

#### Indices 16 to 127
For indices 16 to 127, the decay factors are calculated with a larger scaling of $4 * (143 - i)$:

```c
gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(4 * (143 - i));
```

#### Indices 1 to 15
For indices 1 to 15, the decay factors are calculated using an even larger scaling of $60 * (23 - i)$:

```c
gAudioCtx.adsrDecayTable[i] = AudioHeap_CalculateAdsrDecay(60 * (23 - i));
```

#### Index 0
The entry for index `0` is explicitly set to a decay factor of `0.0f`:

```c
gAudioCtx.adsrDecayTable[0] = 0.0f;
```

This represents a special case where a note bypasses its release phase. Because a note will bypass its release phase, the audio sample will continue its playback indefinitely. However, the sample will end its playback once the voice limit is reached, or the released note is removed from the note pool.

### Decay Calculation
The function that calculates decay times in the table is `AudioHeap_CalculateAdsrDecay`. This function calculates the fade-out velocity based on the updates per frame inversed. The function[^3]<sup>,</sup>[^4] is as follows:

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation" default>

    ```c title="heap.c"
    float AudioHeap_CalculateAdsrDecay(float scaleInv)
    {
        // ticksPerUpdateInvScaled is 0.001302 for NTSC
        return 256.0f * gAudioCtx.audioBufferParameters.ticksPerUpdateInvScaled / scaleInv;
    }
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c linenums="0" title="heap.c"
    float AudioHeap_CalculateAdsrDecay(float scaleInv)
    {
        // updatesPerFramInvScaled is 0.001302 for NTSC
        return 256.0f * gAudioCtx.audioBufferParameters.updatesPerFrameInvScaled / scaleInv;
    }
    ```

    </TabItem>
</Tabs>

#### Function Variables
This table outlines the variables used by the function to determine the fade-out valocity value to be returned:

| Variable | Description |
| --- | --- |
| **scaleInv** | A scaling factor that inversely affects the decay time. Smaller values result in longer decay times, while larger values result in shorter decay times. |
| **updatesPerFrameInvScaled** | The inverse number of audio updates per frame, scaled to adjust for the frame rate the game runs at. |

The result is a decay time that is proportional to the provided `scaleInv` value. Smaller values of `scaleInv` result in longer decay times, while larger values result in shorter decay times.

### Decay Table Graph
The following line graph illustrates how the fade-out velocity changes as the decay index increases. The truncated graph provides a more detailed view of the lower values, while the full graph provides the entire range of values. Both graphs only plot values for the NTSC versions of *Ocarina of Time* and *Majora's Mask*.

<Tabs>
    <TabItem value="truncated" label="Truncated Table" default>

    ![](/img/adsr/adsr-decay-table-chart-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-decay-table-chart-dark.png#gh-dark-mode-only)
    This graph illustrates the exponential increase in fade-out velocity relative to the decay index. It is truncated to provide a detailed view of the lower range of values.

    </TabItem>

    <TabItem value="full" label="Full Table">

    ![](/img/adsr/adsr-decay-table-chart-full-light.png#gh-light-mode-only)
    ![](/img/adsr/adsr-decay-table-chart-full-dark.png#gh-dark-mode-only)
    This graph illustrates the exponential increase in fade-out velocity relative to the decay index. It displays the full range of values. Because of the large increase at higher values, the lower range appears almost linear.

    </TabItem>
</Tabs>

{/* Find better place for this */}
{/* ## Rate Calculation
The rate at which the level reaches its target is calculated automatically. When the first value of an envelope point represents time, it does not represent a rate of change. A rate measures change over time, but as explained earlier, the first value of an envelope point represents a value of time. In this case, the rate (`adsr->velocity`) is the change in level over time.

The calculation is as follows:

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation" default>

    ```c title="effects.c"
    default:
        adsr->timeOrOpcode *= gAudioCtx.audioBufferParameters.ticksPerUpdateScaled;
        if (adsr->timeOrOpcode == 0)
        {
            adsr->timeOrOpcode = 1;
        }
        adsr->target = adsr->envelope[adsr->envIndex].levelOrArg / 32767.0f;
        adsr->target = SQ(adsr->target);
        adsr->velocity = (adsr->target - adsr->current) / adsr->timeOrOpcode;
        adsr->action.s.state = ADSR_STATE_FADE;
        adsr->envIndex++;
        break;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c linenums="0" title="effects.c"
    default:
        adsr->timeOrOpcode *= gAudioCtx.audioBufferParameters.updatePerFrameScaled;
        if (adsr->timeOrOpcode == 0)
        {
            adsr->timeOrOpcode = 1;
        }
        adsr->target = adsr->envelope[adsr->envelopeIndex].levelOrArg / 32767.0f;
        adsr->target = SQ(adsr->target);
        adsr->velocity = (adsr->target - adsr->current) / adsr->timeOrOpcode;
        adsr->action.s.status = ADSR_STATUS_FADE;
        adsr->envelopeIndex++;
        break;
    ```

    </TabItem>
</Tabs> */}

[^1]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot/tree/main), [heap.c#L24-L46](https://github.com/zeldaret/oot/blob/0c5282ba66bec5eba8f11fa5922b893b1deed7e7/src/audio/lib/heap.c#L24-L46)
[^2]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm/tree/main), [heap.c#L31-L53](https://github.com/zeldaret/mm/blob/03f12527e178143bb0f1e3bd41ec748476c77999/src/audio/lib/heap.c#L31-L53)
[^3]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot/tree/main), [heap.c#L17-L19](https://github.com/zeldaret/oot/blob/0c5282ba66bec5eba8f11fa5922b893b1deed7e7/src/audio/lib/heap.c#L17-L19)
[^4]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm/tree/main), [heap.c#L24-L26](https://github.com/zeldaret/mm/blob/03f12527e178143bb0f1e3bd41ec748476c77999/src/audio/lib/heap.c#L24-L26)