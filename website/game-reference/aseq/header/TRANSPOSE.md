---
title: "TRANSPOSE"
tags: []
---

<WorkInProgress />

# ASEQ Master Coarse-Tune

## Message Description
<Stub />

## Technical Details
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_SEQ_TRANSPOSE:
        seqPlayer->transposition = 0;
        FALLTHROUGH;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_SEQ_TRANSPOSE:
        seqPlayer->transposition = 0;
        FALLTHROUGH;
    ```

    </TabItem>
</Tabs>