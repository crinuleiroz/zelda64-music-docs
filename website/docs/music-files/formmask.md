---
title: "Formmask"
tags: ["MMR"]
---

# Formmask

:::note

    All information on this page pertaining to formmask format and location in a music file is only applicable to a currently unreleased fork of Majora's Mask Randomizer. All other data is applicable to all versions of Majora's Mask Randomizer unless otherwise specified.

:::

## About
Formmask is a Majora's Mask Randomizer feature that enables or disables specific sequence channels based on Link's current form or state. This allows for the creation of more dynamic audio sequences than is normally possible in the original game.

:::info[Version Availability]

    The Formmask feature was introduced in version 1.15.0.21 of the Majora's Mask Randomizer. Sequences that include a formmask file will ignore it in versions below 1.15.0.21. Instead, all sequence channels will play regardless of their intended form or state.

:::

:::warning[Non-Usable Music Groups]

    The formmask feature does not work with fanfares or combat music. When used with these types of music, the game will play all available channels regardless of the data in the formmask list.

:::

### Forms and States
The term "form" refers to the different physical forms Link can take when the player equips a transformation mask. Similarly, the term "state" refers to various in-game conditions as defined by Majora's Mask Randomizer.

:::tip[Available Form and State Values]

    For a list of supported forms and states usable for the latest version of Majora's Mask Randomizer, see the [Available Form and State Values](#available-form-and-state-values) section of this page.

:::

## Using Formmask in Music Files
To use the formmask feature for a music file, add a `formmask` section to the 'metadata' dictionary in the music file's `.metadata` file.

```yaml {9-15}
game: mm

metadata:
  display name: "Termina Field"
  instrument set: 0x03
  song type: bgm
  music groups: [ Fields, TerminaField ]

  formmask:
    channels:
      6: [ Human, FierceDeity ]
      9: [ Human, FierceDeity ]
    cumulative states: [
      Night, Indoors, Combat, CriticalHealth
    ]
```

### Formmask Metadata Structure
The `formmask` field is a dictionary with 2 entries:

- The `channels` entry defines a dictionary of channels and conditions.
    - Each key represents one of 16 corresponding audio sequence channels, with their names being the index of the channel.
    - Each value represents a list of conditions (forms and states) that control when the channel is enabled or disabled.
- The `cumulative states` entry defines a list of states that add to the set of enabled channels without disabling others.

```yaml
formmask:
  channels:
    0:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    1:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    2:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    3:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    4:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    5:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    6:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    7:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    8:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    9:  [ Human, Deku, Goron, Zora, FierceDeity, All ]
    10: [ Human, Deku, Goron, Zora, FierceDeity, All ]
    11: [ Human, Deku, Goron, Zora, FierceDeity, All ]
    12: [ Human, Deku, Goron, Zora, FierceDeity, All ]
    13: [ Human, Deku, Goron, Zora, FierceDeity, All ]
    14: [ Human, Deku, Goron, Zora, FierceDeity, All ]
    15: [ Human, Deku, Goron, Zora, FierceDeity, All ]
  cumulative states: [
    Day, Night, Indoors, Outdoors, Cave,
    Swim, Combat, Epona, SpikeRolling, CriticalHealth
  ]
```

### How Channels Are Enabled
Formmask creates a set of conditions that determine when sequence channels should be enabled (unmuted) or disabled (muted). These conditions are based on Link's current form or the game's current state.

- A channel is enabled when any of its listed conditions (forms or states) are met.
- Only channels with matching conditions are enabled — all others are disabled.
- If multiple conditions are active, all channels matching at least one active condition are enabled.
- Cumulative states add to the set of enabled channels without disabling any that are already enabled.

:::warning[Cumulative States]

    Channels requiring only cumulative states must also include at least one form condition. Without an accompanying form, cumulative states cannot enable the channel they are assigned to.

:::

### Examples

