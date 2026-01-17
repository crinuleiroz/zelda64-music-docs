---
title: "Metadata"
tags: ["OOTR", "MMR", "OOTMM"]
---

# Music Metadata File

## About
`.metadata` files are YAML files with a custom extension. They define metadata for Ocarina of Time Randomizer (`.ootrs`) and Majora's Mask Randomizer (`.mmrs`) music files. They are required for these files to function.

### YAML Value Types
YAML treats most unquoted values as strings. A value is only interpresed as a different type if it matches one of YAML's built-in formats:

<Tabs>
    <TabItem value="int" label="Integers" default>

    ```yaml
    decimal:     64
    hexadecimal: 0x40
    octal:       0o100
    ```

    </TabItem>

    <TabItem value="bool" label="Booleans">

    ```yaml linenums="0"
    booleans:
    - true
    - false
    ```

    </TabItem>

    <TabItem value="null" label="Null">

    ```yaml linenums="0"
    null:
    - ~
    - null
    ```

    </TabItem>
</Tabs>

:::tip[YAML Formatting]

    YAML is indentation-sensitive. Use spaces and maintain consistent indentation levels throughout the file.

:::

## Metadata File Structure
Metadata files determine how Ocarina of Time Randomizer and Majora's Mask Randomizer handle a music file. They consist of a top-level `game` field and a `metadata` dictionary containing essential music data.

Below are example `.metadata` files for both an Ocarina of Time Randomizer and Majora's Mask Randomizer music file.

<Tabs groupId="randomizers">
    <TabItem value="ootr" label="Ocarina of Time Randomizer" default>

    ```yaml
    game: oot

    metadata:
      display name: "Hyrule Field"
      instrument set: 0x03
      song type: bgm
      music groups: [ Fields, HyruleField ]
    ```

    </TabItem>

    <TabItem value="mmr" label="Majora's Mask Randomizer">

    ```yaml
    game: mm

    metadata:
      display name: "Termina Field"
      instrument set: 0x03
      song type: bgm
      music groups: [ Fields, TerminaField ]
    ```

    </TabItem>
</Tabs>

### Game
The `game` field is required and specifies which game the music file is for. It must be one of the following values:

- `oot` — Uses Ocarina of Time data and is for Ocarina of Time Randomizer
- `mm` — Uses Majora's Mask data and is for Majora's Mask Randomizer

### Metadata
The `metadata` field is a required dictionary and contains the core metadata of the music file. It can include the following fields:

- `display name`
- `instrument set`
- `song type`
- `music groups`
- `audio samples`

#### Display Name
The `display name` field defines the name that displays in-game. This is purely cosmetic and does not affect song placement or behavior.

:::warning[Songforce and Songtest Tokens]

    In Majora's Mask Randomizer, the `songforce` and `songtest` tokens only work in the music file's filename. Including them in the display name has no effect.

:::

#### Instrument Set
The `instrument set` field is required and specifies which instrument bank the music file uses. It must be one of the following values:

- A decimal integer (e.g. `64`)
- A hexadecimal integer (e.g. `0x40`)
- The string `custom`

:::tip[YAML Value Types]

    For more information on YAML value types, see the [YAML Value Types](#yaml-value-types) section of this page.

:::

#### Song Type
The `song type` field defines how the music file is used in-game. It should be included and must be one of the following values:

- `bgm`
- `fanfare`

#### Music Groups
The `music groups` field is a list that specifies where the music file can be placed in-game. It should be included and must be a list with at least one music group.

:::tip[Available Music Groups]

    For a full list of music groups available in Ocarina of Time Randomizer and Majora's Mask Randomizer, see the [Music Groups](#) page of the documentation.

:::

### Audio Samples
The `audio samples` field is an optional dictionary in `metadata`. This dictionary defines the custom audio samples a music file uses. Each entry in the dictionary maps the custom audio sample to its corresponding sample structure in the music file's custom instrument bank.

:::tip[Using the Audio Samples Dictionary]

    For more details on how to structure and use the `audio samples` dictionary, see the [Audio Samples](#) page of the documentation.

:::

### Formmask
The `formmask` field is an optional top-level dictionary that defines form- and state-specific behavior for sequence channels in Majora's Mask Randomizer. This dictionary contains 17 lists:

- Lists 0 to 16 correspond to sequence channels
- List 17 represents cumulative states

:::tip[Using Formmask Data]

    For details on how to structure and use the `formmask` dictionary, see the [Formmask](#) page of the documentation.

:::