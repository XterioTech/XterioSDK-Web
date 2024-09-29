const version = __SDK_VERSION__ || '0.0.0'
const TAG = 'XterioAuth'

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  OFF = 'OFF'
}
const LogLevels: { [name: string]: number } = { debug: 1, info: 2, warn: 3, error: 4, off: 5 }
let logLevel = LogLevels.debug

export const setLogLevel = (level: number) => {
  logLevel = level
}

const log = (level: LogLevel, ...args: any[]) => {
  if (level === LogLevel.OFF || logLevel > LogLevels[level.toLocaleLowerCase()]) {
    return
  }
  if (level === LogLevel.ERROR) {
    console.error(`[${TAG}(v${version})]`, ...args)
  } else if (level === LogLevel.WARN) {
    console.warn(`[${TAG}(v${version})]`, ...args)
  } else if (level === LogLevel.DEBUG) {
    console.debug(`[${TAG}(v${version})]`, ...args)
  } else {
    console.log(`[${TAG}(v${version})]`, ...args)
  }
}
const info = (...args: any[]): void => {
  log(LogLevel.INFO, ...args)
}

const debug = (...args: any[]): void => {
  log(LogLevel.DEBUG, ...args)
}

const warn = (...args: any[]): void => {
  log(LogLevel.WARN, ...args)
}

const error = (...args: any[]): void => {
  log(LogLevel.ERROR, ...args)
}
export const XLog = {
  info,
  debug,
  warn,
  error
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
