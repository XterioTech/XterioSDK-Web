import { errors, ethers } from 'ethers'
import { useCallback, useState } from 'react'
import { sleep } from 'src/common/utils'
import type {
  ContractFunctionNames,
  Falsy,
  LogDescription,
  Params,
  TransactionReceipt,
  TransactionResponse,
  TransactionState,
  TransactionStatus,
  TypedContract
} from 'src/interfaces/dappType'
import { AAWrapProvider, SendTransactionMode, type Transaction } from '@particle-network/aa'
import { useXterioWalletContext } from '.'
import { XLog } from 'src/common/utils/logger'

export interface IPnTransactionState<T extends TypedContract, FN extends ContractFunctionNames<T>> {
  // sendTransaction(
  //   { gasLimit, txValue }: Partial<Pick<TransactionOptions, 'gasLimit' | 'txValue'>>,
  //   ...args: Params<T, FN>
  // ): Promise<TransactionReceipt | undefined>
  sendTransaction(...args: [...Params<T, FN>, Transaction?]): Promise<TransactionReceipt | undefined>
  sendUserOperation(tx: Transaction | Transaction[]): Promise<TransactionReceipt | undefined>
  state: TransactionStatus
  resetState(): void
  events?: LogDescription[]
}

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED && e?.replacement && (e?.reason === 'repriced' || e?.cancelled === false)

const usePromiseTransaction = () => {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })

  const resetState = useCallback(() => {
    setState({ status: 'None' })
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>) => {
      let transaction: TransactionResponse | undefined = undefined
      try {
        setState({ status: 'PendingSignature' })

        transaction = await transactionPromise

        setState({ transaction, status: 'Mining' })
        let receipt
        try {
          receipt = await transaction.wait()
        } catch (waitError) {
          XLog.error('Error waiting for transaction receipt:', waitError)
          setState({ status: 'Exception', errorMessage: 'Failed to wait for transaction receipt.' })
          return undefined
        }
        setState({ receipt, transaction, status: 'Success' })
        return receipt
      } catch (e: any) {
        const parsedErrorCode = parseInt(e.error?.data?.code ?? e.error?.code ?? e.data?.code ?? e.code)
        const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode
        const errorHash = e?.error?.data?.originalError?.data ?? e?.error?.data
        const errorMessage = e.error?.data?.message ?? e.error?.message ?? e.reason ?? e.data?.message ?? e.message
        XLog.error('promiseTransaction err', e)
        if (transaction) {
          const droppedAndReplaced = isDroppedAndReplaced(e)

          if (droppedAndReplaced) {
            const status: TransactionState = e.receipt.status === 0 ? 'Fail' : 'Success'
            setState({
              status,
              transaction: e.replacement,
              originalTransaction: transaction,
              receipt: e.receipt,
              errorMessage,
              errorCode,
              errorHash
            })
          } else {
            setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, errorCode, errorHash })
          }
        } else {
          setState({ status: 'Exception', errorMessage, errorCode, errorHash })
        }
        return undefined
      }
    },
    [setState]
  )

  return { promiseTransaction, state, resetState }
}

