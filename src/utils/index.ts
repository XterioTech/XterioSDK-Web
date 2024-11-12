import { ParsedQuery } from 'query-string'

export * from './logger'
export * from './const'

export const getQsParams = (key: string, obj: ParsedQuery) => {
  let value = obj?.[key]
  if (Array.isArray(value)) {
    value = value?.[0]
  }
  return value
}
