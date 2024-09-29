import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@xterio-sdk/auth/style/main.css'
import './common/styles/main.css'
import { IXterioWalletContextProps, SendTransactionMode, XterioWalletProvider } from './index.ts'
import { Env } from '@xterio-sdk/auth'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa

const config: IXterioWalletContextProps = {
  app_id,
  client_id,
  client_secret,
  redirect_uri,
  env: Env.Dev,
  enableAuthInit: true,
  showOpenWalletIcon: true,
  pn_app_id: '40ad8524-f844-496d-8de2-50a8a322d6ba',
  transactionMode: SendTransactionMode.Gasless,
  logLevel: 1
}
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <XterioWalletProvider {...config}>
    <App />
  </XterioWalletProvider>
  // </StrictMode>
)
