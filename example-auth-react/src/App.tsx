import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { IUserInfo, LoginType, OpenPageMode, PageType, XterEventEmiter, XterioAuth } from '@xterio-sdk/auth'

function App() {
  const [userinfo, setUserinfo] = useState('')
  const [isLogin, setIsLogin] = useState(XterioAuth.isLogin)
  const [currentPage, setCurrentPage] = useState(PageType.asset)

  useEffect(() => {
    //监听登录成功事件
    const unsubscribe = XterEventEmiter.subscribe((res: IUserInfo) => {
      console.log('info1=', res)
      setUserinfo(JSON.stringify(res))
      setIsLogin(XterioAuth.isLogin)
    })
    return () => {
      unsubscribe?.()
    }
  }, [])

  const login = (mode?: LoginType) => {
    XterioAuth.login(mode)
  }
  const logout = () => {
    XterioAuth.logout()
    setUserinfo('')
    setIsLogin(XterioAuth.isLogin)
  }
  const openPage = async (_t: OpenPageMode) => {
    const res = await XterioAuth.openPage(currentPage, _t)
    if (_t === OpenPageMode.iframeDom) {
      console.log('dom=', res)
      alert(res)
    } else if (_t === OpenPageMode.iframeUri) {
      console.log('uri=', res)
      alert(res)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>是否登录: {isLogin ? 'true' : 'false'}</p>
        <p>用户信息: {userinfo}</p>
        <button onClick={() => login()}>默认登录</button>
        <button onClick={() => login(LoginType.Email)}>邮箱登录</button>
        <button onClick={() => login(LoginType.Mini)}>TG 登录</button>
        <button onClick={logout}>退出登录</button>
      </div>
      <div className="card">
        <p>当前要打开的页面: {currentPage}</p>
        <button onClick={() => setCurrentPage(PageType.asset)}>资产页</button>
        <button onClick={() => setCurrentPage(PageType.account)}>账户页</button>
        <button onClick={() => setCurrentPage(PageType.wallet)}>钱包页</button>
        <button onClick={() => setCurrentPage(PageType.nft)}>nft页</button>
      </div>
      <div className="card">
        <p>打开页面的方式如下：</p>
        <button onClick={() => openPage(OpenPageMode.alert)}>弹框形式(iframe)</button>
        <button onClick={() => openPage(OpenPageMode.page)}>新页面形式</button>
        <button onClick={() => openPage(OpenPageMode.iframeDom)}>dom形式</button>
        <button onClick={() => openPage(OpenPageMode.iframeUri)}>uri形式</button>
      </div>
    </>
  )
}

export default App
