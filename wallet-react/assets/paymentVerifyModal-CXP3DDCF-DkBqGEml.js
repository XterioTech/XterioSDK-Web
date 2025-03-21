import{Q as v}from"./chunk-6FLCJIFF-BIrdrPTF.js";import{L as b,r as m,v as g,o as a,aw as h,aq as E,D as c}from"./index-Bn-ps2Oq.js";import{u as x}from"./useRequest-g7Hc95KC.js";import{u as C}from"./useTranslation-B27UQaAP.js";import"./chunk-3WXPHVZ4-C7rXuFaZ.js";import"./chunk-6X7TBCV3-BN1PXSNv.js";import"./LoadingOutlined-okIZXpqC.js";import"./AntdIcon-DHasPo27.js";import"./index-SMmWVYvk.js";import"./debounce-CMz2Qhby.js";import"./isObject-CrIk3fyR.js";import"./throttle-C-YdzAkS.js";var P=`.payment-password-drawer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.payment-password-drawer .ant-drawer-body {
  padding-right: 0;
  padding-left: 0;
  overflow: hidden;
}
.payment-password-drawer .ant-drawer-content-wrapper {
  width: 100% !important;
}
.payment-password-drawer .ant-drawer-content .ant-drawer-wrapper-body .ant-drawer-header {
  display: none;
}
.payment-password-drawer .particle-pc-drawer .payment-verify-content {
  margin-top: 38px;
}
.payment-password-drawer .payment-verify-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 22px;
}
.payment-password-drawer .payment-verify-content .particle-keywords-map {
  position: absolute;
}
@media (min-width: 600px) {
  .payment-password-drawer {
    position: absolute;
  }
}
`,_=({props:r})=>{let{setPaymentVerify:n,setWrongPassword:s}=b(),{t}=C(),[i,o]=m.useState(""),{authCoreModal:w}=g();m.useEffect(()=>{r.visible&&o("")},[r.visible]);let{loading:l,run:y}=x(E,{manual:!0,onSuccess:(e,p)=>{var d;n({visible:!1}),(d=r.onVerifyCompleted)==null||d.call(r,i)},onError:e=>{if(o(""),(e==null?void 0:e.error_code)===c.WrongPaymentPassword)s({visible:!0});else if((e==null?void 0:e.error_code)===c.SecurityAccountFrozen){let p=e.extra.seconds||0;s({visible:!0,accountFrozen:{seconds:p}})}}}),u=()=>{var e;if(l)return!1;n({visible:!1}),(e=r.onVerifyFailed)==null||e.call(r,t("common.cancel"))},f=e=>{o(e),e.length===6&&y(e)};return a.createElement(a.Fragment,null,a.createElement("style",null,P),a.createElement(h,{visible:r.visible,placement:"bottom",height:421,closable:!1,maskClosable:!1,onClose:u,className:"payment-password-drawer",title:r.type==="close"?t("account.close_payment_password"):t("account.payment_password"),forceRender:!0,getContainer:()=>w.rootBody},a.createElement("div",{className:"content payment-verify-content"},a.createElement(v,{onChange:f,value:i,keyboardInvisible:l}))))},D=_;export{D as default};
