---
title: "Metadata"
tags: ["OOTR", "MMR", "OOTMM"]
---

# Music Metadata Files

## About
Ocarina of Time Randomizer (`.ootrs`) and Majora's Mask Randomizer (`.mmrs`) music files require specific metadata files to function. Ocarina of Time Randomizer uses a `.meta` file, while Majora's Mask Randomizer uses a `categories.txt` file.

## Meta File Structure
Meta files determine how Ocarina of Time Randomizer handles a music file. It consists of multiple lines containing essential music data.

<table>
  <thead>
    <tr>
      <th>Line</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
      1
      </td>
      <td>
      Cosmetic Name
      </td>
      <td>
      The name displayed when the music file appears in-game.
      </td>
    </tr>
    <tr>
      <td align="center">
      2
      </td>
      <td>
      Instrument Set
      </td>
      <td>
      The ID of the Ocarina of Time instrument bank in hexadecimal.
      </td>
    </tr>
    <tr>
      <td align="center">
      3
      </td>
      <td>
      Song Type
      </td>
      <td>
      The music file's type. Must be either `bgm` or `fanfare`.
      </td>
    </tr>
    <tr>
      <td align="center">
      4
      </td>
      <td>
      Music Groups
      </td>
      <td>
      See <a href="music-groups">Music Groups</a> for details.
      </td>
    </tr>
    <tr>
      <td align="center">
      5+
      </td>
      <td>
      Meta Commands
      </td>
      <td>
      See <a href="#meta-commands">Meta Commands</a> for details.
      </td>
    </tr>
  </tbody>
</table>

:::warning[Line Requirements]

    Only lines 1 and 2 are required to be present in a `.meta` file in Ocarina of Time Randomizer. In the Ocarina of Time and Majora's Mask Combo Randomizer, lines 1, 2, and 3 are required.

:::

### Meta Commands
Lines five and above for `.meta` files are for meta commands.

#### ZSOUND
The `ZSOUND` meta command handles linking audio sample files to their corresponding audio sample structure in an instrument bank file.

<Tabs groupId="zsoundCommands">
  <TabItem value="bank" label="Instrument Bank Linking" default>

  ```txt title="Format"
  ZSOUND:type:index:alt:file
  ```

  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        type
        </td>
        <td>
        The identifier for the audio sample's containing object, which must be `INST` for instruments, `DRUM` for drums, or `SFX` for sound effects.
        </td>
      </tr>
      <tr>
        <td>
        index
        </td>
        <td>
        The index of the instrument, drum, or sound effect in its corresponding list, specified in decimal.
        </td>
      </tr>
      <tr>
        <td>
        alt
        </td>
        <td>
        The key region for `INST` types, which must be `LOW`, `NORM`, or `HIGH`. Leave empty for drums and sound effects.
        </td>
      </tr>
      <tr>
        <td>
        file
        </td>
        <td>
        The name of the audio sample file with its file extension.
        </td>
      </tr>
    </tbody>
  </table>

  </TabItem>

  <TabItem value="tempAddress" label="Temp Address Linking">

  ```txt title="Format"
  ZSOUND:file:temp_address
  ```

  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        file
        </td>
        <td>
        The name of the audio sample file with its file extension.
        </td>
      </tr>
      <tr>
        <td>
        temp_address
        </td>
        <td>
        The temporary address of the audio sample in the music file's instrument bank, specified in hexadecimal.
        </td>
      </tr>
    </tbody>
  </table>

  </TabItem>
</Tabs>

## Categories File Structure
Categories files determine the areas in-game a music file may appear in Majora's Mask Randomizer. It is a single-line text file containing a list of hexadecimal category values, separated by commas (`,`) or hyphens (`-`).

```txt title="categories.txt"
0,1,102,12F
```