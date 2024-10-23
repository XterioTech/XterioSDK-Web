import{N as _}from"./chunk-BOXSB6AN-BNzyKhvg.js";import{w}from"./chunk-IBLFF4W2-DoVCDBSi.js";import{p as E}from"./chunk-3WXPHVZ4-BetGuJbx.js";import{N as k}from"./chunk-6X7TBCV3-Dsqvp6wN.js";import{aQ as N,r as h,aR as T,aS as $,aT as O,A as s,K as S,V as A,w as j,v as z,x as B,p as K,J as C,L as I,o as c}from"./index-DRbKv4Ap.js";import{B as J}from"./throttle-B_QCviSc.js";import{u as L}from"./useTranslation-DS9VROIZ.js";function M(l,e){var o,r=N(l),u=(o=e==null?void 0:e.wait)!==null&&o!==void 0?o:1e3,t=h.useMemo(function(){return J(function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];return r.current.apply(r,T([],$(i),!1))},u,e)},[]);return O(function(){t.cancel()}),{run:t,cancel:t.cancel,flush:t.flush}}var P=`.login-account-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: var(--text-color);
}
.login-account-box .login-account-title {
  font-weight: 500;
  font-size: 18px;
}
.login-account-box .login-account-description {
  margin: 32px 18px 40px;
  font-weight: 400;
  font-size: 13px;
  color: var(--secondary-text-color);
}
.login-account-box .account-list {
  width: 100%;
  padding: 0 18px;
}
.login-account-box .account-list .login-account-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 12px 0 14px;
  margin-bottom: 10px;
  border-radius: var(--card-border-radius);
  background: var(--card-unclickable-background-color);
  cursor: pointer;
}
.login-account-box .account-list .login-account-item img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
}
.login-account-box .account-list .login-account-item .login-account-name {
  flex-grow: 1;
  margin-left: 8px;
  font-weight: 500;
  font-size: 14px;
}
.login-account-box .account-list .login-account-item .login-account-value {
  flex-grow: 2;
  max-width: 180px;
  margin-right: 8px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-color);
}
.login-account-box .account-list .login-account-item .login-account-value[data-no-linked='true'] {
  color: var(--secondary-text-color);
}
.login-account-box .account-list .login-account-item:hover {
  opacity: var(--hover-opacity);
}
.login-account-box .account-list .arrow-right-icon {
  color: var(--text-color);
}
.login-account-box .account-list .arrow-right-icon svg {
  width: 12px;
  height: 12px;
}
.login-account-box .footer-box {
  position: absolute;
  bottom: 0;
}
`,b=l=>{let{userInfo:e,t:o}=l;return[{type:s.phone,icon:S,name:o("account.mobile"),value:e.phone,id:void 0,isOriginal:!1},{type:s.email,icon:A,name:o("account.email"),value:e.email,id:void 0,isOriginal:!1},{type:s.google,icon:j,name:o("login.google"),value:e.google_email,id:e.google_id,isOriginal:!1},{type:s.facebook,icon:z,name:o("login.facebook"),value:e.facebook_email,id:e.facebook_id,isOriginal:!1},{type:s.twitter,icon:B,name:o("login.twitter"),value:e.twitter_email,id:e.twitter_id,isOriginal:!1}]},y=l=>{var e,o,r,u;let t=l==null?void 0:l.replace(" ","");if(t)if((e=t==null?void 0:t.includes)!=null&&e.call(t,"@"))t=`${t.split("@")[0].substr(0,3)}****@${t.split("@")[1]}`;else if((o=t==null?void 0:t.includes)!=null&&o.call(t,"+")){let i=K(t),a=i.nationalNumber.toString();t=`+${i.countryCallingCode} ${(r=a==null?void 0:a.substr)==null?void 0:r.call(a,0,3)}****${(u=a==null?void 0:a.substr)==null?void 0:u.call(a,-4)}`}else t&&(t=`${t.substr(0,3)}****${t.substr(-4)}`);else return t;return t},d,V=()=>{let{t:l}=L(),e=C(),{userInfo:o,showSelectSecurityAccount:r}=I(),u=_(),{run:t}=M(n=>{e("/account/verify",{state:{account:n.account,authType:d,pageType:"verify_security_account_bind_login_account"}})},{wait:3e3}),i=h.useMemo(()=>b({userInfo:o,t:l}),[o]),a=n=>{var g,m,p,v,f,x;n.value||n.id?e("/login-account/bind",{state:{authType:n.type}}):!((g=o==null?void 0:o.security_account)!=null&&g.email)&&!((m=o==null?void 0:o.security_account)!=null&&m.phone)?u.error("Please bind security account first."):(p=o==null?void 0:o.security_account)!=null&&p.email&&((v=o==null?void 0:o.security_account)!=null&&v.phone)?r(!0,{authType:d,pageType:"verify_security_account_bind_login_account"}):t({account:((f=o==null?void 0:o.security_account)==null?void 0:f.email)||((x=o==null?void 0:o.security_account)==null?void 0:x.phone)})};return c.createElement("div",{className:"login-account-box"},c.createElement("style",null,P),c.createElement(w,{displayBackBtn:!0},l("account.login_account")),c.createElement("div",{className:"scroll-content"},c.createElement("div",{className:"login-account-description"},l("account.login_account_hint")),c.createElement("div",{className:"account-list"},i==null?void 0:i.map((n,g)=>c.createElement("div",{className:"login-account-item",onClick:()=>{d=n.type,a(n)},key:g},c.createElement("img",{src:n.icon}),c.createElement("div",{className:"login-account-name"},n.name),c.createElement("div",{className:"login-account-value","data-no-linked":!(n.value||n.id)},y(n.value||n.id)||l("account.not_linked")),c.createElement(E,{className:"arrow-right-icon",name:"arrow_right_icon"}))))),c.createElement(k,{className:"footer-box-v2"}))},F=V;const G=Object.freeze(Object.defineProperty({__proto__:null,default:F,encryptValue:y,getAccountList:b},Symbol.toStringTag,{value:"Module"}));export{y as j,G as l,M as u,b as z};
