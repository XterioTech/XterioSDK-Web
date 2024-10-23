import{Y as y}from"./chunk-37ISZE7G-YL9du2Vf.js";import{z as E}from"./loginAccount-E66JXWKK-2DYRQWw9.js";import{N as _}from"./chunk-BOXSB6AN-BNzyKhvg.js";import{w as k}from"./chunk-IBLFF4W2-DoVCDBSi.js";import{aQ as N,r as l,aR as B,aS as b,aT as T,J as z,L as F,F as $,o as e,q as L,B as M,ak as S}from"./index-DRbKv4Ap.js";import{a as j}from"./debounce-DcEcXjGl.js";import{u as q}from"./index-Di3Du_nH.js";import{u as A}from"./useTranslation-DS9VROIZ.js";import"./chunk-3WXPHVZ4-BetGuJbx.js";import"./chunk-6X7TBCV3-Dsqvp6wN.js";import"./throttle-B_QCviSc.js";import"./isObject-CrIk3fyR.js";function D(s,n){var t,a=N(s),u=(t=n==null?void 0:n.wait)!==null&&t!==void 0?t:1e3,r=l.useMemo(function(){return j(function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];return a.current.apply(a,B([],b(i),!1))},u,n)},[]);return T(function(){r.cancel()}),{run:r,cancel:r.cancel,flush:r.flush}}function I(s,n,t){var a=b(l.useState({}),2),u=a[0],r=a[1],i=D(function(){r({})},t).run;l.useEffect(function(){return i()},n),q(s,[u])}var R=`.account-bind-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.account-bind-container .particle-connect-form-contaier {
  flex: 1;
}
.account-bind-container .particle-loading,
.account-bind-container .result-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  font-size: 18px;
  color: var(--text-color);
  position: relative;
}
.account-bind-container .particle-loading .loading-wrap,
.account-bind-container .result-content .loading-wrap {
  position: relative;
}
.account-bind-container .particle-loading .loading-wrap .logo-img,
.account-bind-container .result-content .loading-wrap .logo-img {
  width: 100px;
  height: 100px;
  font-size: 110px;
}
.account-bind-container .particle-loading .loading-wrap .particle-loading-img,
.account-bind-container .result-content .loading-wrap .particle-loading-img {
  width: 100%;
  height: 100%;
  animation: loading-inner 1.5s linear infinite;
}
.account-bind-container .particle-loading .loading-wrap h3,
.account-bind-container .result-content .loading-wrap h3 {
  color: var(--text-color);
}
.account-bind-container .particle-loading .loading-wrap p,
.account-bind-container .result-content .loading-wrap p {
  font-size: 14px;
  color: var(--secondary-text-color);
  position: absolute;
  width: 110%;
  height: 110%;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.account-bind-container .link_btn {
  width: auto;
  height: 32px;
  font-size: 14px;
}
.account-bind-container .result-content .back {
  margin-top: 40px;
}
.account-bind-container .result-content .back button {
  display: flex;
  align-items: center;
}
@keyframes loading-inner {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`,U=s=>{let n=s,{authType:t="google",verifyToken:a,code:u}=n,r=z(),{modalOptions:i}=F(),{t:o}=A(),[h,w]=l.useState(!0),{userInfo:m}=$(),x=_(),p=l.useMemo(()=>E({userInfo:m,t:o}),[m]),g=l.useMemo(()=>({...p.find(c=>c.type.replace(/v1$/,"")==t)||{}}),[p,n]);return I(()=>{t&&a&&S({provider:t,thirdparty_code:u,security_account_verify_token:a,version:"v2"}).then(c=>{w(!1)}).catch(c=>{let f=c.message;if((c==null?void 0:c.error_code)===20109){let v=`error.server_${t}_20109`,d=o(v);d&&d!=v&&(f=d)}x.error(f),setTimeout(()=>{r("/account/security",{replace:!0})})})},[t,a],{wait:50}),e.createElement("div",{className:"account-bind-container"},e.createElement("style",null,R),e.createElement(k,{displayBackBtn:!0}),e.createElement("div",{className:"particle-connect-form-contaier center-center flex-column"},h?e.createElement("div",{className:"particle-loading"},e.createElement("div",{className:"loading-wrap"},e.createElement("img",{src:L(i.themeType)[t]||"",className:"logo-img logo-img-2",alt:"logo"}),e.createElement("p",null,e.createElement("img",{className:"particle-loading-img",src:y,alt:""})))):e.createElement("div",{className:"result-content resultsuccess"},e.createElement("img",{src:g==null?void 0:g.icon,alt:""}),e.createElement("div",{className:"info"},"Binding succeeded！"),e.createElement("div",{className:"back"},e.createElement(M,{type:"primary",onClick:()=>{r("/account/security",{replace:!0})}},"Back")))))},Z=U;export{Z as default};
