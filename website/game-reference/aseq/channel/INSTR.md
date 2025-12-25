---
title: "INSTR"
tags: []
---

<WorkInProgress />

# ASEQ Assign Instrument

## Message Description
<Stub />
Assigns an instrument with the desired ID to the sequence channel and its note layers.

## Technical Details
<Stub />

Instrument IDs 0x00–0x7D and 0x80–0xFF assign a channel-based instrument from the currently selected instrument bank's channel-based instruments.

:::info

    For instrument IDs above 0x7F, channel-based instruments in the instrument bank will be prioritized over the synthetic wave instruments.

:::

Instrument IDs 0x7E and 0x7F assign a key-based instrument from the currently selected instrument bank's key-based instrument. Instrument ID 0x7E loads sound effects, and instrument ID 0x7F loads drums.

### Operation Implementation
<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_CHAN_INSTR:
        cmd = (unsigned char)cmdArgs[0];
        AudioSeq_SetInstrument(channel, cmd);
        break;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_CHAN_INSTR:
        cmd = (unsigned char)cmdArgs[0];
        AudioScript_SetInstrument(channel, cmd);
        break;
    ```

    </TabItem>
</Tabs>

### Set Instrument Function
<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    void AudioSeq_SetInstrument(SequenceChannel* channel, unsigned char instId)
    {
        if (instId >= 0x80) // Synthetic Waves
        {
            channel->instOrWave = instId;
            channel->instrument = NULL;
        }
        else if (instId == 0x7F) // Drums
        {
            channel->instOrWave = 0;
            channel->instrument = (Instrument*)1;
        }
        else if (instId == 0x7E) // Effects
        {
            channel->instOrWave = 1;
            channel->instrument = (Instrument*)2;
        }
        else // Instruments
        {
            if (
              (channel->instOrWave = AudioSeq_GetInstrument(channel, instId, &channel->instrument, &channel->adsr)) == 0
            )
            {
                channel->hasInstrument = false;
                return;
            }
        }

        channel->hasInstrument = true;
    }
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    void AudioScript_SetInstrument(SequenceChannel* channel, unsigned char instId)
    {
        if (instId >= 0x80) // Synthetic Waves
        {
            channel->instOrWave = instId;
            channel->instrument = NULL;
        }
        else if (instId == 0x7F) // Drums
        {
            channel->instOrWave = 0;
            channel->instrument = (Instrument*)1;
        }
        else if (instId == 0x7E) // Effects
        {
            channel->instOrWave = 1;
            channel->instrument = (Instrument*)2;
        }
        else // Instruments
        {
            if (
              (channel->instOrWave = AudioScript_GetInstrument(channel, instId, &channel->instrument, &channel->adsr)) == 0
            )
            {
                channel->hasInstrument = false;
                return;
            }
        }

        channel->hasInstrument = true;
    }
    ```

    </TabItem>
</Tabs>