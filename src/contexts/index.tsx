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
import { log } from 'src/common/utils'
import { XterioWalletService } from 'src/modules/WalletService'
import { IPnWalletState, IXterioWalletContextProps } from 'src/interfaces/types'
import { IUseConfigState, useConfig } from './useConfig'
import { SmartAccount } from '@particle-network/aa'

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
      log('please login first')
      return
    }
    if (aaAddress) {
      log('have aa address already, cannot obtain again')
      return
    }
    log('have no aa address, go to obtain')
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
      log('Failed to create the Xterio Wallet.')
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
      log('An Xterio Wallet has been created for your account. You can also pair your own wallet.')
    } else {
      log('Failed to create the Xterio Wallet.')
    }
  }, [_p, aaAddress, connectPnAA, connectPnEoA, isLogin])

  const connectWallet = useCallback(
    async (chainId?: number) => {
      log('connect wallet')
      if (isPnLoginedRef.current) {
        log('connected')
        return
      }
      await connectPnEoAAndAA(XterioAuthTokensManager.idToken, chainId)
    },
    [connectPnEoAAndAA]
  )

  const disconnectWallet = useCallback(async () => {
    log('disconnect wallet')
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
      log('wallet html is empty')
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
          console.log('unmount')
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
        log('init logic, reconnect wallet')
        await connectWallet()
      }
    },
    [connectWallet]
  )

  useEffect(() => {
    if (mounted) return
    setMounted(true)
    log('xterio wallet initial')
    if (enableAuthInit) {
      log('auth initial in wallet')
      XterioAuth.init(rest, env)
    }
    XterioAuth.getUserInfo((info) => {
      log('emiter auth userinfo=', info)
      initLogic(info)
    })
    const unsubscribe = XterEventEmiter.subscribe(() => {
      //request token expired, clear state data
      log('emiter req expired')
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
