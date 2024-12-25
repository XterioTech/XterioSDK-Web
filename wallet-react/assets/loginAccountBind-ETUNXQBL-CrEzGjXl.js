import{r as je,t as vt,g as qe}from"./unicode-JQcmJgeo.js";import{z as bt,u as gt,j as ze}from"./loginAccount-E66JXWKK-B38y6-X4.js";import{N as ht}from"./chunk-BOXSB6AN-3SJ1oefi.js";import{w as yt}from"./chunk-IBLFF4W2-draDTW5L.js";import{N as xt}from"./chunk-6X7TBCV3-BWDfor95.js";import{bg as De,aQ as wt,bh as Nt,r,bc as Qe,aZ as he,bi as Ye,bj as Ze,b2 as H,b3 as N,aA as ye,bk as St,bl as Ue,aU as Et,a$ as ie,be as et,bm as Ie,bn as It,bo as ve,ba as kt,bp as Ct,bq as _t,br as Rt,bs as Dt,bt as Le,bu as He,bv as Ke,J as Ft,E as Vt,L as $t,R as Mt,A as be,p as tt,o as p,f as At,B as Tt,bw as Ot,X as ke,l as We}from"./index-DuL_NNup.js";import{u as Bt}from"./useRequest-DYeJA-Cj.js";import{u as nt}from"./useTranslation-ziJnxY5V.js";import{F as K,I as _e}from"./index-DxrhVKlv.js";import{D as Pt,R as jt}from"./DownOutlined-DdINlqDN.js";import{U as qt}from"./UpOutlined-COHBlDPP.js";import{i as zt}from"./colors-Um2HFQEm.js";import{g as Ce,a as Ut}from"./TextArea-DBWmJbWb.js";import"./chunk-3WXPHVZ4-BMzJZrqZ.js";import"./throttle-CiXzf_7E.js";import"./debounce-CvtyTbuq.js";import"./isObject-CrIk3fyR.js";import"./index-95glfK28.js";import"./AntdIcon-CR386ADN.js";var Lt=function(e){return e.every(function(n){var t=De(n);return t?t.getRootNode()instanceof ShadowRoot:!1})},Ht=function(e){return e?e.getRootNode():document},Kt=function(e){if(!e||!document.getRootNode)return document;var n=Array.isArray(e)?e:[e];return Lt(n)?Ht(De(n[0])):document};function Wt(e,n,t){t===void 0&&(t="click");var o=wt(e);Nt(function(){var a=function(l){var b=Array.isArray(n)?n:[n];b.some(function(w){var d=De(w);return!d||d.contains(l.target)})||o.current(l)},u=Kt(n),g=Array.isArray(t)?t:[t];return g.forEach(function(l){return u.addEventListener(l,a)}),function(){g.forEach(function(l){return u.removeEventListener(l,a)})}},Array.isArray(t)?t:[t],n)}var Gt=function(n,t){return r.createElement(Qe,he(he({},n),{},{ref:t,icon:Pt}))},Xt=r.forwardRef(Gt),Jt=function(n,t){return r.createElement(Qe,he(he({},n),{},{ref:t,icon:qt}))},Qt=r.forwardRef(Jt);function Re(){return typeof BigInt=="function"}function W(e){var n=e.trim(),t=n.startsWith("-");t&&(n=n.slice(1)),n=n.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,""),n.startsWith(".")&&(n="0".concat(n));var o=n||"0",a=o.split("."),u=a[0]||"0",g=a[1]||"0";u==="0"&&g==="0"&&(t=!1);var l=t?"-":"";return{negative:t,negativeStr:l,trimStr:o,integerStr:u,decimalStr:g,fullStr:"".concat(l).concat(o)}}function Fe(e){var n=String(e);return!Number.isNaN(Number(n))&&n.includes("e")}function oe(e){var n=String(e);if(Fe(e)){var t=Number(n.slice(n.indexOf("e-")+2)),o=n.match(/\.(\d+)/);return o!=null&&o[1]&&(t+=o[1].length),t}return n.includes(".")&&Ve(n)?n.length-n.indexOf(".")-1:0}function xe(e){var n=String(e);if(Fe(e)){if(e>Number.MAX_SAFE_INTEGER)return String(Re()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(Re()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);n=e.toFixed(oe(n))}return W(n).fullStr}function Ve(e){return typeof e=="number"?!Number.isNaN(e):e?/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e):!1}function Ge(e){var n=typeof e=="number"?xe(e):W(e).fullStr,t=n.includes(".");return t?W(n.replace(/(\d)\.(\d)/g,"$1$2.")).fullStr:e+"0"}var Yt=function(){function e(n){if(Ze(this,e),this.origin="",this.number=void 0,this.empty=void 0,!n&&n!==0||!String(n).trim()){this.empty=!0;return}this.origin=String(n),this.number=Number(n)}return Ye(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var o=Number(t);if(Number.isNaN(o))return this;var a=this.number+o;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var u=Math.max(oe(this.number),oe(o));return new e(a.toFixed(u))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(t){return this.toNumber()===(t==null?void 0:t.toNumber())}},{key:"lessEquals",value:function(t){return this.add(t.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return t?this.isInvalidate()?"":xe(this.number):this.origin}}]),e}(),Zt=function(){function e(n){if(Ze(this,e),this.origin="",this.negative=void 0,this.integer=void 0,this.decimal=void 0,this.decimalLen=void 0,this.empty=void 0,this.nan=void 0,!n&&n!==0||!String(n).trim()){this.empty=!0;return}if(this.origin=String(n),n==="-"){this.nan=!0;return}var t=n;if(Fe(t)&&(t=Number(t)),t=typeof t=="string"?t:xe(t),Ve(t)){var o=W(t);this.negative=o.negative;var a=o.trimStr.split(".");this.integer=BigInt(a[0]);var u=a[1]||"0";this.decimal=BigInt(u),this.decimalLen=u.length}else this.nan=!0}return Ye(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(t){var o="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(t,"0"));return BigInt(o)}},{key:"negate",value:function(){var t=new e(this.toString());return t.negative=!t.negative,t}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var o=new e(t);if(o.isInvalidate())return this;var a=Math.max(this.getDecimalStr().length,o.getDecimalStr().length),u=this.alignDecimal(a),g=o.alignDecimal(a),l=(u+g).toString(),b=W(l),w=b.negativeStr,d=b.trimStr,h="".concat(w).concat(d.padStart(a+1,"0"));return new e("".concat(h.slice(0,-a),".").concat(h.slice(-a)))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(t){return this.toString()===(t==null?void 0:t.toString())}},{key:"lessEquals",value:function(t){return this.add(t.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return t?this.isInvalidate()?"":W("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}();function M(e){return Re()?new Zt(e):new Yt(e)}function ge(e,n,t){var o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e==="")return"";var a=W(e),u=a.negativeStr,g=a.integerStr,l=a.decimalStr,b="".concat(n).concat(l),w="".concat(u).concat(g);if(t>=0){var d=Number(l[t]);if(d>=5&&!o){var h=M(e).add("".concat(u,"0.").concat("0".repeat(t)).concat(10-d));return ge(h.toString(),n,t,o)}return t===0?w:"".concat(w).concat(n).concat(l.padEnd(t,"0").slice(0,t))}return b===".0"?w:"".concat(w).concat(b)}var en=200,tn=600;function nn(e){var n=e.prefixCls,t=e.upNode,o=e.downNode,a=e.upDisabled,u=e.downDisabled,g=e.onStep,l=r.useRef(),b=r.useRef();b.current=g;var w=function(C,E){C.preventDefault(),b.current(E);function I(){b.current(E),l.current=setTimeout(I,en)}l.current=setTimeout(I,tn)},d=function(){clearTimeout(l.current)};if(r.useEffect(function(){return d},[]),zt())return null;var h="".concat(n,"-handler"),S=H(h,"".concat(h,"-up"),N({},"".concat(h,"-up-disabled"),a)),k=H(h,"".concat(h,"-down"),N({},"".concat(h,"-down-disabled"),u)),i={unselectable:"on",role:"button",onMouseUp:d,onMouseLeave:d};return r.createElement("div",{className:"".concat(h,"-wrap")},r.createElement("span",ye({},i,{onMouseDown:function(C){w(C,!0)},"aria-label":"Increase Value","aria-disabled":a,className:S}),t||r.createElement("span",{unselectable:"on",className:"".concat(n,"-handler-up-inner")})),r.createElement("span",ye({},i,{onMouseDown:function(C){w(C,!1)},"aria-label":"Decrease Value","aria-disabled":u,className:k}),o||r.createElement("span",{unselectable:"on",className:"".concat(n,"-handler-down-inner")})))}function rn(e,n){var t=r.useRef(null);function o(){try{var u=e.selectionStart,g=e.selectionEnd,l=e.value,b=l.substring(0,u),w=l.substring(g);t.current={start:u,end:g,value:l,beforeTxt:b,afterTxt:w}}catch{}}function a(){if(e&&t.current&&n)try{var u=e.value,g=t.current,l=g.beforeTxt,b=g.afterTxt,w=g.start,d=u.length;if(u.endsWith(b))d=u.length-t.current.afterTxt.length;else if(u.startsWith(l))d=l.length;else{var h=l[w-1],S=u.indexOf(h,w-1);S!==-1&&(d=S+1)}e.setSelectionRange(d,d)}catch(k){St(!1,"Something warning of cursor restore. Please fire issue about this: ".concat(k.message))}}return[o,a]}const an=function(){var e=r.useRef(0),n=function(){Ue.cancel(e.current)};return r.useEffect(function(){return n},[]),function(t){n(),e.current=Ue(function(){t()})}};var on=["prefixCls","className","style","min","max","step","defaultValue","value","disabled","readOnly","upHandler","downHandler","keyboard","controls","stringMode","parser","formatter","precision","decimalSeparator","onChange","onInput","onPressEnter","onStep"],Xe=function(n,t){return n||t.isEmpty()?t.toString():t.toNumber()},Je=function(n){var t=M(n);return t.isInvalidate()?null:t},rt=r.forwardRef(function(e,n){var t,o=e.prefixCls,a=o===void 0?"rc-input-number":o,u=e.className,g=e.style,l=e.min,b=e.max,w=e.step,d=w===void 0?1:w,h=e.defaultValue,S=e.value,k=e.disabled,i=e.readOnly,f=e.upHandler,C=e.downHandler,E=e.keyboard,I=e.controls,R=I===void 0?!0:I,F=e.stringMode,O=e.parser,_=e.formatter,$=e.precision,s=e.decimalSeparator,D=e.onChange,B=e.onInput,P=e.onPressEnter,U=e.onStep,Z=Et(e,on),ue="".concat(a,"-input"),j=r.useRef(null),G=r.useState(!1),ce=ie(G,2),le=ce[0],se=ce[1],V=r.useRef(!1),z=r.useRef(!1),L=r.useRef(!1),de=r.useState(function(){return M(S??h)}),pe=ie(de,2),y=pe[0],me=pe[1];function ee(m){S===void 0&&me(m)}var X=r.useCallback(function(m,c){if(!c)return $>=0?$:Math.max(oe(m),oe(d))},[$,d]),J=r.useCallback(function(m){var c=String(m);if(O)return O(c);var x=c;return s&&(x=x.replace(s,".")),x.replace(/[^\w.-]+/g,"")},[O,s]),te=r.useRef(""),fe=r.useCallback(function(m,c){if(_)return _(m,{userTyping:c,input:String(te.current)});var x=typeof m=="number"?xe(m):m;if(!c){var v=X(x,c);if(Ve(x)&&(s||v>=0)){var T=s||".";x=ge(x,T,v)}}return x},[_,X,s]),we=r.useState(function(){var m=h??S;return y.isInvalidate()&&["string","number"].includes(et(m))?Number.isNaN(m)?"":m:fe(y.toString(),!1)}),ne=ie(we,2),q=ne[0],A=ne[1];te.current=q;function re(m,c){A(fe(m.isInvalidate()?m.toString(!1):m.toString(!c),c))}var Q=r.useMemo(function(){return Je(b)},[b,$]),Y=r.useMemo(function(){return Je(l)},[l,$]),$e=r.useMemo(function(){return!Q||!y||y.isInvalidate()?!1:Q.lessEquals(y)},[Q,y]),Me=r.useMemo(function(){return!Y||!y||y.isInvalidate()?!1:y.lessEquals(Y)},[Y,y]),at=rn(j.current,le),Ae=ie(at,2),it=Ae[0],ot=Ae[1],Te=function(c){return Q&&!c.lessEquals(Q)?Q:Y&&!Y.lessEquals(c)?Y:null},Ne=function(c){return!Te(c)},Se=function(c,x){var v=c,T=Ne(v)||v.isEmpty();if(!v.isEmpty()&&!x&&(v=Te(v)||v,T=!0),!i&&!k&&T){var ae=v.toString(),Ee=X(ae,x);return Ee>=0&&(v=M(ge(ae,".",Ee)),Ne(v)||(v=M(ge(ae,".",Ee,!0)))),v.equals(y)||(ee(v),D==null||D(v.isEmpty()?null:Xe(F,v)),S===void 0&&re(v,x)),v}return y},ut=an(),Oe=function m(c){if(it(),A(c),!z.current){var x=J(c),v=M(x);v.isNaN()||Se(v,!0)}B==null||B(c),ut(function(){var T=c;O||(T=c.replace(/。/g,".")),T!==c&&m(T)})},ct=function(){z.current=!0},lt=function(){z.current=!1,Oe(j.current.value)},st=function(c){Oe(c.target.value)},Be=function(c){var x;if(!(c&&$e||!c&&Me)){V.current=!1;var v=M(L.current?Ge(d):d);c||(v=v.negate());var T=(y||M(0)).add(v.toString()),ae=Se(T,!1);U==null||U(Xe(F,ae),{offset:L.current?Ge(d):d,type:c?"up":"down"}),(x=j.current)===null||x===void 0||x.focus()}},Pe=function(c){var x=M(J(q)),v=x;x.isNaN()?v=y:v=Se(x,c),S!==void 0?re(y,!1):v.isNaN()||re(v,!1)},dt=function(){V.current=!0},pt=function(c){var x=c.which,v=c.shiftKey;V.current=!0,v?L.current=!0:L.current=!1,x===ve.ENTER&&(z.current||(V.current=!1),Pe(!1),P==null||P(c)),E!==!1&&!z.current&&[ve.UP,ve.DOWN].includes(x)&&(Be(ve.UP===x),c.preventDefault())},mt=function(){V.current=!1,L.current=!1},ft=function(){Pe(!1),se(!1),V.current=!1};return Ie(function(){y.isInvalidate()||re(y,!1)},[$]),Ie(function(){var m=M(S);me(m);var c=M(J(q));(!m.equals(c)||!V.current||_)&&re(m,V.current)},[S]),Ie(function(){_&&ot()},[q]),r.createElement("div",{className:H(a,u,(t={},N(t,"".concat(a,"-focused"),le),N(t,"".concat(a,"-disabled"),k),N(t,"".concat(a,"-readonly"),i),N(t,"".concat(a,"-not-a-number"),y.isNaN()),N(t,"".concat(a,"-out-of-range"),!y.isInvalidate()&&!Ne(y)),t)),style:g,onFocus:function(){se(!0)},onBlur:ft,onKeyDown:pt,onKeyUp:mt,onCompositionStart:ct,onCompositionEnd:lt,onBeforeInput:dt},R&&r.createElement(nn,{prefixCls:a,upNode:f,downNode:C,upDisabled:$e,downDisabled:Me,onStep:Be}),r.createElement("div",{className:"".concat(ue,"-wrap")},r.createElement("input",ye({autoComplete:"off",role:"spinbutton","aria-valuemin":l,"aria-valuemax":b,"aria-valuenow":y.isInvalidate()?null:y.toString(),step:d},Z,{ref:It(j,n),className:ue,value:q,onChange:st,disabled:k,readOnly:i}))))});rt.displayName="InputNumber";var un=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)n.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(t[o[a]]=e[o[a]]);return t},cn=r.forwardRef(function(e,n){var t=r.useContext(kt),o=t.getPrefixCls,a=t.direction,u=r.useContext(Ct),g=r.useState(!1),l=ie(g,2),b=l[0],w=l[1],d=r.useRef(null);r.useImperativeHandle(n,function(){return d.current});var h=e.className,S=e.size,k=e.disabled,i=e.prefixCls,f=e.addonBefore,C=e.addonAfter,E=e.prefix,I=e.bordered,R=I===void 0?!0:I,F=e.readOnly,O=e.status,_=e.controls,$=un(e,["className","size","disabled","prefixCls","addonBefore","addonAfter","prefix","bordered","readOnly","status","controls"]),s=o("input-number",i),D=_t(s,a),B=D.compactSize,P=D.compactItemClassnames,U=r.createElement(Qt,{className:"".concat(s,"-handler-up-inner")}),Z=r.createElement(Xt,{className:"".concat(s,"-handler-down-inner")}),ue=typeof _=="boolean"?_:void 0;et(_)==="object"&&(U=typeof _.upIcon>"u"?U:r.createElement("span",{className:"".concat(s,"-handler-up-inner")},_.upIcon),Z=typeof _.downIcon>"u"?Z:r.createElement("span",{className:"".concat(s,"-handler-down-inner")},_.downIcon));var j=r.useContext(Rt),G=j.hasFeedback,ce=j.status,le=j.isFormItemInput,se=j.feedbackIcon,V=Ut(ce,O),z=B||S||u,L=r.useContext(Dt),de=k??L,pe=H(N(N(N(N(N({},"".concat(s,"-lg"),z==="large"),"".concat(s,"-sm"),z==="small"),"".concat(s,"-rtl"),a==="rtl"),"".concat(s,"-borderless"),!R),"".concat(s,"-in-form-item"),le),Ce(s,V),P,h),y=r.createElement(rt,ye({ref:d,disabled:de,className:pe,upHandler:U,downHandler:Z,prefixCls:s,readOnly:F,controls:ue},$));if(E!=null||G){var me=H("".concat(s,"-affix-wrapper"),Ce("".concat(s,"-affix-wrapper"),V,G),N(N(N(N(N(N(N(N({},"".concat(s,"-affix-wrapper-focused"),b),"".concat(s,"-affix-wrapper-disabled"),e.disabled),"".concat(s,"-affix-wrapper-sm"),u==="small"),"".concat(s,"-affix-wrapper-lg"),u==="large"),"".concat(s,"-affix-wrapper-rtl"),a==="rtl"),"".concat(s,"-affix-wrapper-readonly"),F),"".concat(s,"-affix-wrapper-borderless"),!R),"".concat(h),!(f||C)&&h));y=r.createElement("div",{className:me,style:e.style,onMouseUp:function(){return d.current.focus()}},E&&r.createElement("span",{className:"".concat(s,"-prefix")},E),Le(y,{style:null,value:e.value,onFocus:function(q){var A;w(!0),(A=e.onFocus)===null||A===void 0||A.call(e,q)},onBlur:function(q){var A;w(!1),(A=e.onBlur)===null||A===void 0||A.call(e,q)}}),G&&r.createElement("span",{className:"".concat(s,"-suffix")},se))}if(f!=null||C!=null){var ee="".concat(s,"-group"),X="".concat(ee,"-addon"),J=f?r.createElement("div",{className:X},f):null,te=C?r.createElement("div",{className:X},C):null,fe=H("".concat(s,"-wrapper"),ee,N({},"".concat(ee,"-rtl"),a==="rtl")),we=H("".concat(s,"-group-wrapper"),N(N(N({},"".concat(s,"-group-wrapper-sm"),u==="small"),"".concat(s,"-group-wrapper-lg"),u==="large"),"".concat(s,"-group-wrapper-rtl"),a==="rtl"),Ce("".concat(s,"-group-wrapper"),V,G),h);y=r.createElement("div",{className:we,style:e.style},r.createElement("div",{className:fe},J&&r.createElement(He,null,r.createElement(Ke,{status:!0,override:!0},J)),Le(y,{style:null,disabled:de}),te&&r.createElement(He,null,r.createElement(Ke,{status:!0,override:!0},te))))}return y}),ln=`.phone-input-item-container {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  overflow: initial;
}
.phone-input-item-container .ant-input-affix-wrapper,
.phone-input-item-container .ant-input-number-group-wrapper {
  width: 100%;
  padding: 0;
  border: 1px solid var(--input-border-color) !important;
  border-radius: var(--primary-btn-border-radius);
  line-height: 47px;
  background: var(--input-background-color) !important;
  box-shadow: none !important;
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-group-addon,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-group-addon {
  position: initial;
  border: none;
  background-color: var(--input-background-color);
  border-end-start-radius: var(--primary-btn-border-radius);
  border-start-start-radius: var(--primary-btn-border-radius);
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-status-error:not(.ant-input-number-disabled, .ant-input-number-borderless).ant-input-number,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-status-error:not(.ant-input-number-disabled, .ant-input-number-borderless).ant-input-number,
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-status-error:not(
                .ant-input-number-disabled,
                .ant-input-number-borderless
            ).ant-input-number:hover,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-status-error:not(
                .ant-input-number-disabled,
                .ant-input-number-borderless
            ).ant-input-number:hover {
  border: none;
  background: none;
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number {
  border: none;
  background: none;
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-focused,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-focused {
  box-shadow: none !important;
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-disabled,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-disabled {
  background: none;
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input,
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-input,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-input {
  height: 47px;
  border: none !important;
  border-radius: 0;
  line-height: 47px;
  color: var(--text-color);
}
.phone-input-item-container .ant-input-affix-wrapper .ant-input:hover,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input:hover,
.phone-input-item-container .ant-input-affix-wrapper .ant-input-number-input:hover,
.phone-input-item-container .ant-input-number-group-wrapper .ant-input-number-input:hover {
  border: none !important;
}
.phone-input-item-container .ant-input-affix-wrapper[data-focus='true'],
.phone-input-item-container .ant-input-number-group-wrapper[data-focus='true'] {
  border: 1px solid var(--accent-color) !important;
}
.phone-input-item-container .ant-input[disabled] {
  width: 100%;
  height: 47px;
  border: 1px solid var(--input-border-color);
  border-radius: var(--primary-btn-border-radius);
  color: var(--text-color);
  background-color: var(--input-background-color);
}
.phone-input-item-container .country-box {
  position: initial;
  cursor: pointer;
}
.phone-input-item-container .country-box .prefix-wrap {
  display: flex;
  color: var(--text-color);
  gap: 4px;
}
.phone-input-item-container .country-box .account-select-country-list {
  position: absolute;
  z-index: 2;
  top: 54px;
  left: 0%;
  width: 100%;
  height: 350px;
  border-radius: var(--card-border-radius) !important;
  overflow: hidden auto;
  background-color: var(--input-background-color);
}
.phone-input-item-container .country-box .account-select-country-list::-webkit-scrollbar {
  display: none;
  width: 0;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .ant-input:focus {
  border: none !important;
  box-shadow: none !important;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap.account-select-country-item {
  padding-right: 13px;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap.account-select-country-item:hover {
  background: var(--input-background-color);
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap.account-select-country-item:hover.search-input-wrap {
  background: none;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .ant-input-clear-icon {
  color: var(--text-color);
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .ant-input-affix-wrapper {
  border-color: var(--keyword-border-color) !important;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .ant-input-suffix {
  position: relative;
  right: 10px;
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .search-input {
  width: 100%;
  height: 32px;
  border-radius: var(--primary-btn-border-radius);
  overflow: hidden;
  color: var(--text-color);
  background-color: var(--input-background-color);
}
.phone-input-item-container .country-box .account-select-country-list .search-input-wrap .search-input .ant-input {
  width: 100%;
  height: auto;
  padding-top: 4px;
  padding-bottom: 4px;
  line-height: initial;
}
.phone-input-item-container .country-box .account-select-country-list .no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  color: var(--text-color);
}
.phone-input-item-container .country-box .account-select-country-list .account-select-country-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 47px;
  padding: 5px 0 5px 13px;
  margin: 0;
  border-bottom: 1px solid var(--keyword-border-color);
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
}
.phone-input-item-container .country-box .account-select-country-list .account-select-country-item:hover {
  background-color: var(--keyword-border-color);
}
.phone-input-item-container .country-box .account-select-country-list .account-select-country-item div {
  display: flex;
  max-width: 80%;
  margin-right: 13px;
}
.phone-input-item-container .country-box input[type='number']::-webkit-inner-spin-button,
.phone-input-item-container .country-box input[type='number']::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}
.phone-input-item-container .country-box.phone {
  display: flex;
  align-items: center;
}
.phone-input-item-container .country-box .account-select-opt {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  padding-right: 4px;
  padding-left: 4px;
  cursor: pointer;
}
.phone-input-item-container .country-box .account-select-opt .account-select-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 15px;
}
.phone-input-item-container .country-box .account-select-opt .down-more {
  margin-left: 6px;
  font-size: 10px;
}
.phone-input-item-container .country-box span {
  flex-shrink: 0;
  margin: 0;
  font-size: 15px;
}
.phone-input-item-container .country-box .country-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phone-input-item-container .country-box input {
  flex-shrink: 1;
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding: 0 15px;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 45px;
  color: var(--text-color);
  background-color: transparent;
}
`,sn=e=>{let n=e.form,t=K.useWatch(e.name,n),[o,a]=r.useState(["United States","us","1"]),{t:u}=nt(),[g,l]=r.useState(!1),b=r.useRef(),w=r.useRef(),[d,h]=r.useState(""),S=r.useRef(),k=r.useMemo(()=>je.filter(i=>i.join("+").toLowerCase().includes(d.toLowerCase())),[d]);return Wt(()=>{l(!1)},b),r.useEffect(()=>{g&&h("")},[g]),r.useEffect(()=>{if(t!=null&&t.includes("*"))return;let i=`+${o[2]}`,f=(t||"").replace(/^\+\d+/,"").trim();n.setFieldsValue({[e.name]:`${i} ${f}`}),f&&n.validateFields(["_phone"])},[o,t]),r.useEffect(()=>{var i;try{if((i=t==null?void 0:t.includes)!=null&&i.call(t,"*"))n.setFieldsValue({_phone:t});else if(t){if(We(t)){let f=tt(t),C=f.nationalNumber;n.setFieldsValue({_phone:C});let E=f.countryCallingCode.toString(),I=f.country;if(E&&I){let R=je.filter(F=>F[2].toString()===E&&F[1].toLowerCase()===I.toLowerCase());R&&R.length>0&&a(R[R.length-1])}}}else{let f=vt();f&&a(f)}}catch{}},[t]),p.createElement(p.Fragment,null,p.createElement("style",null,ln),p.createElement("div",{className:"phone-input-item-container"},p.createElement(K.Item,{className:!e.disabled||e.disabled&&e.previewMode!=="input"?"hidden":"",extra:e.extra,name:e.name},p.createElement(_e,{disabled:e.disabled})),p.createElement(K.Item,{name:"_phone",className:e.disabled&&e.previewMode=="input"?"hidden":"",extra:e.extra,rules:[{required:!0,validator:(i,f)=>{try{if(f)try{if(f=`+${o[2]} ${f}`,!We(f))return Promise.reject(u("login.phone_format_error"))}catch{return Promise.reject(u("login.phone_format_error"))}else return Promise.reject(u("login.input_phone_holder"))}catch{return Promise.reject(u("login.phone_format_error"))}return Promise.resolve()}}]},p.createElement(cn,{placeholder:u("account.mobile"),disabled:e.disabled,controls:!1,onChange:i=>{n.setFieldsValue({[e.name]:`+${o[2]} ${i}`})},onFocus:()=>{var i;(i=document.querySelector(".ant-input-number-group-wrapper"))==null||i.setAttribute("data-focus","true")},onBlur:()=>{var i;(i=document.querySelector(".ant-input-number-group-wrapper"))==null||i.setAttribute("data-focus","false")},addonBefore:p.createElement("div",{className:"country-box phone",ref:w},p.createElement("div",{className:"prefix-wrap",onClick:()=>{e.disabled||(l(!g),setTimeout(()=>{var i;(i=S.current)==null||i.focus()}))},ref:b},p.createElement("div",{className:"account-select-opt"},p.createElement("div",{className:"account-select-icon"},qe(`${o[1]}`)),p.createElement(jt,{className:"down-more"})),p.createElement("span",null,"+",o[2])),g&&p.createElement("div",{className:"account-select-country-list "},p.createElement("div",{className:"account-select-country-item search-input-wrap",onClick:i=>{i.stopPropagation()}},p.createElement(_e,{ref:S,className:"search-input",type:"text",placeholder:u("login.search_country_holder"),allowClear:!0,onChange:i=>{var f;let C=((f=i==null?void 0:i.target)==null?void 0:f.value)||"";h(C)}})),k&&k.length?p.createElement("div",{className:"p-country-list"},k.map((i,f)=>p.createElement("div",{key:`${i[0]}-${i[1]}-${i[2]}`,className:"account-select-country-item",onClick:()=>{a(i),l(!1)}},p.createElement("div",{className:"country-box"},p.createElement("div",{className:"country-flag"},qe(`${i[1]}`)),p.createElement("span",{className:"country-name"},i[0])),p.createElement("div",{className:"country-code"},"+"+i[2])))):p.createElement("div",{className:"no-data"},"No data")))}))))},dn=sn,pn=`.login-account-bind {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.login-account-bind .ant-input-status-error:not(.ant-input-disabled, .ant-input-borderless).ant-input {
  background-color: var(--input-background-color);
}
.login-account-bind .ant-spin-spinning {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 20vh;
}
.login-account-bind .account-title {
  font-weight: 500;
  font-size: 18px;
}
.login-account-bind .account-bind-form {
  width: 100%;
  padding: 0 18px;
  margin-top: 34px;
}
.login-account-bind .account-bind-form .account-input {
  width: 100%;
  height: 47px;
  border: 1px solid var(--input-border-color);
  border-radius: var(--primary-btn-border-radius);
  color: var(--text-color);
  background-color: var(--input-background-color);
}
.login-account-bind .account-bind-form .link-account-hint {
  align-self: flex-start;
  padding-top: 6px;
  font-size: 12px;
  color: var(--secondary-text-color);
}
.login-account-bind .account-bind-form .link-btn {
  margin-top: 15px;
  margin-bottom: 30px;
}
.login-account-bind .account-bind-form .unlink-btn {
  margin-top: 15px;
  margin-bottom: 30px;
  color: #fff;
  background: #ea4335;
}
.login-account-bind .footer-box {
  position: absolute;
  bottom: 10px;
  margin: 0;
}
@media screen and (max-height: 350px) {
  .login-account-bind .footer-box {
    position: unset;
    bottom: 0;
    margin-bottom: 10px;
  }
}
`,mn=e=>{let n=e,t=(n==null?void 0:n.authType)||"",o=(n==null?void 0:n.verifyToken)||"",{t:a}=nt(),[u]=K.useForm(),g=Ft(),l=ht(),{userInfo:b}=Vt();$t();let[w,d]=r.useState(!1),{runAsync:h}=Bt(Ot,{manual:!0}),{authCoreModal:S}=Mt(),k=r.useMemo(()=>bt({userInfo:b,t:a}),[b]),i=r.useMemo(()=>{var E;return((E=k==null?void 0:k.find)==null?void 0:E.call(k,I=>I.type===t))||{}},[k,t]),f=r.useMemo(()=>!i.value&&!i.id,[i]);r.useMemo(()=>!i.isOriginal&&!f,[i]);let C=()=>{u.validateFields().then(E=>{var I,R,F,O,_,$,s;let D=((O=(F=(R=(I=u.getFieldsValue())==null?void 0:I.inputValue)==null?void 0:R.replace(/\s/g,""))==null?void 0:F.trim)==null?void 0:O.call(F))||"";if(d(!0),t==="phone"&&((_=b==null?void 0:b.security_account)==null?void 0:_.phone)===D){ke.error({title:a("new.duplicate_phonel_bindings"),wrapClassName:"auth-core-modal-error",getContainer:()=>S.rootBody}),d(!1);return}else if(t==="email"&&((s=($=b==null?void 0:b.security_account)==null?void 0:$.email)==null?void 0:s.toLowerCase())===(D==null?void 0:D.toLowerCase())){ke.error({title:a("new.duplicate_email_bindings"),wrapClassName:"auth-core-modal-error",getContainer:()=>S.rootBody}),d(!1);return}let B={};t===be.phone?B.phone=D:B.email=D,h(B).then(P=>{g("/account/verify",{state:{account:D,authType:t,verifyToken:o,pageType:"bind_login_account"}}),d(!1)}).catch(P=>{d(!1),P.error_code===20109?ke.error({title:t===be.phone?a("error.server_phone_20109"):a("error.server_email_20109"),wrapClassName:"auth-core-modal-error",getContainer:()=>S.rootBody}):l.error(P.message)})})};return gt(E=>{g("/account/verify",{state:{account:E.account,authType:t,unbindAccount:u.getFieldValue("inputValue"),pageType:"unbind_login_account"}})},{wait:3e3}),r.useEffect(()=>{if(i!=null&&i.value||i!=null&&i.id)if(t===be.phone){let E=tt(i==null?void 0:i.value.replace(/\s/g,"")),I=E.countryCallingCode,R=E.nationalNumber;u.setFieldsValue({inputValue:ze(`+${I} ${R}`)})}else u.setFieldsValue({inputValue:ze((i==null?void 0:i.value)||(i==null?void 0:i.id)||"")})},[i==null?void 0:i.value,i==null?void 0:i.id,t]),p.createElement("div",{className:"login-account-bind "},p.createElement("style",null,pn),p.createElement(yt,{displayBackBtn:!0},i.name),p.createElement(K,{className:"account-bind-form",layout:"vertical",form:u,onFinish:C},t===be.phone?p.createElement(dn,{name:"inputValue",form:u,disabled:!f,previewMode:"input",extra:p.createElement("div",{className:"link-account-hint"},a("new.link_account_hint").format(i.name))}):p.createElement(K.Item,{name:"inputValue",validateTrigger:"onBlur",extra:p.createElement("div",{className:"link-account-hint"},a("new.link_account_hint").format(i.name)),rules:[{required:!0,validator:async(E,I)=>{if(I){if(!At.test(I))return Promise.reject(a("login.email_format_error"))}else return Promise.reject(a("account.input_vaild_email"));return Promise.resolve()}}]},p.createElement(_e,{className:"account-input",placeholder:i.name,disabled:!f,onChange:E=>u.setFields([{name:"email",value:E.target.value,errors:[]}])})),p.createElement(K.Item,null,f?p.createElement(Tt,{className:"primary-antd-btn link-btn",loading:w,htmlType:"submit"},a("account.link")):p.createElement(p.Fragment,null))),p.createElement(xt,null))},$n=mn;export{$n as default};
