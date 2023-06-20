<template>
  <div
    :class="selected ? 'ProseMirror-selectednode' : ''"
    class="code-node q-pa-md q-mb-md"
  >
    <div class="row justify-between">
      <q-select
        outlined
        dense
        :dark="$q.dark.isActive"
        @update:modelValue="onLanguageChange"
        v-model="language"
        :options="languageOptions"
      />
      <q-btn flat @click.prevent="onCopyCode">Copy</q-btn>
    </div>
    <pre
      :spellCheck="false"
      :data-language="node.attrs.language"
      class="pre-code"
    ><code class="code-box" :ref="contentRef"></code></pre>
  </div>
</template>
<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue';
import { ref } from 'vue';

const { contentRef, selected, node, setAttrs } = useNodeViewContext();
const languageOptions = ref(['shell', 'text', 'javascript']);
const language = ref(node.value.attrs.language || 'text');

const onCopyCode = (e: any) => {
  navigator.clipboard.writeText(node.value.textContent);
};

const onLanguageChange = (e: string) => {
  setAttrs({
    language: e,
  });
};
</script>
<style lang="scss">
.body--dark {
  .code-node {
    background-color: #2f4154;
    border-radius: 5px;
  }
}
.body--light {
  .code-node {
    background-color: rgb(229, 231, 235);
    border-radius: 5px;
  }
}
.pre-code {
  height: fit-content;
}
.code-box {
  box-sizing: content-box;
  height: auto;
}
</style>
