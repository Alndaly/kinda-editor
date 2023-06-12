<!-- MilkdownEditorWrapper.vue -->
<template>
  <MilkdownProvider>
    <MilkdownEditor />
  </MilkdownProvider>
</template>

<script setup>
import { MilkdownProvider } from '@milkdown/vue';
import MilkdownEditor from '@/components/MilkdownEditor.vue';
</script>
