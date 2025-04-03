import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useTelegram } from 'src/hooks'
import { Env, XterTopupMethod } from '@xterio-sdk/auth'
import { XterTopup } from '@xterio-sdk/auth'

const Home = observer(() => {
  const { webApp, user, tgHaptic } = useTelegram({
    onCloseMiniApp() {
      // runLevelUp()
    }
  })

  useEffect(() => {
    webApp.ready()
  }, [webApp])

  useEffect(() => {
    console.warn('start_param')
    console.warn(webApp.initDataUnsafe.start_param)
  }, [])

  // Xter topup
  const containerRef = useRef<HTMLDivElement>(null)
  const xterTopupRef = useRef<XterTopup | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      xterTopupRef.current = new XterTopup({
        spuId: 66,
        skuId: 1,
        xterViewCustomOptions: {
          hide_header: true,
          hide_footer: true
        },
        showModal: true,
        width: 400,
        height: 700,
        onLoad: () => console.log('加载完成'),
        onClose: (data) => {
          console.log('支付关闭', JSON.stringify(data))
        },
        onSuccessClose: (data) => {
          console.log('支付关闭', JSON.stringify(data))
        }
      })
    }

    return () => {
      xterTopupRef.current?.destroy()
    }
  }, [])

  const handleOpenPay = (method: XterTopupMethod) => {
    if (containerRef.current && xterTopupRef.current) {
      xterTopupRef.current.openPay(containerRef.current, method).catch((err) => {
        console.log('打开支付弹窗失败：', err)
      })
    }
  }

  return (
    <div className="flex h-[calc(100%_-_70px)] w-full flex-shrink-0 flex-col overflow-hidden pb-5">
      <h2 className="my-4 text-center">XTER TG MINI APP</h2>
      <div className="mt-10 w-full flex flex-col justify-center items-center">
        <div className="flex gap-4 mb-6">
          <button
            className="border border-orange-200 px-2 py-1 text-sm rounded-md text-orange-300"
            onClick={() => handleOpenPay(XterTopupMethod.Default)}
          >
            打开加密货币支付
          </button>
          <button
            className="border border-emerald-300 px-2 py-1 text-sm rounded-md text-emerald-300"
            onClick={() => handleOpenPay(XterTopupMethod.Fiat)}
          >
            打开法币支付
          </button>
        </div>
        <div ref={containerRef} className="w-[400px] h-[670px]" />
      </div>
    </div>
  )
})

export default Home
