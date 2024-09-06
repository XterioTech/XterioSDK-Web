# @xterio-sdk/wallet 
Only React, etherv5

## 1. Install
`npm install @xterio-sdk/wallet` | `yarn add @xterio-sdk/wallet` | `pnpm add @xterio-sdk/wallet` 

## 2.Configuration

Below is an example of an `main.tsx` file from a `create-react-app` project. In this example, the `XterioWalletProvider` component acts as the configuration wrapper for the entire application.


### 2.1 `main.tsx`
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
//add code lines
import { type IXterioWalletContextProps, XterioWalletProvider } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'
import '@xterio-sdk/wallet/style/main.css'
import '@xterio-sdk/auth/style/main.css'

const config: IXterioWalletContextProps = {
  client_id:'',
  client_secret:'',
  redirect_uri:'',
  env: Env.Dev
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <XterioWalletProvider {...config}>
      <App />
    </XterioWalletProvider>
  </StrictMode>
)
```

### 2.2 `App.tsx`
Now that you ve configured an instance of xterio wallet, it's time to logins and interactions with xterio wallet.
Below is an example of an `App.tsx` file.

```tsx
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

  const contractAddress = ''
  const abi = ERC20_ABI
  const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi)
  const { sendTransaction, sendUserOperation, state } = useXterioTransaction(erc20, 'transfer')

  const [signedMsg, setSignedMsg] = useState('')

  const test1 = async () => {
    const toAddr = ''
    const amount = ''
    await sendTransaction?.({ gasLimit: '' }, toAddr, amount)
  }

  const test2 = async () => {
    const contractAddress = ''
    const abi = ERC20_ABI
    const erc20 = getContract(NETWORK_NAME.SEPOLIA, contractAddress, abi)
    const toAddr = ''
    const amount = ''

    const tx = {
      to: contractAddress,
      data: erc20.interface.encodeFunctionData('transfer', [toAddr, amount])
    }
    await sendUserOperation?.(tx)
  }

  return (
    <>
      <h1>Xterio SDK</h1>
      <div>xterio auth</div>
      <div className="card">
        <p>isLogin: {isLogin ? 'true' : 'false'}</p>
        <p>userinfo: {userinfo ? JSON.stringify(userinfo) : ''}</p>
        <button onClick={() => login()}>default login</button>
        <button onClick={() => login(LoginType.Email)}>email login</button>
        <button onClick={() => login(LoginType.Mini)}>TT login</button>
        <button onClick={logout}>quit login</button>
      </div>

      <div>xterio wallet</div>
      <div className="card">
        <div>aa wallet address: {aaAddress}</div>
        <div>aa wallet connected status: {isConnect ? 'true' : 'false'}</div>
        <button onClick={connectWallet}>connect wallet</button>
        <button onClick={disconnectWallet}>disconnect wallet</button>
        <button onClick={obtainWallet}>obtain wallet</button>
        <button onClick={openWallet}>open wallet</button>
      </div>
      <div>xterio wallet transaction</div>
      <div className="card">
        <div>the signed message: {signedMsg}</div>
        <button
          onClick={async () => {
            const a = await signMessage?.('hello world')
            setSignedMsg(a)
          }}
        >
          sign message
        </button>
        <div>transfer status：{state.status}</div>
        <button onClick={test1}>transfer way 1(Sepo)</button>
        <button onClick={test2}>transfer way 2(Sepo)</button>
      </div>
    </>
  )
}

export default App

```


## 3. API Reference

### 3.1 `XterioWalletProvider`
the wallet context
```tsx
<XterioWalletProvider client_id="" client_secret="" redirect_uri="" env={Env.Dev}></XterioWalletProvider>
```

### 3.2 `useXterioWalletContext()`

#### 3.2.1 `userinfo`
xterio user information

#### 3.2.2 `isLogin`
xterio user login status

#### 3.2.3 `aaAddress`
xterio user aa wallet address

#### 3.2.4 `isConnect`
aa wallet connection status

#### 3.2.5 `login(mode?: 'default' | 'email')`

#### 3.2.6 `logout()`

#### 3.2.7 `connectWallet()`

#### 3.2.8 `disconnectWallet()`

#### 3.2.9 `obtainWallet()`

#### 3.2.10`openWallet()`

#### 3.2.11 `signMessage()`

### 3.3 `useXterioTransaction(contract?, funcName?)`

#### 3.3.1 `state`
transaction status

#### 3.3.2 `sendTransaction({gasLimit,txValue}, ...args)`
send a transaction

```ts
await sendTransaction?.({ gasLimit: '', txValue:'' }, toAddr, amount)
```

#### 3.3.3 `sendUserOperation(transaction|transaction[])`
send a transaction

```ts
await sendUserOperation?.({to:'', data:''})
```