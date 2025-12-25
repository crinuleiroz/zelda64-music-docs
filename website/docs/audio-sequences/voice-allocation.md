---
title: "Voice Allocation"
---

# Voice Allocation

## About
<Stub />

The audio engine in *Ocarina of Time* and *Majora's Mask* has a limited number of voices available for audio sample playback handled by ASEQ Note messages. To manage this constraint, the audio engine uses a voice allocation system that determines how voices are assigned to notes during audio sample playback.

### Note Pools
The audio engine separates notes into different groups, known as note pools, based on their playback status:

- **Active**: notes playing with a delay time greater than zero
- **Decaying**: notes in their release phase
- **Releasing**: notes whose voice has been reallocated to a new note
- **Disabled**: notes that have finished playback

Once a note begins playing it is added to the `active` note pool, then once the note enters its release phase it is removed from the `active` pool and put into the `decaying` pool. Once the note finishes its playback

## Voice Allocation Policy
<Stub />

Both *Ocarina of Time* and *Majora's Mask* have five voice allocation policies that affect how a sequence channel will allocate voices to queued notes. The voice allocation policy can be changed by sending the ASEQ Voice Allocation Policy message to either the sequence header or a sequence channel.

### Policy 1: Note Layer
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    // Note Layer
    if (policy & 1)
    {
        note = layer->note;
        if (note != NULL
            && note->playbackState.prevParentLayer == layer
            && note->playbackState.wantedParentLayer == NO_LAYER)
        {
            Audio_NoteReleaseAndTakeOwnership(note, layer);
            Audio_AudioListRemove(&note->listItem);
            AudioSeq_AudioListPushBack(&note->listItem.pool->releasing, &note->listItem);
            return note;
        }
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    // Note Layer
    if (policy & 1)
    {
        note = layer->note;
        if ((note != NULL)
            && (note->playbackState.prevParentLayer == layer)
            && (note->playbackState.wantedParentLayer == NO_LAYER))
        {
            AudioPlayback_NoteReleaseAndTakeOwnership(note, layer);
            AudioList_Remove(&note->listItem);
            AudioList_PushBack(&note->listItem.pool->releasing, &note->listItem);
            return note;
        }
    }
    ```

    </TabItem>
</Tabs>

### Policy 2: Local Note Pools
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    // Local Note Pools
    if (policy & 2)
    {
        if (!(note = Audio_AllocNoteFromDisabled(&layer->channel->notePool, layer))
            && !(note = Audio_AllocNoteFromDecaying(&layer->channel->notePool, layer))
            && !(note = Audio_AllocNoteFromActive(&layer->channel->notePool, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    // Local Note Pools
    if (policy & 2)
    {
        if (!(note = AudioPlayback_AllocNoteFromDisabled(&layer->channel->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromDecaying(&layer->channel->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromActive(&layer->channel->notePool, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>
</Tabs>

### Policy 4: Shared Note Pools
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    // Shared Note Pools
    if (policy & 4)
    {
        if (!(note = Audio_AllocNoteFromDisabled(&layer->channel->notePool, layer))
            && !(note = Audio_AllocNoteFromDisabled(&layer->channel->seqPlayer->notePool, layer))
            && !(note = Audio_AllocNoteFromDecaying(&layer->channel->notePool, layer))
            && !(note = Audio_AllocNoteFromDecaying(&layer->channel->seqPlayer->notePool, layer))
            && !(note = Audio_AllocNoteFromActive(&layer->channel->notePool, layer))
            && !(note = Audio_AllocNoteFromActive(&layer->channel->seqPlayer->notePool, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    // Shared Note Pools
    if (policy & 4)
    {
        if (!(note = AudioPlayback_AllocNoteFromDisabled(&layer->channel->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromDisabled(&layer->channel->seqPlayer->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromDecaying(&layer->channel->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromDecaying(&layer->channel->seqPlayer->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromActive(&layer->channel->notePool, layer))
            && !(note = AudioPlayback_AllocNoteFromActive(&layer->channel->seqPlayer->notePool, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>
</Tabs>

### Policy 8: Global Note Pools
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    // Global Note Pools
    if (policy & 8)
    {
        if (!(note = Audio_AllocNoteFromDisabled(&gAudioCtx.noteFreeLists, layer))
            && !(note = Audio_AllocNoteFromDecaying(&gAudioCtx.noteFreeLists, layer))
            && !(note = Audio_AllocNoteFromActive(&gAudioCtx.noteFreeLists, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    // Global Note Pools
    if (policy & 8)
    {
        if (!(note = AudioPlayback_AllocNoteFromDisabled(&gAudioCtx.noteFreeLists, layer))
            && !(note = AudioPlayback_AllocNoteFromDecaying(&gAudioCtx.noteFreeLists, layer))
            && !(note = AudioPlayback_AllocNoteFromActive(&gAudioCtx.noteFreeLists, layer)))
        {
            goto null_return;
        }
        return note;
    }
    ```

    </TabItem>
</Tabs>

### Default Policy
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    // Default Voice Allocation Policy
    if (!(note = Audio_AllocNoteFromDisabled(&layer->channel->notePool, layer))
        && !(note = Audio_AllocNoteFromDisabled(&layer->channel->seqPlayer->notePool, layer))
        && !(note = Audio_AllocNoteFromDisabled(&gAudioCtx.noteFreeLists, layer))
        && !(note = Audio_AllocNoteFromDecaying(&layer->channel->notePool, layer))
        && !(note = Audio_AllocNoteFromDecaying(&layer->channel->seqPlayer->notePool, layer))
        && !(note = Audio_AllocNoteFromDecaying(&gAudioCtx.noteFreeLists, layer))
        && !(note = Audio_AllocNoteFromActive(&layer->channel->notePool, layer))
        && !(note = Audio_AllocNoteFromActive(&layer->channel->seqPlayer->notePool, layer))
        && !(note = Audio_AllocNoteFromActive(&gAudioCtx.noteFreeLists, layer)))
    {
        goto null_return;
    }
    return note;
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    // Default Voice Allocation Policy
    if (!(note = AudioPlayback_AllocNoteFromDisabled(&layer->channel->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromDisabled(&layer->channel->seqPlayer->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromDisabled(&gAudioCtx.noteFreeLists, layer))
        && !(note = AudioPlayback_AllocNoteFromDecaying(&layer->channel->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromDecaying(&layer->channel->seqPlayer->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromDecaying(&gAudioCtx.noteFreeLists, layer))
        && !(note = AudioPlayback_AllocNoteFromActive(&layer->channel->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromActive(&layer->channel->seqPlayer->notePool, layer))
        && !(note = AudioPlayback_AllocNoteFromActive(&gAudioCtx.noteFreeLists, layer)))
    {
        goto null_return;
    }
    return note;
    ```

    </TabItem>
</Tabs>

### Allocate Note from Disabled
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    Note* Audio_AllocNoteFromDisabled(NotePool* pool, SequenceLayer* layer)
    {
        Note* note = AudioSeq_AudioListPopBack(&pool->disabled);

        if (note != NULL)
        {
            Audio_NoteInitForLayer(note, layer);
            Audio_AudioListPushFront(&pool->active, &note->listItem);
        }
        return note;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    Note* AudioPlayback_AllocNoteFromDisabled(NotePool* pool, SequenceLayer* layer)
    {
        Note* note = AudioList_PopBack(&pool->disabled);

        if (note != NULL)
        {
            AudioPlayback_NoteInitForLayer(note, layer);
            AudioList_PushFront(&pool->active, &note->listItem);
        }
        return note;
    }
    ```

    </TabItem>
</Tabs>

### Allocate Note from Decaying
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    Note* Audio_AllocNoteFromDecaying(NotePool* pool, SequenceLayer* layer)
    {
        Note* note = AudioSeq_AudioListPopBack(&pool->decaying);

        if (note != NULL)
        {
            Audio_NoteReleaseAndTakeOwnership(note, layer);
            AudioSeq_AudioListPushBack(&pool->releasing, &note->listItem);
        }
        return note;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    Note* AudioPlayback_AllocNoteFromDecaying(NotePool* pool, SequenceLayer* layer)
    {
        Note* note = AudioList_FindNoteWithPrioLessThan(&pool->decaying, layer->channel->notePriority);

        if (note != NULL)
        {
            AudioPlayback_NoteReleaseAndTakeOwnership(note, layer);
            AudioList_Remove(&note->listItem);
            AudioList_PushBack(&pool->releasing, &note->listItem);
        }
        return note;
    }
    ```

    </TabItem>
</Tabs>

### Allocate Note from Active
<Stub />

<Tabs groupId="decomp">
    <TabItem value="oot" label="Ocarina of Time Decompilation" default>

    ```c title="playback.c"
    Note* Audio_AllocNoteFromActive(NotePool* pool, SequenceLayer* layer)
    {
        Note* rNote;
        Note* aNote;
        signed long rPriority;
        signed long aPriority;

        rPriority = aPriority = 0x10;
        rNote = Audio_FindNoteWithPrioLessThan(&pool->releasing, layer->channel->notePriority);

        if (rNote != NULL)
        {
            rPriority = rNote->playbackState.priority;
        }

        aNote = Audio_FindNoteWithPrioLessThan(&pool->active, layer->channel->notePriority);

        if (aNote != NULL)
        {
            aPriority = aNote->playbackState.priority;
        }

        if (rNote == NULL && aNote == NULL)
        {
            return NULL;
        }

        if (aPriority < rPriority)
        {
            Audio_AudioListRemove(&aNote->listItem);
            func_800E82C0(aNote, layer);
            AudioSeq_AudioListPushBack(&pool->releasing, &aNote->listItem);
            aNote->playbackState.priority = layer->channel->notePriority;
            return aNote;
        }
        rNote->playbackState.wantedParentLayer = layer;
        rNote->playbackState.priority = layer->channel->notePriority;
        return rNote;
    }
    ```

    </TabItem>

    <TabItem value="mm" label="Majora's Mask Decompilation">

    ```c title="playback.c"
    Note* AudioPlayback_AllocNoteFromActive(NotePool* pool, SequenceLayer* layer)
    {
        Note* rNote;
        Note* aNote;
        signed long rPriority;
        signed long aPriority;

        rPriority = aPriority = 0x10;
        rNote = AudioList_FindNoteWithPrioLessThan(&pool->releasing, layer->channel->notePriority);

        if (rNote != NULL)
        {
            rPriority = rNote->playbackState.priority;
        }

        aNote = AudioList_FindNoteWithPrioLessThan(&pool->active, layer->channel->notePriority);

        if (aNote != NULL)
        {
            aPriority = aNote->playbackState.priority;
        }

        if ((rNote == NULL) && (aNote == NULL))
        {
            return NULL;
        }

        if (aPriority < rPriority)
        {
            AudioList_Remove(&aNote->listItem);
            func_801963E8(aNote, layer);
            AudioList_PushBack(&pool->releasing, &aNote->listItem);
            aNote->playbackState.priority = layer->channel->notePriority;
            return aNote;
        }
        rNote->playbackState.wantedParentLayer = layer;
        rNote->playbackState.priority = layer->channel->notePriority;
        return rNote;
    }
    ```

    </TabItem>
</Tabs>

{/* Invisible footnotes */}
<span style={{ display: 'none' }}>[^1]</span>
<span style={{ display: 'none' }}>[^2]</span>
<span style={{ display: 'none' }}>[^3]</span>
<span style={{ display: 'none' }}>[^4]</span>
<span style={{ display: 'none' }}>[^5]</span>
<span style={{ display: 'none' }}>[^6]</span>
<span style={{ display: 'none' }}>[^7]</span>

{/* Voice allocation policies */}
[^1]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L866-L927](https://github.com/zeldaret/oot/blob/c6dbebfcd25ea86ceefcc8957a2d3ec8f8f4d67b/src/audio/internal/playback.c#L866-L927)
[^2]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [playback.c#L947-L1088](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/playback.c#L947-L1008)

{/* Allocate from active */}
[^2]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L831-L864](https://github.com/zeldaret/oot/blob/c6dbebfcd25ea86ceefcc8957a2d3ec8f8f4d67b/src/audio/internal/playback.c#L831-L864)
[^3]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [playback.c#L912-L945](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/playback.c#L912-L945)

{/* Allocate from decaying */}
[^4]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L822-L829](https://github.com/zeldaret/oot/blob/c6dbebfcd25ea86ceefcc8957a2d3ec8f8f4d67b/src/audio/internal/playback.c#L822-L829)
[^5]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [playback.c#L901-L910](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/playback.c#L901-L910)

{/* Allocate from disabled */}
[^6]: Zelda Reverse Engineering Team, Ocarina of Time Decompilation Project, Github Repository, [ZeldaRET/oot](https://github.com/zeldaret/oot), [seqplayer.c#L813-L820](https://github.com/zeldaret/oot/blob/c6dbebfcd25ea86ceefcc8957a2d3ec8f8f4d67b/src/audio/internal/playback.c#L813-L820)
[^7]: Zelda Reverse Engineering Team, Majora's Mask Decompilation Project, Github Repository, [ZeldaRET/mm](https://github.com/zeldaret/mm), [playback.c#L891-L899](https://github.com/zeldaret/mm/blob/d31ceacfdf468456d1052ca8af981f06040e0ac4/src/audio/lib/playback.c#L891-L899)