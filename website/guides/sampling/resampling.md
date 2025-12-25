---
title: "Resampling"
tags: []
---

<WorkInProgress />

# Resampling

:::danger[Size Limit of ROM Files]

    Nintendo 64 cartridges have a size limit of 64 MiB for compressed ROM files. The Nintendo Wii has a size limit of 48 MiB for compressed ROM files. The limitation for the Nintendo Wii arises from MEM2, which consists of 64 MiB of GDDR3 SDRAM. MEM2 is divided between Starlet's OS (IOS), Broadway's OS, and the GPU. IOS reserves 12 to 16 MiB of memory from MEM2. This leaves approximately 48 MiB available for Broadway's OS and GPU functions. One of the functions of Broadway's OS is the Wii Virtual Console.

    Using custom audio samples can quickly consume this space. It is recommended to keep sample file sizes to around 10 KiB when possible.

    Emulators on PC are less constrained, allowing ROM files to exceed the 48 MiB and 64 MiB limits. However, hardware compatibility should remain a priority when using custom audio samples.

    When releasing music files that use custom audio samples publicly, be mindful that users will use them on various hardware. For compatibility across hardware, it is best practice to keep music files that use custom audio samples no larger than 100–200 KiB.

:::

## About
<Stub />
<!-- Resampling, also known as sample rate conversion, is the process of changing the sample rate of an audio sample. This process is typically done when an audio sample must be adjusted to fit the requirements of a particular system or application. Importantly, resampling preserves the pitch and overall audio quality, ensuring the sound remains true to its original form. While resampling can be associated with audio compression, its primary purpose is not compression. -->

<!-- ## Resampling a WAV File
Detailed below are two methods for resampling an audio sample: one using Audacity and the other using Polyphone.

<Tabs>
    <TabItem value="audacity" label="Audacity">

    To resample a WAV file in Audacity, follow these steps:

    > 1. Open the WAV file in Audacity and ensure it is selected
    > 2. In the top menu, click "Tracks > Resample..."
    > 3. In the resample menu, choose the desired sample rate from the dropdown menu, then click "OK"
    > 4. Next, click "Audio Setup > Audio Settings..."
    > 5. In the audio settings menu, locate and change "Project Sample Rate" to match the sample rate the audio file was resampled to, then click "OK"
    > 6. Next, click "File > Export > Export as WAV"

    </TabItem>

    <TabItem value="polyphone" label="Polyphone">

    To resample a WAV file in Polyphone, follow these steps:

    > 1. Open Polyphone, then click "New soundfont"
    > 2. Next, click the "Add a sample" icon or drag and drop a WAV file into the window
    > 3. Next, expand the "Samples" dropdown and select the imported audio sample
    > 4. In the audio sample window, locate "Sample Rate" in the "Information" section, then choose the desired sample rate from the dropdown menu
    > 5. Next, with the audio sample still selected, click "Toolbox :material-toolbox: > Wav export..."

    </TabItem>
</Tabs> -->