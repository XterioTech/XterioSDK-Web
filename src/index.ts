import { useXterioWalletContext, XterioWalletProvider } from './contexts/index.tsx'
import { IPnTransactionState, useXterioTransaction } from './contexts/pnTransaction.ts'
import { Transaction } from '@particle-network/aa'
import { IXterioWalletContextProps } from './interfaces/types.ts'

export { XterioWalletProvider, useXterioWalletContext, useXterioTransaction }

export type { IXterioWalletContextProps, IPnTransactionState, Transaction }

export * from './interfaces/dappType.ts'

import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

import './common/styles/main.css'
