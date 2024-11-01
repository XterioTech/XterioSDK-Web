import { Env } from 'interfaces/loginInfo'
import { EnvTopupUrlConfig } from './types'
import { EnvVariableConfig } from 'utils'

export const XTER_TOPUP_URLS: EnvTopupUrlConfig = {
  [Env.Dev]: {
    defaultTopupUrl: `${EnvVariableConfig[Env.Dev]?.PAGE_BASE}/game-token-topup`,
    fiatTopupUrl: `${EnvVariableConfig[Env.Dev]?.PAGE_BASE}}/game-asset-merchant`
  },
  [Env.Staging]: {
    defaultTopupUrl: `http://localhost:3000/game-token-topup`,
    fiatTopupUrl: `http://localhost:3000/game-asset-merchant`
  },
  // [Env.Staging]: {
  //   defaultTopupUrl: `${EnvVariableConfig[Env.Staging]?.PAGE_BASE}/game-token-topup`,
  //   fiatTopupUrl: `${EnvVariableConfig[Env.Staging]?.PAGE_BASE}/game-asset-merchant`
  // },
  [Env.Production]: {
    defaultTopupUrl: `${EnvVariableConfig[Env.Production]?.PAGE_BASE}/game-token-topup`,
    fiatTopupUrl: `${EnvVariableConfig[Env.Production]?.PAGE_BASE}/game-asset-merchant`
  }
}
