import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  IUserInfo,
  LoginType,
  XterEventEmiter,
  XTERIO_EVENTS,
  XterioAuth,
  XterioAuthTokensManager
} from '@xterio-sdk/auth'
import { AuthCoreContextProvider, getAuthCoreModalOptions, usePnWallet } from './pnWallet'
import { PnWalletModal } from 'src/templates/PnWalletModal'
import { createRoot } from 'react-dom/client'
import { XterioWalletService } from 'src/modules/WalletService'
import { IPnWalletState, IXterioWalletContextProps } from 'src/interfaces/types'
import { IUseConfigState, useConfig } from './useConfig'
import { SmartAccount } from '@particle-network/aa'
import { setLogLevel, XLog } from 'src/common/utils/logger'

const initState = {
  aaAddress: '',
  isConnect: false,
  openWallet: () => {},
  connectWallet: () => {},
  disconnectWallet: () => {},
  obtainWallet: () => {}
}
interface IWalletContextState extends Pick<IPnWalletState, 'signMessage' | 'signTypedData' | 'switchChain'> {
  userinfo: IUserInfo | undefined
  isLogin: boolean
  login(mode?: LoginType): Promise<void>
  logout(): Promise<void>
  aaAddress: string
  isConnect: boolean
  openWallet(): void
  connectWallet(chainId?: number): void
  disconnectWallet(): void
  obtainWallet(): void
  pnAA?: SmartAccount
  envConfig?: IUseConfigState
}

const WalletContext = createContext<IWalletContextState>(initState as IWalletContextState)

