---
title: "Limitations"
---

# Sequence Limitations

## Channels
Like MIDI, a sequence file can have up to, and cannot exceed, 16 (0x0F) channels. In MIDI, channel indexing begins at 1. In sequences and SEQ64, channel indexing begins at 0.

:::info[MIDI Tracks]

Multiple MIDI tracks can be assigned to a single MIDI channel. However, they are subject to the channel limitations of sequences.

:::

## Tempo
A sequence file's tempo cannot exceed a value of 224 (0xE0). The tempo value is stored as an 8-bit unsigned integer which allows for a maximum of 255 (0xFF) values. However, the audio engine is only capable of playing a sequence at a maximum of 224 beats per minute. If the tempo value exceeds this soft limit, it is set at 224 beats per minute. This limits ASEQ Set Tempo messages to 224 (0xE0) valid values. While the tempo can still be set to a maximum of 255 (0xFF), the audio engine will not exceed the soft limit during playback.

## Volume
A sequence file's master volume, channel volume, and expression cannot exceed a value of 255 (0xFF). The volume values are stored as an 8-bit unsigned integer. This limits ASEQ Master Volume, ASEQ Channel Volume, and ASEQ Expression messages to a maxiumum of 255 (0xFF) values. They cannot exceed this limit under any circumstance.

:::info[MIDI Volume Limitations]

The MIDI Control Change messages for channel volume (CC#7) and expression (CC#11) cannot exceed a value of 127 (0x7F). All MIDI Control Change messages are 7-bit unsigned integer values. This limits channel volume (CC#7) and expression (CC#11) to a maximum of 127 (0x7F) values. They cannot exceed this limit under any circumstance.

:::

## Instrument Assignment
A sequence file's instrument assignment value cannot exceed a value of 255 (0xFF). The instrument assignment value is stored as an 8-bit unsigned integer. This limits ASEQ Assign Instrument messages to a maximum of 255 (0xFF) values. It cannot exceed this limit under any circumstance.

:::info[MIDI Program Change Message Limitations]

MIDI Program Change messages cannot exceed a value of 127 (0x7F). The MIDI Program Change message value is stored as a 7-bit unsigned integer. This limits MIDI Program Change messages to a maximum of 127 (0x7F) values. They cannot exceed this limit under any circumstance.

:::

## Polyphony
Like MIDI, sequence channels are polyphonic. Polyphony meaning multiple voices can sound at once in a single channel. However, only four voices of differing pitches may sound at the same time in a sequence channel.

:::info[Note Layers]

In sequences, note information is stored in "Note Layers". Because of how sequences handle message timing, notes that play at the same time in a sequence channel must be stored on different layers.

SEQ64 uses the term "tracks" or "trk" for note layers. However, they should not to be confused with MIDI tracks. While the terminology is the same, their funtionality is different.

:::

## Overlapping Notes
Like MIDI, a note in a sequence cannot overlap or intersect another note of the same pitch. In a DAW, notes may overlap without any issues, but this is invalid in MIDI. Sending a second MIDI Note On message with the same pitch and channel will cut off the previous note. A MIDI Note Off message must be sent before a new note of the same pitch begins in the same channel.

:::warning[Overlapping Notes in MIDI]

Overlapping or intersecting notes may cause a DAW or MIDI sequencer to pair MIDI Note On and Note Off messages incorrectly. As a result, some notes may have incorrect or zero duration. This occurs because MIDI Note On messages can double as a MIDI Note Off message.

:::