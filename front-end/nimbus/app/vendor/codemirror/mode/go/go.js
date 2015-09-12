!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("go",function(e){function t(e,t){var i=e.next();if('"'==i||"'"==i||"`"==i)return t.tokenize=n(i),t.tokenize(e,t);if(/[\d\.]/.test(i))return"."==i?e.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):"0"==i?e.match(/^[xX][0-9a-fA-F]+/)||e.match(/^0[0-7]+/):e.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";if(/[\[\]{}\(\),;\:\.]/.test(i))return c=i,null;if("/"==i){if(e.eat("*"))return t.tokenize=r,r(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(d.test(i))return e.eatWhile(d),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);var o=e.current();return l.propertyIsEnumerable(o)?(("case"==o||"default"==o)&&(c="case"),"keyword"):f.propertyIsEnumerable(o)?"atom":"variable"}function n(e){return function(n,r){for(var i,o=!1,a=!1;null!=(i=n.next());){if(i==e&&!o){a=!0;break}o=!o&&"\\"==i}return(a||!o&&"`"!=e)&&(r.tokenize=t),"string"}}function r(e,n){for(var r,i=!1;r=e.next();){if("/"==r&&i){n.tokenize=t;break}i="*"==r}return"comment"}function i(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function o(e,t,n){return e.context=new i(e.indented,t,n,null,e.context)}function a(e){if(e.context.prev){var t=e.context.type;return(")"==t||"]"==t||"}"==t)&&(e.indented=e.context.indented),e.context=e.context.prev}}var c,u=e.indentUnit,l={"break":!0,"case":!0,chan:!0,"const":!0,"continue":!0,"default":!0,defer:!0,"else":!0,fallthrough:!0,"for":!0,func:!0,go:!0,"goto":!0,"if":!0,"import":!0,"interface":!0,map:!0,"package":!0,range:!0,"return":!0,select:!0,struct:!0,"switch":!0,type:!0,"var":!0,bool:!0,"byte":!0,complex64:!0,complex128:!0,float32:!0,float64:!0,int8:!0,int16:!0,int32:!0,int64:!0,string:!0,uint8:!0,uint16:!0,uint32:!0,uint64:!0,"int":!0,uint:!0,uintptr:!0},f={"true":!0,"false":!0,iota:!0,nil:!0,append:!0,cap:!0,close:!0,complex:!0,copy:!0,imag:!0,len:!0,make:!0,"new":!0,panic:!0,print:!0,println:!0,real:!0,recover:!0},d=/[+\-*&^%:=<>!|\/]/;return{startState:function(e){return{tokenize:null,context:new i((e||0)-u,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,n){var r=n.context;if(e.sol()&&(null==r.align&&(r.align=!1),n.indented=e.indentation(),n.startOfLine=!0,"case"==r.type&&(r.type="}")),e.eatSpace())return null;c=null;var i=(n.tokenize||t)(e,n);return"comment"==i?i:(null==r.align&&(r.align=!0),"{"==c?o(n,e.column(),"}"):"["==c?o(n,e.column(),"]"):"("==c?o(n,e.column(),")"):"case"==c?r.type="case":"}"==c&&"}"==r.type?r=a(n):c==r.type&&a(n),n.startOfLine=!1,i)},indent:function(e,n){if(e.tokenize!=t&&null!=e.tokenize)return 0;var r=e.context,i=n&&n.charAt(0);if("case"==r.type&&/^(?:case|default)\b/.test(n))return e.context.type="}",r.indented;var o=i==r.type;return r.align?r.column+(o?0:1):r.indented+(o?0:u)},electricChars:"{}):",fold:"brace",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}}),e.defineMIME("text/x-go","go")});