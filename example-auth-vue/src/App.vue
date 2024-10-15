<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IUserInfo, LoginType, OpenPageMode, PageType, XterEventEmiter, XTERIO_EVENTS, XterioAuth } from '@xterio-sdk/auth'

defineProps<{ msg: string }>()

const userinfo = ref('')
const isLogin = ref(XterioAuth.isLogin)
const currentPage = ref(PageType.asset)
const unsubscribe = ref()
const logout_unsub = ref()

onMounted(() => {
  unsubscribe.value = XterEventEmiter.subscribe((res: IUserInfo) => {
    console.log('info1=', res)
    userinfo.value = JSON.stringify(res)
    isLogin.value = XterioAuth.isLogin
  })
  logout_unsub.value = XterEventEmiter.subscribe(() => {
    console.log('logout auth, and deal page state data')
    userinfo.value = JSON.stringify(XterioAuth.userinfo)
    isLogin.value = XterioAuth.isLogin
  }, XTERIO_EVENTS.LOGOUT)
})
onUnmounted(() => {
  unsubscribe.value?.()
  logout_unsub.value?.()
})

const login = (mode?: LoginType) => {
  XterioAuth.login(mode)
}
const logout = () => {
  XterioAuth.logout()
}
const openPage = async (_t: OpenPageMode) => {
  const res = await XterioAuth.openPage(currentPage.value, _t)
  if (_t === OpenPageMode.iframeDom) {
    console.log('dom=', res)
    alert(res)
  } else if (_t === OpenPageMode.iframeUri) {
    console.log('uri=', res)
    alert(res)
  }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div className="card">
    <p>是否登录: {{ isLogin ? 'true' : 'false' }}</p>
    <p>用户信息: {{ userinfo }}</p>
    <button @click="login()">默认登录</button>
    <button @click="login(LoginType.Email)">邮箱登录</button>
    <button @click="login(LoginType.Mini)">TT 登录</button>
    <button @click="logout()">退出登录</button>
  </div>
  <div className="card">
    <p>当前要打开的页面: {{ currentPage }}</p>
    <button @click="currentPage = PageType.asset">资产页</button>
    <button @click="currentPage = PageType.account">账户页</button>
    <button @click="currentPage = PageType.wallet">钱包页</button>
    <button @click="currentPage = PageType.nft">nft页</button>
  </div>
  <div className="card">
    <p>打开页面的方式如下：</p>
    <button @click="openPage(OpenPageMode.alert)">弹框形式(iframe)</button>
    <button @click="openPage(OpenPageMode.page)">新页面形式</button>
    <button @click="openPage(OpenPageMode.iframeDom)">
      dom形式
    </button>
    <button @click="openPage(OpenPageMode.iframeUri)">
      uri形式
    </button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
