import Taro from '@tarojs/taro'

interface ParsedLink {
  url: string
  pwd: string | null
}

export function parseBaiduLink(bdLink: string): ParsedLink {
  const pwdMatch = bdLink.match(/pwd=([a-zA-Z0-9]+)/)
  const urlMatch = bdLink.match(/(https:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+)/)
  return {
    url: urlMatch ? urlMatch[1] : bdLink,
    pwd: pwdMatch ? pwdMatch[1] : null,
  }
}

export async function copyDownloadLink(bdLink: string): Promise<void> {
  const { url, pwd } = parseBaiduLink(bdLink)
  const text = pwd ? `链接：${url}\n提取码：${pwd}` : url
  await Taro.setClipboardData({ data: text })
  Taro.showToast({
    title: '已复制，请打开百度网盘粘贴下载',
    icon: 'none',
    duration: 2000,
  })
}
