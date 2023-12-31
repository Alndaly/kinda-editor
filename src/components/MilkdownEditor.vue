<!-- MilkdownEditor.vue -->
<template>
  <Milkdown />
</template>

<script setup lang="ts">
import {
  useNodeViewFactory,
  usePluginViewFactory,
  useWidgetViewFactory,
} from '@prosemirror-adapter/vue';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/vue';
import { $view, callCommand } from '@milkdown/utils';
import CodeNode from '@/components/plugins/code-node/CodeNode.vue';
import CalloutNode from './plugins/callout-node/CalloutNode.vue';
import { codeBlockSchema, commonmark } from '@milkdown/preset-commonmark';
import { kindaThemeConfig } from '@/components/plugins/editor-theme-kinda';
import { prism } from '@milkdown/plugin-prism';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { gfm } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';
import { iframe } from './plugins/iframe-node';
import { callout } from './plugins/callout-node';
import { editorViewOptionsCtx } from '@milkdown/core';
import { calloutNode } from './plugins/callout-node/index';

import 'prosemirror-view/style/prosemirror.css';
import 'prism-themes/themes/prism-nord.css';
import 'katex/dist/katex.min.css';

const nodeViewFactory = useNodeViewFactory();
const pluginViewFactory = usePluginViewFactory();
const widgetViewFactory = useWidgetViewFactory();

const markdown = `

# Kinda Editor

> You're scared of a world where you're needed.

::iframe{src="https://alndaly.github.io"}

:::note

测试一下提醒1。

测试一下提醒2。

:::

:::info

测试一下提醒1。

测试一下提醒2。

:::

[百度一下，你就知道](https://baidu.com)

`;

const editable = () => true;

useEditor((root) =>
  Editor.make()
    .enableInspector()
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
    .use(
      $view(codeBlockSchema.node, () =>
        nodeViewFactory({ component: CodeNode })
      )
    )
    .use($view(calloutNode, () => nodeViewFactory({ component: CalloutNode })))
);
</script>
