const version = __SDK_VERSION__ || '0.0.0'
export const log = (...args: any[]) => {
  console.log(`[XterioAuth(v${version})]`, ...args)
}

export const getPackageVersion = () => {
  return version
}

export const randomId = (): number => {
  const date = Date.now() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

export const randomNonceStr = (c?: number): string => {
  c = c || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < c; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
