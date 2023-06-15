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
import { iframe } from './plugins/iframe-node';
import { callout } from './plugins/callout-node';
import { editorViewOptionsCtx } from '@milkdown/core';

import 'prosemirror-view/style/prosemirror.css';
import 'prism-themes/themes/prism-nord.css';
import 'katex/dist/katex.min.css';

const markdown = `

# Kinda Editor

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Vue**.

::iframe{src="https://saul-mirone.github.io"}

:::note

测试一下提醒1。

测试一下提醒2。

:::

[百度一下，你就知道](https://baidu.com)

`;

const editable = () => true;

useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, markdown);
      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable,
      }));
    })
    .config(kindaThemeConfig)
    .use(commonmark)
    .use(gfm)
    .use(prism)
    .use(history)
    .use(clipboard)
    .use(math)
    .use(callout)
    .use(iframe)
);
</script>
