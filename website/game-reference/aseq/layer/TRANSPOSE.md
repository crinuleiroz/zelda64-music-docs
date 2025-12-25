---
title: "TRANSPOSE"
tags: []
---

<WorkInProgress />

# ASEQ Coarse-Tune

## Message Description
<Stub />

Increases or decreases the pitch of every note in the specified layer by $n$ semitones.

## Technical Details
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_LAYER_SHORTGATE:
    case ASEQ_OP_LAYER_TRANSPOSE:
        cmgArg8 = *(state->pc++)
        if (cmd == ASEQ_OP_LAYER_SHORTGATE)
        {
            layer->gatetime = cmdArg8;
        }
        else
        {
            layer->transposition = cmdArg8;
        }
        break;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_LAYER_SHORTGATE:
    case ASEQ_OP_LAYER_TRANSPOSE:
        cmgArg8 = *(state->pc++)
        if (cmd == ASEQ_OP_LAYER_SHORTGATE)
        {
            layer->gatetime = cmdArg8;
        }
        else
        {
            layer->transposition = cmdArg8;
        }
        break;
    ```

    </TabItem>
</Tabs>