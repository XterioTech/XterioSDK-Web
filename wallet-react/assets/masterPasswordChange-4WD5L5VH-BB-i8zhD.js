import{B as v}from"./chunk-PI4RW2MY-CLDNqy1A.js";import{N as y}from"./chunk-BOXSB6AN-BHzaQfi8.js";import{w as N}from"./chunk-IBLFF4W2-COMT6oVP.js";import{N as b}from"./chunk-6X7TBCV3-C4Q1JU2O.js";import{J as _,r as c,o as e,B as k,ao as B}from"./index-LGWGjS2P.js";import{u as M}from"./useRequest-DXZF6Nmm.js";import{u as T}from"./useTranslation-DqEq0Bwb.js";import{F as o}from"./index-CLuyyifp.js";import{C,T as S}from"./index-P0fm6iHP.js";import"./chunk-3WXPHVZ4-Brz69Bbc.js";import"./index-IAH0S6Z0.js";import"./debounce-D03bfoC5.js";import"./isObject-CrIk3fyR.js";import"./throttle-D8rfr3ob.js";import"./index-C3dO9mrS.js";import"./TextArea-CrAJ-mXo.js";import"./colors-Dcqvpn4q.js";import"./index-QNOPKP0V.js";var F=`.mp-change-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  color: var(--text-color);
}
.mp-change-container .wapper {
  flex: 1;
  width: 100%;
  padding: 0 18px;
}
.mp-change-container .ant-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
}
.mp-change-container .ant-form .ant-form-item {
  margin-bottom: 0;
}
.mp-change-container .ant-form .scroll-content {
  flex: 1;
  width: 100%;
}
.mp-change-container .mp-change-title {
  margin-top: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: var(--text-color);
}
.mp-change-container .mp-input-name {
  align-self: flex-start;
  margin-top: 10px;
  font-weight: 400;
}
.mp-change-container .mp-input {
  margin-top: 6px;
}
.mp-change-container .mp-input-error {
  align-self: flex-start;
  margin-top: 8px;
  color: var(--error-color);
}
.mp-change-container .mp-tip-space {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 110px;
  line-height: 20px;
}
.mp-change-container .mp-tip-space span {
  color: var(--text-color);
}
.mp-change-container .bottom-container .mp-next {
  width: 100%;
}
.mp-change-container .bottom-container .footer-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--footer-height);
  margin: 0;
}
.mp-change-container .bottom-container .footer-box .footer {
  margin: 0;
}
`,$=()=>{let m=_(),{t:a}=T(),{Text:i,Link:p}=S,[s,n]=c.useState(!1),l=y(),[d,g]=c.useState(!0),{run:u,loading:h}=M(t=>B(t).then(r=>{if(!r)throw new Error("Master password decryption error");return r}),{manual:!0,onSuccess:t=>{f()},onError:t=>{(t==null?void 0:t.message)==="Master password decryption error"?n(!0):l.error((t==null?void 0:t.message)||"check master password error")}}),f=()=>{m("/account/master-password",{state:{setNewMasterPassword:!0}})},x=t=>{let{password:r}=t;r&&r.length>=6&&r.length<=20?u(r):n(!0)},w=t=>{n(!1);let{password:r}=t;g(!r)},E=()=>{m("/account/master-password/description")};return e.createElement("div",{className:"mp-change-container"},e.createElement("style",null,F),e.createElement(N,{displayBackBtn:!0},a("account.current_master_password")),e.createElement("div",{className:"wapper"},e.createElement(o,{onFinish:x,layout:"vertical",onValuesChange:w},e.createElement("div",{className:"scroll-content"},e.createElement("div",{className:"mp-input-name padding-top-16"},a("account.input_master_password")),e.createElement(o.Item,{name:"password"},e.createElement(v,{className:"mp-input"})),s&&e.createElement("div",{className:"mp-input-error"},a("account.password_error")),e.createElement(C,{direction:"vertical",className:"mp-tip-space"},e.createElement(i,null,a("account.mpc_tss_intro")),e.createElement(i,null,a("account.input_decrypt_hint")," ",e.createElement(p,{onClick:E,className:"more-text-btn"},a("account.learn_more_period"))))),e.createElement(o.Item,null,e.createElement("div",{className:"bottom-container"},e.createElement(k,{className:"primary-antd-btn mp-next",htmlType:"submit",loading:h,disabled:d},a("common.next")),e.createElement(b,null))))))},X=$;export{X as default};