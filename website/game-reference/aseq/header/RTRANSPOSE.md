---
title: "RTRANSPOSE"
tags: []
---

<WorkInProgress />

# ASEQ_OP_SEQ_RTRANSPOSE

## Message Description
<Stub />

## Technical Details
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot-decomp" label="Ocarina of Time Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_SEQ_RTRANSPOSE:
        seqPlayer->transposition += (signed char)AudioSeq_ScriptReadU8(seqScript);
        break;
    ```

    </TabItem>

    <TabItem value="mm-decomp" label="Majora's Mask Decompilation">

    ```c title="seqplayer.c"
    case ASEQ_OP_SEQ_RTRANSPOSE:
        seqPlayer->transposition += (signed char)AudioScript_ScriptReadU8(seqScript);
        break;
    ```

    </TabItem>
</Tabs>