(function(){(function(){function a(a){function b(b,c,d,e,f,g){for(;f>=0&&g>f;f+=a){var h=e?e[f]:f;d=c(d,b[h],h,b)}return d}return function(c,d,e,f){d=t(d,f,4);var g=!A(c)&&s.keys(c),h=(g||c).length,i=a>0?0:h-1;return arguments.length<3&&(e=c[g?g[i]:i],i+=a),b(c,d,e,g,i,h)}}function b(a){return function(b,c,d){c=u(c,d);for(var e=z(b),f=a>0?0:e-1;f>=0&&e>f;f+=a)if(c(b[f],f,b))return f;return-1}}function c(a,b,c){return function(d,e,f){var g=0,h=z(d);if("number"==typeof f)a>0?g=f>=0?f:Math.max(f+h,g):h=f>=0?Math.min(f+1,h):f+h+1;else if(c&&f&&h)return f=c(d,e),d[f]===e?f:-1;if(e!==e)return f=b(k.call(d,g,h),s.isNaN),f>=0?f+g:-1;for(f=a>0?g:h-1;f>=0&&h>f;f+=a)if(d[f]===e)return f;return-1}}function d(a,b){var c=F.length,d=a.constructor,e=s.isFunction(d)&&d.prototype||h,f="constructor";for(s.has(a,f)&&!s.contains(b,f)&&b.push(f);c--;)f=F[c],f in a&&a[f]!==e[f]&&!s.contains(b,f)&&b.push(f)}var e=this,f=e._,g=Array.prototype,h=Object.prototype,i=Function.prototype,j=g.push,k=g.slice,l=h.toString,m=h.hasOwnProperty,n=Array.isArray,o=Object.keys,p=i.bind,q=Object.create,r=function(){},s=function(a){return a instanceof s?a:this instanceof s?void(this._wrapped=a):new s(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=s),exports._=s):e._=s,s.VERSION="1.8.3";var t=function(a,b,c){if(void 0===b)return a;switch(null==c?3:c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return function(){return a.apply(b,arguments)}},u=function(a,b,c){return null==a?s.identity:s.isFunction(a)?t(a,b,c):s.isObject(a)?s.matcher(a):s.property(a)};s.iteratee=function(a,b){return u(a,b,1/0)};var v=function(a,b){return function(c){var d=arguments.length;if(2>d||null==c)return c;for(var e=1;d>e;e++)for(var f=arguments[e],g=a(f),h=g.length,i=0;h>i;i++){var j=g[i];b&&void 0!==c[j]||(c[j]=f[j])}return c}},w=function(a){if(!s.isObject(a))return{};if(q)return q(a);r.prototype=a;var b=new r;return r.prototype=null,b},x=function(a){return function(b){return null==b?void 0:b[a]}},y=Math.pow(2,53)-1,z=x("length"),A=function(a){var b=z(a);return"number"==typeof b&&b>=0&&y>=b};s.each=s.forEach=function(a,b,c){b=t(b,c);var d,e;if(A(a))for(d=0,e=a.length;e>d;d++)b(a[d],d,a);else{var f=s.keys(a);for(d=0,e=f.length;e>d;d++)b(a[f[d]],f[d],a)}return a},s.map=s.collect=function(a,b,c){b=u(b,c);for(var d=!A(a)&&s.keys(a),e=(d||a).length,f=Array(e),g=0;e>g;g++){var h=d?d[g]:g;f[g]=b(a[h],h,a)}return f},s.reduce=s.foldl=s.inject=a(1),s.reduceRight=s.foldr=a(-1),s.find=s.detect=function(a,b,c){var d;return d=A(a)?s.findIndex(a,b,c):s.findKey(a,b,c),void 0!==d&&-1!==d?a[d]:void 0},s.filter=s.select=function(a,b,c){var d=[];return b=u(b,c),s.each(a,function(a,c,e){b(a,c,e)&&d.push(a)}),d},s.reject=function(a,b,c){return s.filter(a,s.negate(u(b)),c)},s.every=s.all=function(a,b,c){b=u(b,c);for(var d=!A(a)&&s.keys(a),e=(d||a).length,f=0;e>f;f++){var g=d?d[f]:f;if(!b(a[g],g,a))return!1}return!0},s.some=s.any=function(a,b,c){b=u(b,c);for(var d=!A(a)&&s.keys(a),e=(d||a).length,f=0;e>f;f++){var g=d?d[f]:f;if(b(a[g],g,a))return!0}return!1},s.contains=s.includes=s.include=function(a,b,c,d){return A(a)||(a=s.values(a)),("number"!=typeof c||d)&&(c=0),s.indexOf(a,b,c)>=0},s.invoke=function(a,b){var c=k.call(arguments,2),d=s.isFunction(b);return s.map(a,function(a){var e=d?b:a[b];return null==e?e:e.apply(a,c)})},s.pluck=function(a,b){return s.map(a,s.property(b))},s.where=function(a,b){return s.filter(a,s.matcher(b))},s.findWhere=function(a,b){return s.find(a,s.matcher(b))},s.max=function(a,b,c){var d,e,f=-(1/0),g=-(1/0);if(null==b&&null!=a){a=A(a)?a:s.values(a);for(var h=0,i=a.length;i>h;h++)d=a[h],d>f&&(f=d)}else b=u(b,c),s.each(a,function(a,c,d){e=b(a,c,d),(e>g||e===-(1/0)&&f===-(1/0))&&(f=a,g=e)});return f},s.min=function(a,b,c){var d,e,f=1/0,g=1/0;if(null==b&&null!=a){a=A(a)?a:s.values(a);for(var h=0,i=a.length;i>h;h++)d=a[h],f>d&&(f=d)}else b=u(b,c),s.each(a,function(a,c,d){e=b(a,c,d),(g>e||e===1/0&&f===1/0)&&(f=a,g=e)});return f},s.shuffle=function(a){for(var b,c=A(a)?a:s.values(a),d=c.length,e=Array(d),f=0;d>f;f++)b=s.random(0,f),b!==f&&(e[f]=e[b]),e[b]=c[f];return e},s.sample=function(a,b,c){return null==b||c?(A(a)||(a=s.values(a)),a[s.random(a.length-1)]):s.shuffle(a).slice(0,Math.max(0,b))},s.sortBy=function(a,b,c){return b=u(b,c),s.pluck(s.map(a,function(a,c,d){return{value:a,index:c,criteria:b(a,c,d)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index-b.index}),"value")};var B=function(a){return function(b,c,d){var e={};return c=u(c,d),s.each(b,function(d,f){var g=c(d,f,b);a(e,d,g)}),e}};s.groupBy=B(function(a,b,c){s.has(a,c)?a[c].push(b):a[c]=[b]}),s.indexBy=B(function(a,b,c){a[c]=b}),s.countBy=B(function(a,b,c){s.has(a,c)?a[c]++:a[c]=1}),s.toArray=function(a){return a?s.isArray(a)?k.call(a):A(a)?s.map(a,s.identity):s.values(a):[]},s.size=function(a){return null==a?0:A(a)?a.length:s.keys(a).length},s.partition=function(a,b,c){b=u(b,c);var d=[],e=[];return s.each(a,function(a,c,f){(b(a,c,f)?d:e).push(a)}),[d,e]},s.first=s.head=s.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:s.initial(a,a.length-b)},s.initial=function(a,b,c){return k.call(a,0,Math.max(0,a.length-(null==b||c?1:b)))},s.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:s.rest(a,Math.max(0,a.length-b))},s.rest=s.tail=s.drop=function(a,b,c){return k.call(a,null==b||c?1:b)},s.compact=function(a){return s.filter(a,s.identity)};var C=function(a,b,c,d){for(var e=[],f=0,g=d||0,h=z(a);h>g;g++){var i=a[g];if(A(i)&&(s.isArray(i)||s.isArguments(i))){b||(i=C(i,b,c));var j=0,k=i.length;for(e.length+=k;k>j;)e[f++]=i[j++]}else c||(e[f++]=i)}return e};s.flatten=function(a,b){return C(a,b,!1)},s.without=function(a){return s.difference(a,k.call(arguments,1))},s.uniq=s.unique=function(a,b,c,d){s.isBoolean(b)||(d=c,c=b,b=!1),null!=c&&(c=u(c,d));for(var e=[],f=[],g=0,h=z(a);h>g;g++){var i=a[g],j=c?c(i,g,a):i;b?(g&&f===j||e.push(i),f=j):c?s.contains(f,j)||(f.push(j),e.push(i)):s.contains(e,i)||e.push(i)}return e},s.union=function(){return s.uniq(C(arguments,!0,!0))},s.intersection=function(a){for(var b=[],c=arguments.length,d=0,e=z(a);e>d;d++){var f=a[d];if(!s.contains(b,f)){for(var g=1;c>g&&s.contains(arguments[g],f);g++);g===c&&b.push(f)}}return b},s.difference=function(a){var b=C(arguments,!0,!0,1);return s.filter(a,function(a){return!s.contains(b,a)})},s.zip=function(){return s.unzip(arguments)},s.unzip=function(a){for(var b=a&&s.max(a,z).length||0,c=Array(b),d=0;b>d;d++)c[d]=s.pluck(a,d);return c},s.object=function(a,b){for(var c={},d=0,e=z(a);e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},s.findIndex=b(1),s.findLastIndex=b(-1),s.sortedIndex=function(a,b,c,d){c=u(c,d,1);for(var e=c(b),f=0,g=z(a);g>f;){var h=Math.floor((f+g)/2);c(a[h])<e?f=h+1:g=h}return f},s.indexOf=c(1,s.findIndex,s.sortedIndex),s.lastIndexOf=c(-1,s.findLastIndex),s.range=function(a,b,c){null==b&&(b=a||0,a=0),c=c||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=Array(d),f=0;d>f;f++,a+=c)e[f]=a;return e};var D=function(a,b,c,d,e){if(!(d instanceof b))return a.apply(c,e);var f=w(a.prototype),g=a.apply(f,e);return s.isObject(g)?g:f};s.bind=function(a,b){if(p&&a.bind===p)return p.apply(a,k.call(arguments,1));if(!s.isFunction(a))throw new TypeError("Bind must be called on a function");var c=k.call(arguments,2),d=function(){return D(a,d,b,this,c.concat(k.call(arguments)))};return d},s.partial=function(a){var b=k.call(arguments,1),c=function(){for(var d=0,e=b.length,f=Array(e),g=0;e>g;g++)f[g]=b[g]===s?arguments[d++]:b[g];for(;d<arguments.length;)f.push(arguments[d++]);return D(a,c,this,this,f)};return c},s.bindAll=function(a){var b,c,d=arguments.length;if(1>=d)throw new Error("bindAll must be passed function names");for(b=1;d>b;b++)c=arguments[b],a[c]=s.bind(a[c],a);return a},s.memoize=function(a,b){var c=function(d){var e=c.cache,f=""+(b?b.apply(this,arguments):d);return s.has(e,f)||(e[f]=a.apply(this,arguments)),e[f]};return c.cache={},c},s.delay=function(a,b){var c=k.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},s.defer=s.partial(s.delay,s,1),s.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:s.now(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var j=s.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k||k>b?(g&&(clearTimeout(g),g=null),h=j,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},s.debounce=function(a,b,c){var d,e,f,g,h,i=function(){var j=s.now()-g;b>j&&j>=0?d=setTimeout(i,b-j):(d=null,c||(h=a.apply(f,e),d||(f=e=null)))};return function(){f=this,e=arguments,g=s.now();var j=c&&!d;return d||(d=setTimeout(i,b)),j&&(h=a.apply(f,e),f=e=null),h}},s.wrap=function(a,b){return s.partial(b,a)},s.negate=function(a){return function(){return!a.apply(this,arguments)}},s.compose=function(){var a=arguments,b=a.length-1;return function(){for(var c=b,d=a[b].apply(this,arguments);c--;)d=a[c].call(this,d);return d}},s.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},s.before=function(a,b){var c;return function(){return--a>0&&(c=b.apply(this,arguments)),1>=a&&(b=null),c}},s.once=s.partial(s.before,2);var E=!{toString:null}.propertyIsEnumerable("toString"),F=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];s.keys=function(a){if(!s.isObject(a))return[];if(o)return o(a);var b=[];for(var c in a)s.has(a,c)&&b.push(c);return E&&d(a,b),b},s.allKeys=function(a){if(!s.isObject(a))return[];var b=[];for(var c in a)b.push(c);return E&&d(a,b),b},s.values=function(a){for(var b=s.keys(a),c=b.length,d=Array(c),e=0;c>e;e++)d[e]=a[b[e]];return d},s.mapObject=function(a,b,c){b=u(b,c);for(var d,e=s.keys(a),f=e.length,g={},h=0;f>h;h++)d=e[h],g[d]=b(a[d],d,a);return g},s.pairs=function(a){for(var b=s.keys(a),c=b.length,d=Array(c),e=0;c>e;e++)d[e]=[b[e],a[b[e]]];return d},s.invert=function(a){for(var b={},c=s.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},s.functions=s.methods=function(a){var b=[];for(var c in a)s.isFunction(a[c])&&b.push(c);return b.sort()},s.extend=v(s.allKeys),s.extendOwn=s.assign=v(s.keys),s.findKey=function(a,b,c){b=u(b,c);for(var d,e=s.keys(a),f=0,g=e.length;g>f;f++)if(d=e[f],b(a[d],d,a))return d},s.pick=function(a,b,c){var d,e,f={},g=a;if(null==g)return f;s.isFunction(b)?(e=s.allKeys(g),d=t(b,c)):(e=C(arguments,!1,!1,1),d=function(a,b,c){return b in c},g=Object(g));for(var h=0,i=e.length;i>h;h++){var j=e[h],k=g[j];d(k,j,g)&&(f[j]=k)}return f},s.omit=function(a,b,c){if(s.isFunction(b))b=s.negate(b);else{var d=s.map(C(arguments,!1,!1,1),String);b=function(a,b){return!s.contains(d,b)}}return s.pick(a,b,c)},s.defaults=v(s.allKeys,!0),s.create=function(a,b){var c=w(a);return b&&s.extendOwn(c,b),c},s.clone=function(a){return s.isObject(a)?s.isArray(a)?a.slice():s.extend({},a):a},s.tap=function(a,b){return b(a),a},s.isMatch=function(a,b){var c=s.keys(b),d=c.length;if(null==a)return!d;for(var e=Object(a),f=0;d>f;f++){var g=c[f];if(b[g]!==e[g]||!(g in e))return!1}return!0};var G=function(a,b,c,d){if(a===b)return 0!==a||1/a===1/b;if(null==a||null==b)return a===b;a instanceof s&&(a=a._wrapped),b instanceof s&&(b=b._wrapped);var e=l.call(a);if(e!==l.call(b))return!1;switch(e){case"[object RegExp]":case"[object String]":return""+a==""+b;case"[object Number]":return+a!==+a?+b!==+b:0===+a?1/+a===1/b:+a===+b;case"[object Date]":case"[object Boolean]":return+a===+b}var f="[object Array]"===e;if(!f){if("object"!=typeof a||"object"!=typeof b)return!1;var g=a.constructor,h=b.constructor;if(g!==h&&!(s.isFunction(g)&&g instanceof g&&s.isFunction(h)&&h instanceof h)&&"constructor"in a&&"constructor"in b)return!1}c=c||[],d=d||[];for(var i=c.length;i--;)if(c[i]===a)return d[i]===b;if(c.push(a),d.push(b),f){if(i=a.length,i!==b.length)return!1;for(;i--;)if(!G(a[i],b[i],c,d))return!1}else{var j,k=s.keys(a);if(i=k.length,s.keys(b).length!==i)return!1;for(;i--;)if(j=k[i],!s.has(b,j)||!G(a[j],b[j],c,d))return!1}return c.pop(),d.pop(),!0};s.isEqual=function(a,b){return G(a,b)},s.isEmpty=function(a){return null==a?!0:A(a)&&(s.isArray(a)||s.isString(a)||s.isArguments(a))?0===a.length:0===s.keys(a).length},s.isElement=function(a){return!(!a||1!==a.nodeType)},s.isArray=n||function(a){return"[object Array]"===l.call(a)},s.isObject=function(a){var b=typeof a;return"function"===b||"object"===b&&!!a},s.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(a){s["is"+a]=function(b){return l.call(b)==="[object "+a+"]"}}),s.isArguments(arguments)||(s.isArguments=function(a){return s.has(a,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(s.isFunction=function(a){return"function"==typeof a||!1}),s.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},s.isNaN=function(a){return s.isNumber(a)&&a!==+a},s.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"===l.call(a)},s.isNull=function(a){return null===a},s.isUndefined=function(a){return void 0===a},s.has=function(a,b){return null!=a&&m.call(a,b)},s.noConflict=function(){return e._=f,this},s.identity=function(a){return a},s.constant=function(a){return function(){return a}},s.noop=function(){},s.property=x,s.propertyOf=function(a){return null==a?function(){}:function(b){return a[b]}},s.matcher=s.matches=function(a){return a=s.extendOwn({},a),function(b){return s.isMatch(b,a)}},s.times=function(a,b,c){var d=Array(Math.max(0,a));b=t(b,c,1);for(var e=0;a>e;e++)d[e]=b(e);return d},s.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))},s.now=Date.now||function(){return(new Date).getTime()};var H={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},I=s.invert(H),J=function(a){var b=function(b){return a[b]},c="(?:"+s.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}};s.escape=J(H),s.unescape=J(I),s.result=function(a,b,c){var d=null==a?void 0:a[b];return void 0===d&&(d=c),s.isFunction(d)?d.call(a):d};var K=0;s.uniqueId=function(a){var b=++K+"";return a?a+b:b},s.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var L=/(.)^/,M={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},N=/\\|'|\r|\n|\u2028|\u2029/g,O=function(a){return"\\"+M[a]};s.template=function(a,b,c){!b&&c&&(b=c),b=s.defaults({},b,s.templateSettings);var d=RegExp([(b.escape||L).source,(b.interpolate||L).source,(b.evaluate||L).source].join("|")+"|$","g"),e=0,f="__p+='";a.replace(d,function(b,c,d,g,h){return f+=a.slice(e,h).replace(N,O),e=h+b.length,c?f+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'":d?f+="'+\n((__t=("+d+"))==null?'':__t)+\n'":g&&(f+="';\n"+g+"\n__p+='"),b}),f+="';\n",b.variable||(f="with(obj||{}){\n"+f+"}\n"),f="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+f+"return __p;\n";try{var g=new Function(b.variable||"obj","_",f)}catch(h){throw h.source=f,h}var i=function(a){return g.call(this,a,s)},j=b.variable||"obj";return i.source="function("+j+"){\n"+f+"}",i},s.chain=function(a){var b=s(a);return b._chain=!0,b};var P=function(a,b){return a._chain?s(b).chain():b};s.mixin=function(a){s.each(s.functions(a),function(b){var c=s[b]=a[b];s.prototype[b]=function(){var a=[this._wrapped];return j.apply(a,arguments),P(this,c.apply(s,a))}})},s.mixin(s),s.each(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=g[a];s.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!==a&&"splice"!==a||0!==c.length||delete c[0],P(this,c)}}),s.each(["concat","join","slice"],function(a){var b=g[a];s.prototype[a]=function(){return P(this,b.apply(this._wrapped,arguments))}}),s.prototype.value=function(){return this._wrapped},s.prototype.valueOf=s.prototype.toJSON=s.prototype.value,s.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return s})}).call(this);
var CometString, Comment, Decimal, Label, Literal, Operation, Register;

Comment = (function() {
  function Comment(value) {
    this.value = value.join("");
  }

  return Comment;

})();

Label = (function() {
  function Label(value) {
    this.value = _(value).flatten().join("");
  }

  Label.prototype.toString = function() {
    return this.value;
  };

  return Label;

})();

Register = (function() {
  function Register(index) {
    this.index = index;
  }

  Register.prototype.toString = function() {
    return "R" + this.index;
  };

  return Register;

})();

Decimal = (function() {
  function Decimal(value) {
    this.value = value;
  }

  Decimal.prototype.toString = function() {
    return this.value;
  };

  Decimal.fromDecimal = function(sign, nums) {
    return new Decimal(parseInt((sign || "") + nums.join("")));
  };

  Decimal.fromHex = function(nums) {
    return new Decimal(parseInt(nums.join(""), 16));
  };

  return Decimal;

})();

CometString = (function() {
  function CometString(value) {
    this.value = value.join("");
  }

  CometString.prototype.toString = function() {
    return "'" + this.value + "'";
  };

  return CometString;

})();

Literal = (function() {
  function Literal(value) {
    this.value = value;
  }

  Literal.prototype.toString = function() {
    return "=" + this.value;
  };

  return Literal;

})();

Operation = (function() {
  function Operation(label, name, operands) {
    this.label = label;
    this.operands = operands != null ? operands : [];
    this.name = name instanceof Array ? name.join("") : name;
  }

  Operation.prototype.toString = function() {
    return "" + this.label + " " + this.name + " " + (this.operands.join(", "));
  };

  return Operation;

})();

PEG = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { program: peg$parseprogram },
        peg$startRuleFunction  = peg$parseprogram,

        peg$c0 = peg$FAILED,
        peg$c1 = [],
        peg$c2 = "\n",
        peg$c3 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c4 = null,
        peg$c5 = " ",
        peg$c6 = { type: "literal", value: " ", description: "\" \"" },
        peg$c7 = function(label, op, opr) { this.operands = [opr]; return true; },
        peg$c8 = void 0,
        peg$c9 = ",",
        peg$c10 = { type: "literal", value: ",", description: "\",\"" },
        peg$c11 = function(opr) { this.operands.push(opr); return true; },
        peg$c12 = function(label, op, opr) {
              if(typeof label === 'undefined') var label = null;
              return new Operation(label, op, operands);
            },
        peg$c13 = function(label, op) {
              if(typeof label === 'undefined') var label = null;
              return new Operation(label, op);
            },
        peg$c14 = "",
        peg$c15 = /^[A-Z]/,
        peg$c16 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c17 = /^[A-Z0-9]/,
        peg$c18 = { type: "class", value: "[A-Z0-9]", description: "[A-Z0-9]" },
        peg$c19 = function(label) { return new Label(label); },
        peg$c20 = "GR",
        peg$c21 = { type: "literal", value: "GR", description: "\"GR\"" },
        peg$c22 = /^[0-7]/,
        peg$c23 = { type: "class", value: "[0-7]", description: "[0-7]" },
        peg$c24 = function(n) { return new Register(n); },
        peg$c25 = "-",
        peg$c26 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c27 = /^[0-9]/,
        peg$c28 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c29 = function(sign, nums) { return Decimal.fromDecimal(sign, nums); },
        peg$c30 = "#",
        peg$c31 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c32 = /^[0-9A-F]/,
        peg$c33 = { type: "class", value: "[0-9A-F]", description: "[0-9A-F]" },
        peg$c34 = function(nums) { return nums.length === 4; },
        peg$c35 = function(nums) { return Decimal.fromHex(nums); },
        peg$c36 = "=",
        peg$c37 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c38 = function(value) { return new Literal(value); },
        peg$c39 = "'",
        peg$c40 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c41 = /^[^']/,
        peg$c42 = { type: "class", value: "[^']", description: "[^']" },
        peg$c43 = function(value) { return new CometString(value); },
        peg$c44 = ";",
        peg$c45 = { type: "literal", value: ";", description: "\";\"" },
        peg$c46 = /^[^\n]/,
        peg$c47 = { type: "class", value: "[^\\n]", description: "[^\\n]" },
        peg$c48 = function(comment) { return new Comment(comment) ; },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parseprogram() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parseline();
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s4 = peg$c2;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c3); }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$parseline();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s4 = peg$c2;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseline();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s3 = peg$c2;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseline() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parselabel();
      if (s2 === peg$FAILED) {
        s2 = peg$c4;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c5;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.charCodeAt(peg$currPos) === 32) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
          }
        } else {
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseoperation();
          if (s4 !== peg$FAILED) {
            s5 = [];
            if (input.charCodeAt(peg$currPos) === 32) {
              s6 = peg$c5;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                if (input.charCodeAt(peg$currPos) === 32) {
                  s6 = peg$c5;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c6); }
                }
              }
            } else {
              s5 = peg$c0;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseoperand();
              if (s6 !== peg$FAILED) {
                peg$reportedPos = peg$currPos;
                s7 = peg$c7(s2, s4, s6);
                if (s7) {
                  s7 = peg$c8;
                } else {
                  s7 = peg$c0;
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = [];
                  if (input.charCodeAt(peg$currPos) === 32) {
                    s11 = peg$c5;
                    peg$currPos++;
                  } else {
                    s11 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
                  }
                  while (s11 !== peg$FAILED) {
                    s10.push(s11);
                    if (input.charCodeAt(peg$currPos) === 32) {
                      s11 = peg$c5;
                      peg$currPos++;
                    } else {
                      s11 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c6); }
                    }
                  }
                  if (s10 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s11 = peg$c9;
                      peg$currPos++;
                    } else {
                      s11 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c10); }
                    }
                    if (s11 !== peg$FAILED) {
                      s12 = [];
                      if (input.charCodeAt(peg$currPos) === 32) {
                        s13 = peg$c5;
                        peg$currPos++;
                      } else {
                        s13 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c6); }
                      }
                      while (s13 !== peg$FAILED) {
                        s12.push(s13);
                        if (input.charCodeAt(peg$currPos) === 32) {
                          s13 = peg$c5;
                          peg$currPos++;
                        } else {
                          s13 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c6); }
                        }
                      }
                      if (s12 !== peg$FAILED) {
                        s13 = peg$parseoperand();
                        if (s13 !== peg$FAILED) {
                          peg$reportedPos = peg$currPos;
                          s14 = peg$c11(s13);
                          if (s14) {
                            s14 = peg$c8;
                          } else {
                            s14 = peg$c0;
                          }
                          if (s14 !== peg$FAILED) {
                            s10 = [s10, s11, s12, s13, s14];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$c0;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$c0;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$c0;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$c0;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$c0;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = [];
                    if (input.charCodeAt(peg$currPos) === 32) {
                      s11 = peg$c5;
                      peg$currPos++;
                    } else {
                      s11 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c6); }
                    }
                    while (s11 !== peg$FAILED) {
                      s10.push(s11);
                      if (input.charCodeAt(peg$currPos) === 32) {
                        s11 = peg$c5;
                        peg$currPos++;
                      } else {
                        s11 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c6); }
                      }
                    }
                    if (s10 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s11 = peg$c9;
                        peg$currPos++;
                      } else {
                        s11 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c10); }
                      }
                      if (s11 !== peg$FAILED) {
                        s12 = [];
                        if (input.charCodeAt(peg$currPos) === 32) {
                          s13 = peg$c5;
                          peg$currPos++;
                        } else {
                          s13 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c6); }
                        }
                        while (s13 !== peg$FAILED) {
                          s12.push(s13);
                          if (input.charCodeAt(peg$currPos) === 32) {
                            s13 = peg$c5;
                            peg$currPos++;
                          } else {
                            s13 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c6); }
                          }
                        }
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parseoperand();
                          if (s13 !== peg$FAILED) {
                            peg$reportedPos = peg$currPos;
                            s14 = peg$c11(s13);
                            if (s14) {
                              s14 = peg$c8;
                            } else {
                              s14 = peg$c0;
                            }
                            if (s14 !== peg$FAILED) {
                              s10 = [s10, s11, s12, s13, s14];
                              s9 = s10;
                            } else {
                              peg$currPos = s9;
                              s9 = peg$c0;
                            }
                          } else {
                            peg$currPos = s9;
                            s9 = peg$c0;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$c0;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$c0;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$c0;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    peg$reportedPos = s1;
                    s2 = peg$c12(s2, s4, s6);
                    s1 = s2;
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c0;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c0;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c0;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parselabel();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (input.charCodeAt(peg$currPos) === 32) {
            s4 = peg$c5;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (input.charCodeAt(peg$currPos) === 32) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c6); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseoperation();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s1;
              s2 = peg$c13(s2, s4);
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$c14;
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c5;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c5;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomment();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parselabel() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c15.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c17.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c17.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c18); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c19(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseoperand() {
      var s0;

      s0 = peg$parseregister();
      if (s0 === peg$FAILED) {
        s0 = peg$parsedecimal();
        if (s0 === peg$FAILED) {
          s0 = peg$parsehexadecimal();
          if (s0 === peg$FAILED) {
            s0 = peg$parselabel();
            if (s0 === peg$FAILED) {
              s0 = peg$parseliteral();
              if (s0 === peg$FAILED) {
                s0 = peg$parsestring();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseregister() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c20) {
        s1 = peg$c20;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c24(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsedecimal() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c25;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c27.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c28); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c27.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c28); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c29(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsehexadecimal() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c32.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c33); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c32.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c33); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = peg$currPos;
          s3 = peg$c34(s2);
          if (s3) {
            s3 = peg$c8;
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseliteral() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c36;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedecimal();
        if (s2 === peg$FAILED) {
          s2 = peg$parsehexadecimal();
          if (s2 === peg$FAILED) {
            s2 = peg$parsestring();
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c38(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c39;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c41.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c42); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c41.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c42); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c39;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c43(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 59) {
        s1 = peg$c44;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c46.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c46.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c47); }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c48(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseoperation() {
      var s0, s1;

      s0 = [];
      if (peg$c15.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
        }
      } else {
        s0 = peg$c0;
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
var COMET_OPERATIONS = {
  NOP:  [ { code: 0x00, operands: '' }],
  LD:   [ { code: 0x10, operands: 'r,adr,x' }, { code: 0x14, operands: 'r,r' } ],
  ST:   [ { code: 0x11, operands: 'r,adr,x' } ],
  LAD:  [ { code: 0x12, operands: 'r,adr,x' } ],
  ADDA: [ { code: 0x20, operands: 'r,adr,x' }, { code: 0x24, operands: 'r,r' } ],
  SUBA: [ { code: 0x21, operands: 'r,adr,x' }, { code: 0x25, operands: 'r,r' } ],
  ADDL: [ { code: 0x22, operands: 'r,adr,x' }, { code: 0x26, operands: 'r,r' } ],
  SUBL: [ { code: 0x23, operands: 'r,adr,x' }, { code: 0x27, operands: 'r,r' } ],
  AND:  [ { code: 0x30, operands: 'r,adr,x' }, { code: 0x34, operands: 'r,r' } ],
  OR:   [ { code: 0x31, operands: 'r,adr,x' }, { code: 0x35, operands: 'r,r' } ],
  XOR:  [ { code: 0x32, operands: 'r,adr,x' }, { code: 0x36, operands: 'r,r' } ],
  CPA:  [ { code: 0x40, operands: 'r,adr,x' }, { code: 0x44, operands: 'r,r' } ],
  CPL:  [ { code: 0x41, operands: 'r,adr,x' }, { code: 0x45, operands: 'r,r' } ],
  SLA:  [ { code: 0x50, operands: 'r,adr,x' } ],
  SRA:  [ { code: 0x51, operands: 'r,adr,x' } ],
  SLL:  [ { code: 0x52, operands: 'r,adr,x' } ],
  SRL:  [ { code: 0x53, operands: 'r,adr,x' } ],
  JMI:  [ { code: 0x61, operands: 'adr,x' } ],
  JNZ:  [ { code: 0x62, operands: 'adr,x' } ],
  JZE:  [ { code: 0x63, operands: 'adr,x' } ],
  JUMP: [ { code: 0x64, operands: 'adr,x' } ],
  JPL:  [ { code: 0x65, operands: 'adr,x' } ],
  JOV:  [ { code: 0x66, operands: 'adr,x' } ],
  PUSH: [ { code: 0x70, operands: 'adr,x' } ],
  POP:  [ { code: 0x71, operands: 'r' } ],
  CALL: [ { code: 0x80, operands: 'adr,x' } ],
  RET:  [ { code: 0x81, operands: ''} ],
  SVC:  [ { code: 0xf0, operands: 'adr,x' } ] };

var OPERAND_TABLE = {
  r: ['Register'], adr: ['Decimal', 'Label', 'Literal'], x: ['Register']
};

var _CaslAssembler;
_CaslAssembler = function(opts) {

  _CaslAssembler.prototype.parse = function(sourceCode) {
    return _.flatten(PEG.parse(sourceCode)).filter(function(token){
      return token instanceof Object && token.constructor.name !== "Comment";
    });
  };

  _CaslAssembler.prototype.expandMacro = function(ast) {
    var expandedAst = [];
    _(ast).each(function(op) {
      switch(op.name) {
        case 'IN':
        case 'OUT':
          var svcAddr = op.name === 'IN' ? 1 : 2;
          expandedAst.push(new Operation(op.label, 'PUSH', [new Decimal(0), new Register(1)]));
          expandedAst.push(new Operation(null    , 'PUSH', [new Decimal(0), new Register(2)]));
          expandedAst.push(new Operation(null    , 'LAD',  [new Register(1), op.operands[0]]));
          expandedAst.push(new Operation(null    , 'LAD',  [new Register(2), op.operands[1]]));
          expandedAst.push(new Operation(null    , 'SVC',  [new Decimal(svcAddr)]));
          expandedAst.push(new Operation(null    , 'POP',  [new Register(2)]));
          expandedAst.push(new Operation(null    , 'POP',  [new Register(1)]));
          break;

        case 'RPUSH':
          for(var i = 1 ; i <= 7 ; i++) {
            expandedAst.push(new Operation(null, 'PUSH', [new Decimal(0), new Register(i)]));
          }
          break;

        case 'RPOP':
          for(var i = 7 ; i >= 1 ; i--) {
            expandedAst.push(new Operation(null, 'POP', [new Register(i)]));
          }
          break;

        default:
          expandedAst.push(op);
      }
    });
    return expandedAst;
  }

  _CaslAssembler.prototype.assemble = function(ast) {
    var startAddr = 0x0000;
    var astLen = ast.length;
    var labels = [];
    labels.findByName = function(name) {
      return _.find(this, function(label){ return label.name === name; });
    }
    var unprocessedAddresses = [];
    var program = [];

    var token2Addr = function(token) {
      switch(token.constructor.name) {
        case 'Decimal':
          return token.value;

        case 'Label':
          return labels.findByName(token.value).address;

        case 'Literal':
          unprocessedAddresses.push({ token: token, address: program.length });
          return 0x0000;

        default:
          //bug
      }
    }

    var findMatchedOperandInfo = function(operands, opinfolist) {
      return _(opinfolist).find(function(opinfo){
        if(opinfo.operands === '') return true;

        return _(opinfo.operands.split(',')).every(function(pattern, oprI) {
          var opr = operands[oprI];
          var isMatched = opr && OPERAND_TABLE[pattern].indexOf(opr.constructor.name) !== -1;
          if(pattern === 'x') {
            return !opr || isMatched;
          }
          return isMatched;
        });
      });
    };

    var defineConstant = function(operand) {
      switch(operand.constructor.name) {
        case 'CometString':
          var str = operand.value;
          program = program.concat(_(str).map(function(ch){ return ch.charCodeAt(0); }));
          break;

        case 'Label':
          var label = labels.findByName(operand.value);
          program.push(label.address);
          break;

        case 'Decimal':
          program.push(operand.value);
          break;

        default:
          //error
      }
    };

    //TODO: validate ast

    for(var astI = 0, addr = 0 ; astI < astLen ; astI++) {
      var op = ast[astI];
      var label = op.label;
      if(label) {
        labels.push({ name: label.value, address: addr });
      }

      switch(op.name) {
        case 'DS':
          addr += op.operands[0].value;
          break;
        case 'DC':
          _(op.operands).each(function(opr){
            if(opr.constructor.name === 'CometString') {
              addr += opr.value.length;
            }
            else {
              addr += 1;
            }
          });
          break;
        default:
          opinfolist = COMET_OPERATIONS[op.name];
          if(opinfolist === undefined) {
            break;
          }

          opinfo = findMatchedOperandInfo(op.operands, opinfolist);
          if(opinfo === undefined) {
            throw "invalid operands: " + op.operands.join(",") + " to " + op.name;
          }
          addr += opinfo.operands.split(',').indexOf('adr') !== -1 ? 2 : 1;
      }
    }

    for(var astI = 0 ; astI < astLen ; astI++) {
      var op = ast[astI];

      switch(op.name) {
        case 'START':
          if(op.label) ; //TODO: export as entry name

          var startLabel = op.operands[0];
          if(startLabel) {
            var labelName = op.operands[0].value;
            var label = labels.findByName(labelName);
            if(label === null){
              throw "label not found: " + labelName;
            }
            startAddr = label.address;
          }
          else {
            startAddr = program.length;
          }

          break;

        case 'END':
          break;

        case 'DS':
          var size = op.operands[0].value;
          _(size).times(function(){ program.push(0x0000); });

          break;

        case 'DC':
          _(op.operands).each(defineConstant);
          break;

        default:
          var opinfolist = COMET_OPERATIONS[op.name];
          if(!opinfolist) {
            throw "invalid operation: " + op.name;
          }

          var operands = op.operands;

          var opinfo = findMatchedOperandInfo(operands, opinfolist);
          if(opinfo === undefined) {
            throw "invalid operands: " + operands.join(",") + " to " + op.name;
          }

          var word1 = opinfo.code << 8 & 0xff00;
          switch(opinfo.operands) {
            case 'r,adr,x':
              word1 |=
                (operands[0].index << 4 & 0x00f0);

              if(operands[2]) word1 |= (operands[2].index & 0x000f);
              break;
            case 'r,r':
              word1 |=
                (operands[0].index << 4 & 0x00f0) |
                (operands[1].index & 0x000f);
              break;
            case 'adr,x':
              if(operands[1]) word1 |= (operands[1].index & 0x000f);
              break;
            case 'r':
              word1 |=
                (operands[0].index << 4 & 0x00f0);
              break;
            case '':
              break;
            default:
              //bug
          }
          program.push(word1);
          var adrIndex;
          if((adrIndex = opinfo.operands.split(',').indexOf('adr')) !== -1) {
            program.push(token2Addr(operands[adrIndex]));
          }
      }
    }

    _(unprocessedAddresses).each(function(tokenWithAddr) {
      program[tokenWithAddr.address] = program.length;
      defineConstant(tokenWithAddr.token.value);
    });

    return {
      startAddr: startAddr,
      labels: labels,
      program: program
    };
  };

};

_CaslAssembler.assemble = function(sourceCode) {
  var assembler = new CaslAssembler;
  var ast = assembler.parse(sourceCode);
  ast = assembler.expandMacro(ast);
  return assembler.assemble(ast);
};

CaslAssembler = _CaslAssembler;
})();