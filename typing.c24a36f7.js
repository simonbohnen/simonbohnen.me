// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/webfontloader/webfontloader.js":[function(require,module,exports) {
var define;
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

},{}],"secret/experimental/js/icons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showIcon = showIcon;

var _connector = require("./connector");

function showIcon(x, y, iconId, href) {
  var canv = document.querySelector('#tagCanvas');
  $('body').append("<div class=\"socialIcon\" id=\"".concat(iconId, "\"><a class=\"fab ").concat(iconId, "\"></a></div>"));
  var icon = $("#".concat(iconId));
  icon.css({
    left: "".concat(x - _connector.iconRadius, "px"),
    top: "".concat(y - _connector.iconRadius, "px"),
    width: "".concat(_connector.iconRadius * 2, "px"),
    height: "".concat(_connector.iconRadius * 2, "px")
  });
  icon.animate({
    color: '#ffffff'
  }, 300);
  var oldCanv = cloneCircle(canv, x, y);
  icon.hover(function () {
    // hoverIn
    icon.stop(true, false);
    icon.animate({
      color: '#000000'
    }, 300);
    fillCircle(x, y, 0, '#ffffff', _connector.iconRadius * 0.95);
  }, function () {
    // hoverOut
    icon.stop(true, false);
    icon.animate({
      color: '#ffffff'
    }, 300);
    fillCircle(x, y, 0, 'rgba(0, 0, 0, 0.3)', _connector.iconRadius * 0.9, function () {
      _connector.ctx.clearRect(x - _connector.iconRadius, y - _connector.iconRadius, _connector.iconRadius * 2, _connector.iconRadius * 2);

      _connector.ctx.drawImage(oldCanv, x - _connector.iconRadius, y - _connector.iconRadius);
    });
  });
  icon.click(function () {
    window.open(href, '_blank');
  });
}

function fillCircle(x, y, prog, color, radius, callback) {
  _connector.ctx.fillStyle = color;

  _connector.ctx.beginPath();

  _connector.ctx.arc(x, y, radius, 0.5 * Math.PI - prog, 0.5 * Math.PI + prog);

  _connector.ctx.closePath();

  _connector.ctx.fill();

  if (prog < Math.PI) {
    requestAnimationFrame(function () {
      fillCircle(x, y, prog + _connector.drawspeed / 50, color, radius, callback);
    });
  } else if (callback) {
    callback();
  }
}

function cloneCircle(oldCanvas, x, y) {
  // create a new canvas
  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d'); // set dimensions

  newCanvas.width = 2 * _connector.iconRadius;
  newCanvas.height = 2 * _connector.iconRadius; // apply the old canvas to the new one

  context.drawImage(oldCanvas, x - _connector.iconRadius, y - _connector.iconRadius, 2 * _connector.iconRadius, 2 * _connector.iconRadius, 0, 0, 2 * _connector.iconRadius, 2 * _connector.iconRadius); // return the new canvas

  return newCanvas;
}
},{"./connector":"secret/experimental/js/connector.js"}],"secret/experimental/js/connector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = draw;
exports.drawspeed = exports.iconRadius = exports.config = exports.ctx = void 0;

var _typing = require("./typing");

var _icons = require("./icons");

var ctx;
exports.ctx = ctx;
var canv;
var config = [{
  sx: 0.4,
  sy: 0.45,
  ex: 0.2,
  ey: 0.2,
  diagFirst: true,
  iconId: 'fa-twitter',
  href: 'https://twitter.com/SimonBohnen'
}, {
  sx: 0.6,
  sy: 0.45,
  ex: 0.8,
  ey: 0.2,
  diagFirst: true,
  iconId: 'fa-linkedin',
  href: 'https://linkedin.com/in/SimonBohnen'
}, {
  sx: 0.65,
  sy: 0.55,
  ex: 0.85,
  ey: 0.7,
  diagFirst: true,
  iconId: 'fa-stack-overflow',
  href: 'https://stackoverflow.com/users/7804181/SimonBohnen'
}, {
  sx: 0.5,
  sy: 0.55,
  ex: 0.5,
  ey: 0.7,
  diagFirst: false,
  iconId: 'fa-envelope',
  href: 'mailto:simonbohnen@tum.de'
}, {
  sx: 0.35,
  sy: 0.55,
  ex: 0.15,
  ey: 0.7,
  diagFirst: true,
  iconId: 'fa-github',
  href: 'https://github.com/SimonBohnen'
}];
exports.config = config;

function draw() {
  $('#title-wrapper').html('Simon');
  (0, _typing.positionTitle)();
  canv = document.querySelector('#tagCanvas');
  exports.ctx = ctx = canv.getContext('2d'); // ctx.webkitImageSmoothingEnabled = true;
  // ctx.translate(0.5, 0.5);

  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#333333';
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;
  $('#subtitle').fadeIn();
  drawLine(450, 450, 600, 600);
  drawLine(200, 200, 400, 200); // drawNextConnector(0);

  $('.socialIcon').css({
    width: "".concat(iconRadius * 2, "px"),
    height: "".concat(iconRadius * 2, "px"),
    'line-height': "".concat(iconRadius * 2, "px")
  }); // Icons: Mail, Github, Twitter, LinkedIn, Xing, StackOverflow
}

