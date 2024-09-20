import { useState } from 'react'
import './App.css'
import { ERC20_ABI } from './abi'
import { getContract, NETWORK_NAME } from './common'

import { useXterioWalletContext, useXterioTransaction } from '@xterio-sdk/wallet'
import { LoginType } from '@xterio-sdk/auth'

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
  const { sendTransaction, sendUserOperation, state } = useXterioTransaction(erc20, 'transfer')

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
        <div>转账进度：{state.status}</div>
        <button onClick={test1}>转账(Sepo)</button>
        <button onClick={test2}>转账2(Sepo)</button>
      </div>
    </>
  )
}

export default App
