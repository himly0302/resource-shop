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

export function buildFullUrl(bdLink: string): string {
  const { url, pwd } = parseBaiduLink(bdLink)
  return pwd ? `${url}?pwd=${pwd}` : url
}

export async function copyDownloadLink(bdLink: string): Promise<string> {
  const fullUrl = buildFullUrl(bdLink)
  await Taro.setClipboardData({ data: fullUrl })
  return fullUrl
}
