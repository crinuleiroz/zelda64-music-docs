---
title: "ROM"
tags: []
---

# ROM Tools

:::danger[ROM File]

    The documentation can not and will not supply any ROM files or links to any ROM files for *Ocarina of Time* or *Majora's Mask*. This site does not condone or facilitate piracy in any capacity.

:::

## SEQ64

:::warning[SEQ64 Version 2.x]

    SEQ64 version 2.x and higher can only create sequence files. For purposes other than creating sequence files, use SEQ64 version 1.x.

:::

### SEQ64 Version 1.x

<div className="grid cards">

<GridCard
  name='SEQ64 Version 1.0'
  platforms={['Windows', 'macOS', 'Linux']}
  description="A tool for creating and editing music sequences for first-party Nintendo 64 games."
  link='https://github.com/sauraen/seq64/releases/tag/V1.0'
  downloadType='page'
/>

<GridCard
  name='SEQ64 Version 1.5'
  platforms={['Windows', 'macOS', 'Linux']}
  description="A tool for creating and editing music sequences for first-party Nintendo 64 games."
  link='https://github.com/sauraen/seq64/releases/tag/V1.5'
  downloadType='page'
/>

</div>

### SEQ64 Version 2.x

<div className="grid cards">

<GridCard
  name='SEQ64 Version 2.x'
  platforms={['Windows', 'macOS', 'Linux']}
  description="A tool for creating and editing music sequences for first-party Nintendo 64 games."
  link='https://github.com/sauraen/seq64/releases/latest'
  downloadType='page'
/>

</div>

### ROM Description

:::info[ROM Description Compatibility]

    ROM description files are for SEQ64 version 1.x only.

:::

<div className="grid cards">

<GridCard
  name='Ocarina of Time ROM Description'
  platforms={['XML File']}
  description={
    <>
    A data file that describes data for <em>Ocarina of Time</em> NTSC version 1.0 ROM files.
    </>
  }
  link='https://gist.github.com/crinuleiroz/cd597dc8c4e40da77fd87d0d41107325/archive/cb5a01d075734ccba0ae6cf5b8d9c9584098816b.zip'
  downloadType='file'
/>

<GridCard
  name="Majora's Mask ROM Description"
  platforms={['XML File']}
  description={
    <>
    A data file that holds ROM data for <em>Majora's Mask</em> NTSC-U version 1.0 ROM files.
    </>
  }
  link='https://gist.github.com/crinuleiroz/2c422532dfa6ff9ac03a7197b08f6d2c/archive/ca1e4f099960a015e0d6a363e20174a8e8519501.zip'
  downloadType='file'
/>

</div>

### Application Binary Interface

:::info[ABI File Compatibility]

    ABI files are for SEQ64 version 2.x only.

:::

<div className="grid cards">

<GridCard
  name='Ocarina of Time ABI'
  platforms={['XML File']}
  description={
    <>
    A data file for SEQ64 version 2.x containing ASEQ message definitions for <em>Ocarina of Time</em>.
    </>
  }
  link=''
  downloadType='file'
/>

<GridCard
  name="Majora's Mask ABI"
  platforms={['XML File']}
  description={
    <>
    A data file for SEQ64 version 2.x containing ASEQ message definitions for <em>Majora's Mask</em>.
    </>
  }
  link=''
  downloadType='file'
/>

</div>

## Decompression

<div className="grid cards">

<GridCard
  name='z64decompress'
  platforms={['Windows', 'Linux']}
  description="A tool for decompressing Zelda 64 ROM files and individual files."
  link='https://github.com/z64utils/z64decompress/releases'
  downloadType='page'
/>

<GridCard
  name="ndec"
  platforms={['Windows']}
  description="A tool for decompressing Zelda 64 ROM files written in straight C."
  link='https://github.com/aroenai/ndec/releases'
  downloadType='page'
/>

</div>