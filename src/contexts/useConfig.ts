import { Env } from '@xterio-sdk/auth'
import { EnvBaseURLConst, EnvItemType } from 'src/common/utils/const'
import { SendTransactionMode } from '@particle-network/aa'

export interface IUseConfigState extends EnvItemType {
  transactionMode?: SendTransactionMode
}
export const useConfig = (
  env: Env = Env.Dev,
  pn_app_id?: string,
  transactionMode?: SendTransactionMode
): IUseConfigState => {
  const _env = EnvBaseURLConst[env || Env.Dev]
  return {
    ..._env,
    PN_APP_ID: pn_app_id || _env.PN_APP_ID,
    transactionMode
  }
}
