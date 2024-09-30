import{p as r}from"./chunk-3WXPHVZ4-D--FIW4O.js";import{o as l,ap as u,am as i}from"./index-BqQtutl2.js";import{I as s}from"./index-CJex8l4l.js";var n=`.icon-eye {
  display: block;
  margin: auto;
  font-size: 23px;
}
`,d=()=>l.createElement(l.Fragment,null,l.createElement("style",null,n),l.createElement(r,{className:"icon-eye",name:"eye_open"})),p=()=>l.createElement(l.Fragment,null,l.createElement("style",null,n),l.createElement(r,{className:"icon-eye",name:"eye_close"})),c=`.password-input {
  position: relative;
  width: 100%;
  height: 47px;
  min-height: 47px;
  padding: 0;
  border: none !important;
  border-radius: var(--primary-btn-border-radius);
  overflow: hidden;
  background: none;
}
.password-input input {
  width: 100%;
  height: 45px;
  padding: 0 8px;
  padding-left: 16px !important;
  font-weight: 500;
  font-size: 15px;
  color: var(--text-color);
  background-color: var(--input-background-color);
}
.password-input .ant-input-suffix {
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 14px;
  cursor: pointer;
}
`,m=e=>{let o=l.useRef(null);return l.createElement(l.Fragment,null,l.createElement("style",null,c),l.createElement(s.Password,{ref:o,className:"password-input"+(e!=null&&e.className?` ${e==null?void 0:e.className}`:""),iconRender:a=>a?l.createElement("div",null,l.createElement(d,null)):l.createElement("div",null,l.createElement(p,null)),onChange:a=>{var t;e!=null&&e.onChange&&((t=e==null?void 0:e.onChange)==null||t.call(e,a.target.value))},defaultValue:e==null?void 0:e.defaultValue,maxLength:(e==null?void 0:e.maxLength)||20,onPressEnter:a=>{var t;return(t=e==null?void 0:e.onPressEnter)==null?void 0:t.call(e,a)},onBlur:a=>{var t;return(t=e==null?void 0:e.onBlur)==null?void 0:t.call(e,a)},autoFocus:u(e==null?void 0:e.autoFocus)&&i()?!0:e==null?void 0:e.autoFocus}))},x=m;export{x as B};
