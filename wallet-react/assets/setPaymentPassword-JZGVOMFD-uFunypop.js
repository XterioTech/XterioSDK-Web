import{Q as u}from"./chunk-XN5DLXTJ-Sl9LZMF2.js";import{C as N}from"./chunk-IOL7AKAJ-Dtx1pFGJ.js";import{p as w}from"./chunk-3ESANLHR-D7eTrqqK.js";import{X as C,r as n,o as e,B as P,aq as z}from"./index--USN-Ck2.js";import{u as S}from"./useRequest-CdIUPBgQ.js";import{u as Q}from"./useTranslation-DmHkjptd.js";import"./chunk-2EPM6PV4-BOynenoM.js";import"./chunk-XOADOAIQ-CsumA9AR.js";import"./index-BRPciiao.js";import"./debounce-B7WIav43.js";import"./isObject-CrIk3fyR.js";import"./throttle-COt4lw2h.js";import"./index-B4OHGPTA.js";var y=`.set-password-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  color: var(--text-color);
}
.set-password-container .display-none {
  display: none;
}
.set-password-container .password-mistake {
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  margin-top: 50px;
  text-align: center;
  color: var(--error-color);
}
.set-password-container .payment-title {
  margin-top: 60px;
  font-size: 22px;
  color: var(--text-color);
}
.set-password-container .patment-tips1 {
  width: 80vw;
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
  color: var(--text-color);
}
@media (min-width: 600px) {
  .set-password-container .patment-tips1 {
    width: calc(80 * var(--vw));
  }
}
.set-password-container .payment-buttons2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 50px;
}
.set-password-container .payment-buttons2 .payment-main-button2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 47px;
  border: none !important;
  border-radius: var(--primary-btn-border-radius);
  outline: none;
  font-weight: 500;
  font-size: var(--primary-btn-font-size);
  color: var(--primary-btn-color);
  background: var(--primary-btn-background-color);
  opacity: 1;
}
.set-password-container .payment-buttons2 .payment-main-button2:hover {
  color: var(--primary-btn-color);
  background: var(--primary-btn-background-color);
}
.set-password-container .payment-buttons2 .payment-main-button2:disabled {
  opacity: 0.5;
}
@media (max-width: 565px) {
  .set-password-container .payment-buttons2 {
    height: 47px;
    position: absolute;
    bottom: 262px;
  }
}
.set-password-container .success-icon {
  width: 50px;
  height: 50px;
  margin-top: 60px;
}
.set-password-container .payment-desc-1 {
  box-sizing: border-box;
  margin: 15px 0 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: var(--text-color);
}
.set-password-container .keyboard-container {
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
  margin-top: 50px;
}
@media (max-width: 565px) {
  .set-password-container .keyboard-container {
    margin-top: 10px;
  }
}
`,j=g=>{let r=C(),{t:o}=Q(),a=g,[x,s]=n.useState("loading"),[p,i]=n.useState(""),[d,l]=n.useState(""),[b,m]=n.useState(),[h,c]=n.useState(!1),{errorHandle:v}=N(),{loading:f,run:E}=S(z,{manual:!0,onSuccess:()=>{r(-1)},onError:t=>{v(t),(t==null?void 0:t.error_code)===50104&&(i(""),l(""),m(!1),s("password"))}});n.useEffect(()=>{s("password")},[]);let k=t=>{t.length===6?t===d?(i(t),c(!0)):(i(""),l(""),m(!0),s("password"),c(!1)):(i(t),c(!1))},_=()=>{if(a!=null&&a.account)r("/account/verify",{state:{account:a==null?void 0:a.account,password:p,pageType:"reset_payment_password"}});else if(a!=null&&a.oldPassword){let t=a==null?void 0:a.oldPassword;E({password:p,oldPassword:t})}};return x==="confirm"?e.createElement("div",{className:"set-password-container"},e.createElement("style",null,y),e.createElement(w,{className:"icon-navigation-back",name:"circle_back",onClick:()=>r(-1)}),e.createElement("h2",{className:"payment-title"},o("account.set_payment_password")),e.createElement("p",{className:"payment-desc-1"},o("account.re_enter_confirm")),e.createElement("div",{className:"keyboard-container"},e.createElement(u,{onChange:k,value:p})),e.createElement("div",{className:"payment-buttons2"},e.createElement(P,{className:"payment-main-button2",disabled:!h,loading:a!=null&&a.oldPassword?f:!1,onClick:_},o("account.done")))):e.createElement(e.Fragment,null,e.createElement("style",null,y),e.createElement("div",{className:"set-password-container"},e.createElement(w,{className:"icon-navigation-back",name:"circle_back",onClick:()=>r(-1)}),e.createElement("h2",{className:"payment-title"},o("account.set_payment_password")),e.createElement("p",{className:"payment-desc-1"},o("account.set_payment_password_tip")),e.createElement("div",{className:"keyboard-container"},e.createElement(u,{onChange:t=>{l(t),t.length>5&&(m(!1),c(!1),s("confirm"))},value:d})),b&&e.createElement("div",{className:"password-mistake"},o("account.password_do_not_match"))))},J=j;export{J as default};
