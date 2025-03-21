import{B as v}from"./chunk-PI4RW2MY-GeqXVtJr.js";import{N as y}from"./chunk-BOXSB6AN-_JWADXst.js";import{w as N}from"./chunk-IBLFF4W2-CPpBOu4k.js";import{N as b}from"./chunk-6X7TBCV3-BN1PXSNv.js";import{J as _,r as c,o as e,t as k,an as M}from"./index-Bn-ps2Oq.js";import{u as T}from"./useRequest-g7Hc95KC.js";import{u as B}from"./useTranslation-B27UQaAP.js";import{T as C,C as S}from"./index-BCNgn8UI.js";import{F as o}from"./index-C_gO5jip.js";import"./chunk-3WXPHVZ4-C7rXuFaZ.js";import"./index-SMmWVYvk.js";import"./debounce-CMz2Qhby.js";import"./isObject-CrIk3fyR.js";import"./throttle-C-YdzAkS.js";import"./TextArea-DoQw-hsV.js";import"./colors-D1wLG77i.js";import"./index-CjxR9kbP.js";var F=`.mp-change-container {
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
`,$=()=>{let m=_(),{t:a}=B(),{Text:i,Link:p}=C,[s,n]=c.useState(!1),l=y(),[u,d]=c.useState(!0),{run:g,loading:h}=T(t=>M(t).then(r=>{if(!r)throw new Error("Master password decryption error");return r}),{manual:!0,onSuccess:t=>{f()},onError:t=>{(t==null?void 0:t.message)==="Master password decryption error"?n(!0):l.error((t==null?void 0:t.message)||"check master password error")}}),f=()=>{m("/account/master-password",{state:{setNewMasterPassword:!0}})},x=t=>{let{password:r}=t;r&&r.length>=6&&r.length<=20?g(r):n(!0)},w=t=>{n(!1);let{password:r}=t;d(!r)},E=()=>{m("/account/master-password/description")};return e.createElement("div",{className:"mp-change-container"},e.createElement("style",null,F),e.createElement(N,{displayBackBtn:!0},a("account.current_master_password")),e.createElement("div",{className:"wapper"},e.createElement(o,{onFinish:x,layout:"vertical",onValuesChange:w},e.createElement("div",{className:"scroll-content"},e.createElement("div",{className:"mp-input-name padding-top-16"},a("account.input_master_password")),e.createElement(o.Item,{name:"password"},e.createElement(v,{className:"mp-input"})),s&&e.createElement("div",{className:"mp-input-error"},a("account.password_error")),e.createElement(S,{direction:"vertical",className:"mp-tip-space"},e.createElement(i,null,a("account.mpc_tss_intro")),e.createElement(i,null,a("account.input_decrypt_hint")," ",e.createElement(p,{onClick:E,className:"more-text-btn"},a("account.learn_more_period"))))),e.createElement(o.Item,null,e.createElement("div",{className:"bottom-container"},e.createElement(k,{className:"primary-antd-btn mp-next",htmlType:"submit",loading:h,disabled:u},a("common.next")),e.createElement(b,null))))))},W=$;export{W as default};
