import { Env, XterViewCustomizeOptions } from 'interfaces/loginInfo'

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
  /** 要购买的商品 spu_id  */
  spuId: string

  /** 商品ID，用于标识具体要购买的商品 */
  skuId: string

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

  xterViewCustomOptions: Partial<XterViewCustomizeOptions>

  // /**
  //  * 是否隐藏支付页面的头部导航栏
  //  * @default true
  //  */
  // hideHeader?: boolean

  // /**
  //  * 是否隐藏支付页面的底部信息栏
  //  * @default false
  //  */
  // hideFooter?: boolean

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
}

export interface TopupUrlConfig {
  defaultTopupUrl: string
  fiatTopupUrl: string
}
