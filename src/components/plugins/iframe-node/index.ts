import { $inputRule, $node, $remark } from '@milkdown/utils';
import directive from 'remark-directive';
import { InputRule } from '@milkdown/prose/inputrules';

const remarkDirective = $remark(() => directive)

const directiveNode = $node('iframe', () => ({
  group: 'block',
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    src: { default: null },
  },
  parseDOM: [{
    tag: 'iframe',
    getAttrs: (dom) => ({
      src: (dom as HTMLElement).getAttribute('src'),
    }),
  }],
  toDOM: (node: Node) => ['iframe', { ...node.attrs, 'contenteditable': false, class: 'no-border no-outline full-width shadow-1 rounded-borders q-mb-md' }, 0],
  parseMarkdown: {
    match: (node) => node.type === 'leafDirective' && node.name === 'iframe',
    runner: (state, node, type) => {
      state.addNode(type, { src: (node.attributes as { src: string }).src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'iframe',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'iframe',
        attributes: { src: node.attrs.src },
      });
    },
  }
}))

const inputRule = $inputRule(() => new InputRule(/::iframe\{src\="(?<src>[^"]+)?"?\}/, (state, match, start, end) => {
  const [okay, src = ''] = match;
  const { tr } = state;
  if (okay) {
    tr.replaceWith(start - 1, end, directiveNode.type().create({ src }));
  }

  return tr;
}))


export const iframe = [remarkDirective, directiveNode, inputRule]
