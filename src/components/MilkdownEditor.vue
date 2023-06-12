<!-- MilkdownEditor.vue -->
<template>
  <Milkdown />
</template>

<script setup>
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/vue';
import { kindaThemeConfig } from '@/components/plugins/editor-theme-kinda';
import { commonmark } from '@milkdown/preset-commonmark';
import { prism } from '@milkdown/plugin-prism';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { gfm } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';

import 'prism-themes/themes/prism-nord.css';
import 'katex/dist/katex.min.css';

const markdown = `# Milkdown Vue Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Vue**.`;

useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, markdown);
    })
    .config(kindaThemeConfig)
    .use(commonmark)
    .use(gfm)
    .use(prism)
    .use(history)
    .use(clipboard)
    .use(math)
);
</script>
