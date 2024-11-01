import { Env } from 'interfaces/loginInfo'

export enum XterTopupMethod {
  Default = 'default',
  Fiat = 'fiat'
}

export enum PostMessageType {
  Closed = 'PAYMENT_MODAL_CLOSED',
  SuccessClosed = 'PAYMENT_MODAL_SUCCESS_CLOSED'
}

export interface PostData {
  type: PostMessageType
  data: {
    message: string
    [key: string]: string
  }
}

export interface EnvTopupUrlConfig {
  [Env.Dev]: TopupUrlConfig
  [Env.Staging]: TopupUrlConfig
  [Env.Production]: TopupUrlConfig
}

export interface TopupFrameConfig {
  /** 要购买的 token 或其他资产ID，对应一个 spu */
  assetId: string

  /** 游戏ID，用于资产归属的游戏项目 */
  gameId: string

  /** 商品ID，用于标识具体要购买的商品 */
  skuId: string

  /**
   * 环境配置，用于切换不同环境的支付地址
   * 可选值：Dev（开发环境）、Staging（预发布环境）、Production（生产环境）
   * @default Env.Dev
   */
  env?: Env

  /**
   * 是否隐藏支付页面的头部导航栏
   * @default true
   */
  hideHeader?: boolean

  /**
   * 是否隐藏支付页面的底部信息栏
   * @default false
   */
  hideFooter?: boolean

  /**
   * 是否在页面加载完成后直接显示支付弹窗
   * @default true
   */
  showModal?: boolean

  /**
   * 支付窗口的宽度
   * 可以是数字（单位：像素）或字符串（如：'100%'）
   * @default '100%'
   */
  width?: string | number

  /**
   * 支付窗口的高度
   * 可以是数字（单位：像素）或字符串（如：'100%'）
   * @default '100%'
   */
  height?: string | number

  /**
   * iframe 加载完成时的回调函数
   * 可用于处理加载完成后的逻辑
   */
  onLoad?: () => void

  /**
   * 支付窗口关闭时的回调函数
   * @param data 关闭时返回的数据
   */
  onClose?: (data?: PostData) => void

  /**
   * 支付成功时的回调函数
   * @param data 支付成功时返回的数据
   */
  onSuccessClose?: (data?: PostData) => void

  /**
   * 获取 OTAC（一次性认证码）的函数
   * 返回 Promise<string>，用于获取最新的 OTAC
   */
  getOtac?: () => Promise<string>
}

export interface TopupUrlConfig {
  defaultTopupUrl: string
  fiatTopupUrl: string
}
