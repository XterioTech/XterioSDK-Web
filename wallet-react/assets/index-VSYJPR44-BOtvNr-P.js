import{Y as q}from"./chunk-37ISZE7G-YL9du2Vf.js";import{p as z}from"./chunk-3WXPHVZ4-D--FIW4O.js";import{N as J}from"./chunk-6X7TBCV3-DzhoHidx.js";import{e as M,J as P,L as b,o as e,r as h,u as x,U as F,i as w,a as E,b as Q,c as U,j as V,q as B}from"./index-BqQtutl2.js";import{u as D}from"./useTranslation-DvYF1WSU.js";var G=`.social-loading-content {
  text-align: center;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
}
.social-loading-content .wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.social-loading-content .wrap .social-logo-content {
  width: 105px;
  height: 105px;
  border-radius: 100%;
  position: relative;
}
.social-loading-content .wrap .social-logo-content.failed {
  cursor: pointer;
}
.social-loading-content .wrap .social-logo-content .logo {
  width: 100%;
  height: 100%;
}
.social-loading-content .wrap .social-logo-content .logo img {
  width: 100%;
  height: auto;
}
.social-loading-content .wrap .social-logo-content .spin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: social-loading-spin 1.4s linear infinite;
}
.social-loading-content .wrap .social-logo-content .spin img {
  width: 100%;
  height: 100%;
}
.social-loading-content .wrap .social-logo-content .refresh-btn {
  font-size: 19px;
  position: absolute;
  bottom: 10px;
  right: 27px;
}
.social-loading-content .wrap .title {
  margin-top: 10px;
  margin-bottom: 10px;
}
.social-loading-content .wrap .desc {
  width: 70%;
  line-height: 1.2;
  color: var(--secondary-text-color);
}
@keyframes social-loading-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`,I=({authType:l,isFailed:o=!0})=>{let{t:a}=D(),[n,d]=e.useState(!o),{socialAuthLogin:p}=V(),{modalOptions:c}=b();return e.createElement("div",{className:"social-loading-content"},e.createElement("style",null,G),e.createElement("div",{className:"wrap"},e.createElement("div",{className:`social-logo-content ${o?"failed":""}`,onClick:()=>{!o||n||(d(!0),p({socialType:l}))}},e.createElement("div",{className:"logo"},e.createElement("img",{src:B(c.themeType)[l]||"",alt:"logo"})),n&&e.createElement("div",{className:"spin"},e.createElement("img",{src:q,alt:"loading"})),o&&!n&&e.createElement("div",{className:"refresh-btn"},e.createElement(z,{className:"refresh-icon",name:"refresh_icon"}))),e.createElement("div",{className:"title"},a(o?"login.request_failed":"login.logging_you_in")),o&&e.createElement("div",{className:"desc"},a("login.something_wrong"))),e.createElement(J,{className:"footer-box-v2"}))},K=I,R=`.index-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--text-color);
}
`,Y=()=>{let{connect:l}=M(),o=P(),{setConnectionStatus:a,socialConnectCallback:n,setAuthCoreModal:d}=b(),[p,c]=e.useState(!1),[N,S]=h.useState(""),[T,C]=h.useState(!1),_=r=>{var t,i;(t=window.particle)!=null&&t.ethereum&&(window.particle.ethereum.isSocialConnecting=!1),(i=window.particle)!=null&&i.solana&&(window.particle.solana.isSocialConnecting=!1),window.dispatchEvent(new CustomEvent("particle:socialConnectCompleted",{detail:r}))},j=async()=>{var r;try{let t=x.parse(F()?"":window.location.search,{ignoreQueryPrefix:!0}),i=t==null?void 0:t.particleThirdpartyParams;if(!i){w()||a("disconnected");return}delete t.particleThirdpartyParams;let f=(window.location.origin+window.location.pathname+"?"+x.stringify(t)).replace(/\?$/,"");window.history.replaceState({},document.title,f),document.title=document.title||f;let k=JSON.parse(E.decode(i)),{code:y,nonce:m,appState:v,error:g}=k,A=v?JSON.parse(E.decode(v)):{},{authorization:L,chain:O,purpose:u,verifyToken:$}=A;if(g){w()||a("disconnected"),u?Q.error(g):(r=n==null?void 0:n.onError)==null||r.call(n,new Error(g)),u!=="bindLoginAccount"&&C(!0);return}let s=m.split("@")[0];S(s),u==="bindLoginAccount"?o("/login-account/bind-loading",{state:{authType:s,verifyToken:$,code:y,nonce:m},replace:!0}):(U(s)&&(c(!0),d({particleModalVisible:!0})),await l({socialType:s,code:y,nonce:m,authorization:L,chain:O}))}catch(t){w()||a("disconnected"),_({result:Object.freeze(t)})}c(!1)};return h.useEffect(()=>{j()},[]),e.createElement("div",{className:"index-container"},e.createElement("style",null,R),p&&e.createElement(K,{authType:N,isFailed:T}))},te=Y;export{te as default};
