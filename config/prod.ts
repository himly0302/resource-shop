import type { UserConfigExport } from '@tarojs/cli'

export default {
  defineConstants: {
    API_BASE: '"https://api.windlliu.com"',
  },
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport
