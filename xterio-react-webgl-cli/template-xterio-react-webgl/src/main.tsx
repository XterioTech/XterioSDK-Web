import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@xterio-sdk/auth/dist/es/style.css'
import { addViewportMeta, validateConfig } from './utils/index.ts'
import { XterioWalletProvider } from '@xterio-sdk/wallet'

import '@xterio-sdk/wallet/style/main.css'
import { GlobalUnityProvider } from './contexts/GlobalUnityContext.tsx'
import { getXterConfig } from './config/xterio-sdk-config.ts'

// Add viewport meta to support mobile view
addViewportMeta()

const xterConfig = getXterConfig()
// Check Xter SDK initial config
validateConfig(xterConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <XterioWalletProvider {...xterConfig}>
    <GlobalUnityProvider>
      <App />
    </GlobalUnityProvider>
  </XterioWalletProvider>
)