<Tabs>
    <TabItem value="example-1" label="Example 1" default>

    ```yaml
    formmask:
      channels:
        0:  [ All ]
        1:  [ All ]
        2:  [ All ]
        3:  [ All ]
        4:  [ All ]
        5:  [ All ]
        6:  [ All ]
        7:  [ Swim ]
        8:  [ Swim ]
        9:  [ All ]
        10: [ Combat ]
        11: [ Combat ]
        12: [ Combat ]
        13: [ Swim ]
        14: [ All ]
        15: [ All ]
      cumulative states: [ Epona, SpikeRolling ]
    ```

    In this example:

    - Channels 0 to 6, 9, 14, and 15 are enabled when Link is in any form (Hylian, Deku, Goron, Zora, or Fierce Deity). All other channels will be disabled.
    - Channels 7, 8, and 13 are enabled when Link is swimming. All other channels will be disabled.
    - Channels 10, 11, and 12 are enabled when Link is in combat. All other channels will be disabled.
    - When Link is in the `Epona` or `SpikeRolling` state, all currently enabled channels will remain enabled. No additional channels will be enabled or disabled.

    </TabItem>

    <TabItem value="example-2" label="Example 2">

    ```yaml
    formmask:
      channels:
        0:  [ All ]
        1:  [ All ]
        2:  [ All ]
        3:  [ All ]
        4:  [ All ]
        5:  [ All ]
        6:  [ All ]
        7:  [ All ]
        8:  [ All ]
        9:  [ All ]
        10: [ All ]
        11: [ Swim ]
        12: [ All ]
        13: [ All, Combat ]
        14: [ All ]
        15: [ All ]
      cumulative states: [ Epona, SpikeRolling, Combat ]
    ```

    In this example:

    - Channels 0 to 11, 14 and 15 are enabled when Link is in any form (Hylian, Deku, Goron, Zora, or Fierce Deity). All other channels will be disabled.
    - Channel 11 is enabled when Link is swimming. All other channels will be disabled.
    - When Link is in the `Epona`, `SpikeRolling`, or `Combat` states, all currently enabled channels will remain enabled. If Link is in combat, then channel 13 will be enabled in addition to any already enabled channels.

    </TabItem>
</Tabs>

## Available Form and State Values

<Tabs>
    <TabItem value="forms" label="Forms" default>

    <table>
      <thead>
        <tr>
          <th>Form</th>
          <th>Description</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          **Human**
          </td>
          <td>
          The assigned channel will be enabled when Link is in his Hylian form.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **Deku**
          </td>
          <td>
          The assigned channel will be enabled when Link is in his Deku form.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **Goron**
          </td>
          <td>
          The assigned channel will be enabled when Link is in his Goron form.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **Zora**
          </td>
          <td>
          The assigned channel will be enabled when Link is in his Zora form.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **FierceDeity**
          </td>
          <td>
          The assigned channel will be enabled when Link is in his Fierce Deity form.
          </td>
          <td align="center">
          1.16.0.12
          </td>
        </tr>
        <tr>
          <td>
          **All**
          </td>
          <td>
          The assigned channel will be enabled for all of Link's forms.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
      </tbody>
    </table>

    </TabItem>

    <TabItem value="states" label="States" default>

    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>Description</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          **Day**
          </td>
          <td>
          The assigned channel will be enabled when it is daytime.
          </td>
          <td align="center">
          —
          </td>
        </tr>
        <tr>
          <td>
          **Night**
          </td>
          <td>
          The assigned channel will be enabled when it is nighttime.
          </td>
          <td align="center">
          —
          </td>
        </tr>
        <tr>
          <td>
          **Indoors**
          </td>
          <td>
          The assigned channel will be enabled when Link is indoors.
          </td>
          <td align="center">
          1.16.0.12
          </td>
        </tr>
        <tr>
          <td>
          **Outdoors**
          </td>
          <td>
          The assigned channel will be enabled when Link is outdoors.
          </td>
          <td align="center">
          1.16.0.12
          </td>
        </tr>
        <tr>
          <td>
          **Cave**
          </td>
          <td>
          The assigned channel will be enabled when Link is in a cave.
          </td>
          <td align="center">
          1.16.0.12
          </td>
        </tr>
        <tr>
          <td>
          **Swim**
          </td>
          <td>
          The assigned channel will be enabled when Link is swimming.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **Combat**
          </td>
          <td>
          The assigned channel will be enabled when Link is near, or fighting, an enemy.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **Epona**
          </td>
          <td>
          The assigned channel will be enabled when Link is riding Epona.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **SpikeRolling**
          </td>
          <td>
          The assigned channel will be enabled when Goron Link is rolling with spikes.
          </td>
          <td align="center">
          1.15.0.21
          </td>
        </tr>
        <tr>
          <td>
          **CriticalHealth**
          </td>
          <td>
          The assigned channel will be enabled when Link is at critical health.
          </td>
          <td align="center">
          1.16.0.12
          </td>
        </tr>
      </tbody>
    </table>

    </TabItem>
</Tabs>

## Testing a Formmask Enabled Music File
To test formmask with a music file, it must be playing on the file select screen of a game ROM randomized by Majora's Mask Randomizer.

Use the following controls to cycle through available forms and states:

| Button | Action |
| --- | --- |
| **D-Pad Up** | Switches to the next form or non-cumulative state. |
| **D-Pad Down** | Switches to the previous form or non-cumulative state. |
| **D-Pad Left** | Switches to the next cumulative state. |
| **D-Pad Right** | Switches to the previous cumulative state. |