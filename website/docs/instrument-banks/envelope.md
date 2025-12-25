---
title: "Envelope"
tags: ["ADSR"]
---

# Envelope

## Structure
In *Ocarina of Time* and *Majora's Mask*, each envelope in an instrument bank is defined as an array of envelope points. Each point stores a pair of 16-bit signed integer values that control the envelope's progression, including target amplitude or jump indices, and the timing or special opcode for the point. While envelopes behave similarly to traditional ADSR envelopes, their implementation is unique to these games.

:::info[Array Size]

    There is no defined maximum size for an envelope array. Envelopes will process points until they reach a command to execute or the note begins its release phase.

:::

```c
struct EnvelopePoint
{
    /* 0x00 */ signed short int timeOrOpcode;
    /* 0x02 */ signed short int ampOrIndex;
}; // Size = 0x04
```

## Time or Opcode
The first value of the envelope point is the time or envelope opcode.

If this value is greater than or equal to one, it represents time. When the value represents time, it represents the total time required to go from the previous point's level value to the current point's level value. One unit of envelope time is equal to approximately 4000 µs.

If this is less than or equal to zero, it represents an envelope opcode. When acting as an opcode, the value will represent one of the following:

```c
// Any value above 0 represents time
#define ADSR_DISABLE  0
#define ADSR_HANG    -1
#define ADSR_GOTO    -2
#define ADSR_RESTART -3
```

### Opcodes
The functionality of each envelope opcode is listed below:

<dl>
    <dt><code>ADSR_DISABLE</code></dt>
    <dd>

    Stops envelope processing. Notes are disabled and stop sounding immediately, bypassing their release phase.

    ```c
    // Sets status to disabled, then breaks out of the current loop
    case ADSR_DISABLE:
        adsr->action.s.status = ADSR_STATUS_DISABLED;
        break;
    ```

    </dd>
</dl>

<dl>
    <dt><code>ADSR_HANG</code></dt>
    <dd>

    Pauses envelope processing. Notes remain enabled and continue sounding until they enter their release phase.

    ```c
    // Sets status to hang, then breaks out of the current loop
    case ADSR_HANG:
        adsr->action.s.status = ADSR_STATUS_HANG;
        break;
    ```

    </dd>
</dl>

<dl>
    <dt><code>ADSR_GOTO</code></dt>
    <dd>

    Jumps to the specified index in the envelope array.

    ```c
    // Sets envelopeIndex to the current argument value, then jumps to the "retry" label
    // The retry label falls through to loop status (ADSR_STATUS_LOOP)
    case ADSR_GOTO:
        adsr->envelopeIndex = adsr->envelope[adsr->envelopeIndex].arg;
        goto retry;
    ```

    </dd>
</dl>

<dl>
    <dt><code>ADSR_RESTART</code></dt>
    <dd>

    Restarts envelope processing. The envelope will be reset to its initial state and begin processing again.

    ```c
    // Sets status to initial, then breaks out of the current loop
    case ADSR_RESTART:
        adsr->action.s.status = ADSR_STATUS_INITIAL;
        break;
    ```

    </dd>
</dl>

{/* <Tabs>
    <TabItem value="adsr_disable" label="ADSR_DISABLE" default>

    Stops envelope processing. Notes are disabled and stop sounding immediately, bypassing their release phase.

    ```c
    // Sets status to disabled, then breaks out of the current loop
    case ADSR_DISABLE:
        adsr->action.s.status = ADSR_STATUS_DISABLED;
        break;
    ```

    </TabItem>

    <TabItem value="adsr_hang" label="ADSR_HANG">

    Pauses envelope processing. Notes remain enabled and continue sounding until they enter their release phase.

    ```c
    // Sets status to hang, then breaks out of the current loop
    case ADSR_HANG:
        adsr->action.s.status = ADSR_STATUS_HANG;
        break;
    ```

    </TabItem>

    <TabItem value="adsr_goto" label="ADSR_GOTO">

    Jumps to the specified index in the envelope array.

    ```c
    // Sets envelopeIndex to the current argument value, then jumps to the "retry" label
    // The retry label falls through to loop status (ADSR_STATUS_LOOP)
    case ADSR_GOTO:
        adsr->envelopeIndex = adsr->envelope[adsr->envelopeIndex].arg;
        goto retry;
    ```

    </TabItem>

    <TabItem value="adsr_restart" label="ADSR_RESTART">

    Restarts envelope processing. The envelope will be reset to its initial state and begin processing again.

    ```c
    // Sets status to initial, then breaks out of the current loop
    case ADSR_RESTART:
        adsr->action.s.status = ADSR_STATUS_INITIAL;
        break;
    ```

    </TabItem>
</Tabs> */}

## Amplitude or Index
The second value of the envelope point is the amplitude or `ADSR_GOTO` index.

If the `timeOrOpcode` value is greater than or equal to one, it represents amplitude. When the value represents amplitude, it represents the target volume to reach after the specified time for the curent point has passed.

If the `timeOrOpcode` value is less than or equal to zero, it represents index for the `ADSR_GOTO` opcode to jump to in the envelope point array.

:::info[Initial Amplitude]

    The intial amplitude is always zero. This means the envelope will move from zero to the specified amplitude for the first point of the array.

:::