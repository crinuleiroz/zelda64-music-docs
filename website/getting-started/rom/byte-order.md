---
title: "Byte Order"
tags: []
---

# ROM Byte Order

:::danger[ROM Files]

    The documentation can not and will not supply any ROM files or links to any ROM files for *Ocarina of Time* or *Majora's Mask*. This site does not condone or facilitate piracy in any capacity.

:::

## About
Byte ordering, or endianness, refers to the sequence in which bytes are arranged within larger data types. The formats relevant to Nintendo 64 are:

| Endianness | Extension | Description |
| :-- | :-: | :-- |
| Big-endian | `.z64` | Stores the most significant byte (MSB) first. |
| Little-endian | `.n64` | Stores the least significant byte (LSB) first. |
| Byteswapped | `.z64` | Reverses the order of every 16-bit word (swaps each pair of bytes). |

<!-- - Big-endian (`.z64`): Stores the most significant byte first.
- Byteswapped (`.v64`): Reverses the order of every 16-bit word (swaps each pair of bytes).
- Little-endian (`.n64`): Stores the least significant byte first. -->

## Determining a ROM File's Byte Order
There are two primary ways to determine a ROM file's byte order:

1. Check the file extension.
2. Open the ROM file in a hex editor and check its internal name.

While examining the file extension is quick, it is not a reliable method. File extensions can be changed without affecting the byte order and may not reflect the actual byte order of the data. To determine a ROM file's byte order with complete certainty, the ROM file's internal name should be verified using a hex editor.

:::tip[Hex Editor]

    [HexEd.it](https://hexed.it/ "HexEd.it - The Client-Side Javascript Based Hex Editor") offers a free, online (and offline), full-featured, and client-sided hex editor that runs directly in a browser.

:::

To verify a ROM file's byte order using the ROM file's internal name as it appears in a hex editor, refer to the internal names in the corresponding format below:

<Tabs groupId="endianness">
    <TabItem value="big" label="Big-Endian" default>

    | Game | Internal ROM Name |
    | --- | --- |
    | **Ocarina of Time** | `THE LEGEND OF ZELDA .......CZLE.` |
    | **Majora's Mask** | `ZELDA MAJORA'S MASK .......NZSE.` |

    </TabItem>

    <TabItem value="little" label="Little-Endian">

    | Game | Internal ROM Name |
    | --- | --- |
    | **Ocarina of Time** | `EHTEGELO DNEZ F ADL....C....ELZ` |
    | **Majora's Mask** | `DLEZAM AAROJM S' KSA....N....ESZ` |

    </TabItem>

    <TabItem value="byteswapped" label="Byteswapped">

    | Game | Internal ROM Name |
    | --- | --- |
    | **Ocarina of Time** | `HT EELEGDNO  FEZDL A......C.LZ.E` |
    | **Majora's Mask** | `EZDL AAMOJARS'M SA K......N.SZ.E` |

    </TabItem>
</Tabs>

### Location of the Internal Name
The internal name for *Ocarina of Time* and *Majora's Mask* is located at memory addresses `0x00000020` to `0x0000003F`.

The code below shows the relevant portion of the ROM file, with the internal name highlighted. The highlighted lines show the ASCII characters representing the internal name.

In the hex dump below:

- `Offset (h)` represents the memory offset in hexadecimal.
- The center column displays the raw bytes in hexadecimal.
- The right column displays the decoded ASCII text.

<Tabs groupId="game">
    <TabItem value="oot" label="Ocarina of Time" default>

    ```markdown
    Offset (h) | 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F | Decoded Text
    -------------------------------------------------------------------------------
    0000000000 | 80 37 12 40 00 00 00 0F 80 00 04 00 00 00 14 49 | €7.@....€......I
    0000000010 | EC 70 11 B7 76 16 D7 2B 00 00 00 00 00 00 00 00 | ìp.·v.×+........
    <!-- highlight-start -->
    0000000020 | 54 48 45 20 4C 45 47 45 4E 44 20 4F 46 20 5A 45 | THE LEGEND OF ZE
    0000000030 | 4C 44 41 20 00 00 00 00 00 00 00 43 5A 4C 45 00 | LDA .......CZLE.
    <!-- highlight-end -->
    0000000040 | 03 A0 48 20 8D 28 F0 10 8D 6A 00 44 01 48 50 26 | . H .(ð..j.D.HP&
    0000000050 | AD 2A F0 10 21 6B 00 04 31 08 0F FF 15 00 FF F9 | .­*ð.!k..1..ÿ..ÿù
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask">

    ```markdown
    Offset (h) | 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F | Decoded Text
    -------------------------------------------------------------------------------
    0000000000 | 80 37 12 40 00 00 00 0F 80 08 00 00 00 00 14 4B | €7.@....€......K
    0000000010 | 53 54 63 1C 03 A2 DE F0 00 00 00 00 00 00 00 00 | STc..¢Þð........
    <!-- highlight-start -->
    0000000020 | 5A 45 4C 44 41 20 4D 41 4A 4F 52 41 27 53 20 4D | ZELDA MAJORA'S M
    0000000030 | 41 53 4B 20 00 00 00 00 00 00 00 4E 5A 53 45 00 | ASK .......NZSE.
    <!-- highlight-end -->
    0000000040 | 03 A0 48 20 8D 28 F0 10 8D 6A 00 44 01 48 50 26 | . H .(ð..j.D.HP&
    0000000050 | AD 2A F0 10 21 6B 00 04 31 08 0F FF 15 00 FF F9 | .­*ð.!k..1..ÿ..ÿù
    ```

    </TabItem>
</Tabs>

## Modifying a ROM File's Byte Order
If a ROM file is in little-endian or byteswapped byte order, it must be converted to big-endian. This can be done using Tool64.

To change the byte order of a Nintendo 64 ROM file with Tool64, follow these steps:

> 1. First, open Tool64.
> 2. At the top of the Tool64 window, click "File > Open..."
>     -  Alternatively, click the "Open Rom Directory" button (indicated by the open folder icon) below the menu bar.
> 3. In the "Browse for Folder" window, select the directory containing the desired ROM file to modify, then click "OK".
> 4. In the main Tool64 window, select the desired ROM file to modify.
> 5. Next, right-click and select "Big Endian" from the context menu that appears.
>     -  Alternatively, click the "Big Endian (z64)" button (indicated by the blue right-arrow icon) below the menu bar.

:::warning[Changing the File Extension]

    Changing the file extension of a ROM file will *not* change its byte order. The byte order must be modified with a data tool that can properly convert byte order.

:::