---
title: "Checksum"
tags: []
---

# ROM Checksum

:::danger[ROM Files]

    The documentation can not and will not supply any ROM files or links to any ROM files for *Ocarina of Time* or *Majora's Mask*. This site does not condone or facilitate piracy in any capacity.

:::

## About
Checksum values are numerical strings that verify a file's integrity. Files containing the same data will produce identical checksum values. By comparing a file's checksum value to a known correct value, it is possible to confirm the file has not been modified or corrupted.

### Checking a ROM File's Checksum
The following tools may be used to obtain a ROM file's checksum:

- [Online CRC32 Checksum Tool](https://emn178.github.io/online-tools/crc/)
- [Online MD5 Checksum Tool](https://emn178.github.io/online-tools/md5_checksum.html)

## ROM Requirements
To work with the music tools currently available, a ROM file must meet specific requirements.

### Ocarina of Time
An *Ocarina of Time* ROM file must be either an NTSC-J or NTSC-U version 1.0 ROM file. NTSC region ROM files for versions 1.1 or 1.2, and any PAL region ROM files, will not work.

:::info[Version Differences]

    For *Ocarina of Time*, there is no difference between the Japanese and English versions of NTSC region ROM files. The only difference is a flag that determines whether the game's language is Japanese or English.

:::

To ensure that an *Ocarina of Time* ROM file is clean — meaning it has not been modified or corrupted — and is the correct version of the game, please refer to the MD5 and CRC32 checksums below:

<Tabs>
    <TabItem value="ntsc-u" label="NTSC-U Version 1.0" default>

    | Checksum Type | Value |
    | --- | --- |
    | **CRC32** | CD16C529 |
    | **MD5** | 5BD1FE107BF8106B2AB6650ABECD54D6 |

    </TabItem>

    <TabItem value="ntsc-j" label="NTSC-J Version 1.0">

    | Checksum Type | Value |
    | --- | --- |
    | **CRC32** | D423E8B0 |
    | **MD5** | 9F04C8E68534B870F707C247FA4B50FC |

    </TabItem>
</Tabs>

### Majora's Mask
A *Majora's Mask* ROM file must be an NTSC-U version 1.0 ROM file. NTSC-J ROM files for versions 1.0 or 1.1, or any PAL region ROM files, will not work.

:::info[Version Differences]

    For *Majora's Mask*, there are several major differences between the Japanese and English versions of NTSC region ROM files. As a result, the data has been modified and the music tools currently available will not work.

:::

To ensure a *Majora's Mask* ROM file is clean — meaning it has not been modified or corrupted — and is the correct version of the game, please refer to the MD5 and CRC32 checksums below:

<Tabs>
    <TabItem value="ntsc-u" label="NTSC-U Version 1.0" default>

    | Checksum Type | Value |
    | --- | --- |
    | **CRC32** | B428D8A7 |
    | **MD5** | 2A0A8ACB61538235BC1094D297FB6556 |

    </TabItem>
</Tabs>