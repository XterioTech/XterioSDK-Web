import{F as h,X as y,h as g,o,ax as x,B as d,A as p,P as f,S as w}from"./index-wSVIwGKF.js";import{u as C}from"./useTranslation-Dlsxa64P.js";var _=`.select-account-drawer .ant-drawer-body {
  padding: 18px !important;
}
.select-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.select-account .close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.select-account .account-btn {
  width: 100%;
  height: 47px;
  border: none;
  border-radius: var(--primary-btn-border-radius);
  outline: none;
  font-size: var(--primary-btn-font-size);
  line-height: 22px;
  color: var(--primary-btn-color);
  background: var(--primary-btn-background-color);
}
.select-account .account-btn:hover {
  opacity: var(--hover-opacity);
}
.select-account .select-account-title {
  padding-top: 24px;
  padding-bottom: 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 1;
  color: var(--text-color);
}
`,E=m=>{var c,n,l;let{t:a}=C(),{visible:v,state:r}=m,{showSelectSecurityAccount:i,userInfo:e}=h(),u=y(),{authCoreModal:b}=g(),s=(t,k)=>{r?u("/account/verify",{state:{account:t,...r}}):u("/account/set-password",{state:{account:t}}),i(!1)};return o.createElement(o.Fragment,null,o.createElement("style",null,_),o.createElement(x,{title:(c=a("account.modal_select_verification"))!=null?c:"",placement:"bottom",closable:!1,className:"select-account-drawer",visible:v,maskClosable:!0,forceRender:!0,height:220,onClose:()=>i(!1),getContainer:()=>b.rootBody},o.createElement("div",{className:"select-account"},o.createElement(d,{className:"account-btn",onClick:()=>{var t;return s((t=e==null?void 0:e.security_account)==null?void 0:t.email,p.email)}},`${a("account.email")} - ${f(((n=e==null?void 0:e.security_account)==null?void 0:n.email)||"")}`),o.createElement(d,{className:"account-btn",onClick:()=>{var t;return s((t=e==null?void 0:e.security_account)==null?void 0:t.phone,p.phone)}},`${a("account.mobile")} - ${w(((l=e==null?void 0:e.security_account)==null?void 0:l.phone)||"")}`))))},z=E;export{z as default};
