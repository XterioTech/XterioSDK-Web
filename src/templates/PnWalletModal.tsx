import { useCallback, useEffect, useRef } from 'react'

export const PnWalletModal = ({
  url,
  onClose,
  iframeHtml
}: {
  url?: string
  onClose?(): void
  iframeHtml?: HTMLIFrameElement
}) => {
  const _divRef = useRef<HTMLDivElement>(null)

  const onIframeClose = useCallback(
    (e: MessageEvent) => {
      if (e.data === 'PARTICLE_WALLET_CLOSE_IFRAME') {
        onClose?.()
      }
    },
    [onClose]
  )
  useEffect(() => {
    window.addEventListener('message', onIframeClose)
    return () => {
      window.removeEventListener('message', onIframeClose)
    }
  }, [onIframeClose])

  useEffect(() => {
    if (iframeHtml) {
      _divRef.current?.appendChild(iframeHtml)
    }
  }, [iframeHtml])

  return (
    <div ref={_divRef} id="particle-auth-core-wallet">
      {url && (
        <iframe
          id="particle-auth-core-iframe-wallet"
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="camera"
        ></iframe>
      )}
    </div>
  )
}
