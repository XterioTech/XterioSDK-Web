import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
const GET_QUERY_STRING = (key: string) => {
  const ls = location.search || location.hash
  //var reg = eval("new RegExp('[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$','g')");
  const reg = eval("new RegExp('[?&]+(" + key + ')=[^&]+&|[?&]+(' + key + ")=[^&]+$')")
  const args = ls.match(reg)
  if (args) {
    return args[0].split('=')[1].replace(/&$/, '')
  } else {
    //console.log(key + "不存在");
    return null
  }
  //var args = ls.match(/[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$/g);
}

import { XterioWalletProvider } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'
import '@xterio-sdk/wallet/style/main.css'
import '@xterio-sdk/auth/style/main.css'

const devConfig = {
  redirect_uri: 'http://localhost:3000/',
  client_id: '4gsmgur6gkp8u9ps8dlco3k7eo',
  client_secret: 'ABC23',
  app_id: 'apiautotest',
  pn_app_id: '40ad8524-f844-496d-8de2-50a8a322d6ba'
}
const stageConfig = {
  redirect_uri: location.href.replace(/[?&]code=[^&]+/, ''),
  client_id: '3094298453404953',
  client_secret: 'mzmhYqcqDGdymblv5gb7s9OWcnYpH1ha',
  app_id: '6c684e202700',
  pn_app_id: '9cd6a325-3082-4e98-8803-82a66cd9e86f'
}
let _env: Env = __EXAMPLE_ENV__ || Env.Dev
const variable = GET_QUERY_STRING('env')
if (variable === 'dev') {
  _env = Env.Dev
} else if (variable === 'stage') {
  _env = Env.Staging
}
const config = _env === Env.Staging ? stageConfig : devConfig
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <XterioWalletProvider {...config} env={_env} showOpenWalletIcon enableAuthInit>
    <App />
  </XterioWalletProvider>
  // </StrictMode>
)
