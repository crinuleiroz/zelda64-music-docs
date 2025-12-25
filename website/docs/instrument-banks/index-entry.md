---
title: "Index Entry"
---

# Index Entry

## Structure
In *Ocarina of Time* and *Majora's Mask*, an instrument bank's metadata is represented by a corresponding index entry. These entries are located in the `code` file, separate from the instrument bank's data in the `Audiobank` file.

```c
struct IndexEntry
{
    /* 0x00 */ unsigned long audiobankAddr;
    /* 0x04 */ unsigned long size;
    /* 0x08 */ signed char storageMedium;
    /* 0x09 */ signed char cacheLoadType;
    /* 0x0A */ signed char sampleBankId1;
    /* 0x0B */ signed char sampleBankId2;
    /* 0x0C */ signed char numInstruments;
    /* 0x0D */ signed char numDrums;
    /* 0x0E */ signed short int numEffects;
}; // Size = 0x10
```

### Audiobank Address
The `audiobankAddr` value is a pointer to the instrument bank binary data in the `Audiobank` file in the ROM file.

### Size
The `size` value defines the instrument bank's total binary size in bytes.

### Storage Medium
The `storageMedium` value indicates the location of the instrument bank's binary data in memory.

### Cache Load Type
The `cacheLoadType` value defines the audio cache the instrument bank data will be loaded into.

### Sample Bank ID 1
The `sampleBankId1` value defines the primary sample bank where audio sample data will be loaded from.

### Sample Bank ID 2
The `sampleBankId2` value defines the secondary sample bank where audio sample data will be loaded from. This value is always set to 0xFF (255), indicating that there is no secondary sample bank.

### Number of Instruments
The `numInstruments` value determines the total length of the instrument list in the instrument bank. The maximum number of channel-based instruments an instrument bank can hold is 256. However, instrument values 127 and 128 are reserved for the instrument bank's two key-based instruments.

### Number of Drums
The `numDrums` value determines the total length of the drum list in the instrument bank. The maximum number of drums an instrument bank can hold is 256.

### Number of Effects
The `numEffects` value determines the total length of the effect list in the instrument bank. The maximum number of effects and instrument bank can hold is 65536.