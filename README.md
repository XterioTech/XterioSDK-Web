# @xterio-sdk/wallet 
Only React, etherv5

## 1. Install
`npm install @xterio-sdk/wallet @xterio-sdk/auth`

or

`yarn add @xterio-sdk/wallet @xterio-sdk/auth`


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
  app_id: '',
  client_id:'',
  client_secret: '',
  redirect_uri:'',
  env: Env.Dev,
  //whether init auth lib in wallet, the default is true
  enableAuthInit = true,
  //whether show the toggle wallet icon, the default is false
  showOpenWalletIcon = false,
  //pn app id
  pn_app_id: '',
  transactionMode: '', //UserSelect = 0,Gasless = 1,UserPaidNative = 2
  logLevel: 1, //the log level, default enable all console
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

  const [userinfo, setUserInfo] = useState({})
  useEffect(() => {
    console.log('[xtest] ---- add listener')
    const unsubscribe_Info = XterEventEmiter.subscribe((res: IUserInfo) => {
      setUserInfo(res)
    }, XTERIO_EVENTS.ACCOUNT)

    const unsubscribe_logout = XterEventEmiter.subscribe(() => {
      setUserInfo({})
    }, XTERIO_EVENTS.LOGOUT)
    return () => {
      console.log('[xtest] ---- remove listener')
      unsubscribe_Info?.()
      unsubscribe_logout?.()
    }
  }, [])

  return (
    <>
      <h1>Xterio SDK</h1>
      <div>xterio auth</div>
      <div className="card">
        <p>isLogin: {XterioAuth.isLogin ? 'true' : 'false'}</p>
        <p>userinfo: {userinfo ? JSON.stringify(userinfo) : ''}</p>
        <button onClick={() => alert(XterioAuth.isLogin)}>check isLogin</button>
        <button onClick={() => XterioAuth.login()}>default login</button>
        <button onClick={() => XterioAuth.login(LoginType.Email)}>email login</button>
        <button onClick={() => XterioAuth.login(LoginType.Mini)}>TT login</button>
        <button onClick={()=> XterioAuth.logout()}>quit login</button>
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
<XterioWalletProvider app_id="" client_id="" client_secret="" redirect_uri="" env={Env.Dev}></XterioWalletProvider>
```

### 3.2 `useXterioWalletContext()`

#### `userinfo`
xterio user information

#### `isLogin`
xterio user login status

#### `aaAddress`
xterio user aa wallet address

#### `isConnect`
aa wallet connection status

#### `login(mode?: 'default' | 'email')`

#### `logout()`

#### `connectWallet()`

#### `disconnectWallet()`

#### `obtainWallet()`

#### `openWallet()`

#### `signMessage()`

#### `switchChain(_id?: number)`

### 3.3 `useXterioTransaction(contract?, funcName?)`

#### `state`
transaction status

#### `sendTransaction(...args:any[], tx?:Transaction)`
send a transaction

```ts
await sendTransaction?.(toAddr, amount, {value:'', gasLimit:''})
```

#### `sendUserOperation(tx: Transaction|Transaction[])`
send a transaction

```ts
await sendUserOperation?.({to:'', data:''})
```