---
title: "Assignment"
---

# Assigning Instruments

## MIDI
In MIDI, instruments are assigned to a MIDI channel by sending a MIDI Program Change message from the track to the desired MIDI channel. Only one instrument is able to be assigned to a MIDI channel at any time. However, a MIDI channel can have its instrument assigment changed at any point by sending another MIDI Program Change message to the channel.

MIDI Program Change messages store data in two bytes. The first byte of a MIDI Program Change message is the status byte. The allowed values of the status byte range from 192 to 207. The first four bits determine the MIDI message type, while the second four bits determine the MIDI channel the message is sent to. The second byte of a MIDI Program Change message is the data byte. The allowed values of the data byte range from 0 to 127. The data byte determines what instrument the MIDI channel will use from the current MIDI instrument bank. Channel-based instruments are able to be assigned to any MIDI channel except MIDI channel 10. MIDI channel 10 is only used for key-based instrument sound sets.

### Accessing Key-Based Instruments in MIDI
In MIDI, key-based instruments are restricted in their available channel assignment. They are only allowed to be assigned to MIDI channel 10 and cannot be assigned to any other channels. The reason for this is due to the way MIDI instrument banks work in the General MIDI standard. Instrument bank 128 — the instrument bank containing key-based instrument sound sets — is inaccessible using MIDI Control Change messages. Instead, it is always assigned to MIDI channel 10. It is because of this that key-based instruments are inaccessible to other MIDI channels.

## Audio Sequences
In *Ocarina of Time* and *Majora's Mask*, both channel-based and key-based instruments are assigned to a channel by sending an ASEQ Assign Instrument channel message. Only one instrument is able to be assigned to a sequence channel at any time. However, a sequence channel can have its instrument assignment changed at any point by sending another ASEQ Assign Instrument channel message to the channel.

ASEQ Assign Instrument channel messages store data in two bytes. The first byte of an ASEQ Assign Instrument channel message is the identifier byte. The identifier byte is always 0xC1. Because it is a channel-specific message, it is only available in sequence channels. The second byte of the ASEQ Assign Instrument channel message is the data byte. The allowed values of the data byte range from 0x00 to 0xFF — it is an unsigned 8-bit integer value. The data byte determines what instrument the sequence channel will use from the current instrument bank. Unlike MIDI, both channel-based and key-based instruments have no channel restrictions. They are accessible in any sequence channel.

### Accessing Key-Based Instruments in Audio Sequences
Unlike MIDI, key-based instrument sound sets can be assigned to any sequence channel. They are not restricted to a specific channel like they are in MIDI. Instead, they are accessible with the reserved values 0x7E and 0x7F for the ASEQ Assign Instrument channel message's data byte. The former value is the sound effect sound set and the latter value is the percussion kit sound set. Instrument banks in *Ocarina of Time* and *Majora's Mask* only contain these two key-based instruments. There is no way to increase the number of available key-based instruments in an instrument bank without ROM hacking.

:::info[Differences Between Sound Effects and Drums]

    The two available key-based instrument sound sets in *Ocarina of Time* and *Majora's Mask* instrument banks contain major differences:

    - The sound effect sound set accessed with program 126 only contains audio samples. Sound effects do not contain an ADSR envelope pointer or pan values.
    - The percussion kit sound set accessed with program 127 does not only contain audio samples. Drums contain an ADSR envelope pointer and pan values.

    A majority of instrument banks do not contain a sound effect sound set. Only instrument bank 0x00 and 0x01 contain a sound effect sound set. Some instrument banks also do not contain a percussion kit sound set either. However, most instrument banks will contain a percussion kit sound set.

:::

## Assigning Appropriate MIDI Instruments
Instruments in *Ocarina of Time* and *Majora's Mask* do not directly correspond to instruments in MIDI. For example, in MIDI, the "Strings" instrument has an assignment value of 48 (0x30). However, in *Ocarina of Time* and *Majora's Mask*, the "Strings" instrument's assignment value depends on the instrument bank a sequence file uses. The "Strings" instrument may not be present in some instrument banks in *Ocarina of Time* and *Majora's Mask*.

For instance, in instrument bank 3 (0x03), the "Strings" instrument has two assignment values: 10 (0x0A) and 11 (0x0B). However, in instrument bank 2 (0x02), there is no "Strings" instrument — it only contains ambient sounds. Therefore, to ensure channel-based instruments and key-based instrument sound sets are assigned correctly in a sequence file, MIDI Program Change values must be adjusted to match the assignment value of the corresponding instrument in the selected *Ocarina of Time* or *Majora's Mask* instrument bank.