(this["webpackJsonptntweb-admin"]=this["webpackJsonptntweb-admin"]||[]).push([[10],{918:function(e,n,t){"use strict";t.r(n);var r={};t.r(r),t.d(r,"reversedDesc",(function(){return l}));var a={};t.r(a),t.d(a,"forCopy",(function(){return h})),t.d(a,"tryCutDesc",(function(){return v})),t.d(a,"tryAsyncCutDesc",(function(){return y})),t.d(a,"innerLoadingTryAsyncCutDesc",(function(){return C})),t.d(a,"loading",(function(){return j})),t.d(a,"initState",(function(){return E})),t.d(a,"clear",(function(){return S}));var c={};t.r(c),t.d(c,"mounted",(function(){return O})),t.d(c,"willUnmount",(function(){return x}));var u=t(11),o=t(35),i=t(182);var s=function(){return{desc:"I am an empty module",loading:!1}};function l(e){return e.desc.split("").reverse().join("")}var d=t(17),f=t.n(d),m=t(27),p=t(117),g=t(26);function h(e,n,t){console.log("call ac.setState or ac.dispatch when needed",t.setState)}function v(e,n){var t=n.desc;if(t.length>8)return{desc:t.substr(0,8)}}function y(e,n,t){return b.apply(this,arguments)}function b(){return(b=Object(m.a)(f.a.mark((function e(n,t,r){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a(666);case 2:return e.next=4,r.dispatch(v);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e,n,t){return w.apply(this,arguments)}function w(){return(w=Object(m.a)(f.a.mark((function e(n,t,r){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(o.fnPayload)(v,n),r.dispatch(j,a);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e,n,t){return k.apply(this,arguments)}function k(){return(k=Object(m.a)(f.a.mark((function e(n,t,r){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.setState({loading:!0});case 2:return e.next=4,p.a(666);case 4:return e.next=6,Object(g.a)(n,r);case 6:return e.abrupt("return",{loading:!1});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){console.log("call initState")}function S(){console.log("call clear")}function O(e){}function x(e){}var D={state:s,computed:r,reducer:a,lifecycle:c,ghosts:["loading"]},M=Object(u.a)({},"SomeModule",D),A=(Object(i.makeUseModelWithSetup)("SomeModule"),Object(i.makeUseModelWithSetupCuf)("SomeModule"),Object(i.makeUseModel)("SomeModule")),U=M;Object(o.configure)(U);var J=t(0),L=t.n(J),T=t(333),W=t(548),I=t(549),P=t(319),q=t(72),z=L.a.memo((function(){var e=A(),n=e.state,t=e.sync;return L.a.createElement("div",null,"\u8bf7\u8f93\u5165\u7684\u63cf\u8ff0 ",L.a.createElement(T.a,{value:n.desc,onChange:t("desc")}))})),B=L.a.memo((function(){var e=A().moduleComputed;return L.a.createElement(W.a,{message:e.reversedDesc,type:"success"})}));n.default=L.a.memo((function(e){var n=A(),t=n.state,r=n.mr,a=n.mrg;return L.a.createElement("div",null,L.a.createElement(I.a,null,t.desc),L.a.createElement(P.a,{spinning:t.loading},L.a.createElement(q.a,{onClick:r.tryCutDesc},"\u88c1\u51cf\u63cf\u8ff0"),L.a.createElement(q.a,{onClick:r.innerLoadingTryAsyncCutDesc},"\u5185\u90e8\u51fd\u6570\u5305\u88f9loading"),L.a.createElement(q.a,{onClick:a.loading.tryAsyncCutDesc},"\u4f7f\u7528ghost\u529f\u80fd\u590d\u7528loading\u51fd\u6570\uff08\u63a8\u8350\uff09"),L.a.createElement(z,null),L.a.createElement(B,null)))}))}}]);