import { IXterioWalletContextProps, SendTransactionMode } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'

export type WalletConfig = IXterioWalletContextProps
export interface EnvConfig {
  app_id: string
  client_id: string
  client_secret: string
  pn_app_id: string
  redirect_uri: string
  env: Env
  xterio_chain_name: string
  xterio_chain_id: number
}

/**
 * Xterio SDK 配置
 * 根据不同环境配置不同的参数
 * 具体配置信息需要配置在根目录各环境 .env 文件
 */
export const XterConfig: EnvConfig = {
  /**
   * 申请平台账号接入时平台分配的app_id
   */
  app_id: import.meta.env.VITE_XSDK_APP_ID,
  /**
   * 申请平台账号接入时平台分配的client_id
   */
  client_id: import.meta.env.VITE_XSDK_CLIENT_ID,
  /**
   * 申请平台账号接入时平台分配的client_secret
   */
  client_secret: import.meta.env.VITE_XSDK_CLIENT_SECRET,
  /**
   * 申请 particle newtork 钱包分配的 app id
   */
  pn_app_id: import.meta.env.VITE_XSDK_PN_APP_ID,
  /**
   * 申请平台账号接入时提交的redirect_uri,用于 sso 登录后跳转的地址，如果不是sso 登录可以忽略改参数
   */
  redirect_uri: import.meta.env.VITE_XSDK_REDIRECT_URI,
  /**
   * 对接平台的环境类型： Dev | Staging | Production
   */
  env: import.meta.env.VITE_XSDK_ENV as Env,
  /**
   * 平台链的名称
   */
  xterio_chain_name: import.meta.env.VITE_XSDK_XTER_CHAIN_NAME,
  /**
   * 平台链的链id
   */
  xterio_chain_id: import.meta.env.VITE_XSDK_XTER_CHAIN_ID
}

export const getXterConfig = (): WalletConfig & EnvConfig => ({
  ...XterConfig,
  /**
   * 是否显示打开钱包弹窗悬浮按钮，默认为false
   */
  showOpenWalletIcon: false,
  /**
   * 是否在钱包sdk中自动集成auth模块并初始化，默认为true
   */
  enableAuthInit: true,
  /**
   * AA 钱包交易模式，默认为Gasless，UserSelect = 0 | Gasless = 1 | UserPaidNative = 2
   */
  transactionMode: SendTransactionMode.Gasless
})
