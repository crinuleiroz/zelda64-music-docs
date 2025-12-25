---
title: "Pitch Shifting"
tags: []
---

<WorkInProgress />

# Pitch Shifting

:::danger[Size Limit of ROM Files]

    Nintendo 64 cartridges have a size limit of 64 MiB for compressed ROM files. The Nintendo Wii has a size limit of 48 MiB for compressed ROM files. The limitation for the Nintendo Wii arises from MEM2, which consists of 64 MiB of GDDR3 SDRAM. MEM2 is divided between Starlet's OS (IOS), Broadway's OS, and the GPU. IOS reserves 12 to 16 MiB of memory from MEM2. This leaves approximately 48 MiB available for Broadway's OS and GPU functions. One of the functions of Broadway's OS is the Wii Virtual Console.

    Using custom audio samples can quickly consume this space. It is recommended to keep sample file sizes to around 10 KiB when possible.

    Emulators on PC are less constrained, allowing ROM files to exceed the 48 MiB and 64 MiB limits. However, hardware compatibility should remain a priority when using custom audio samples.

    When releasing music files that use custom audio samples publicly, be mindful that users will use them on various hardware. For compatibility across hardware, it is best practice to keep music files that use custom audio samples no larger than 100–200 KiB.

:::

## About
<Stub />
<!-- Pitch shifting, also known as transposition, is the process of changing the pitch of an audio sample, either by raising or lowering its frequency. Pitch shifting is often used in music production and sound design to adjust a sample to fit a desired key or create unique audio effects. The duration of the audio remains unchanged, with only its tonal characteristics being modified. However, pitch shifting too much can lead to audio degradation. This can cause the quality of the sample to deteriorate and produce less favorable results. To avoid this, it is best to pitch shift within a reasonable range. If a more drastic change in pitch is desired, it may be better to use a different sample altogether. -->

<!-- Maybe remove this... unsure -->
<!-- Due to the limitations of the audio engine in *Ocarina of Time* and *Majora's Mask*, audio samples cannot be pitch shifted in-game by more than 24 semitones above their root key. This is referred to as the pitch cap for an audio sample.

To work around this limitation, an audio sample can be pitch shifted out-of-game to adjust its root key. This enables an instrument to exceed its original pitch cap, and is useful when an instrument requires a pitch higher than what the in-game engine can achieve. -->

<!-- ## Pitch Shifting a WAV File
Detailed below are two methods for pitch shifting an audio sample: one using Audacity and the other using Polyphone.

<Tabs>
    <TabItem value="audacity" label="Audacity">

    To pitch shift a WAV file in Audacity, follow these steps:

    > 1. Open the WAV file in Audacity and ensure it is selected
    > 2. In the top menu, click "Effect > Pitch and Tempo > Change Pitch..."
    > 3. In the change pitch menu, locate and enter the amount of semitones to adjust the root key by in "Semitones (half-steps)", then click "Apply"
    > 4. Next, click "File > Export > Export as WAV"

    </TabItem>

    <TabItem value="polyphone" label="Polyphone">

    To pitch shift a WAV file in Polyphone, follow these steps:

    > 1. Open Polyphone, then click "New Soundfont"
    > 2. Next, click the "Add a sample" icon, or drag and drop a WAV file into the window
    > 3. Next, expand the "Samples" dropdown and select the imported audio sample
    > 4. Next, click "Toolbox :material-toolbox: > Transpose..."
    > 5. In the transpose menu, enter the amount of semitones to adjust the root key by, then click "Ok"
    > 6. Next, with the audio sample still selected, click "Toolbox :material-toolbox: > Wav export..."

    </TabItem>
</Tabs>

:::info[Adjusting Sample Loop Points While Pitch Shifting]

    If the audio sample being pitch shifted has loop information, Polyphone will automatically adjust it. Manual adjustment of the loop information is only necessary if Polyphone does not automatically adjust it.

::: -->