import{Q as f}from"./chunk-XN5DLXTJ-aQHGUeMJ.js";import{F as b,r as m,h,o as a,ax as g,D as c,ar as x}from"./index-DSIv8rOK.js";import{u as E}from"./useRequest-azkaO2rX.js";import{u as C}from"./useTranslation-DrIf-TEc.js";import"./chunk-3ESANLHR-BlJc80Yk.js";import"./chunk-2EPM6PV4-CkNGiEMe.js";import"./index-wUELunyM.js";import"./debounce-DXROggiU.js";import"./isObject-CrIk3fyR.js";import"./throttle-DJVXKxdG.js";import"./index-DHrSbZ73.js";var P=`.payment-password-drawer {
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
`,F=({props:r})=>{let{setPaymentVerify:n,setWrongPassword:s}=b(),{t}=C(),[i,o]=m.useState(""),{authCoreModal:w}=h();m.useEffect(()=>{r.visible&&o("")},[r.visible]);let{loading:l,run:y}=E(x,{manual:!0,onSuccess:(e,p)=>{var d;n({visible:!1}),(d=r.onVerifyCompleted)==null||d.call(r,i)},onError:e=>{if(o(""),(e==null?void 0:e.error_code)===c.WrongPaymentPassword)s({visible:!0});else if((e==null?void 0:e.error_code)===c.SecurityAccountFrozen){let p=e.extra.seconds||0;s({visible:!0,accountFrozen:{seconds:p}})}}}),u=()=>{var e;if(l)return!1;n({visible:!1}),(e=r.onVerifyFailed)==null||e.call(r,t("common.cancel"))},v=e=>{o(e),e.length===6&&y(e)};return a.createElement(a.Fragment,null,a.createElement("style",null,P),a.createElement(g,{visible:r.visible,placement:"bottom",height:421,closable:!1,maskClosable:!1,onClose:u,className:"payment-password-drawer",title:r.type==="close"?t("account.close_payment_password"):t("account.payment_password"),forceRender:!0,getContainer:()=>w.rootBody},a.createElement("div",{className:"content payment-verify-content"},a.createElement(f,{onChange:v,value:i,keyboardInvisible:l}))))},B=F;export{B as default};
