// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6ePST":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "caea57e3551c35324d99b55cc5efbbf9"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"15WfK":[function(require,module,exports) {
// --MAIN SCRIPT--
var _state = require("./state");
var _cards = require("./components/cards");
var _router = require("./router");
(function() {
    _router.initRouter(document.querySelector("#root"));
    _cards.initCardComponent();
    document.querySelector(".form-new-note").addEventListener("submit", (e)=>{
        e.preventDefault();
        const value = e.target[0].value;
        _state.State.addNewNote(value);
        e.target[0].value = "";
    });
})();

},{"./components/cards":"4vzox","./router":"gwu5I","./state":"3hDy6"}],"4vzox":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/*
--COMPONENTE--

un componente <todo-item> (o el nombre que quieras):
que reciba atributos como text, checked, o los que se te ocurran, para mostrar la card amarilla correspondiente a cada pendiente con la data que corresponda.
que emita un evento (leer custom events) para que la page se entere de que algo cambió.
*/ parcelHelpers.export(exports, "initCardComponent", ()=>initCardComponent
);
var _state = require("../../state");
function initCardComponent() {
    class Card extends HTMLElement {
        constructor(){
            super();
            //Shadow DOM
            this.shadow = this.attachShadow({
                mode: "open"
            });
            this.render();
            _state.State.suscribe(()=>{
                console.log("Renderizando componente...");
                this.render();
            });
        }
        render() {
            //variables previas a la llamada
            const shadow = this.shadow;
            const text = this.textContent;
            const id = this.getAttribute("id");
            const check = this.getAttribute("checked");
            let checkAttribute;
            if (check == "true") checkAttribute = "checked";
            else checkAttribute = "none";
            //Estilos
            var style = document.createElement("style");
            style.textContent = `\n      *{\n        box-sizing:border-box;\n      }\n      .card{\n        background-color: #FFF599;\n        display: flex;\n        height: auto;\n        width: 311px;\n        border-radius: 4px;\n        padding: 22px 13px;\n        margin: 20px 6px;\n      }\n      .card-active{\n        border: 3px solid #000;\n      }\n      .card__text{\n        flex-grow:1;\n      }\n      .task-done{\n        text-decoration:line-through;\n      }\n      .card__functions{\n        display:flex;\n        flex-direction: column;\n        justify-content: space-around;\n      }\n      .card__checkbox, .card__trash{\n        width: 21px;\n        height: 21px;\n      }\n      .card__trash {\n        display: none;\n      }\n      .show-trash{\n        display:block;\n      }\n      `;
            //Content
            shadow.innerHTML = `\n      <div class="card" id="${id}">\n        <p class="card__text">${text}</p>\n        <div class="card__functions">\n          <input class="card__checkbox" type="checkbox" ${checkAttribute}>\n          <div class="card__trash">\n            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n            <rect width="22" height="22" fill="url(#pattern0)"/>\n            <defs>\n            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">\n            <use xlink:href="#image0" transform="scale(0.00195312)"/>\n            </pattern>\n            <image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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SeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQFN0ecGxE7ii4PglXQHcWnD8kse9tNK9f6fw+NLoDACaotMKjv3NzLyq4PjFLPo+u2CJkse9tNK9f6Xw+NLoDACaolMnOnYNJSeiyR6bzLwYuKhgCQOAJscAoCkq+W1uyt9yoexENPVjU6r/yzPzvwuNLRVjANAUnQX8oNDYJxcat5YvFxr3WuDrhcaupdTvduqfGXXKAKDJycxbgdcUGPqfMvNfCoxbTWaeCnyswNCvzcybCoxb0zuAC0ce8ybgtSOPKVVhANBU/QVwwojjXQm8ZMTxWvp1xr0r/UTgbSOO10Rmfh84ZORh35CZ/zbymFIVBgBNUmYmw8n86pGGPHRxo9jkZeZ3gN8YabhrgBcvVl0mLzP/GXjnSMOdAfzxSGNJ1RkANFmZeR7Dt921XZp+X2Z+eO07Wh6Z+VHWfqK7Cfj1zDx3hJaWyWGs/RMNlwEvnMFlEXXMAKBJW0zcuzF8G7urvgsclJljLwsvhcz8DeBA1uxywBnAbpn5oXG7ai8zrwEeC/wf1iw8/iOwc2ZO/aZIdc4AoMnLzK8CuwN/CNy8wj/2KYaT+N8Xa2wJLFYCdmblNwbezHAcd18c11nKzJsz83UMn5uvrfCPXQ78bGY+PzOnvCuiBEAMl1K1tiKi6IHMzCg5/lxExPbAE4BdgF2BRwIbAP/J8Bz4acApmdndxi0RsQuwBz86NjsBNzB82z+V4dic1Nsz7RGxPrAnPzouuwLbM6ycnMaPjs0XMvPKVn1ORUTszbg36K7uC5m5d8Hxu2EAGIkBYDlFxDrA3TLz+ta9LJuI2BC4cS43+I0pIjbOzGtb9zFFBoDpWK91A1JJi8nNyf92GIrumJO/euA9AJIkdcgAIElShwwAkiR1yAAgSVKHDACSJHXIACBJUocMAJIkdcgAIElShwwAkiR1yAAgSZoS968fiQFgPEW3VY2Ie5QcX5JGUvpc5RbWIzEAjOfqwuNvWXh8SRpD6XNV6XNtNwwA4yn9obxP4fElaQylz1UGgJEYAMZjAJCk8ueqqwqP3w0DwHhKfyi9BCBpCrwEMBEGgPG4AiBJXgKYDAPAeK4sPL4rAJKmoPS5qvS5thsGgPGcW3h8VwAkTUHpc1Xpc203DADj+a/C4+9ceHxJWisRsSVw78JlSp9ru2EAGM85hcffMSK2LVxDktbG0wuPfzNwfuEa3TAAjKd0AAB4RoUakrSmSp+jvpWZNxeu0Q0DwHguBG4oXKN0upakNRIRATytcBmX/0dkABhJZiblVwGeGhH+ziQto0dS/gZAA8CInEzGdUrh8e8J7Fa4hiStiRorlKXPsV0xAIzrpAo1vA9A0jKqcW6qcY7thgFgXDU+nM+qUEOSVmzxuvLHFy5zSWbWuNm6GwaAEWXm2cDlhcvsERGPLVxDku6K3wTuVrjGvxQevzsGgPHV+JD+XoUaknSnImJj4OUVSrn8PzIDwPiqXAaIiEdXqCNJd+ZXgZ+oUMcAMLIYnl7TWCLiocBZFUp9PDMPqFBHkm5XRGzIsDf/1oVLXQzcLzNvLVynK64AjGxxH8DXKpR6bkQ8rEIdSbojh1B+8gc40sl/fAaAMv6xQo0AXlOhjiT9mIhYH3hlpXI1zqndMQCU8Q+V6jw/Ih5RqZYkrerXgO0q1LkUOLFCne4YAArIzG8AX61Qah3gIxGxSYVakgRARPwU8OZK5Vz+L8QAUE6tVYCHAn9ZqZakzi2+cHwE2KhSSZf/C/EpgEIiYiuG91aX3hzjNi/OzA9UqiWpUxHxPuDFlcqdBeyUTlRFuAJQSGZeAhxRseRfRMSOFetJ6kxEHEy9yR/grU7+5bgCUFBEPBL4t4olvw7skZnXVawpqQOLPU5OA2rdc3Q5sG1mXl+pXndcASgoM88ATqhY8qeA90bEehVrSpq5iLgP8DHqTf4Af+nkX5YrAIVFxLOBT1Uu+0/A8zPz2sp1Jc1MRDwA+AzwoIplbwC2y8zLKtbsjisA5R0NnFm55r7AcRGxReW6kmZk8c6Rf6Xu5A/wfif/8lwBqCAi9gOOalD6LGCfzDy/QW1JExYRTwWOBDatXPpq4MGLG6lVkCsAFWTm0cDxDUrvAPzrYtMOSVqRiPh5hkuJtSd/gD9x8q/DFYBKFk8EnEab0PV94HeA97ijlqQ7EhGbAn8AvILhfSO1fRt4iPcv1eEKQCWLJwI+2Kj8ZsC7gFMi4jGNepC0pGJwMPAN4LdoM/kDvMbJvx5XACqKiG0Y/oJt3LCNZAgir8zMSxv2IWkJRMSjgHcAj2vcyr8Bu7pKWY8rABVl5reBwxq3EcCLgG9ExMsjotZWxZKWSETcOyLeCZxK+8n/RuAQJ/+6XAFoICKOAZ7Zuo+F7wGfYHh50ecy86bG/UgqJCI2A54LHAg8jXrvKrkzr8rMWm8X1IIBoIHFi4K+Dty7dS+ruZIfhYHjDAPS9C0m/f0ZJv2nszyT/m2+CDzJb//1GQAaiYjnMTxju6y+y/DUwoW395OZ323Ym6SFiFgH2BK43+38bAvswfJN+rf5AfBw9yppwwDQUES8FzikdR9r6CbAxC61tx6wbusm1tALM/NDuBbsbwAAApNJREFUrZvolQGgoYjYkOFlQT6aJ6k3b8vMl7duomcGgMYi4ieAk4HtW/ciSZV8Cnie1/3bMgAsgYjYkeGFG5u37kWSCjsd2DMzr2ndSO/cB2AJZOaZwE8zXFeXpLm6ANjPyX85GACWRGYeD/wS3lgnaZ6uAPbNzItbN6KBAWCJLO6G/QXg5ta9SNKILgH2zsyvt25EP+I9AEsoIvZn2IxnWZ/dlaSVugB4SmZ+s3Uj+p8MAEsqIp4BfBzYqHUvkrSGzmWY/M9r3Yh+nJcAllRmfgbYh2Gvfkmamn8Hnujkv7wMAEssM78I7AKc0boXSboL/h54TGZe1LoR3TEDwJLLzHOBxwLvb9yKJN2Zm4BDM/MgH/Vbft4DMCER8RLg7cAGrXuRpNV8GzgwM7/UuhGtjCsAE5KZ7wYeB3y1dS+StIojgUc7+U+LAWBiMvN0YFfgMMAlNkktXQA8JzN/OjMva92M7hovAUxYRNwfeAewX+teJHXlFobLka/NzKtbN6M1YwCYgYg4AHgD8NDWvUiavc8Dv52Zp7VuRGvHSwAzkJlHAjsxbCN8VuN2JM3TCcBemfkkJ/95cAVgZiJiHeBngdcCOzZuR9L0HQe8LjNPbN2IxmUAmKlFEHgm8IvAs/G9ApJW7krgCOB9mfmV1s2oDANAByJiC+Ag4MXAo9t2I2lJ3QJ8lmHTsU9m5g1t21FpBoDORMTDGFYGngI8AdikbUeSGroMOH7xc3RmXty4H1VkAOhYRKwPPAZ4MrAXsDNwn6ZNSSolgfMZNhI7ATguM/+9bUtqyQCg/yEi7gXssPjZEXgQsBmwKXCPxT83ZVg5iEZtSvqRW4CrgR8AV63ycwVwNnAmw9NBZ2fmda2a1PL5f8JrFglZBPZsAAAAAElFTkSuQmCC"/>\n            </defs>\n            </svg>\n          </div>\n        </div>\n      </div>\n      `;
            shadow.appendChild(style);
            const checkbox = shadow.querySelector(".card__checkbox");
            if (check === "true") shadow.querySelector(".card__text").classList.add("task-done");
            else if (check === "false") shadow.querySelector(".card__text").classList.remove("task-done");
            checkbox.addEventListener("change", function(e) {
                shadow.querySelector(".card__text").classList.toggle("task-done");
                _state.State.checkedNote(Number(id), this.checked);
            });
            shadow.addEventListener("click", (e)=>{
                shadow.querySelector(".card__trash").classList.toggle("show-trash");
                shadow.querySelector(".card").classList.toggle("card-active");
            });
            shadow.querySelector(".card__trash").addEventListener("click", ()=>{
                _state.State.deleteNote(Number(id));
            });
        }
    }
    customElements.define("card-note", Card);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR","../../state":"3hDy6"}],"367CR":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3hDy6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "State", ()=>State
);
/*

--STATE--

con métodos para acceder y para ser escrito.
con la información de todas las tareas y sus distintas variaciones (si están completadas o si están borradas).
que sea el lugar donde se sincroniza el state con localstorage.
Tip: para que sea más fácil, tenés que usar un id en cada pendiente.

*/ class Notes {
    constructor(content1, id1){
        this.id = id1;
        this.content = content1;
        this.checked = false;
    }
}
const State = {
    data: JSON.parse(localStorage.getItem("notes")) || [],
    listeners: [],
    getState () {
        return this.data;
    },
    setState (data) {
        this.data = data;
        localStorage.setItem("notes", JSON.stringify(this.data));
        for (const cb of this.listeners)cb();
    },
    addNewNote (content) {
        const note = new Notes(content, this.idGen());
        const data = this.getState();
        data.push(note);
        this.setState(data);
    },
    deleteNote (id) {
        const newState = this.getState().filter((item)=>item.id !== id
        );
        this.setState(newState);
    },
    checkedNote (id, value) {
        const lastState = this.data.filter((item)=>item.id !== id
        );
        let checkedNote = this.data.find((item)=>item.id === id
        );
        checkedNote.checked = value;
        const newState = lastState.concat(checkedNote);
        this.setState(newState);
    },
    idGen () {
        let id2;
        if (this.getState().length < 1) id2 = 1;
        else {
            let idValues = this.getState().map((item)=>item.id
            );
            const max = Math.max(...idValues);
            id2 = max + 1;
        }
        if (this.getState().map((item)=>item.id === id2
        )) id2 += id2;
        return id2;
    },
    suscribe (callback) {
        this.listeners.push(callback);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"gwu5I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRouter", ()=>initRouter
);
var _page = require("./pages/page");
var _state = require("./state");
const routes = [
    {
        path: /\//,
        component: _page.rootPage
    }, 
];
function initRouter(container) {
    function goTo(path) {
        history.pushState({
        }, "", path);
        handleRoute(path);
    }
    function handleRoute(route) {
        for (const r of routes)if (r.path.test(route)) {
            const el = r.component({
                lastState: _state.State.getState()
            });
            if (container.firstChild) container.firstChild.remove();
            container.appendChild(el);
        }
    }
    if (location.pathname == "/") goTo("/");
    else handleRoute(location.pathname);
    window.onpopstate = function(event) {
        handleRoute(location.pathname);
    };
}

},{"./pages/page":"6aXzP","@parcel/transformer-js/src/esmodule-helpers.js":"367CR","./state":"3hDy6"}],"6aXzP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rootPage", ()=>rootPage
);
/*
    --PAGE--
una page:
que se suscriba al state y escuche sus cambios para imprimir la lista de pendientes respetando lo que el state diga sobre cada uno de ellos. Es decir, si el state dice que está completo, así será considerado.
que escuche el evento del componente que representa al ítem y, al mismo tiempo, escuche si alguien hace click en el checkbox para avisarle al estado que alguien cambió ese ítem.
que, cada vez que el estado cambie la page, se entere y vuelva a imprimir todo el listado de tareas. O sea, que lo que define lo que se ve sea siempre el estado.
*/ var _state = require("../state");
let lastState = _state.State.getState();
function rootPage(params) {
    const lastState1 = params.lastState;
    const div = document.createElement("div");
    div.className = "card-box";
    const style = document.createElement("style");
    style.textContent = `\n    .card-box{\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      margin: 0 20px;\n    }\n  `;
    div.appendChild(style);
    lastState1.forEach((item)=>{
        const card = document.createElement("card-note");
        card.setAttribute("checked", String(item.checked));
        card.setAttribute("id", String(item.id));
        card.textContent = item.content;
        div.appendChild(card);
    });
    return div;
}
_state.State.suscribe(()=>{
    if (lastState !== _state.State.getState()) {
        console.log("cambio de estado, salto a /");
        const container = document.querySelector("#root");
        if (container.firstChild) container.firstChild.remove();
        container.appendChild(rootPage({
            lastState: _state.State.getState()
        }));
    }
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR","../state":"3hDy6"}]},["6ePST","15WfK"], "15WfK", "parcelRequire7303")

//# sourceMappingURL=index.c5efbbf9.js.map
