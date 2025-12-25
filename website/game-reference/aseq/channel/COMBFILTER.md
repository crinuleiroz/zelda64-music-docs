---
title: "COMBFILTER"
tags: []
---

<WorkInProgress />

# ASEQ Chorus

## Message Description
<Stub />

## Technical Details
<Stub />

<!-- also called comb filter, the devs called it chorus; they are essentially the same thing with different names. equivalent to MIDI chorus to create a second delayed audio sample to play in the channel. arg 1 defines the delay as a codebook offset(?), and arg 2 determines the chorus amount/volume. the effect is not 1:1 with midi chorus.

arg1 value should always have a second nibble value of 0, the game will crash or produce static or robotic noise otherwise. only put data in the first nibble of the u8 byte. -->