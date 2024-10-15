import { useCallback, useEffect, useMemo, useState } from 'react'
import { XterioAuthTokensManager } from '@xterio-sdk/auth'
import { SmartAccount } from '@particle-network/aa'
import { AuthType } from '@particle-network/auth-core'
import {
  AuthCoreContextProvider,
  PromptSettingType,
  AuthCoreModalOptions,
  getEVMPublicAddress,
  useAuthCore,
  useConnect,
  useCustomize,
  useEthereum,
  CustomStyle
} from '@particle-network/authkit'
import {
  mainnet,
  bsc,
  polygon,
  arbitrum,
  opBNB,
  base,
  bscTestnet,
  sepolia,
  Chain
} from '@particle-network/authkit/chains'

import PNCustomStyle from 'src/common/config/PNCustomStyle.json'
import aaOptions from 'src/common/config/erc4337'
import type { IPnWalletState } from 'src/interfaces/types'
import { xterioBnb, xterioBnbTestnet, xterioEth } from './xterioBnb'
import { IUseConfigState } from './useConfig'
import { XLog } from 'src/common/utils/logger'

const supportChains: [Chain, ...Chain[]] = [
  mainnet,
  bsc,
  polygon,
  arbitrum,
  opBNB,
  xterioBnb,
  xterioEth,
  base,
  //testnet
  xterioBnbTestnet,
  sepolia,
  bscTestnet
]

