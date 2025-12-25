---
title: "Looping"
tags: []
---

<WorkInProgress />

# Audio Sample Looping

:::danger[Size Limit of ROM Files]

    Nintendo 64 cartridges have a size limit of 64 MiB for compressed ROM files. The Nintendo Wii has a size limit of 48 MiB for compressed ROM files. The limitation for the Nintendo Wii arises from MEM2, which consists of 64 MiB of GDDR3 SDRAM. MEM2 is divided between Starlet's OS (IOS), Broadway's OS, and the GPU. IOS reserves 12 to 16 MiB of memory from MEM2. This leaves approximately 48 MiB available for Broadway's OS and GPU functions. One of the functions of Broadway's OS is the Wii Virtual Console.

    Using custom audio samples can quickly consume this space. It is recommended to keep sample file sizes to around 10 KiB when possible.

    Emulators on PC are less constrained, allowing ROM files to exceed the 48 MiB and 64 MiB limits. However, hardware compatibility should remain a priority when using custom audio samples.

    When releasing music files that use custom audio samples publicly, be mindful that users will use them on various hardware. For compatibility across hardware, it is best practice to keep music files that use custom audio samples no larger than 100–200 KiB.

:::

## About
<Stub />

<!-- ## Looping an Audio Sample
<Stub />

<Tabs>
    <TabItem value="z64audio" label="z64audio">

    <Stub />

    </TabItem>

    <TabItem value="polyphone" label="Polyphone">

    > 1. Open Polyphone, then click "New Soundfont"
    > 2. Drag the `.wav` file into the Polyphone window.
    > 3. Left-Click anywhere on the waveform visualization to set the "Loop Start" marker, Right-Click anywhere after a "Loop Start" marker to create a "Loop End" marker.
    > 4. Once the loop markers have been set up, click the toolbox icon at the top of the Polyphone window, then click "Auto Loop" (this will adjust the loop automatically).
    > 5. Listen to the loop and adjust it as needed, undoing any changes with ++ctrl+z++ or ++cmd+z++
    > 6. Once content with how the loop sounds, export the sample as a `.wav` file by clicking the toolbox icon at the top of the Polyphone window, then click "Wav Export...".

    </TabItem>
</Tabs> -->