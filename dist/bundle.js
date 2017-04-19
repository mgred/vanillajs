var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){if(e.get||e.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=e.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,e=[];!(b=a.next()).done;)e.push(b.value);return e};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
$jscomp.polyfill=function(a,b,e,c){if(b){e=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var g=a[c];g in e||(e[g]={});e=e[g]}a=a[a.length-1];c=e[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:b})}};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(d){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(d);return this};b.prototype.asyncExecuteBatch_=function(){var d=this;this.asyncExecuteFunction(function(){d.executeBatch_()})};var e=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(d){e(d,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var d=
this.batch_;this.batch_=[];for(var a=0;a<d.length;++a){var b=d[a];delete d[a];try{b()}catch(f){this.asyncThrow_(f)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var c=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var d=this.createResolveAndReject_();try{a(d.resolve,d.reject)}catch(h){d.reject(h)}};c.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{var d;a:switch(typeof a){case "object":d=null!=a;break a;case "function":d=!0;break a;default:d=!1}d?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var d=void 0;try{d=a.then}catch(h){this.reject_(h);return}"function"==
typeof d?this.settleSameAsThenable_(d,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),
a[b]=null;this.onSettledCallbacks_=null}};var g=new b;c.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};c.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(f){d.reject(f)}};c.prototype.then=function(a,b){function d(a,b){return"function"==typeof a?function(b){try{f(a(b))}catch(l){e(l)}}:b}var f,e,k=new c(function(a,b){f=a;e=b});this.callWhenSettled_(d(a,f),
d(b,e));return k};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,b){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?g.asyncExecute(d):this.onSettledCallbacks_.push(function(){g.asyncExecute(d)})};c.resolve=function(a){return a instanceof c?a:new c(function(b,c){b(a)})};c.reject=function(a){return new c(function(b,c){c(a)})};
c.race=function(a){return new c(function(b,d){for(var e=$jscomp.makeIterator(a),h=e.next();!h.done;h=e.next())c.resolve(h.value).callWhenSettled_(b,d)})};c.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c.resolve([]):new c(function(a,e){function h(b){return function(c){f[b]=c;g--;0==g&&a(f)}}var f=[],g=0;do f.push(void 0),g++,c.resolve(d.value).callWhenSettled_(h(f.length-1),e),d=b.next();while(!d.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(c.$jscomp$new$AsyncExecutor=function(){return new b});
return c},"es6-impl","es3");var module$src$classes$App={},App$$module$src$classes$App=function(a,b){this.node=a;this.hash=b;this.routes=[]};App$$module$src$classes$App.prototype.when=function(a,b){this.routes.push({hash:a,config:b});return this};
App$$module$src$classes$App.prototype.start=function(){for(var a=$jscomp.makeIterator(this.routes),b=a.next();!b.done;b=a.next())if(b=b.value,b.hash===this.hash)return a=document.querySelector("#"+b.config.template),this.node.insertAdjacentHTML("afterend",a.innerHTML),new (Function.prototype.bind.apply(b.config.controller,[null].concat([a],$jscomp.arrayFromIterable(b.config.resolve))))};module$src$classes$App.default=App$$module$src$classes$App;var module$src$routes$about_controller={},About$$module$src$routes$about_controller=function(a,b){console.log(a,b)};module$src$routes$about_controller.default=About$$module$src$routes$about_controller;var module$src$routes$about_config={},p$$module$src$routes$about_config=new Promise,aboutConfig$$module$src$routes$about_config={resolve:["Hello World"],controller:module$src$routes$about_controller.default,template:"about"};module$src$routes$about_config.aboutConfig=aboutConfig$$module$src$routes$about_config;var hash$$module$src$main=window.location.hash.slice(1),el$$module$src$main=document.querySelector("main"),app$$module$src$main=new module$src$classes$App.default(el$$module$src$main,hash$$module$src$main);app$$module$src$main.when("about",module$src$routes$about_config.aboutConfig).start();