$(window).resize(function () {
  ctx.clearRect(0, 0, canv.width, canv.height);
  $('.socialIcon').remove();
  drawNextConnector(0);
});

function drawNextConnector(index) {
  var curConfig = config[index];
  drawConnector(ctx, curConfig.sx * canv.width, curConfig.sy * canv.height, curConfig.ex * canv.width, curConfig.ey * canv.height, curConfig.diagFirst, curConfig.iconId, curConfig.href);

  if (index < config.length - 1) {
    setTimeout(function () {
      drawNextConnector(index + 1);
    }, 300);
  }
}

var iconRadius = 38;
exports.iconRadius = iconRadius;
var TOP = 0;
var RIGHT = 1;
var BOTTOM = 2;
var LEFT = 3;
var TR = 4;
var BR = 5;
var BL = 6;
var TL = 7;
var drawspeed = 7;
exports.drawspeed = drawspeed;

function drawConnector(ctx, sx, sy, ex, ey, diagFirst, iconId, href) {
  var sideways = Math.abs(ex - sx) > Math.abs(sy - ey);
  var diry = ey > sy ? 1 : -1;
  var dirx = ex > sx ? 1 : -1;

  if (diagFirst) {
    var endDiagX = sideways ? sx + dirx * Math.abs(ey - sy) : ex;
    drawDiagonal(ctx, sx, sy, endDiagX, dirx, diry, 0, function () {
      if (sideways) {
        drawHori(ctx, endDiagX, ey, ex - dirx * iconRadius, dirx, 0, function () {
          drawCircle(ctx, ex, ey, 0, dirx === 1 ? LEFT : RIGHT, iconId, href);
        });
      } else {
        drawVert(ctx, ex, sy + diry * Math.abs(ex - sx), ey - diry * iconRadius, diry, 0, function () {
          drawCircle(ctx, ex, ey, 0, diry === 1 ? TOP : BOTTOM, iconId, href);
        });
      }
    });
  } else if (sideways) {
    var midX = ex - dirx * Math.abs(ey - sy); // noinspection DuplicatedCode

    drawHori(ctx, sx, sy, midX, dirx, 0, function () {
      drawDiagonal(ctx, midX, sy, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, function () {
        drawCircle(ctx, ex, ey, 0, dirx === 1 ? diry === 1 ? TL : BL : diry === 1 ? TR : BR, iconId, href);
      });
    });
  } else {
    var midY = ey - diry * Math.abs(ex - sx); // noinspection DuplicatedCode

    drawVert(ctx, sx, sy, midY, diry, 0, function () {
      drawDiagonal(ctx, sx, midY, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, function () {
        drawCircle(ctx, ex, ey, 0, dirx === 1 ? diry === 1 ? TL : BL : diry === 1 ? TR : BR, iconId, href);
      });
    });
  }
}

var circleimg;

function drawCircle(ctx, x, y, prog, startFrom, iconId, href) {
  if (prog > 2 * iconRadius) {
    (0, _icons.showIcon)(x, y, iconId, href);
    return;
  }

  if (prog === 0) {
    circleimg = document.getElementById('circle-img');
  }

  prog += drawspeed / 2.0;
  ctx.save();
  ctx.translate(x, y);

  switch (startFrom) {
    case TOP:
      ctx.rotate(0.5 * Math.PI);
      break;

    case RIGHT:
      ctx.rotate(Math.PI);
      break;

    case BOTTOM:
      ctx.rotate(1.5 * Math.PI);
      break;

    case TR:
      ctx.rotate(0.75 * Math.PI);
      break;

    case BR:
      ctx.rotate(1.25 * Math.PI);
      break;

    case BL:
      ctx.rotate(1.75 * Math.PI);
      break;

    case TL:
      ctx.rotate(0.25 * Math.PI);
      break;
  }

  ctx.clearRect(-iconRadius - 1, -iconRadius - 5, iconRadius * 2 + 6, iconRadius * 2 + 10);
  ctx.drawImage(circleimg, 0, 0, prog, iconRadius * 2, -iconRadius, -iconRadius, prog, iconRadius * 2);
  ctx.restore();
  requestAnimationFrame(function () {
    drawCircle(ctx, x, y, prog, startFrom, iconId, href);
  });
}

var sqrt2 = Math.sqrt(2);

function drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx, callback) {
  ctx.lineWidth = 1;
  var nextX = sx + dirx * progx;
  ctx.clearRect(sx, sy, ex - sx, ex - sx);

  if (dirx === 1 && nextX < ex || dirx === -1 && nextX > ex) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy + diry * progx);
    ctx.stroke();
    requestAnimationFrame(function () {
      drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx + drawspeed / sqrt2, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy + diry * Math.abs(ex - sx));
    ctx.stroke();
    callback();
  }
}