const WalletContextProvider: React.FC<PropsWithChildren<IXterioWalletContextProps>> = ({
  children,
  env,
  enableAuthInit = true,
  showOpenWalletIcon = false,
  pn_app_id,
  transactionMode,
  ...rest
}) => {
  const envConfig = useConfig(env, pn_app_id, transactionMode)

  const [mounted, setMounted] = useState<boolean>()
  const [aaAddress, setAaAddress] = useState('')
  const [userinfo, setUserInfo] = useState<IUserInfo | undefined>(XterioAuth.userinfo)
  const [isLogin, setIsLogin] = useState<boolean>(XterioAuth.isLogin)

  const {
    getWalletIFrame,
    connectPnEoAAndAA,
    connectPnAA,
    connectPnEoA,
    disconnectPnEoA,
    switchChain,
    pnUserInfo: _p,
    isLogin: isPnLogin,
    signMessage,
    signTypedData,
    pnAA
  } = usePnWallet(envConfig, aaAddress)

  const [walletHtmlRoot, setWalletHtmlRoot] = useState<HTMLDivElement>()
  const isPnLoginedRef = useRef(isPnLogin)

  useEffect(() => {
    isPnLoginedRef.current = isPnLogin
  }, [isPnLogin])

  const obtainWallet = useCallback(async () => {
    if (!isLogin) {
      XLog.info('please login first')
      return
    }
    if (aaAddress) {
      XLog.info('have aa address already, cannot obtain again')
      return
    }
    XLog.debug('have no aa address, go to obtain')
    let pnUserInfo = _p
    if (!isPnLoginedRef.current) {
      pnUserInfo = await connectPnEoA()
    }
    const { token = '', uuid = '' } = pnUserInfo || {}
    const _eoaAddress = pnUserInfo?.wallets.find((w) => w.chain_name === 'evm_chain')?.public_address
    const {
      aaAddress: pnAaAddress,
      eoaAddress = '',
      name = '',
      version = ''
    } = await connectPnAA(undefined, _eoaAddress)
    if (!pnAaAddress) {
      XLog.error('Failed to create the Xterio Wallet.')
      return
    }
    const { error } = await XterioWalletService.bindAAWallet({
      address: pnAaAddress,
      pn_uuid: uuid,
      pn_token: token,
      owner_address: eoaAddress,
      wallet_name: name,
      wallet_version: version
    })
    if (!error) {
      //refresh userinfo
      await XterioWalletService.getUserInfo()
      XLog.info('An Xterio Wallet has been created for your account. You can also pair your own wallet.')
    } else {
      XLog.info('Failed to create the Xterio Wallet.')
    }
  }, [_p, aaAddress, connectPnAA, connectPnEoA, isLogin])

  const connectWallet = useCallback(
    async (chainId?: number) => {
      XLog.debug('connect wallet')
      if (isPnLoginedRef.current) {
        XLog.info('connected')
        return
      }
      await connectPnEoAAndAA(XterioAuthTokensManager.idToken, chainId)
    },
    [connectPnEoAAndAA]
  )

  const disconnectWallet = useCallback(async () => {
    XLog.debug('disconnect wallet')
    await disconnectPnEoA()
  }, [disconnectPnEoA])

  const openWallet = useCallback(() => {
    if (walletHtmlRoot) {
      walletHtmlRoot.remove()
      setWalletHtmlRoot(undefined)
      return
    }
    const html = getWalletIFrame()
    if (!html) {
      XLog.info('wallet html is empty')
      return
    }
    // const url = `${uri}&mode=iframe&random=${Math.random()})}`
    const div = document.createElement('div')
    document.body.appendChild(div)

    const root = createRoot(div)
    root.render(
      <PnWalletModal
        // url={url}
        onClose={() => {
          XLog.debug('unmount')
          setWalletHtmlRoot(undefined)
          root.unmount()
          div.remove()
        }}
        iframeHtml={html}
      />
    )
    setWalletHtmlRoot(div)
  }, [getWalletIFrame, walletHtmlRoot])

  const login = useCallback(async (mode?: LoginType) => {
    await XterioAuth.login(mode)
  }, [])

  const logout = useCallback(async () => {
    await disconnectWallet()
    await XterioAuth.logout()
    setUserInfo(undefined)
    setIsLogin(false)
    setAaAddress('')
  }, [disconnectWallet])

  const initLogic = useCallback(
    async (info?: IUserInfo) => {
      const _addr = info?.wallet?.find((i) => i.source === 2)?.address || ''
      const _islogin = !!info?.uuid
      setUserInfo(info)
      setIsLogin(_islogin)
      setAaAddress(_addr)

      if (_islogin && _addr && !isPnLoginedRef.current) {
        XLog.debug('init logic, reconnect wallet')
        await connectWallet()
      }
    },
    [connectWallet]
  )

  useEffect(() => {
    if (mounted) return
    setMounted(true)
    setLogLevel(rest?.logLevel || 1)
    XLog.debug('xterio wallet initial')
    if (enableAuthInit) {
      XLog.debug('auth initial in wallet')
      XterioAuth.init(rest, env)
    }
    XterioAuth.getUserInfo((info) => {
      XLog.info('emiter auth userinfo=', info)
      initLogic(info)
    })
    const unsubscribe = XterEventEmiter.subscribe(() => {
      //request token expired, clear state data
      XLog.info('emiter req expired')
      setUserInfo(undefined)
      setIsLogin(false)
      setAaAddress('')
    }, XTERIO_EVENTS.Expired)
    return () => {
      if (mounted) {
        unsubscribe?.()
      }
    }
  }, [enableAuthInit, env, initLogic, mounted, rest])

  return (
    <WalletContext.Provider
      value={{
        isLogin,
        userinfo,
        login,
        logout,
        aaAddress,
        isConnect: !!isPnLogin,
        obtainWallet,
        connectWallet,
        openWallet,
        disconnectWallet,
        signMessage,
        signTypedData,
        switchChain,
        pnAA,
        envConfig
      }}
    >
      {children}
      {showOpenWalletIcon && !!isPnLogin && (
        <div id="xterio-wallet-btn" onClick={openWallet}>
          Wallet
        </div>
      )}
    </WalletContext.Provider>
  )
}

export const XterioWalletProvider: React.FC<PropsWithChildren<IXterioWalletContextProps>> = (props) => {
  const { env, pn_app_id } = props
  if (!pn_app_id) {
    throw new Error('You must set pn_app_id')
  }

  const envConfig = useConfig(env, pn_app_id)
  return (
    <AuthCoreContextProvider options={getAuthCoreModalOptions(envConfig)}>
      <WalletContextProvider {...props}></WalletContextProvider>
    </AuthCoreContextProvider>
  )
}

export const useXterioWalletContext = (): IWalletContextState => {
  return useContext(WalletContext)
}
