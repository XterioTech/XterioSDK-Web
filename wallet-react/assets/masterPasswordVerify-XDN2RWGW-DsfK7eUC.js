import{B as N}from"./chunk-V4FV737D-BClDZL5c.js";import{N as R}from"./chunk-XOADOAIQ-CTMN58wj.js";import{N as T}from"./chunk-2EPM6PV4-CwvdrOQj.js";import{X as k,r as n,o as e,F as A,B as C,a9 as l,aa as s,an as F}from"./index-wSVIwGKF.js";import{u as P}from"./useRequest-DkeX4K2i.js";import{u as V}from"./useTranslation-Dlsxa64P.js";import{F as i}from"./index-BTkhlaW4.js";import{C as B,T as I}from"./index-BFGfvzxN.js";import"./chunk-3ESANLHR-Bonpkij_.js";import"./index-BhEW6xn4.js";import"./debounce-CeUATPry.js";import"./isObject-CrIk3fyR.js";import"./throttle-EduprJse.js";import"./index-vn3RpGEd.js";import"./TextArea-BA8Yfsuu.js";import"./colors-BQC3s8FL.js";import"./index-BVDEwUbq.js";var M=`.mp-verify-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--theme-background-color);
}
.mp-verify-container .ant-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  min-height: 360px;
}
.mp-verify-container .ant-form .scroll-content {
  flex: 1;
  width: 100%;
  padding-left: 18px;
  padding-right: 18px;
}
.mp-verify-container .ant-form-item {
  margin-bottom: 0;
}
.mp-verify-container .mp-verify-title {
  margin-top: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: var(--text-color);
}
.mp-verify-container .mp-input-name {
  align-self: flex-start;
  margin-top: 30px;
  font-weight: 400;
}
.mp-verify-container .mp-input {
  margin-top: 6px;
}
.mp-verify-container .mp-input-error {
  align-self: flex-start;
  margin-top: 8px;
  color: var(--error-color);
}
.mp-verify-container .mp-tip-space {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 110px;
  line-height: 20px;
}
.mp-verify-container .mp-tip-space span {
  color: var(--text-color);
}
.mp-verify-container .bottom-container {
  width: 100%;
}
.mp-verify-container .bottom-container.footer {
  padding-left: 18px;
  padding-right: 18px;
}
.mp-verify-container .bottom-container .mp-next {
  position: relative;
  display: block;
  width: 100%;
  max-width: 800px;
  margin: auto;
}
.mp-verify-container .bottom-container .footer-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--footer-height);
  margin: 0;
}
.mp-verify-container .bottom-container .footer-box img {
  margin: 0;
}
`,z=f=>{let{Text:m,Link:d}=I,p=k(),[u,a]=n.useState(!1),{t:o}=V(),{loginVerifyMasterPassword:v}=f||{},c=e.useRef(null),[g,x]=n.useState(!0),{loginSuccessRedirectToApp:y}=A(),h=R(),{run:E,loading:w}=P(F,{manual:!0,onBefore:()=>{l({record_type:s.PAGE_MASTER_PASSWORD_VERIFY})},onSuccess:t=>{t?(l({record_type:s.PAGE_MASTER_PASSWORD_VERIFY_SUCCESS}),v?y():p(-1)):a(!0)},onError:t=>{h.error((t==null?void 0:t.message)||"check master password error")}}),b=()=>{p("/account/master-password/description")},_=t=>{let{password:r}=t;(r==null?void 0:r.length)>=6&&(r==null?void 0:r.length)<=20?(a(!1),E(r)):a(!0)},S=t=>{let{password:r}=t;a(!1),x(!r)};return n.useEffect(()=>{setTimeout(()=>{var t,r;(r=(t=c.current)==null?void 0:t.querySelector(".password-input input"))==null||r.focus()},200)},[]),e.createElement("div",{className:"mp-verify-container",ref:c},e.createElement("style",null,M),e.createElement("div",{className:"mp-verify-title"},o("account.restore_wallet")),e.createElement(i,{layout:"vertical",onFinish:_,onValuesChange:S},e.createElement("div",{className:"scroll-content"},e.createElement("div",{className:"mp-input-name padding-top-16"},o("account.master_password")),e.createElement(i.Item,{name:"password"},e.createElement(N,{className:"mp-input"})),u&&e.createElement("div",{className:"mp-input-error"},o("account.password_error")),e.createElement(B,{direction:"vertical",className:"mp-tip-space"},e.createElement(m,null,o("account.mpc_tss_intro")),e.createElement(m,null,o("account.input_decrypt_hint")," ",e.createElement(d,{onClick:b,className:"more-text-btn"},o("account.learn_more_period"))))),e.createElement(i.Item,null,e.createElement("div",{className:"bottom-container footer"},e.createElement(C,{className:"primary-antd-btn mp-next",htmlType:"submit",loading:w,disabled:g},o("common.confirm")),e.createElement(T,{className:"footer-box-v2"})))))},te=z;export{te as default};
