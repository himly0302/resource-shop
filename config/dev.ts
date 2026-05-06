import type { UserConfigExport } from '@tarojs/cli'

export default {
  defineConstants: {
    API_BASE: '"http://localhost:3333"',
  },
  mini: {},
  h5: {
    publicPath: './',
  },
} satisfies UserConfigExport
