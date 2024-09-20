import './App.css'
import { useXterioTransaction, useXterioWalletContext } from './index'
import { useState } from 'react'
import { Contract, ContractInterface, ethers } from 'ethers'
import { ERC20_ABI } from './common/abi'
import { LoginType } from '@xterio-sdk/auth'

/**
 * 区分区块链网络的名称，平台前后端统一定义的枚举类型
 * 注意：请勿和ethers、web3等第三方库中的network定义混淆
 */
export enum NETWORK_NAME {
  ETHEREUM = 'ETHEREUM',
  BSC = 'BSC',
  OPBNB = 'OPBNB',
  ARBITRUM = 'ARBITRUM',
  POLYGON = 'POLYGON',
  XTERIO = 'XTERIO',
  XTERIO_ETH = 'XTERIO_ETH',
  BASE = 'BASE',

  GOERLI = 'GOERLI',
  SEPOLIA = 'SEPOLIA',
  BSC_TESTNET = 'BSC_TESTNET',
  OPBNB_TESTNET = 'OPBNB_TESTNET',
  XTERIO_TESTNET = 'XTERIO_TESTNET'
}

export const getJsonRPCUrl = (network?: string) => {
  switch (network) {
    case NETWORK_NAME.ETHEREUM:
      return `https://ethereum.publicnode.com`
    case NETWORK_NAME.ARBITRUM:
      return `https://arbitrum-one.publicnode.com`
    case NETWORK_NAME.POLYGON:
      return `https://polygon-bor.publicnode.com`
    case NETWORK_NAME.OPBNB:
      return `https://opbnb-mainnet-rpc.bnbchain.org`
    case NETWORK_NAME.BSC:
      return 'https://bsc-dataseed.bnbchain.org'
    case NETWORK_NAME.XTERIO:
      return `https://xterio-bnb.alt.technology`
    case NETWORK_NAME.XTERIO_ETH:
      return `https://xterio-eth.alt.technology`
    case NETWORK_NAME.BASE:
      return `https://mainnet.base.org`
    case NETWORK_NAME.BSC_TESTNET:
      return 'https://bsc-testnet-rpc.publicnode.com'
    // return 'https://data-seed-prebsc-2-s1.binance.org:8545'
    case NETWORK_NAME.GOERLI:
      return 'https://eth-goerli.public.blastapi.io'
    case NETWORK_NAME.SEPOLIA:
      return `https://ethereum-sepolia-rpc.publicnode.com`
    case NETWORK_NAME.OPBNB_TESTNET:
      return `https://opbnb-testnet-rpc.bnbchain.org`
    case NETWORK_NAME.XTERIO_TESTNET:
      return `https://xterio-testnet.alt.technology/`
    default:
      throw new Error('unsupported network: ' + network)
  }
}

export const getContract = (network: NETWORK_NAME, contractAddress: string, abi: ContractInterface) => {
  const provider = new ethers.providers.JsonRpcProvider(getJsonRPCUrl(network))
  // const contractAddress = ''
  // const abi = ''
  const contract = new Contract(contractAddress, abi, provider)
  return contract
}

function App() {
  const {
    userinfo,
    isLogin,
    login,
    logout,
    aaAddress,
    isConnect,
    disconnectWallet,
    openWallet,
    obtainWallet,
    connectWallet,
    signMessage
  } = useXterioWalletContext()

  const contractAddress = '0x12065F0d03cd1Bd280565069164F9E803c2DA988'
  const abi = ERC20_ABI
  const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi)
  const { sendTransaction, sendUserOperation } = useXterioTransaction(erc20, 'transfer')

  const [signedMsg, setSignedMsg] = useState('')

  const test1 = async () => {
    //方式1: sendTransaction，useXterioTransaction 必须传contract跟functionName
    const toAddr = '0xF4Ae736B14a7B5FDb803172B242074D6DFe655bb'
    const amount = '0x0de0b6b3a7640000'
    await sendTransaction?.({ gasLimit: '0x90de' }, toAddr, amount)
  }

  const test2 = async () => {
    //方式2: sendUserOperation
    const contractAddress = '0x12065F0d03cd1Bd280565069164F9E803c2DA988'
    const abi = ERC20_ABI
    const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi)
    const toAddr = '0xF4Ae736B14a7B5FDb803172B242074D6DFe655bb'
    const amount = '0x0de0b6b3a7640000'

    const tx = {
      to: contractAddress,
      data: erc20.interface.encodeFunctionData('transfer', [toAddr, amount])
    }
    await sendUserOperation?.(tx)
  }

  return (
    <>
      <h1>Xterio SDK</h1>
      <div>xterio auth sdk</div>
      <div className="card">
        <p>是否登录: {isLogin ? 'true' : 'false'}</p>
        <p>用户信息: {userinfo ? JSON.stringify(userinfo) : ''}</p>
        <button onClick={() => login()}>默认登录</button>
        <button onClick={() => login(LoginType.Email)}>邮箱登录</button>
        <button onClick={() => login(LoginType.Mini)}>TG 登录</button>
        <button onClick={logout}>退出登录</button>
      </div>

      <div>xterio wallet sdk</div>
      <div className="card">
        <div>pn aa wallet address: {aaAddress}</div>
        <div>pn aa wallet connected status: {isConnect ? 'true' : 'false'}</div>
        <button onClick={connectWallet}>AA钱包连接</button>
        <button onClick={disconnectWallet}>AA钱包断开连接</button>
        <button onClick={obtainWallet}>AA钱包领取</button>
        <button onClick={openWallet}>打开AA钱包</button>
      </div>
      <div>xterio wallet transaction</div>
      <div className="card">
        <div>sign message result: {signedMsg}</div>
        <button
          onClick={async () => {
            const a = await signMessage?.('hello world')
            setSignedMsg(a)
          }}
        >
          签名message
        </button>
        <button onClick={test1}>转账</button>
        <button onClick={test2}>转账2</button>
      </div>
    </>
  )
}

export default App
