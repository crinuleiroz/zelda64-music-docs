---
title: "Errors"
tags: []
---

# SEQ64 Errors

## Overlapping Notes
For a channel containing overlapping or stacked notes, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Note Off (ch=# note=# time=#) received for note that is not on!
```

#### Error Description
The error indicates that the MIDI file contains a note that intersects or overlaps another note. While a DAW or MIDI sequencer may allow you to stack notes — causing them to intersect one another or overlap — it is invalid in MIDI to send a MIDI Note On message before another note of the same pitch has been resolved.

## Channel Polyphony Limit
For a channel containing more than four notes of differing pitches playing at once, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Channel # has more than 4 notes on at a time (at t=#)!
```

#### Error Description
The error indicates that the voice limit has been reached for the specified channel. A sequence may only have a total of four notes of differing pitches being played at a time. Extra notes will be culled base on the priority given to each individual note by the sequence player.

## Section Boundaries
For a MIDI Marker meta message that intersects a note, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Section boundary (e.g. loop point) in the middle of a note, note # channel #!
Cutting off the note!
```

#### Error Description
The error indicates that a MIDI Marker message, which divides a sequence into sections, intersects a MIDI note. Because MIDI and sequence notes cannot be split, the marker must be moved, or the note must be shortened.

:::tip[Fitting Notes Into a Section]

    A MIDI note may be shortened to avoid crossing a section boundary. After converting the MIDI file into a sequence file, the note can be restored to its original length. This a SEQ64 limitation, not a sequence limitation.

:::

### Failed to Fix Section Boundary
The above section boundary error will normally be followed by a subsequent section boundary error in the terminal window or debug output:

```
Trying to fix section boundary in the middle of note failed, broken sequence!
```

#### Error Description
The error indicates that SEQ64 failed at repairing a note that was split by a MIDI Marker meta message intersecting it in the MIDI file. This is essentially a continuation of the previous section boundary error and will never occur on its own.

## Duplicate Note On
For a channel containing a duplicate MIDI Note On message, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Duplicate note on in chan # t=#, ignoring
```

#### Error Description
The error may be ignored, SEQ64 will not put a duplicate MIDI Note On message in a sequence file.

## Odd Number of Events
For a MIDI file containing an odd number of MIDI events, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Chan # lyr # track has # (odd number of) events!
```

#### Error Description
The error indicates that there is an odd number of MIDI Note On messages or MIDI Note Off messages in the indicated channel. This will usually indicate a hanging note, a note missing a corresponding MIDI Note Off message, or a stray MIDI Note Off message.

## Master Volume
For a MIDI file containing no MIDI SysEx message for master volume, SEQ64 will give the following warning in the terminal window or debug output when importing a MIDI file:

```
No Master Volume sysex command in the MIDI, adding default 0x##
```

#### Warning Description
The above warning may be ignored, SEQ64 will automatically add a master volume sequence command to the sequence file.

## Missing Control Change Message Pair
For a MIDI Control Change message that requires another paired MIDI Control Change message, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Multiple cc command # (channel # timestamp # first cc #) missing required secondary CC #,
setting to zero!
```

#### Error Description
The error indicates that a MIDI Control Change message is missing its required MIDI Control Change message pair.

## Ran Off End of Track
<Stub />

```
Ran off end of track looking for note off!
```

#### Error Description
<Stub />

## Note On Out of Order
<Stub />

```
Note On out of order! Cancelling track import!
```

#### Error Description
<Stub />

## Note Off Out of Order
<Stub />

```
Note Off out of order! Cancelling track import!
```

#### Error Description
<Stub />

## Zero-Length Note
For a channel with a zero-length note present, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Zero-length note with no delay afterwards in chn # ly # at t=#, discarding!
```

#### Error Description
The error indicates a zero-length note is present in the indicated channel at the given time. This generally occurs when a zero-length note exists in the MIDI file during import. It can also happen when a note overlaps or intersects another note sent to the same channel, but in a different track. Since zero-length notes can cause various issues, it is important to remove or correct them before importing the MIDI file into SEQ64.

## Zero-Length Note (TPQN Conversion)
For a channel that with a zero-length note present that is caused by SEQ64's TPQN conversion, SEQ64 will give the following error in the terminal window or debug output when importing a MIDI file:

```
Zero-length note in chn # ly # at t=#! Making small length instead...
```

#### Error Description
The error indicates a zero-length note is present in the indicated channel at the specified time after the MIDI file's TPQN has been converted to 48 TPQN. SEQ64 will change the note from zero-length to "small length" to prevent it from being ignored or removed entirely.

## Command Parameter Error
<Stub />

```
No {action} command defined in stype {stype} with all the needed parameters!
```

#### Error Description
<Stub />

## Meaning and Value Error
<Stub />

```
Want {idMeaning} value {idValue}
```

#### Error Description
<Stub />