export const useXterioTransaction = <T extends TypedContract, FN extends ContractFunctionNames<T>>(
  contract?: T | Falsy,
  functionName?: FN
): IPnTransactionState<T, FN> => {
  const { pnAA, envConfig } = useXterioWalletContext()
  // const { pnAA } = usePnWallet()
  const { promiseTransaction, state, resetState } = usePromiseTransaction()
  const [events, setEvents] = useState<LogDescription[] | undefined>(undefined)

  const getTxPromise = useCallback(async (provider: ethers.providers.Web3Provider, txHash: string) => {
    await sleep(500)
    for (let i = 0; ; i++) {
      let tx
      try {
        tx = await provider.getTransaction(txHash)
      } catch (e) {
        XLog.error('pn AA getTransaction exception:', e)
      }
      if (tx) {
        return tx
      } else {
        await sleep(200)
      }
    }
  }, [])

  const send = useCallback(
    async (...args: [...Params<T, FN>, Transaction?]) => {
      if (!contract || !functionName) {
        throw new Error(`contract null or undefined`)
      }
      const numberOfArgs = contract.interface.getFunction(functionName).inputs.length
      if (args.length !== numberOfArgs && args.length !== numberOfArgs + 1) {
        throw new Error(`Invalid number of arguments for function "${functionName}".`)
      }
      const hasOpts = args.length > numberOfArgs
      const opts = hasOpts ? (args[args.length - 1] as Transaction) : undefined
      const modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args

      if (!pnAA) {
        throw new Error('pn smartAccount not ready.')
      }
      const mode = envConfig?.transactionMode || SendTransactionMode.UserSelect
      const pnAAWrapProvider = new ethers.providers.Web3Provider(new AAWrapProvider(pnAA, mode) as any)
      XLog.debug('sendTransactionMode=', mode)

      if (!pnAAWrapProvider) {
        throw new Error(`pnAAWrapProvider not ready.`)
      }
      const tx = {
        to: contract.address,
        data: contract.interface.encodeFunctionData(functionName, modifiedArgs),
        // value: opts?.value,
        ...opts
      }

      const feeQuotes = await pnAA.getFeeQuotes(tx)
      // use gasless if available
      const { userOp, userOpHash } = feeQuotes.verifyingPaymasterGasless || feeQuotes.verifyingPaymasterNative
      XLog.debug(
        'feeQuotes.verifyingPaymasterGasless=',
        feeQuotes.verifyingPaymasterGasless,
        'feeQuotes.verifyingPaymasterNative=',
        feeQuotes.verifyingPaymasterNative
      )

      const txHash = await pnAA.sendUserOperation({ userOp, userOpHash })
      XLog.info('pn AA sendUserOperation txhash ====', txHash)
      const txPromise = getTxPromise(pnAAWrapProvider, txHash)
      const receipt = await promiseTransaction(txPromise)
      if (receipt?.logs) {
        const events = receipt.logs.reduce((accumulatedLogs, l) => {
          try {
            return l.address.toLowerCase() === contract.address.toLowerCase()
              ? [...accumulatedLogs, contract.interface.parseLog(l)]
              : accumulatedLogs
          } catch (e) {
            XLog.error('pn AA receipt logs exception:', e)
            return accumulatedLogs
          }
        }, [] as LogDescription[])
        setEvents(events)
      }
      return receipt
    },
    [contract, envConfig?.transactionMode, functionName, getTxPromise, pnAA, promiseTransaction]
  )

  // const customSend = useCallback(
  //   async (
  //     { txValue }: Partial<Pick<TransactionOptions, 'txValue'>>,
  //     ...args: Params<T, FN>
  //   ): Promise<TransactionReceipt | undefined> => {
  //     // disable feeData
  //     const txArgs = [...args, { value: txValue }] as Params<T, FN>
  //     return send(...txArgs)
  //   },
  //   [send]
  // )

  const sendUserOperation = useCallback(
    async (tx: Transaction | Transaction[]) => {
      //data is needed only when interacting with smart contracts.
      //Transaction: {to:'', value:'', data:''}
      if (!pnAA) {
        throw new Error('pn smartAccount not ready.')
      }
      const mode = envConfig?.transactionMode || SendTransactionMode.UserSelect
      const pnAAWrapProvider = new ethers.providers.Web3Provider(new AAWrapProvider(pnAA, mode) as any)
      XLog.debug('sendTransactionMode=', mode)

      if (!pnAAWrapProvider) {
        throw new Error(`pnAAWrapProvider not ready.`)
      }
      const feeQuotes = await pnAA.getFeeQuotes(tx)
      // use gasless if available
      const { userOp, userOpHash } = feeQuotes.verifyingPaymasterGasless || feeQuotes.verifyingPaymasterNative
      XLog.debug(
        'feeQuotes.verifyingPaymasterGasless=',
        feeQuotes.verifyingPaymasterGasless,
        'feeQuotes.verifyingPaymasterNative=',
        feeQuotes.verifyingPaymasterNative
      )

      const txHash = await pnAA.sendUserOperation({ userOp, userOpHash })
      XLog.info('pn AA sendUserOperation txhash ====', txHash)
      const txPromise = getTxPromise(pnAAWrapProvider, txHash)
      const receipt = await promiseTransaction(txPromise)
      return receipt
    },
    [envConfig?.transactionMode, getTxPromise, pnAA, promiseTransaction]
  )

  return { sendTransaction: send, sendUserOperation, state, resetState, events }
}
