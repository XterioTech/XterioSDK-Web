import type { SmartAccount } from '@particle-network/aa'
import type {
  MessageTypes,
  PrefixedHexString,
  SignTypedDataVersion,
  TypedDataV1,
  TypedMessage
} from '@particle-network/auth-core'
import type { Env, ISSoTokensParams } from '@xterio-sdk/auth'

export interface IXterioWalletContextProps extends Partial<ISSoTokensParams> {
  env?: Env
  enableAuthInit?: boolean
}

export type PnUserInfoType = import('@particle-network/auth-core').UserInfo | undefined

export interface IPnWalletState {
  eoaAddress: string | null
  pnAAWalletAddress: string | undefined
  pnUserInfo: PnUserInfoType
  isLogin: boolean
  pnAA: SmartAccount | undefined
  disconnectPnEoA: () => Promise<void>
  connectPnEoA: (jwt?: string) => Promise<PnUserInfoType>
  connectPnAA: (
    _chainId?: number,
    _eoaAddress?: string
  ) => Promise<{ aaAddress?: string; eoaAddress?: string; name?: string; version?: string }>
  connectPnEoAAndAA: (jwt?: string, _chainId?: number) => Promise<void>
  getWalletIFrame: () => HTMLIFrameElement | null
  openPnWallet: () => void
  signMessage: (message: PrefixedHexString | string, uniq?: boolean) => Promise<string>
  signTypedData: <V extends SignTypedDataVersion, T extends MessageTypes>({
    data,
    version,
    uniq
  }: {
    data: V extends 'V1' ? TypedDataV1 : TypedMessage<T>
    version: V
    uniq?: boolean | undefined
  }) => Promise<string>
}
