(this["webpackJsonpconcent-pro"]=this["webpackJsonpconcent-pro"]||[]).push([[8],{682:function(e,t,a){e.exports={diItemWrap:"styles_diItemWrap__23tpy",diItemTitle:"styles_diItemTitle__QrGja",diItemSwitchWrap:"styles_diItemSwitchWrap__2WYnH",diItemError:"styles_diItemError__3Jehw"}},859:function(e,t,a){e.exports={headerWrap:"StepForm_headerWrap__1posp",formContentWrap:"StepForm_formContentWrap__3d3Y_"}},860:function(e,t,a){e.exports={stepWrap:"Step_stepWrap__qcBdd",stepLabel:"Step_stepLabel__q2x6F",stepBase:"Step_stepBase__31GPz",stepDone:"Step_stepDone__moRNZ Step_stepBase__31GPz",stepEditing:"Step_stepEditing__15W6l Step_stepBase__31GPz",stepOnceEditing:"Step_stepOnceEditing__tVzYA Step_stepDone__moRNZ Step_stepBase__31GPz",stepUnstart:"Step_stepUnstart__2Z5UI Step_stepBase__31GPz",stepLine:"Step_stepLine__26M9a",stepLineActive:"Step_stepLineActive__2a___ Step_stepLine__26M9a",stepNoLine:"Step_stepNoLine__19qwV"}},991:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"staffDataList",(function(){return u})),a.d(n,"step2Status",(function(){return d})),a.d(n,"exampleData",(function(){return m}));var r={};a.r(r),a.d(r,"forCopy",(function(){return B})),a.d(r,"searchMonitor",(function(){return T})),a.d(r,"changeStep",(function(){return D})),a.d(r,"nextStep",(function(){return W})),a.d(r,"pervStep",(function(){return A})),a.d(r,"fetchAppIdInfo",(function(){return M})),a.d(r,"perpareStep1",(function(){return J})),a.d(r,"perpareStep2",(function(){return q})),a.d(r,"perpareStep3",(function(){return P})),a.d(r,"addField",(function(){return V})),a.d(r,"addGroup",(function(){return Y})),a.d(r,"removeGroup",(function(){return Z})),a.d(r,"removeField",(function(){return K})),a.d(r,"loading",(function(){return X})),a.d(r,"initState",(function(){return Q})),a.d(r,"clear",(function(){return ee}));var l={};a.r(l),a.d(l,"mounted",(function(){return te})),a.d(l,"willUnmount",(function(){return ae}));var i=a(14),o=a(39),c=a(756);var p=function(){var e={desc:"\u7c98\u8d34json\u6570\u636e\u5230\u6b64\u5904\uff0c\u6216\u5728\u6b64\u8f93\u5165\u793a\u4f8b\u6570\u636e",tip:"\u6ce8\u610fjson\u5c42\u7ea7\u4e0d\u80fd\u8d85\u8fc73\u5c42"};return{step:1,step2isFinished:{},step2isOnceEditing:{},finishStep:4,isBtnClicked:!1,errors:{},checkAppIdBtnLoading:!1,nextBtnLoading:!1,matchedUserList:[],id:0,appId:"",appDetail:"",displayName:"",creator:"",comment:"",monitor:[],dbType:"",dbAlias:"",count1:0,count2:0,count3:0,dataExample:JSON.stringify(e,null,2),dataExampleJson:e,tableDb:"",fields:[],fieldOptionsList:[],groupFields:[{groupFieldName:"",fields:[]}],loading:!1}},s=a(80);function u(e){return e.matchedUserList.map((function(e){return{value:e[0],label:e[1]}}))}function d(e){var t=e.step,a=e.step2isFinished,n=e.step2isOnceEditing,r=e.id?"finished":"unstart",l={1:r,2:r,3:r,4:r,5:r};return Object(s.f)(l).forEach((function(e){var r=parseInt(e,10);r===t?l[e]="editing":r<t||a[r]?l[e]="finished":n[r]&&(l[e]="onceEditing")})),l}function m(e){var t=e.dataExample,a=e.dataExampleJson,n=Object(s.i)(t,a),r=Object(s.f)(n);return{options:r.map((function(e){return{value:e,label:e}})),fields:r}}var v=a(18),f=a.n(v),h=a(38),y=a(58),E=a(175),b=a(292);function g(e){return x.apply(this,arguments)}function x(){return(x=Object(h.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("fetch ".concat(t)),e.next=3,b.a(1e3);case 3:return e.abrupt("return",{appDetail:"\u6700\u65b0\u7206\u6b3e\u6e38\u620f"});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=a(321),k=a(209),C=["string","number","bool"],_=a(272);function w(e){var t={};return s.f(e).forEach((function(a){var n=a;t[a]=I[a](e[n])})),t}var I=new Proxy({appId:function(e){return e?_.a.num1to9.test(e)?"":"appId\u683c\u5f0f\u53ea\u80fd\u662f0\u52309\u7684\u6570\u5b57":"appId\u672a\u586b\u5199"},monitor:function(e){return 0===e.length?"\u8d1f\u8d23\u4eba\u672a\u9009\u62e9":""},dataExample:function(e){var t="",a=null;try{a=JSON.parse(e)}catch(n){t="\u793a\u4f8b\u6570\u636ejson\u683c\u5f0f\u4e0d\u5408\u6cd5"}return a&&s.b(a,3)&&(t="\u793a\u4f8b\u6570\u636ejson\u5c42\u7ea7\u8fc7\u6df1\uff0c\u5927\u4e8e3\u5c42"),t},defaultRule:function(e){return""===e||null===e||void 0===e?"\u672a\u586b\u5199":""}},{get:function(e,t){var a=e[t];return a||e.defaultRule}});function O(e){return w({appId:e.appId,appDetail:e.appDetail,displayName:e.displayName,comment:e.comment,monitor:e.monitor})}function N(e){return w({dataExample:e.dataExample,dbType:e.dbType})}var L={1:J,2:q,3:P};function j(e,t){var a=t(e);if(!s.c(a,{checkObjValues:!0})){var n="";return s.f(a).forEach((function(e){return a[e]?n+="".concat(e,":").concat(a[e]," "):""})),E.a(n),{canChangeStep:!1,errors:a}}return{canChangeStep:!0,errors:a}}function B(e,t,a){console.log("call ac.setState or ac.dispatch when needed",a.setState)}function T(e){return{matchedUserList:S.b(e)}}function D(e,t,a){return F.apply(this,arguments)}function F(){return(F=Object(h.a)(f.a.mark((function e(t,a,n){var r,l,i,o,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.step,l=a.isBtnClicked,i=t?r+1:r-1,!t){e.next=14;break}if(l){e.next=6;break}return e.next=6,n.setState({isBtnClicked:!0});case 6:return e.next=8,n.dispatch(L[r]);case 8:if(o=e.sent,!o.canChangeStep){e.next=12;break}return e.abrupt("return",{step:i});case 12:e.next=17;break;case 14:return c={isBtnClicked:l,step:i},l&&(c.isBtnClicked=!1),e.abrupt("return",c);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e,t,a){a.dispatch(D,!0)}function A(e,t,a){return z.apply(this,arguments)}function z(){return(z=Object(h.a)(f.a.mark((function e(t,a,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.dispatch(D,!1);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e,t,a){return G.apply(this,arguments)}function G(){return(G=Object(h.a)(f.a.mark((function e(t,a,n){var r,l,i,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.appId,!(l=I.appId(r))){e.next=4;break}return e.abrupt("return",E.a(l));case 4:return e.next=6,n.setState({checkAppIdBtnLoading:!0});case 6:return e.prev=6,e.next=9,g(r);case 9:return i=e.sent,o=i.appDetail,e.abrupt("return",{appDetail:o,checkAppIdBtnLoading:!1});case 14:return e.prev=14,e.t0=e.catch(6),E.a(e.t0.message),e.abrupt("return",{checkAppIdBtnLoading:!1});case 18:case"end":return e.stop()}}),e,null,[[6,14]])})))).apply(this,arguments)}function J(e,t,a){return U.apply(this,arguments)}function U(){return(U=Object(h.a)(f.a.mark((function e(t,a,n){var r,l,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({nextBtnLoading:!0});case 2:return e.next=4,n.dispatch(M);case 4:return e.next=6,n.setState({nextBtnLoading:!1});case 6:if(r=j(a,O),l=r.canChangeStep,i=r.errors,!l){e.next=9;break}return e.abrupt("return",{canChangeStep:!0,tableDb:a.displayName,isBtnClicked:!1,errors:i});case 9:return e.abrupt("return",{canChangeStep:!0,errors:i});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e,t,a){return H.apply(this,arguments)}function H(){return(H=Object(h.a)(f.a.mark((function e(t,a,n){var r,l,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({nextBtnLoading:!0});case 2:if(r=j(a,N),l=r.canChangeStep,i=r.errors,!l){e.next=5;break}return e.abrupt("return",{canChangeStep:!0,isBtnClicked:!1,errors:i,nextBtnLoading:!1});case 5:return e.abrupt("return",{canChangeStep:!0,errors:i,nextBtnLoading:!1});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t){return R.apply(this,arguments)}function R(){return(R=Object(h.a)(f.a.mark((function e(t,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{canChangeStep:!0});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e,t,a){var n=t.fields,r=t.fieldOptionsList,l=a.moduleComputed.exampleData.fields,i=n.map((function(e){return e.fieldName})),o=k.b(l,i);if(0!==o.length){var c=o[0];return n.push({fieldName:c,fieldType:C[0],isMulti:!1,count:0}),r.push(o.map((function(e){return{value:e,label:e}}))),{fields:n,fieldOptionsList:r}}E.b("\u65e0\u65b0\u7684\u5b57\u6bb5\u53ef\u6dfb\u52a0\u4e86")}function Y(e,t,a){var n=t.groupFields;return n.splice(e+1,0,{groupFieldName:"",fields:[]}),{groupFields:n}}function Z(e,t,a){var n=t.groupFields;return n.splice(e,1),{groupFields:n}}function K(e,t,a){var n=t.fields;return n.splice(e,1),{fields:n}}function X(e,t,a){return $.apply(this,arguments)}function $(){return($=Object(h.a)(f.a.mark((function e(t,a,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({loading:!0});case 2:return e.next=4,Object(y.a)(t,n);case 4:return e.abrupt("return",{loading:!1});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e,t,a){var n=a.rootState.$$global.userName,r=S.b(n.substr(0,2));return{creator:n,matchedUserList:r}}function ee(){return p()}function te(e){return e(Q),!1}function ae(e){return e(ee),!1}var ne="DemoFormModule",re={state:p,computed:n,reducer:r,lifecycle:l,ghosts:["loading"]},le=Object(i.a)({},ne,re),ie=Object(c.makeUseModelWithSetup)(ne),oe=(Object(c.makeUseModelWithSetupCuf)(ne),Object(c.makeUseModel)(ne)),ce=le;Object(o.configure)(ce);var pe,se=a(1),ue=a.n(se),de=a(859),me=a.n(de),ve=a(799),fe=a(600),he=a(800),ye=a(860),Ee=a.n(ye),be=Object(he.a)(fe.a)(pe||(pe=Object(ve.a)(["\n  .ant-avatar{\n    width: 64px;\n    height: 64px;\n    border: 1px solid red;\n  }\n"]))),ge={finished:{avatarCls:Ee.a.stepDone,lineCls:Ee.a.stepLineActive,labelColor:"#999999"},editing:{avatarCls:Ee.a.stepEditing,lineCls:Ee.a.stepLineActive,labelColor:"black"},onceEditing:{avatarCls:Ee.a.stepOnceEditing,lineCls:Ee.a.stepLineActive,labelColor:"#black"},unstart:{avatarCls:Ee.a.stepUnstart,lineCls:Ee.a.stepLine,labelColor:"#999999"}},xe={3:"-1px",4:"5px",5:"17px"};function Se(e){var t=e.num,a=void 0===t?"1":t,n=e.label,r=e.labelOffset,l=void 0===r?"":r,i=e.line,o=void 0===i||i,c=e.status,p=e.onClick,s=ge[c],u=s.avatarCls,d=s.lineCls,m=s.labelColor;o||(d=Ee.a.stepNoLine);var v=a;"finished"===c&&(v="\u2713");var f={color:m,transform:""};if(l)f.transform="translateX(".concat(l,")");else if(n){var h=xe[n.length];f.transform="translateX(".concat(h,")")}return ue.a.createElement("div",{className:"".concat(Ee.a.stepWrap," gHover"),onClick:p},ue.a.createElement("div",{className:d}),ue.a.createElement(be,{className:u},v),ue.a.createElement("div",{className:Ee.a.stepLabel,style:f},n))}var ke=ue.a.memo((function(){var e=oe().moduleComputed.step2Status;return ue.a.createElement("div",{className:me.a.headerWrap},ue.a.createElement(Se,{line:!1,label:"\u57fa\u7840\u4fe1\u606f",status:e[1]}),ue.a.createElement(Se,{num:"2",label:"\u6570\u636e\u5e93\u4fe1\u606f",status:e[2]}),ue.a.createElement(Se,{num:"3",label:"\u5b57\u6bb5\u4fe1\u606f",status:e[3]}),ue.a.createElement(Se,{num:"4",label:"\u5176\u4ed6\u914d\u7f6e",status:e[4]}))})),Ce=a(210),_e=a(603),we=a(170),Ie=a(91),Oe=a(33),Ne=a(211),Le=a(992),je=a(1e3),Be=a(848),Te=a(682),De=a.n(Te),Fe={inputStyle:{width:"calc(100% - 120px)"},boxedLabelStyle:{width:"calc(100% - 120px)",lineHeight:"32px"},inputSwitchStyle:{width:"36px"},inputJsonStyle:{width:"calc(100% - 150px)",display:"inline-block"},titleStyle:{width:"80px"},inputSize:"middle"},We={color:"red",display:"inline-block",verticalAlign:"top"},Ae={position:"absolute",right:"-38px",top:"0px",zIndex:999},ze={position:"absolute",right:"-108px",top:"0px",zIndex:999},Me=function(){};function Ge(e){var t=e.title,a=e.value,n=e.onChange,r=e.onEnter,l=e.block,i=e.disabled,o=e.required,c=void 0===o||o,p=e.extraStyle,s=void 0===p?{}:p,u=e.interactiveCb,d=e.interactiveLabel,m=void 0===d?"":d,v=e.interactiveBtnLoading,f=void 0!==v&&v,h=e.placeholder,y=void 0===h?"":h,E=e.tooltip,b=void 0===E?"":E,g=e.error,x={display:"inline-block"};l&&(x.display="block");var S=r?function(e){13===e.keyCode&&r(e)}:Me,k=ue.a.createElement("pre",{style:We},c?"* ":"  "),C=s.item,_=void 0===C?{}:C,w=s.title,I=void 0===w?{}:w,O=s.input,N=void 0===O?Fe.inputStyle:O,L=s.inputSize,j=void 0===L?Fe.inputSize:L,B=Object(Oe.a)(Object(Oe.a)({},x),_),T="";u&&(T=m?ue.a.createElement(Ce.a,{onClick:u,type:"default",loading:f,style:ze},m):ue.a.createElement(Ce.a,{type:"primary",icon:ue.a.createElement(je.a,null),onClick:u,loading:f,shape:"circle",style:Ae}));var D="";b&&(D=ue.a.createElement(Ne.a,{title:b},ue.a.createElement(Be.a,null)));var F="";return g&&(F=ue.a.createElement("div",{className:De.a.diItemError},ue.a.createElement("span",{className:De.a.diItemTitle,style:I}),ue.a.createElement("div",{style:Object(Oe.a)({display:"inline-block",wordWrap:"break-word"},N)},g))),ue.a.createElement("div",{className:De.a.diItemWrap,style:B},ue.a.createElement("span",{className:De.a.diItemTitle,style:I},k,t),ue.a.createElement(Le.a,{disabled:i,value:a,onChange:n,onKeyDown:S,size:j,style:N,placeholder:y,suffix:D}),T,F)}var Je=a(995),Ue={color:"red",display:"inline-block",verticalAlign:"top"},qe={position:"absolute",right:"-38px",top:"0px",zIndex:999},He=function(){};function Pe(e){var t=e.title,a=e.value,n=e.onChange,r=e.onEnter,l=e.block,i=e.disabled,o=e.required,c=void 0===o||o,p=e.extraStyle,s=void 0===p?{}:p,u=e.interactiveCb,d=e.interactiveBtnLoading,m=void 0!==d&&d,v=e.placeholder,f=void 0===v?"":v,h=e.error,y=e.formatter,E=e.min,b=void 0===E?0:E,g={display:"inline-block"};l&&(g.display="block");var x=r?function(e){13===e.keyCode&&r(e)}:He,S=ue.a.createElement("pre",{style:Ue},c?"* ":"  "),k=s.item,C=void 0===k?{}:k,_=s.title,w=void 0===_?{}:_,I=s.input,O=void 0===I?Fe.inputStyle:I,N=s.inputSize,L=void 0===N?Fe.inputSize:N,j=Object(Oe.a)(Object(Oe.a)({},g),C),B="";u&&(B=ue.a.createElement(Ce.a,{type:"primary",icon:ue.a.createElement(je.a,null),onClick:u,loading:m,shape:"circle",style:qe}));var T="";return h&&(T=ue.a.createElement("div",{className:De.a.diItemError},ue.a.createElement("span",{className:De.a.diItemTitle,style:w}),ue.a.createElement("div",{style:Object(Oe.a)({display:"inline-block",wordWrap:"break-word"},O)},h))),ue.a.createElement("div",{className:De.a.diItemWrap,style:j},ue.a.createElement("span",{className:De.a.diItemTitle,style:w},S,t),ue.a.createElement(Je.a,{disabled:i,value:a,onChange:n,onKeyDown:x,size:L,style:O,placeholder:f,formatter:y,min:b}),B,T)}a(970),a(863);var Re=a(971),Ve={color:"red",display:"inline-block",verticalAlign:"top"},Ye={position:"absolute",right:"-38px",top:"0px",zIndex:999},Ze={position:"absolute",right:"-138px",top:"0px",zIndex:999},Ke=function(){};function Xe(e){var t=e.title,a=e.value,n=e.onChange,r=void 0===n?Ke:n,l=e.editorDidMount,i=e.block,o=e.required,c=void 0===o||o,p=e.extraStyle,s=void 0===p?{}:p,u=e.interactiveCb,d=e.interactiveLabel,m=void 0===d?"":d,v=e.interactiveBtnLoading,f=void 0!==v&&v,h=e.error,y=e.height,E={display:"inline-block"};i&&(E.display="block");var b=ue.a.createElement("pre",{style:Ve},c?"* ":"  "),g=s.item,x=void 0===g?{}:g,S=s.title,k=void 0===S?{}:S,C=s.input,_=void 0===C?{}:C,w=Object(Oe.a)(Object(Oe.a)({},Fe.inputJsonStyle),_),I=Object(Oe.a)(Object(Oe.a)({},E),x),O="";u&&(O=m?ue.a.createElement(Ce.a,{onClick:u,type:"default",loading:f,style:Ze},m):ue.a.createElement(Ce.a,{type:"primary",icon:ue.a.createElement(je.a,null),onClick:u,loading:f,shape:"circle",style:Ye}));var N="";return h&&(N=ue.a.createElement("div",{className:De.a.diItemError},ue.a.createElement("span",{className:De.a.diItemTitle,style:k}),ue.a.createElement("div",{style:Object(Oe.a)({display:"inline-block",wordWrap:"break-word"},_)},h))),ue.a.createElement("div",{className:De.a.diItemWrap,style:I},ue.a.createElement("span",{className:De.a.diItemTitle,style:k},b,t),ue.a.createElement("div",{style:w},ue.a.createElement(Re.a,{width:"100%",height:y||"600px",language:"json",theme:"vs-dark",value:a,options:{selectOnLineNumbers:!0},onChange:r,editorDidMount:l})),O,N)}var $e=a(843),Qe=$e.a.Option,et={color:"red",display:"inline-block",verticalAlign:"top"};function tt(e){var t=e.required,a=void 0===t||t,n=e.block,r=e.title,l=e.value,i=e.onChange,o=e.onSearch,c=e.data,p=void 0===c?[]:c,s=e.hasEmpty,u=e.emptyLabel,d=void 0===u?"\u4e0d\u9650":u,m=e.emptyValue,v=void 0===m?"":m,f=e.smartEmpty,h=void 0!==f&&f,y=e.extraStyle,E=void 0===y?{}:y,b=e.placeholder,g=void 0===b?"":b,x=e.mode,S=e.error,k=void 0===S?"":S,C=e.disabled,_=void 0!==C&&C,w=e.showSearch,I=!!o||void 0!==w&&w,O={display:"inline-block"};n&&(O.display="block");var N=ue.a.createElement("pre",{style:et},a?"* ":"  "),L=E.title,j=void 0===L?{}:L,B=E.item,T=void 0===B?{}:B,D=E.input,F=void 0===D?Fe.inputStyle:D,W=E.inputSize,A=void 0===W?Fe.inputSize:W,z=Object(Oe.a)(Object(Oe.a)({},O),T),M="";if(s){var G=ue.a.createElement(Qe,{key:"__hasEmpty__",value:v},d);h?l===v&&(M=G):M=G}var J="";return k&&(J=ue.a.createElement("div",{className:De.a.diItemError},ue.a.createElement("span",{className:De.a.diItemTitle,style:j}),ue.a.createElement("div",{style:Object(Oe.a)({display:"inline-block",wordWrap:"break-word"},F)},k))),ue.a.createElement("div",{className:De.a.diItemWrap,style:z},ue.a.createElement("span",{className:De.a.diItemTitle,style:j},N,r),ue.a.createElement($e.a,{mode:x,value:l,size:A,style:F,onChange:i,placeholder:g,onSearch:o,showArrow:!0,disabled:_,showSearch:I},M,p.map((function(e,t){return ue.a.createElement(Qe,{key:t,value:e.value},e.label)}))),J)}tt.Memo=ue.a.memo((function(e){return ue.a.createElement(tt,e)}));var at=tt;a(602);function nt(e){return ue.a.createElement("div",{className:De.a.diItemWrap,style:{display:"inline-block",height:"32px",lineHeight:"32px"}},e.children)}var rt={color:"red",display:"inline-block",verticalAlign:"top"};nt.Boxed=function(e){var t=e.title,a=e.value,n=e.block,r=e.required,l=void 0===r||r,i=e.extraStyle,o=void 0===i?{}:i,c=e.genBoolText,p=void 0===c||c,s={display:"inline-block"};n&&(s.display="block");var u=a;"boolean"===typeof a&&p&&(u=a?"\u662f":"\u5426");var d=ue.a.createElement("pre",{style:rt},l?"* ":"  "),m=o.item,v=void 0===m?{}:m,f=o.title,h=void 0===f?{}:f,y=o.input,E=void 0===y?Fe.boxedLabelStyle:y,b=Object(Oe.a)(Object(Oe.a)({},s),v);return ue.a.createElement("div",{className:De.a.diItemWrap,style:b},ue.a.createElement("span",{className:De.a.diItemTitle,style:h},d,t),ue.a.createElement("span",{style:E},u))};a(592);var lt=a(52);function it(){return ue.a.createElement("div",null,"step1:\u57fa\u7840\u4fe1\u606f",ue.a.createElement(Ce.a,{onClick:function(){return window.open("https://www.baidu.com/s?wd=appid")},style:{float:"right"},type:"primary"},"\u83b7\u53d6\u76ee\u6807appID"))}function ot(e){return{appIdTip:"\u8bf7\u8f93\u5165\u5728 xxx\u5e73\u53f0 \u6ce8\u518c\u8fc7\u7684appID",intro:"\u8bf7\u63cf\u8ff0\u529f\u80fd",displayNamePlaceHolder:'\u5982"\u6211\u4eec"',displayNameTip:"\u6309\u7167\u201cxx_yy_zz\u683c\u5f0f",viewNamePlaceHolder:'\u5982"cool_project"',viewNameTip:"\u4e0d\u4ee5\u6570\u5b57\u7ed3\u5c3e"}}var ct=ue.a.memo((function(e){var t=ie(ot),a=t.sync,n=t.state,r=t.settings,l=t.mr,i=t.moduleComputed,o=n.errors;return n.step!==e.step?ue.a.createElement(lt.c,null):ue.a.createElement(_e.a,{title:ue.a.createElement(it,null)},ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{title:"appid:",value:n.appId,onChange:a("appId"),tooltip:r.appIdTip,interactiveCb:l.fetchAppIdInfo,interactiveBtnLoading:n.checkAppIdBtnLoading,error:o.appId})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{disabled:!0,title:"appDetail:",value:n.appDetail,onChange:a("appDetail"),error:o.appDetail}))),ue.a.createElement(lt.d,null),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{title:"displayName:",value:n.displayName,onChange:a("displayName"),error:o.displayName,placeholder:r.displayNamePlaceHolder,tooltip:r.displayNameTip})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{title:"\u7533\u8bf7\u4eba:",value:n.creator,onChange:a("creator"),error:o.creator}))),ue.a.createElement(lt.d,null),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:12},ue.a.createElement(at,{title:"\u8d1f\u8d23\u4eba:",data:i.staffDataList,value:n.monitor,onChange:a("monitor"),error:o.monitor,onSearch:l.searchMonitor,placeholder:"\u9009\u62e9\u591a\u4e2a\u8d1f\u8d23\u4eba",mode:"multiple"}))),ue.a.createElement(lt.d,null),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:12},ue.a.createElement(Ge,{title:"\u7b80\u4ecb:",value:n.comment,onChange:a("comment"),placeholder:r.intro,error:o.comment}))))})),pt={title:{width:"150px"},input:{width:"calc(100% - 150px)"}};function st(e){return{dbTypeOptions:[{value:"kafka",label:"kafka"},{value:"mysql",label:"mysql"}],formatter:function(e){return"".concat(e," \u4e07")},openJsonEditor:function(){window.open("http://jsoneditoronline.org/")}}}var ut,dt=ue.a.memo((function(e){var t=ie(st),a=t.state,n=t.syncer,r=t.settings,l=a.errors;return a.step!==e.step?ue.a.createElement(lt.c,null):ue.a.createElement(_e.a,{title:"\u6570\u636e\u6e90"},ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(at,{title:"\u6570\u636e\u5e93\u7c7b\u578b:",value:a.dbType,onChange:n.dbType,error:l.dbType,data:r.dbTypeOptions,extraStyle:pt})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{title:"\u6570\u636e\u5e93\u522b\u540d:",value:a.dbAlias,onChange:n.dbAlias,error:l.dbAlias,extraStyle:pt}))),ue.a.createElement(lt.d,null),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Pe,{title:"\u9884\u4f30\u603b\u65701:",value:a.count1,onChange:n.count1,error:l.count1,extraStyle:pt,formatter:r.formatter})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Pe,{title:"\u9884\u4f30\u603b\u65702:",value:a.count2,onChange:n.count2,error:l.count2,extraStyle:pt,formatter:r.formatter})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Pe,{title:"\u9884\u4f30\u603b\u65703:",value:a.count3,onChange:n.count3,error:l.count3,extraStyle:pt,formatter:r.formatter}))),ue.a.createElement(lt.d,null),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:16},ue.a.createElement(Xe,{title:"\u793a\u4f8b\u6570\u636e:",value:a.dataExample,onChange:n.dataExample,extraStyle:pt,error:l.dataExample,interactiveCb:r.openJsonEditor,interactiveLabel:"Open JsonEditor"}))))})),mt=a(168),vt=a(608),ft=a(1001),ht=C.map((function(e){return{value:e,label:e}})),yt={title:{width:"150px"},input:{width:"calc(100% - 150px)"}},Et={title:{width:"150px"},input:{width:"50%"}},bt={width:"100%"},gt={margin:"6px 32px",float:"right",color:"var(--theme-color)"},xt={marginTop:"6px",float:"right",color:"var(--theme-color)"},St={margin:"6px 32px",float:"right",color:"var(--theme-color)"},kt={fontSize:"18px",marginRight:"5px",verticalAlign:"middle"},Ct={verticalAlign:"middle"},_t=Object(he.a)(_e.a)(ut||(ut=Object(ve.a)(["\n  .ant-card-head-wrapper{\n    height:46px;\n    font-size: 14px;\n  }\n"]))),wt={item:{width:"300px"},title:{width:"70px"}};function It(e){var t=e.mr,a=e.sync;return{stInnerCard:{backgroundColor:"#E8F1FF",height:"46px",fontWeight:400},tureOrFalseOptions:[{value:!0,label:"\u662f"},{value:!1,label:"\u5426"}],uiGroupTitle:function(e,n){return ue.a.createElement("div",{style:{marginTop:"12px"}},ue.a.createElement(Ge,{title:"\u5206\u7ec4\u540d: ",value:e.groupFieldName,onChange:a("groupFields.".concat(n,".groupFieldName")),extraStyle:wt,placeholder:"\u8bf7\u8f93\u5165\u5206\u7ec4".concat(n+1,"\u7684\u540d\u79f0")}),ue.a.createElement("span",{className:"gHover",style:St,onClick:function(){return t.addGroup(n)}},ue.a.createElement(vt.a,{style:kt}),ue.a.createElement("span",{style:Ct},"\u6dfb\u52a0\u5206\u7ec4")),0!==n&&ue.a.createElement("span",{className:"gHover",style:xt,onClick:function(){return t.removeGroup(n)}},ue.a.createElement(ft.a,{style:kt}),ue.a.createElement("span",{style:Ct},"\u5220\u9664\u5206\u7ec4")))}}}var Ot=ue.a.memo((function(e){var t=ie(It),a=t.state,n=t.sync,r=t.settings,l=t.mr,i=t.moduleComputed;if(a.step!==e.step)return ue.a.createElement(lt.c,null);var o=a.fields.length-1;return ue.a.createElement(_e.a,{title:"Step3"},ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Ge,{title:"\u8868\u540d:",value:a.tableDb,onChange:n("tableDb"),extraStyle:yt,placeholder:"\u8bf7\u8f93\u5165\u8868\u540d"}))),ue.a.createElement(lt.d,null),ue.a.createElement(Ce.a,{type:"link"},"\u5b57\u6bb5\u63a7\u5236"),ue.a.createElement(lt.d,{height:"8px"}),ue.a.createElement(_t,{title:"\u5b57\u6bb5\u7c7b\u578b\u8f93\u5165",headStyle:r.stInnerCard},-1===o&&ue.a.createElement(mt.a,null),a.fields.map((function(e,t){return ue.a.createElement("div",{key:t,style:{borderBottom:"1px solid ".concat(o===t?"transparent":"lightgrey"),marginBottom:"13px"}},ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(at,{title:"\u6570\u636e\u5b57\u6bb5:",value:e.fieldName,onChange:n("fields.".concat(t,".fieldName")),extraStyle:yt,data:a.fieldOptionsList[t]})),ue.a.createElement(Ie.a,{span:8},ue.a.createElement(at,{title:"\u6570\u636e\u8f6c\u6362\u7c7b\u578b:",value:e.fieldType,onChange:n("fields.".concat(t,".fieldType")),extraStyle:yt,data:ht})),ue.a.createElement(Ie.a,{span:8,style:{float:"right"},onClick:function(){return l.removeField(t)}},ue.a.createElement("span",{className:"gHover",style:gt},ue.a.createElement(ft.a,{style:kt}),ue.a.createElement("span",{style:Ct},"\u5220\u9664")))),ue.a.createElement(we.a,null,ue.a.createElement(Ie.a,{span:8},ue.a.createElement(at,{title:"\u662f\u5426\u591a\u4e2a\u5b58\u5728:",value:e.isMulti,onChange:n("fields.".concat(t,".isMulti")),extraStyle:yt,data:r.tureOrFalseOptions})),e.isMulti?ue.a.createElement(Ie.a,{span:8},ue.a.createElement(Pe,{title:"\u503c\u6570\u91cf:",value:e.count,onChange:n("fields.".concat(t,".count")),extraStyle:yt})):""))})),ue.a.createElement(Ce.a,{type:"dashed",style:bt,onClick:l.addField},ue.a.createElement(vt.a,null),"\u65b0\u589e\u6570\u636e\u5b57\u6bb5")),ue.a.createElement(lt.d,null),ue.a.createElement(Ce.a,{type:"link"},"\u5206\u7ec4\u5b57\u6bb5\u8bbe\u7f6e"),ue.a.createElement(lt.d,{height:"8px"}),a.groupFields.map((function(e,t){return ue.a.createElement(_t,{key:t,title:r.uiGroupTitle(e,t),headStyle:r.stInnerCard,style:{marginBottom:"12px"}},ue.a.createElement(at,{title:"\u6570\u636e\u5b57\u6bb5:",value:e.fields,onChange:n("groupFields.".concat(t,".fields")),mode:"multiple",data:i.exampleData.options,extraStyle:Et}))})))}));var Nt=ue.a.memo((function(){var e=oe(),t=e.state,a=e.mr,n=t.step,r=t.finishStep,l=ue.a.createElement(lt.c,null),i=ue.a.createElement(lt.c,null);return(1===n||n<=r)&&(i=ue.a.createElement(Ce.a,{type:"primary",onClick:a.nextStep,loading:t.nextBtnLoading},"\u4e0b\u4e00\u6b65")),n>1&&(l=ue.a.createElement(Ce.a,{type:"primary",onClick:a.pervStep},"\u4e0a\u4e00\u6b65")),ue.a.createElement(we.a,{style:{textAlign:"center"}},ue.a.createElement(lt.d,null),ue.a.createElement(Ie.a,{span:24},l,ue.a.createElement(lt.b,null),i))}));t.default=ue.a.memo((function(e){return ue.a.createElement("div",{style:{paddingTop:"180px"}},ue.a.createElement(ke,null),ue.a.createElement(ct,{step:1}),ue.a.createElement(dt,{step:2}),ue.a.createElement(Ot,{step:3}),ue.a.createElement(Nt,null))}))}}]);
//# sourceMappingURL=8.ef12d10c.chunk.js.map