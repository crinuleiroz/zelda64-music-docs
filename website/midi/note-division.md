---
title: "Note Division"
tags: ["MIDI"]
---

# Note Division

## About
In MIDI, ticks per quarter note (TPQN) represents the total number of MIDI ticks per beat. Every MIDI message has an accompanying tick value to determine its length. For MIDI Note On messages, this tick duration can be mapped to its musical counterpart.

### Native TPQN
Sequences in *Ocarina of Time* and *Majora's Mask* use a native resolution of 48 TPQN. It is easier to convert a MIDI file into a sequence file if its resolution matches the native resolution, rather than having SEQ64 convert it to 48 TPQN.

:::warning[Note Corruption]

    It is recommended not to have notes shorter than a duration of 4 ticks at 48 TPQN in a sequence. Notes that are too short may corrupt other notes, potentially causing them to drop out during playback

:::

## Notation to MIDI Ticks
The formulae to find the musical note for a specific MIDI tick value can be found in the table below. For the first note in a division table, use the MIDI tick value of a quarter note because it is always equal to the TPQN value.

| Duration | Formula | Description |
| --- | --- | --- |
| Longer | $n*2$ | Doubles note duration |
| Shorter | $n\div2$ | Halves note duration |
| Dotted | $n+(n\div2)$ | Increases note duration by one-half |
| Triplet | $n-(n\div3)$ | Reduces note duration by one-third |

In each formula, $n$ is the MIDI tick value of the original note.

### Examples
If a quarter note is equal to 48 MIDI ticks, the formulae will result in the following:

<dl>
    <dt>**Half Note**</dt>
    <dd>

    $48*2=96 \space \text{MIDI Ticks}$

    </dd>

    <dt>**Eighth Note**</dt>
    <dd>

    $48\div2=24 \space \text{MIDI Ticks}$

    </dd>

    <dt>**Dotted Quarter**</dt>
    <dd>

    $48+(48\div2)=72 \space \text{MIDI Ticks}$

    </dd>

    <dt>**Triplet Quarter**</dt>
    <dd>

    $48-(48\div3)=32 \space \text{MIDI Ticks}$

    </dd>
</dl>

## Note Division Tables
Listed below are notes with their corresponding tick values at common MIDI resolutions.

:::info

    Any omitted values are those that cannot be cleanly divided by their corresponding longer-duration values.

:::


<Tabs>
    <TabItem value="48-tpqn" label="48 TPQN" default>

    | Regular Note | MIDI Ticks | Dotted Note | MIDI Ticks | Triplet | MIDI Ticks |
    | :-: | :-: | :-: | :-: | :-: | :-: |
    | Whole Note | 192 | Dotted Whole | 288 | Whole Triplet | 128 |
    | Half Note | 96 | Dotted Half | 144 | Half Triplet | 64 |
    | Quarter Note | 48 | Dotted Quarter | 72 | Quarter Triplet | 32 |
    | Eighth Note | 24 | Dotted Eighth | 36 | Eighth Triplet | 16 |
    | 16th Note | 12 | Dotted 16th | 18 | 16th Triplet| 8 |
    | 32nd Note | 6 | Dotted 32nd | 9 | 32nd Triplet | 4 |
    | 64th Note | 3 | Dotted 64th | — | 64th Triplet | 2 |

    </TabItem>

    <TabItem value="96-tpqn" label="96 TPQN">

    | Regular Note | MIDI Ticks | Dotted Note | MIDI Ticks | Triplet | MIDI Ticks |
    | :-: | :-: | :-: | :-: | :-: | :-: |
    | Whole Note | 384 | Dotted Whole | 576 | Whole Triplet | 256 |
    | Half Note | 192 | Dotted Half | 288 | Half Triplet | 128 |
    | Quarter Note | 96 | Dotted Quarter | 144 | Quarter Triplet | 64 |
    | Eighth Note | 48 | Dotted Eighth | 72 | Eighth Triplet | 32 |
    | 16th Note | 24 | Dotted 16th | 36 | 16th Triplet| 16 |
    | 32nd Note | 12 | Dotted 32nd | 18 | 32nd Triplet | 8 |
    | 64th Note | 6 | Dotted 64th | 9 | 64th Triplet | 4 |

    </TabItem>

    <TabItem value="120-tpqn" label="120 TPQN">

    | Regular Note | MIDI Ticks | Dotted Note | MIDI Ticks | Triplet | MIDI Ticks |
    | :-: | :-: | :-: | :-: | :-: | :-: |
    | Whole Note | 480 | Dotted Whole | 720 | Whole Triplet | 320 |
    | Half Note | 240 | Dotted Half | 360 | Half Triplet | 160 |
    | Quarter Note | 120 | Dotted Quarter | 180 | Quarter Triplet | 80 |
    | Eighth Note | 60 | Dotted Eighth | 90 | Eighth Triplet | 40 |
    | 16th Note | 30 | Dotted 16th | 45 | 16th Triplet| 20 |
    | 32nd Note | 15 | Dotted 32nd | — | 32nd Triplet | 10 |
    | 64th Note | 8 | Dotted 64th | — | 64th Triplet | 5 |

    </TabItem>
</Tabs>