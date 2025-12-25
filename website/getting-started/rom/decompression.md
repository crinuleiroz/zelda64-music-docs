---
title: "Decompression"
tags: []
---

# ROM Decompression

:::danger[ROM Files]

    The documentation can not and will not supply any ROM files or links to any ROM files for *Ocarina of Time* or *Majora's Mask*. This site does not condone or facilitate piracy in any capacity.

:::

## About
Nintendo 64 ROM files are compressed to reduce their size, which is important for storing them on Nintendo 64 cartridges. To use *Ocarina of Time* and *Majora's Mask* ROM files with the music tools currently available, they must first be decompressed.

Decompression is the process of restoring compressed data to its original state. For *Ocarina of Time* and *Majora's Mask* ROM files, this involves using software that understands the compression format and can extract the data accordingly. Once decompressed, the ROM file can be used with the music tools currently available.

:::info[Creating Sequences Without a Decompressed ROM File]

    Sequence files can be created without a ROM file using SEQ64. However, to test a sequence file in-game without using either the Ocarina of Time Randomizer or Majora's Mask Randomizer, a decompressed ROM file is required.

    It is not recommended to use the Ocarina of Time Randomizer or Majora's Mask Randomizer to test sequence files smaller than 10240 (0x2800) bytes. Using a randomizer for smaller sequence files requires additional steps for each edit, such as:

    - Saving the raw sequence file
    - Updating the music file archive
    - Creating a new randomizer seed.

    However, it will ensure the music file is compatible with its intended randomizer.

:::

## Decompressing a ROM File
To decompress a ROM file, a decompression tool made for *Ocarina of Time* and *Majora's Mask* must be used. The decompression tool z64decompress is a simple and easy-to-use tool that supports both games. While other decompression tools are available, they may not support both games, or may be less user-friendly.

To use z64decompress, follow these steps:
> 1. First, locate the desired ROM file to decompress.
> 2. Next, click and drag the desired ROM file onto the z64decompress executable (`.exe`) file.

:::info[Input ROM File Location]

    The compressed ROM file does *not* need to be located in the same directory as z64decompress.

:::

A terminal window will appear on-screen, showing the command arguments used during decompression. It will also display a message confirming the ROM file has been sucessfully decompressed:

```
decompressed rom '{filepath}' written successfully
```

The terminal window may be closed as soon as the process is complete — it should only take a few seconds.

The decompressed ROM file will be saved in the same folder as the original compressed ROM file. The file will have the same name as the original file, with "decompressed" added bewteen the filename and file extension: `{filename}.decompressed.z64`