function drawVert(ctx, sx, sy, ey, diry, progy, callback) {
  ctx.lineWidth = 2;
  var nextY = sy + diry * progy;
  ctx.clearRect(sx - 2, sy, 4, ey - sy);

  if (diry === 1 && nextY < ey || diry === -1 && nextY > ey) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, nextY);
    ctx.stroke();
    requestAnimationFrame(function () {
      drawVert(ctx, sx, sy, ey, diry, progy + drawspeed, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, ey);
    ctx.stroke();
    callback();
  }
}

function drawHori(ctx, sx, sy, ex, dirx, progx, callback) {
  ctx.lineWidth = 2;
  var nextX = sx + dirx * progx;
  ctx.clearRect(sx, sy - 2, ex - sx, 4);

  if (dirx === 1 && nextX < ex || dirx === -1 && nextX > ex) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy);
    ctx.stroke();
    requestAnimationFrame(function () {
      drawHori(ctx, sx, sy, ex, dirx, progx + drawspeed, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy);
    ctx.stroke();
    callback();
  }
}

function drawLine(sx, sy, ex, ey, prog, sin, cos, len, w, h) {
  if (!prog) {
    var ang = Math.atan2(ey - sy, ex - sx);
    len = Math.sqrt(Math.pow(ey - sy, 2) + Math.pow(ex - sx, 2));
    prog = 0;
    sin = Math.sin(ang);
    cos = Math.cos(ang);
    w = ex - sx;
    h = ey - sy;
  }

  ctx.clearRect(sx - 5, sy - 5, w + 10, h + 10);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + prog * cos, sy + prog * sin);
  ctx.stroke();

  if (prog < len) {
    requestAnimationFrame(function () {
      drawLine(sx, sy, ex, ey, prog + drawspeed, sin, cos, len, w, h);
    });
  }
}
},{"./typing":"secret/experimental/js/typing.js","./icons":"secret/experimental/js/icons.js"}],"secret/experimental/js/typing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionTitle = positionTitle;

var _webfontloader = _interopRequireDefault(require("webfontloader"));

var _connector = require("./connector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webfontloader.default.load({
  google: {
    families: ['Orbitron']
  },
  active: init
});

var beforeWidth;
var simonWidth;
$(window).resize(positionTitle); // todo canvas redraw!

function positionTitle() {
  var headermarginleft = ($('body').width() - simonWidth) / 2 - beforeWidth;
  $('#title-wrapper').css({
    left: "".concat(headermarginleft, "px")
  });
}

function init() {
  $(function () {
    var c = document.querySelector('#tagCanvas');
    c.width = 0.98 * window.innerWidth;
    c.height = 0.98 * window.innerHeight;
    beforeWidth = document.getElementById('measureBefore').clientWidth;
    simonWidth = document.getElementById('measureSimon').clientWidth;
    positionTitle();
    $('#flickering').html('|');

    if (location.href.includes('de')) {
      typeString = 'Hi, ich bin Simon.';
      _connector.config[1].href = 'http://xing.to/SimonBohnen';
      _connector.config[1].iconId = 'fa-xing';
    } else {
      typeString = "Hi, I'm Simon.";
    }

    var birth = new Date('2000-10-12');
    var today = new Date();
    var difference = today - birth;
    var age = new Date(difference).getFullYear() - 1970;
    var span = document.getElementById('age'); // noinspection JSValidateTypes

    span.innerHTML = age;
    drawNextCharacter(0);
  });
}

var typeString;

function drawNextCharacter(i) {
  if (i < typeString.length) {
    $('#spell').html(typeString.substring(0, i + 1));
    setTimeout(function () {
      drawNextCharacter(i + 1);
    }, i === 3 ? 300 : 70);
  } else {
    var leng = 300;
    $('#flickering').animate({
      color: '#000'
    }, leng).animate({
      color: '#fff'
    }, leng).animate({
      color: '#000'
    }, leng).animate({
      color: '#fff'
    }, leng).animate({
      color: '#000'
    }, leng);
    setTimeout(function () {
      $('#title-wrapper').html("<span class=\"fade\">".concat($('#measureBefore').html(), "</span><span>Simon</span><span class=\"fade\">.</span>"));
      $('.fade').animate({
        color: '#000'
      }, leng, 'swing', waitForDraw);
    }, 2000);
  }
}

var count = 0;

function waitForDraw() {
  if (count === 0) {
    count = 1;
  } else {
    count = 0;
    (0, _connector.draw)();
  }
}
},{"webfontloader":"../node_modules/webfontloader/webfontloader.js","./connector":"secret/experimental/js/connector.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58840" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","secret/experimental/js/typing.js"], null)
//# sourceMappingURL=/typing.c24a36f7.js.map