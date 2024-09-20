const version = __SDK_VERSION__ || '0.0.0'

export const log = (...args: any[]) => {
  console.log(`[XterioWallet(v${version})]`, ...args)
}

export const getPackageVersion = () => {
  return version
}

export function sleep(time: number): Promise<number> {
  return new Promise((res) => {
    setTimeout(res, time, time)
  })
}
