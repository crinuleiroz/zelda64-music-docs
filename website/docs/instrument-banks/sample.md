---
title: "Sample"
---

# Sample

## Structure
In *Ocarina of Time* and *Majora's Mask*, each audio sample in an instrument bank is defined by a sample structure. This structure stores all metadata required for sample playback, including its codec type, storage medium, size, and pointers to loop and codebook data.

```c
struct Sample
{
    /* 0x00 */ unsigned long codec : 4;
    /* 0x00 */ unsigned long medium : 2;
    /* 0x00 */ unsigned long isCached : 1;
    /* 0x00 */ unsigned long isRelocated : 1;
    /* 0x01 */ unsigned long size : 24;
    /* 0x04 */ unsigned char* sampleAddr;
    /* 0x08 */ struct Loopbook* loop;
    /* 0x0C */ struct Codebook* book;
}; // Size = 0x10
```

{/* TODO: Add differences between OOT and MM code for the enums */}
### Bitfield
The sample structure packs multiple values into a single 32-bit unsigned integer value known as a bitfield. Bitfields are a way to store multiple smaller values in a single larger value by allocating a specific number of bits to each smaller value. Each individual value represents its specified amount of bits within the 32-bit integer. Modifying or accessing the individual values in the 32-bit integer requires bitwise operations.

The packed 32-bit bitfield consists of the following named fields:

<dl>
    <dt><code>codec</code></dt>
    <dd>

    Represents the audio codec the audio sample uses. It is a 3-bit value representing  bits 1 to 3 of the packed 32-bit integer value. Each value corresponding to a specific audio codec an audio sample can use.

    ```c
    enum SampleCodec
    {
        /* 0 */ CODEC_ADPCM,
        /* 1 */ CODEC_S8,
        /* 2 */ CODEC_S16_INMEM,
        /* 3 */ CODEC_SMALL_ADPCM,
        /* 4 */ CODEC_REVERB,
        /* 5 */ CODEC_S16,
        /* 6 */ CODEC_UNK6,
        /* 7 */ CODEC_UNK7
    };
    ```

    </dd>

    <dt><code>medium</code></dt>
    <dd>

    Indicates the location of the audio sample. It is a 2-bit value representing bits 4 to 5 of the packed 32-bit integer value. Each value corresponding to a specific medium type the game can use.

    ```c
    enum SampleMedium
    {
        /* 0 */ MEDIUM_RAM,
        /* 1 */ MEDIUM_UNK,
        /* 2 */ MEDIUM_CART,
        /* 3 */ MEDIUM_DISK_DRIVE,
        /* 5 */ MEDIUM_RAM_UNLOADED = 5
    };
    ```

    </dd>

    <dt><code>isCached</code></dt>
    <dd>

    Indicates whether the game will cache the audio sample or not. A value of zero (false) indicates the game will not cache the sample. A value of one (true) indicates the game will cache the sample. It is a 1-bit value representing bit 6 of the packed 32-bit integer value.

    </dd>

    <dt><code>isRelocated</code></dt>
    <dd>

    Indicates whether the audio sample is relocated or not. A value of zero (false) indicates the sample is in its original location. A value of one (true) indicates the sample is in a different location. It is a 1-bit value representing bit 7 of the packed 32-bit integer value.

    </dd>

    <dt><code>size</code></dt>
    <dd>

    Represents the size of the audio sample in bytes. It is a 24-bit value representing bits 8 to 31 of the packed 32-bit integer value.

    </dd>
</dl>

### Sample Address
The `sampleAddr` value is a pointer to the binary data of the audio sample. This address points to the location of the sample in the specified medium.

### Loopbook Pointer
The `loop` value is a pointer to a loopbook structure in the instrument bank.

### Codebook Pointer
The `book` value is a pointer to a codebook structure in the instrument bank.

## Bitfield Packing and Unpacking
{/* Possibly find better place for this */}
In the sample structure, multiple individual values pack into a single 32-bit integer value. Each value represents a specific number of bits in the packed 32-bit integer value.

#### Unpacking
Unpacking the bitfield requires isolating individual values from the packed 32-bit integer value. This requires shifting the bits to the right, then applying a bitmask. This will extract only the relevant values for each bitfield value.

The following code demonstrates how to unpack the bitfield:
```python
bits = int.from_bytes(b'\x02\x00\x46\x86', 'big')

codec        = (bits >> 28) & 0b1111
medium       = (bits >> 26) & 0b11
is_cached    = (bits >> 25) & 1
is_relocated = (bits >> 24) & 1
size         = (bits >>  0) & 0b111111111111111111111111
```

#### Packing
Packing the bitfield requires combining each individual value into a single 32-bit integer value. The process involves three steps for each individual value. First, bitmasking the value. Second, shifting the bitmasked value to the left. Third, merging the bitmasked value into the packed 32-bit integer value using the bitwise `OR` operator.

The following code demonstrates how to pack the bitfield:
```python
codec: int        = 0 # ADPCM
medium: int       = 0 # RAM
is_cached: int    = 1 # True
is_relocated: int = 0 # False
size: int         = 18054

bits: int = 0
bits |= (codec & 0b1111) << 28
bits |= (medium & 0b11) << 26
bits |= (is_cached & 1) << 25
bits |= (is_relocated & 1) << 24
bits |= (size & 0b111111111111111111111111) << 0
```