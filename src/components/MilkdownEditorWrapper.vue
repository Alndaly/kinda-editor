<!-- MilkdownEditorWrapper.vue -->
<template>
  <MilkdownProvider>
    <ProsemirrorAdapterProvider :key="counter">
      <MilkdownEditor />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import { MilkdownProvider } from '@milkdown/vue';
const counter = ref(0);

import MilkdownEditor from '@/components/MilkdownEditor.vue';
</script>
