import{Q as d}from"./chunk-XN5DLXTJ-Sl9LZMF2.js";import{w as x}from"./chunk-52P64AJK-CWT1pNy0.js";import{X as g,r as u,F as y,o as t,D as s,ar as w}from"./index--USN-Ck2.js";import{u as f}from"./useRequest-CdIUPBgQ.js";import{u as v}from"./useTranslation-DmHkjptd.js";import"./chunk-3ESANLHR-D7eTrqqK.js";import"./chunk-2EPM6PV4-BOynenoM.js";import"./index-BRPciiao.js";import"./debounce-B7WIav43.js";import"./isObject-CrIk3fyR.js";import"./throttle-COt4lw2h.js";import"./index-B4OHGPTA.js";var h=`.payment-password-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  color: var(--text-color);
}
.payment-password-container > .wrapper {
  padding: 0 30px;
}
.payment-password-container .display-none {
  display: none;
}
.payment-password-container .page-title {
  margin-top: 0px;
  font-size: 22px;
  color: var(--text-color);
  text-align: center;
}
.payment-title {
  margin-top: 60px;
  font-size: 22px;
  color: var(--text-color);
}
.patment-tips1 {
  width: 80vw;
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
  color: var(--text-color);
}
@media (min-width: 600px) {
  .patment-tips1 {
    width: calc(80 * var(--vw));
  }
}
.payment-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
}
.success-icon {
  width: 50px;
  height: 50px;
  margin-top: 60px;
}
.payment-desc-1 {
  box-sizing: border-box;
  margin: 15px 0 75px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: var(--text-color);
}
`,b=E=>{let p=g(),{t:o}=v(),[r,a]=u.useState(""),{setWrongPassword:n}=y(),{loading:l,run:c}=f(w,{manual:!0,onSuccess:(e,i)=>{p("/account/set-password",{state:{oldPassword:r},replace:!0})},onError:e=>{if(a(""),(e==null?void 0:e.error_code)===s.WrongPaymentPassword)n({visible:!0});else if((e==null?void 0:e.error_code)===s.SecurityAccountFrozen){let i=e.extra.seconds||0;n({visible:!0,accountFrozen:{seconds:i}})}}}),m=e=>{a(e),e.length===6&&c(e)};return t.createElement(t.Fragment,null,t.createElement("style",null,h),t.createElement("div",{className:"payment-password-container"},t.createElement(x,{displayBackBtn:!0}),t.createElement("div",{className:"wrapper"},t.createElement("div",{className:"page-title"},o("account.change_payment_password")),t.createElement("p",{className:"payment-desc-1"},o("account.change_enter_payment")),t.createElement(d,{onChange:m,value:r,keyboardInvisible:l}))))},C=b;export{C as default};
