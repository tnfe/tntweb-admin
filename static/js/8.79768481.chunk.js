(this["webpackJsonptntweb-admin"]=this["webpackJsonptntweb-admin"]||[]).push([[8],{923:function(t,n,e){"use strict";e.r(n),e.d(n,"mockImpl",(function(){return a}));var o=e(46);var r={"get /api/todo/list":function(t,n){return{data:{total:3,list:[{id:1,text:"hi",done:!0},{id:2,text:"concent",done:!1}]},msg:"",code:"0"}},"get /api/todo/query":function(t,n){var e=[];return"222"===n.keyword&&(e=[{id:3,name:222}]),"333"===n.keyword&&(e=[{id:3,name:333}]),{data:{total:3,list:e},msg:"",code:"0"}}};function c(t,n){var e=n.split("?"),r=Object(o.a)(e,1)[0];return"".concat(t," ").concat(r)}function i(t,n,e){var o=function(t,n){var e=c(t,n);return r[e]}(t,n);return o?"function"===typeof o?o(n,e):o:null}function a(){return{get:function(t,n){return i("get",t,n)},post:function(t,n){return i("post",t,n)},hasMockedFn:function(t,n){var e=c(t,n);return Object.prototype.hasOwnProperty.call(r,e)}}}}}]);