import type { MilkdownPlugin } from '@milkdown/ctx'
import { Node } from 'prosemirror-model'
import { $inputRule, $node, $remark, $useKeymap, $command } from '@milkdown/utils';
import { commandsCtx } from '@milkdown/core'
import { Selection } from '@milkdown/prose/state'
import { paragraphSchema } from '@milkdown/preset-commonmark'
import directive from 'remark-directive';
import { wrappingInputRule } from '@milkdown/prose/inputrules';

const remarkDirective = $remark(() => {
  return directive
})

const calloutId = 'callout'

const directiveNode = $node('callout', () => {
  return ({
    content: 'block+',
    group: 'block',
    defining: true,
    attrs: {
      degree: { default: 'info' },
    },
    parseDOM: [{
      tag: `div[data-type="${calloutId}"]`,
      getAttrs: (dom) => {
        return ({
          degree: (dom as HTMLElement).getAttribute('degree'),
        })
      },
    }],
    toDOM: (node: Node) => [
      'div', { ...node.attrs }, 0
    ],
    parseMarkdown: {
      match: (node) => {
        return node.name === 'info' || node.name === 'warning' || node.name === 'note' || node.name === 'tip'
      },
      runner: (state, node, type) => {
        state.openNode(type, { degree: node.name }).next(node.children).closeNode();
      },
    },
    toMarkdown: {
      match: (node) => {
        return node.type.name === 'callout'
      },
      runner: (state, node) => {
        state.addNode('containerDirective', undefined, undefined, {
          name: 'callout',
          attributes: node.attrs,
        });
      },
    }
  });
})

const isInCallout = (state: any) => {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--)
    if ($head.node(d).type.name == 'callout')
      return true;
  return false;
}

const findCalloutNodeDeep = (state: any) => {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--)
    if ($head.node(d).type.name == 'callout')
      return d
}

export const quitCalloutCommand = $command('QuitCallout', () => () => (state, dispatch) => {
  if (!isInCallout(state))
    return false
  const { $head, } = state.selection
  if (dispatch) {
    const calloutNodeDeep = findCalloutNodeDeep(state)
    const pos = $head.after(calloutNodeDeep), tr = state.tr
    tr
      .replaceWith(pos, pos, paragraphSchema.type().createAndFill()!)
    tr.setSelection(Selection.near(tr.doc.resolve(pos), 1))
    dispatch(tr.scrollIntoView())
  }
  return true
})

export const calloutKeymap = $useKeymap('calloutKeymap', {
  ExitCallout: {
    shortcuts: ['Mod-Enter'],
    command: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return () => commands.call(quitCalloutCommand.key)
    },
  },
})

const getAttrs = (match: any) => {
  return {
    degree: match[1]
  }
}


export const inputRule = $inputRule(() => wrappingInputRule(/^:::(info|warning|tip|note)/, directiveNode.type(), getAttrs))

export const callout: MilkdownPlugin[] = [remarkDirective, directiveNode, inputRule, calloutKeymap, quitCalloutCommand].flat()

export const calloutNode = directiveNode
