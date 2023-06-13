/* Copyright 2021, Milkdown by Mirone. */
import type { Ctx } from '@milkdown/ctx'
import { editorViewOptionsCtx } from '@milkdown/core'
import clsx from 'clsx'
import './style.scss'

export const kindaThemeConfig = (ctx: Ctx): void => {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes
    return ({
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass
        return {
          ...attrs,
          class: clsx('no-border no-outline', attrs?.class || '', 'milkdown-theme-kinda'),
        }
      },
    })
  })
}
