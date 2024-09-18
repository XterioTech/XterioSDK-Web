import{N as _}from"./chunk-6XELNGMB-BZbs-Ezu.js";import{w}from"./chunk-OKJHILVH-D8gP9tWH.js";import{p as k}from"./chunk-6FDR7EVX-DWPWlGBs.js";import{N as E}from"./chunk-DWYPWXMA-BUu0FnTm.js";import{aQ as N,r as h,aR as T,aS as $,aT as S,A as s,Y as O,V as A,v as j,t as z,w as B,l as F,X as I,F as M,o as c}from"./index-BQ75acfp.js";import{B as C}from"./throttle-BuNBpyGt.js";import{u as L}from"./useTranslation-B0MJK2sY.js";function P(l,e){var t,r=N(l),u=(t=e==null?void 0:e.wait)!==null&&t!==void 0?t:1e3,o=h.useMemo(function(){return C(function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];return r.current.apply(r,T([],$(i),!1))},u,e)},[]);return S(function(){o.cancel()}),{run:o,cancel:o.cancel,flush:o.flush}}var V=`.login-account-box {
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
`,b=l=>{let{userInfo:e,t}=l;return[{type:s.phone,icon:O,name:t("account.mobile"),value:e.phone,id:void 0,isOriginal:!1},{type:s.email,icon:A,name:t("account.email"),value:e.email,id:void 0,isOriginal:!1},{type:s.google,icon:j,name:t("login.google"),value:e.google_email,id:e.google_id,isOriginal:!1},{type:s.facebook,icon:z,name:t("login.facebook"),value:e.facebook_email,id:e.facebook_id,isOriginal:!1},{type:s.twitter,icon:B,name:t("login.twitter"),value:e.twitter_email,id:e.twitter_id,isOriginal:!1}]},y=l=>{var e,t,r,u;let o=l==null?void 0:l.replace(" ","");if(o)if((e=o==null?void 0:o.includes)!=null&&e.call(o,"@"))o=`${o.split("@")[0].substr(0,3)}****@${o.split("@")[1]}`;else if((t=o==null?void 0:o.includes)!=null&&t.call(o,"+")){let i=F(o),a=i.nationalNumber.toString();o=`+${i.countryCallingCode} ${(r=a==null?void 0:a.substr)==null?void 0:r.call(a,0,3)}****${(u=a==null?void 0:a.substr)==null?void 0:u.call(a,-4)}`}else o&&(o=`${o.substr(0,3)}****${o.substr(-4)}`);else return o;return o},d,Y=()=>{let{t:l}=L(),e=I(),{userInfo:t,showSelectSecurityAccount:r}=M(),u=_(),{run:o}=P(n=>{e("/account/verify",{state:{account:n.account,authType:d,pageType:"verify_security_account_bind_login_account"}})},{wait:3e3}),i=h.useMemo(()=>b({userInfo:t,t:l}),[t]),a=n=>{var g,m,p,v,f,x;n.value||n.id?e("/login-account/bind",{state:{authType:n.type}}):!((g=t==null?void 0:t.security_account)!=null&&g.email)&&!((m=t==null?void 0:t.security_account)!=null&&m.phone)?u.error("Please bind security account first."):(p=t==null?void 0:t.security_account)!=null&&p.email&&((v=t==null?void 0:t.security_account)!=null&&v.phone)?r(!0,{authType:d,pageType:"verify_security_account_bind_login_account"}):o({account:((f=t==null?void 0:t.security_account)==null?void 0:f.email)||((x=t==null?void 0:t.security_account)==null?void 0:x.phone)})};return c.createElement("div",{className:"login-account-box"},c.createElement("style",null,V),c.createElement(w,{displayBackBtn:!0},l("account.login_account")),c.createElement("div",{className:"scroll-content"},c.createElement("div",{className:"login-account-description"},l("account.login_account_hint")),c.createElement("div",{className:"account-list"},i==null?void 0:i.map((n,g)=>c.createElement("div",{className:"login-account-item",onClick:()=>{d=n.type,a(n)},key:g},c.createElement("img",{src:n.icon}),c.createElement("div",{className:"login-account-name"},n.name),c.createElement("div",{className:"login-account-value","data-no-linked":!(n.value||n.id)},y(n.value||n.id)||l("account.not_linked")),c.createElement(k,{className:"arrow-right-icon",name:"arrow_right_icon"}))))),c.createElement(E,{className:"footer-box-v2"}))},Q=Y;const D=Object.freeze(Object.defineProperty({__proto__:null,default:Q,encryptValue:y,getAccountList:b},Symbol.toStringTag,{value:"Module"}));export{y as j,D as l,P as u,b as z};
