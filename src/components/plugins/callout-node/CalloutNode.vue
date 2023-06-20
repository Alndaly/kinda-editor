<template>
  <div
    :class="[{ 'ProseMirror-selectednode': selected }, backgroundColor]"
    class="callout-node q-pa-md q-mb-md"
  >
    <div class="q-pb-md title">{{ title }}</div>
    <div :ref="contentRef" />
  </div>
</template>
<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue';
import { ref } from 'vue';
const title = ref('');
const backgroundColor = ref('');
const { contentRef, selected, node, setAttrs } = useNodeViewContext();
switch (node.value.attrs.degree) {
  case 'info':
    title.value = '信息';
    backgroundColor.value = 'bg-info';
    break;
  case 'warning':
    title.value = '警告';
    backgroundColor.value = 'bg-negative';
    break;
  case 'tip':
    title.value = '提示';
    backgroundColor.value = 'bg-warning';
    break;
  case 'note':
    title.value = '备注';
    backgroundColor.value = 'bg-primary';
    break;
  default:
    break;
}
</script>
<style lang="scss">
.callout-node {
  .title {
    font-size: 17px;
    font-weight: bold;
  }
  border-radius: 5px;
  color: white;
}
</style>