export const usePnWallet = (env: IUseConfigState, init_address?: string): IPnWalletState => {
  const { chainInfo, address, provider, signMessage, signTypedData, switchChain } = useEthereum()
  const { connect, connected, disconnect } = useConnect()
  const { erc4337, setERC4337 } = useCustomize()
  const { userInfo, getWalletIFrame: getWalletDom, openWallet: _openWallet } = useAuthCore()
  // IEthereumProvider & Partial<PasskeyProvider>;

  const [pnAAWalletAddress, setPnAAWalletAddress] = useState<string | undefined>(undefined)
  const [smartAccount, setSmartAccount] = useState<SmartAccount>()

  const aaNetworkConfig = useMemo(() => {
    if (!erc4337) {
      return []
    } else {
      const version = erc4337.version || '1.0.0'
      return (
        aaOptions.accountContracts[erc4337.name as keyof typeof aaOptions.accountContracts].find(
          (item) => item.version === version
        )?.chainIds || []
      )
    }
  }, [erc4337])

  const erc4337On = useCallback(
    (open: boolean) => {
      if (open) {
        setERC4337({
          name: 'XTERIO',
          version: '1.0.0'
        })
      } else {
        setERC4337(undefined)
      }
    },
    [setERC4337]
  )

  const connectPnEoA = useCallback(
    async (jwt?: string, _chainId?: number) => {
      const chains = supportChains
      const targetChain = chains?.find((c: Chain) => c.id === (_chainId ?? Number(env.PN_CHAIN_ID)))
      const res = await connect({
        chain: targetChain,
        provider: AuthType.jwt,
        thirdpartyCode: jwt || XterioAuthTokensManager.idToken || ''
      })
        .then((userInfo) => {
          XLog.info('connect pn eoa success')
          return userInfo
        })
        .catch((error: Error) => {
          XLog.error('connect pn eoa error', error, targetChain, chains)
          return undefined
        })
      return res
    },
    [connect, env.PN_CHAIN_ID]
  )

  const connectPnAA = useCallback(
    async (_chainId?: number, _eoaAddress?: string) => {
      if (_eoaAddress) {
        erc4337On(true)
        const chainId = _chainId || Number(env.PN_CHAIN_ID) || chainInfo.id
        let erc4337Config
        if (erc4337 && aaNetworkConfig.includes(chainId)) {
          erc4337Config = erc4337
        }
        const aaAddress = await getEVMPublicAddress({
          chainId: chainId,
          erc4337: erc4337Config
        })
          .then((_aaAddress: string) => {
            setPnAAWalletAddress(_aaAddress)
            XLog.info('connect pn aa success')
            return _aaAddress
          })
          .catch((error: any) => {
            XLog.error('connect pn aa error', error)
          })
        return { aaAddress, eoaAddress: _eoaAddress || address || init_address || '', ...erc4337Config }
      } else {
        setPnAAWalletAddress(undefined)
        return {}
      }
    },
    [aaNetworkConfig, address, chainInfo.id, env.PN_CHAIN_ID, erc4337, erc4337On, init_address]
  )

  const connectPnEoAAndAA = useCallback(
    async (jwt?: string, _chainId?: number) => {
      if (connected) {
        XLog.info('connected')
        return
      }
      XLog.debug('connect pn eoa')
      const _userInfo = await connectPnEoA(jwt, _chainId)
      XLog.debug('connect pn aa')
      const _eoaAddress = _userInfo?.wallets.find((w) => w.chain_name === 'evm_chain')?.public_address
      await connectPnAA(_chainId, _eoaAddress)
    },
    [connectPnAA, connectPnEoA, connected]
  )

  const getWalletIFrame = useCallback(() => {
    try {
      if (connected) {
        return getWalletDom({
          topMenuType: 'close',
          query: { theme: 'dark' }
        })
      }
    } catch (error) {
      XLog.error('getWalletIFrame error', error)
    }
    return null
  }, [connected, getWalletDom])

  const openPnWallet = useCallback(() => {
    _openWallet({
      topMenuType: 'close',
      query: { theme: 'dark' }
    })
  }, [_openWallet])

  useEffect(() => {
    if (!erc4337) {
      setSmartAccount(undefined)
      return
    }
    if (smartAccount) return

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const _smartAccount = new SmartAccount(provider, {
      projectId: env.PN_PROJECT_ID as string,
      clientKey: env.PN_CLIENT_KEY as string,
      appId: env.PN_APP_ID as string,
      aaOptions
    })
    _smartAccount.setSmartAccountContract(erc4337)
    setSmartAccount(_smartAccount)
  }, [env.PN_APP_ID, env.PN_CLIENT_KEY, env.PN_PROJECT_ID, erc4337, provider, smartAccount])

  return {
    disconnectPnEoA: disconnect,
    connectPnEoA,
    connectPnAA,
    connectPnEoAAndAA,
    getWalletIFrame,
    openPnWallet,
    switchChain,
    eoaAddress: address || init_address || '',
    pnAAWalletAddress,
    pnUserInfo: userInfo,
    isLogin: !!connected,
    signMessage,
    signTypedData,
    pnAA: smartAccount
  }
}

export const getAuthCoreModalOptions = (_env: IUseConfigState): AuthCoreModalOptions => {
  return {
    projectId: _env.PN_PROJECT_ID,
    clientKey: _env.PN_CLIENT_KEY,
    appId: _env.PN_APP_ID,
    authTypes: [AuthType.jwt],
    chains: supportChains,
    themeType: 'light',
    fiatCoin: 'USD',
    language: 'en',
    erc4337: {
      name: 'XTERIO',
      version: '1.0.0'
    },
    promptSettingConfig: {
      promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
      promptMasterPasswordSettingWhenLogin: PromptSettingType.none
    },
    customStyle: {
      logo: 'https://resources.xter.io/icon/logomark_120.png',
      projectName: 'Xterio',
      theme: {
        light: PNCustomStyle.theme.light as any
      }
    } as CustomStyle,
    wallet: {
      visible: true,
      preload: true,
      themeType: 'dark',
      widgetIntegration: 'embedded',
      customStyle: {
        light: PNCustomStyle.wallet.light as any,
        dark: PNCustomStyle.wallet.dark as any,
        supportUIModeSwitch: false
      }
    }
  }
}

export { AuthCoreContextProvider }
