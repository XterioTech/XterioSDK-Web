import{w as Y}from"./chunk-52P64AJK-_hxTF0Zu.js";import{p as K}from"./chunk-3ESANLHR-CexHsWNM.js";import{N as L}from"./chunk-2EPM6PV4-BlpZ2WH3.js";import{b1 as g,b2 as f,r as a,b3 as x,bc as C,bl as b,aL as W,aM as D,bm as U,b8 as V,X,H as F,s as G,o as u,bn as J}from"./index-CHt3rxXl.js";import{u as Q}from"./useRequest-B_JXadJa.js";import{O as T}from"./dayjs.min-DQzk5cFu.js";import{u as Z}from"./useTranslation-CQWAcDme.js";import"./index-D2HwSUL4.js";import"./debounce-3tLhzlkc.js";import"./isObject-CrIk3fyR.js";import"./throttle-CUK4_B_y.js";import"./index-BJmIDvcZ.js";var _=function(e){var i=e.prefixCls,v=e.className,d=e.style,r=e.size,s=e.shape,l=g(f(f({},"".concat(i,"-lg"),r==="large"),"".concat(i,"-sm"),r==="small")),t=g(f(f(f({},"".concat(i,"-circle"),s==="circle"),"".concat(i,"-square"),s==="square"),"".concat(i,"-round"),s==="round")),c=a.useMemo(function(){return typeof r=="number"?{width:r,height:r,lineHeight:"".concat(r,"px")}:{}},[r]);return a.createElement("span",{className:g(i,l,t,v),style:x(x({},c),d)})},ee=function(e){var i=e.prefixCls,v=e.className,d=e.active,r=e.shape,s=r===void 0?"circle":r,l=e.size,t=l===void 0?"default":l,c=a.useContext(C),m=c.getPrefixCls,o=m("skeleton",i),p=b(e,["prefixCls","className"]),N=g(o,"".concat(o,"-element"),f({},"".concat(o,"-active"),d),v);return a.createElement("div",{className:N},a.createElement(_,x({prefixCls:"".concat(o,"-avatar"),shape:s,size:t},p)))},te=function(e){var i=e.prefixCls,v=e.className,d=e.active,r=e.block,s=r===void 0?!1:r,l=e.size,t=l===void 0?"default":l,c=a.useContext(C),m=c.getPrefixCls,o=m("skeleton",i),p=b(e,["prefixCls"]),N=g(o,"".concat(o,"-element"),f(f({},"".concat(o,"-active"),d),"".concat(o,"-block"),s),v);return a.createElement("div",{className:N},a.createElement(_,x({prefixCls:"".concat(o,"-button"),size:t},p)))},ae={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"dot-chart",theme:"outlined"},ie=function(e,i){return a.createElement(W,D(D({},e),{},{ref:i,icon:ae}))},re=a.forwardRef(ie),ce=function(e){var i=e.prefixCls,v=e.className,d=e.style,r=e.active,s=e.children,l=a.useContext(C),t=l.getPrefixCls,c=t("skeleton",i),m=g(c,"".concat(c,"-element"),f({},"".concat(c,"-active"),r),v),o=s??a.createElement(re,null);return a.createElement("div",{className:m},a.createElement("div",{className:g("".concat(c,"-image"),v),style:d},o))},ne="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",le=function(e){var i=e.prefixCls,v=e.className,d=e.style,r=e.active,s=a.useContext(C),l=s.getPrefixCls,t=l("skeleton",i),c=g(t,"".concat(t,"-element"),f({},"".concat(t,"-active"),r),v);return a.createElement("div",{className:c},a.createElement("div",{className:g("".concat(t,"-image"),v),style:d},a.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(t,"-image-svg")},a.createElement("path",{d:ne,className:"".concat(t,"-image-path")}))))},se=function(e){var i=e.prefixCls,v=e.className,d=e.active,r=e.block,s=e.size,l=s===void 0?"default":s,t=a.useContext(C),c=t.getPrefixCls,m=c("skeleton",i),o=b(e,["prefixCls"]),p=g(m,"".concat(m,"-element"),f(f({},"".concat(m,"-active"),d),"".concat(m,"-block"),r),v);return a.createElement("div",{className:p},a.createElement(_,x({prefixCls:"".concat(m,"-input"),size:l},o)))},oe=function(e){var i=function(c){var m=e.width,o=e.rows,p=o===void 0?2:o;if(Array.isArray(m))return m[c];if(p-1===c)return m},v=e.prefixCls,d=e.className,r=e.style,s=e.rows,l=U(Array(s)).map(function(t,c){return a.createElement("li",{key:c,style:{width:i(c)}})});return a.createElement("ul",{className:g(v,d),style:r},l)},ve=function(e){var i=e.prefixCls,v=e.className,d=e.width,r=e.style;return a.createElement("h3",{className:g(i,v),style:x({width:d},r)})};function k(n){return n&&V(n)==="object"?n:{}}function me(n,e){return n&&!e?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}function de(n,e){return!n&&e?{width:"38%"}:n&&e?{width:"50%"}:{}}function ue(n,e){var i={};return(!n||!e)&&(i.width="61%"),!n&&e?i.rows=3:i.rows=2,i}var w=function(e){var i=e.prefixCls,v=e.loading,d=e.className,r=e.style,s=e.children,l=e.avatar,t=l===void 0?!1:l,c=e.title,m=c===void 0?!0:c,o=e.paragraph,p=o===void 0?!0:o,N=e.active,B=e.round,P=a.useContext(C),M=P.getPrefixCls,j=P.direction,h=M("skeleton",i);if(v||!("loading"in e)){var y=!!t,E=!!m,z=!!p,$;if(y){var R=x(x({prefixCls:"".concat(h,"-avatar")},me(E,z)),k(t));$=a.createElement("div",{className:"".concat(h,"-header")},a.createElement(_,x({},R)))}var S;if(E||z){var q;if(E){var A=x(x({prefixCls:"".concat(h,"-title")},de(y,z)),k(m));q=a.createElement(ve,x({},A))}var I;if(z){var O=x(x({prefixCls:"".concat(h,"-paragraph")},ue(y,E)),k(p));I=a.createElement(oe,x({},O))}S=a.createElement("div",{className:"".concat(h,"-content")},q,I)}var H=g(h,f(f(f(f({},"".concat(h,"-with-avatar"),y),"".concat(h,"-active"),N),"".concat(h,"-rtl"),j==="rtl"),"".concat(h,"-round"),B),d);return a.createElement("div",{className:H,style:r},$,S)}return typeof s<"u"?s:null};w.Button=te;w.Avatar=ee;w.Input=se;w.Image=le;w.Node=ce;var fe=`.device-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--text-color);
}
.device-list-container .scroll-wrapper {
  flex: 1;
  overflow: auto;
}
.device-list-container .devices-description {
  margin: 32px 18px 40px;
  font-weight: 400;
  font-size: 13px;
  color: var(--secondary-text-color);
}
.device-list-container .ant-spin-nested-loading > div > .ant-spin {
  top: 10vh;
}
.device-list-container .device-list {
  width: 100%;
  padding: 0 18px;
}
.device-list-container .device-list .ant-skeleton-content .ant-skeleton-title {
  display: none;
}
.device-list-container .device-list .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 12px 0 14px;
  margin-bottom: 10px;
  border-radius: var(--card-border-radius);
  background: var(--card-unclickable-background-color);
  cursor: pointer;
}
.device-list-container .device-list .item .device {
  font-weight: 500;
  font-size: 14px;
}
.device-list-container .device-list .item .created_at {
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  color: var(--secondary-text-color);
}
.device-list-container .device-list .item .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.device-list-container .device-list .item .right .arrow-right-icon {
  color: var(--text-color);
}
.device-list-container .device-list .item .right .arrow-right-icon svg {
  width: 12px;
  height: 12px;
}
.device-list-container .device-list .item .right .current-icon {
  position: relative;
  height: 20px;
  padding: 0 10px;
  border-radius: 30px;
  overflow: hidden;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  color: var(--accent-color);
}
.device-list-container .device-list .item .right .current-icon::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--accent-color);
  opacity: 0.15;
  content: '';
}
`,xe=()=>{let{t:n}=Z(),e=X(),{modalOptions:i}=F(),{language:v}=G(),{loading:d,data:r=[],run:s}=Q(()=>J().then(l=>l.map(t=>{var c,m;if(t.updated_at&&(t.updated_at=T(new Date(t.updated_at)).format("YYYY/MM/DD HH:mm")),(i.projectId===t.project_app_uuid||i.appId===t.project_app_uuid)&&(t.isCurrent=!0),t.login_channel&&(t.login_channel=t.login_channel.replace(/( |^)[a-z]/g,o=>o.toUpperCase())),(c=t==null?void 0:t.location)!=null&&c.country_code)try{t.location.country_name=new Intl.DisplayNames([v||"en"],{type:"region"}).of((m=t==null?void 0:t.location)==null?void 0:m.country_code)}catch{}return t})),{cacheKey:"getAuthorizations",manual:!0});return a.useEffect(()=>{s()},[]),u.createElement("div",{className:"device-list-container"},u.createElement("style",null,fe),u.createElement(Y,{displayBackBtn:!0},n("new.authorization")),u.createElement("div",{className:"scroll-wrapper"},u.createElement("div",{className:"devices-description"},n("new.authorization_tips")),d?u.createElement("div",{className:"device-list"},u.createElement(w,null)):u.createElement("div",{className:"device-list"},r==null?void 0:r.map((l,t)=>u.createElement("div",{className:"item",key:t,onClick:()=>{e("/manageDevices/deviceDetails",{state:{loginDeviceInfo:l}})}},u.createElement("div",{className:"left"},u.createElement("div",{className:"wrap"},u.createElement("div",{className:"s-row device"},l.project_app_name),u.createElement("div",{className:"s-row created_at"},l.updated_at))),u.createElement("div",{className:"right"},l.isCurrent&&u.createElement("div",{className:"current-icon"},n("new.current")),u.createElement(K,{className:"arrow-right-icon",name:"arrow_right_icon"})))))),u.createElement(L,{className:"footer-box-v2"}))},Pe=xe;export{Pe as default};
