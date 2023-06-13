import { $inputRule, $node, $remark } from '@milkdown/utils';
import directive from 'remark-directive';
import { InputRule, wrappingInputRule } from '@milkdown/prose/inputrules';

const remarkDirective = $remark(() => directive)

const calloutId = 'callout'

const directiveNode = $node('callout', () => {
  return ({
    content: 'block+',
    group: 'block',
    atom: true,
    isolating: true,
    attrs: {
      degree: { default: 'info' },
    },
    parseDOM: [{
      tag: `div[data-type="${calloutId}"]`,
    }],
    toDOM: (node: Node) => {
      const { degree } = node.attrs;
      console.log(degree)
      let classList = 'full-width text-white callout rounded-borders q-mb-md '
      switch (degree) {
        case 'info':
          classList += 'bg-info'
          break;
        case 'caution':
          classList += 'bg-warning'
          break;
        case 'tip':
          classList += 'bg-positive'
          break;
        case 'note':
          classList += 'bg-primary'
          break;
        default:
          break;

      }
      return ['div', { ...node.attrs, class: classList }, 0]
    },
    parseMarkdown: {
      match: (node) => {
        return node.name === 'info' || node.name === 'caution' || node.name === 'note' || node.name === 'tip'
      },
      runner: (state, node, type) => {
        state.openNode(type);
        state.next(node.children);
        state.closeNode();
      },
    },
    toMarkdown: {
      match: (node) => {
        return node.type.name === 'callout'
      },
      runner: (state, node) => {
        state.addNode('containerDirective', undefined, undefined, {
          name: 'callout',
        });
      },
    }
  });
})

const getAttrs = (match: any) => {
  return {
    degree: match[1]
  }
}

export const inputRule = $inputRule(() => wrappingInputRule(/^:::(info|caution|tip|note)/, directiveNode.type(), getAttrs))

export const callout = [remarkDirective, directiveNode, inputRule]
