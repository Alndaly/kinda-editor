<template>
  <div :class="selected ? 'ProseMirror-selectednode' : ''">
    <div :ref="{ contentRef }" />
  </div>
</template>
<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue';

const { contentRef, selected, node, setAttrs } = useNodeViewContext();
</script>
<style lang="scss">
.code-node {
  background-color: #2f4154;
  border-radius: 5px;
  color: white;
}
</style>
