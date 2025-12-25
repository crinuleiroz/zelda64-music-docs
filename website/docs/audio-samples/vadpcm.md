---
title: "VADPCM"
tags: ["VADPCM"]
---

<WorkInProgress />

# VADPCM

## About
<Stub />

<!-- TODO: Move this somewhere else, it does not belong here -->
<!-- ## Using Custom Audio Samples in Music Files
To ensure custom audio samples are properly linked to their custom instrument bank for a music file, add an `audio samples` field to the `metadata` field of the `.metadata` file. This is the file that stores the music file's metadata, including custom audio sample linking data.

<Tabs groupId="randomizer">
    <TabItem value="ootr" label="Ocarina of Time Randomizer" default>

    ```markdown title="OOTR Music File" {4}
    📂 ./
    ├─ 📂 song.ootrs/
    │  ├─ 🎹 filename.seq
    │  ├─ 📄 filename.metadata
    │  └─ 🎵 filename.zsound
    ```

    </TabItem>

    <TabItem value="mmr" label="Majora's Mask Randomizer">

    ```markdown title="MMR Music File" {4}
    📂 ./
    ├─ 📂 song.mmrs/
    │  ├─ 🎹 filename.seq
    │  ├─ 📄 filename.metadata
    │  └─ 🎵 filename.zsound
    ```

    </TabItem>
</Tabs>

<Tabs groupId="randomizer">
    <TabItem value="ootr" label="Ocarina of Time Randomizer" default>

    <div class="annotate" markdown>
    ```yml {9-14}
    game: oot

    metadata:
      display name: "Hyrule Field"
      instrument set: 0x03
      song type: bgm
      music groups: [ Fields, HyruleField ]

      audio samples: #(1)!
        filename.zsound:
          instrument type: INST
          list index: 0
          key region: PRIM
          temp address: ~ #(2)!
    ```
    </div>

    1. The `audio samples` section must be defined at the same indentation level as `display name`, `instrument set`, `song type`, and `music groups`.
    2. Address linking only.

    </TabItem>

    <TabItem value="mmr" label="Majora's Mask Randomizer">

    <div class="annotate" markdown>
    ```yaml {9-14}
    game: mm

    metadata:
      display name: "Termina Field"
      instrument set: 0x03
      song type: bgm
      music groups: [ Fields, TerminaField ]

      audio samples:
        filename.zsound:
          instrument type: INST
          list index: 0
          key region: PRIM
          temp address: ~
    ```
    </div>

    3. The `audio samples` section must be defined at the same indentation level as `display name`, `instrument set`, `song type`, and `music groups`.
    4. Address linking only.

    </TabItem>
</Tabs>

### Custom Audio Samples Structure
The `audio samples` field is a dictionary with multiple entries. Each entry is a dictionary containing data that links an audio sample to a sample structure in the music file's custom instrument bank. The name of the dictionary is the filename of the custom audio sample file.

```yaml
audio samples:
  filename.zsound:
    instrument type: INST
    list index: 0
    key region: PRIM
    temp address: ~
```

:::info[Shared Audio Samples]

    If multiple instruments, drums, or effects share an audio sample file, only one entry that links the audio sample to its sample structure in the instrument bank is required. The entry is used to update the audio sample's address, which is applied to all references to the sample in the instrument bank across different instrument types, list indices, and key regions.

:::

### Audio Sample Mapping
There are two different ways to link custom audio samples to their sample structure in the music file's custom instrument bank:

1. Structure Linking — placeholder
2. Address Linking — placeholder

<Tabs>
    <TabItem value="structure" label="Structure Linking" default>

    ...
    ```yaml linenums="0"
    filename.zsound:
      instrument type: INST
      list index: 0
      key region: PRIM
    ```

    `instrument type`
    : The `instrument type` field specifies the list the audio sample's parent type uses. The allowed values are:
    : - `INST` — Looks for the sample's parent in the instrument list
      - `DRUM` — Looks for the sample's parent in the drum list
      - `SFX` — Looks for the sample's parent in the effect list

    `list index`
    : The `list index` field specifies the position of the audio sample's parent type in the corresponding pointer list.

    :::warning[Value Type]

        The `list index` field must be an integer value. Strings are not allowed.

    :::

    `key region`
    : The `key region` field specifies which key region the audio sample is assigned to in its parent type (Instruments only). The allowed values are:
    : - `LOW` — The audio sample is assigned to the low key region
      - `PRIM` — The audio sample is assigned to the primary key region
      - `HIGH` — The audio sample is assigned to the high key region

    :::warning[Drum and SFX Types]

        For `DRUM` and `SFX` instrument types, the `key region` field must be removed or set to `~` (`NULL`).

    :::

    </TabItem>

    <TabItem value="address" label="Address Linking">

    ...
    ```yaml linenums="0"
    filename.zsound:
      temp address: 0x7FFFFFFF
    ```

    `temp address`
    : The `temp address` field specifies the temporary address of the audio sample in the `audiotable` file.

    :::warning[Temp Address Value]

        The `temp address` value must not be the address of a vanilla audio sample.

    :::

    </TabItem>
</Tabs>

### Common Terminology

<dl>
    <dt>**Vanilla Instrument Bank**</dt>
    <dd>

    An instrument bank that exists in the ROM and is unmodified.

    </dd>

    <dt>**Custom Instrument Bank**</dt>
    <dd>

    An instrument bank that does not not exist in the ROM. It may include: vanilla instruments, custom instruments, or custom audio-sampled instruments.

    </dd>

    <dt>**Vanilla Instrument**</dt>
    <dd>

    An unmodified instrument or drum that exists in the ROM.

    </dd>

    <dt>**Custom Instrument**</dt>
    <dd>

    An instrument or drum that modifies existing vanilla instrument data but still uses vanilla audio samples.

    </dd>

    <dt>**Custom Audio-Sampled Instrument**</dt>
    <dd>

    A new or modified instrument or drum that utilizes custom audio samples.

    </dd>

    <dt>**Vanilla Audio Sample**</dt>
    <dd>

    Original VADPCM-compressed audio data from the ROM.

    </dd>

    <dt>**Custom Audio Sample**</dt>
    <dd>

    New VADPCM-compressed audio data that does not exist in the ROM and must be injected.

    </dd>
</dl>

:::warning[Common Misnomer]

    A common misnomer among the randomizer communities is that a custom instrument indicates the use of a custom audio sample. This is wrong. The term, "custom instrument", refers to an instrument that has modified data, but still uses vanilla audio samples. It does not require a custm audio sample to be considered "custom".

    On the other hand, a custom audio-sampled instrument is an instrument that uses custom audio sample data — VADPCM-compressed sample data that does not exist in the original ROM.

:::

For reference, the table below indicates...

| Type | Exists in ROM? | Data Modified? | Uses Custom Audio Samples? |
| --- | --- | --- | --- |
| Vanilla Instrument Bank | ✅ | ⛔ | ⛔ |
| Custom Instrument Bank | ⛔ | ✅ |  |
| Vanilla Instrument | ✅ | ⛔ | ⛔ |
| Custom Instrument | ⛔ | ✅ | ⛔ |
| Custom Audio-Sampled Instrument | ⛔ | ✅ | ✅ |
| Vanilla Audio Sample | ✅ | ⛔ | — |
| Custom Audio Sample | ⛔ | ✅ | — | -->