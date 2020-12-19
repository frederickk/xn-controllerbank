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
})({"ts/arc.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Arc =
/** @class */
function () {
  function Arc(selector, midiHelper) {
    this.element_ = null;
    this.label_ = null;
    this.value_ = 0;
    this.selector_ = selector;
    this.mh_ = midiHelper;

    if (this.selector_) {
      this.element_ = document.querySelector(this.selector_);
      this.label_ = document.querySelector(this.selector_ + "-label");
    }

    this.attach_();
  }

  Object.defineProperty(Arc.prototype, "value", {
    get: function get() {
      return new Number(this.value_);
    },
    enumerable: true,
    configurable: true
  });

  Arc.prototype.attach_ = function () {
    if (this.element_) {
      this.element_.addEventListener('input', this.changeListener_.bind(this));
    }
  };

  Arc.prototype.changeListener_ = function () {
    var elem = document.querySelector(this.selector_ + "-val1");
    var val1 = new Number(elem.value || 0);

    if (this.element_) {
      this.value_ = new Number(this.element_.value);

      if (this.label_ && val1) {
        this.label_.innerText = this.value_ + " | " + val1;
      } // this.mh_.noteOn(this.value, 100, 100);


      this.mh_.sendMessage(this.mh_.CC, val1, this.value);
    }
  };

  return Arc;
}();

exports.Arc = Arc;
},{}],"ts/midihelper.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MidiHelper =
/** @class */
function () {
  function MidiHelper() {
    this.NOTE_ON = 0x90;
    this.NOTE_OFF = 0x80;
    this.CC = 0xB0;
    this.midiIn_ = [];
    this.midiOut_ = [];
    this.selectIn_ = null;
    this.selectOut_ = null;
    this.selectIn_ = document.querySelector('#midi-input');
    this.selectOut_ = document.querySelector('#midi-output');
  }

  MidiHelper.prototype.midiReady_ = function (midiAccess) {
    var _this = this;

    midiAccess.addEventListener('statechange', function () {
      _this.initDevices_(midiAccess);
    });
    this.initDevices_(midiAccess);
  };

  MidiHelper.prototype.initDevices_ = function (midiAccess) {
    this.midiIn_ = [];
    this.midiOut_ = []; // MIDI devices that send you data.

    var inputs = midiAccess.inputs.values();

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      this.midiIn_.push(input.value);
    } // MIDI devices that you send data to.


    var outputs = midiAccess.outputs.values();

    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
      this.midiOut_.push(output.value);
    }

    this.displayDevices_();
  };

  MidiHelper.prototype.displayDevices_ = function () {
    if (this.selectIn_) {
      this.selectIn_.innerHTML = this.midiIn_.map(function (device) {
        "<option>" + device.name + "</option>";
      }).join('');
    }

    if (this.selectOut_) {
      this.selectOut_.innerHTML = this.midiOut_.map(function (device) {
        "<option>" + device.name + "</option>";
      }).join('');
    }
  };

  MidiHelper.prototype.connect = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , navigator.requestMIDIAccess().then(function (midiAccess) {
              return _this.midiReady_(midiAccess);
            }, function (err) {
              return console.log('Something went wrong', err);
            })];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  MidiHelper.prototype.noteOn = function (pitch, velocity) {
    var msgOn = [this.NOTE_ON, pitch, velocity];

    if (this.selectOut_) {
      var device = this.midiOut_[this.selectOut_.selectedIndex];
      device.send(msgOn);
    }
  };

  MidiHelper.prototype.noteOff = function (pitch, duration) {
    var msgOff = [this.NOTE_ON, pitch, 0];

    if (this.selectOut_) {
      var device = this.midiOut_[this.selectOut_.selectedIndex];
      device.send(msgOff, Date.now() + duration);
    }
  };

  MidiHelper.prototype.sendMessage = function (msg, value1, value2) {
    if (this.selectOut_) {
      var device = this.midiOut_[this.selectOut_.selectedIndex];
      device.send([msg, value1, value2]);
    }
  };

  return MidiHelper;
}();

exports.MidiHelper = MidiHelper;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var arc_1 = require("./ts/arc");

var midihelper_1 = require("./ts/midihelper"); // // Instatiate control elements.
// // TODO (frederickk) In the real world, this would be handled by template logic.
// const container = document.querySelector('#container');
// for (let i = 0; i < 8; i++) {
//   let htmlStr = `
//   <div class="arc__container">
//     <div id="arc${i + 1}-name" class="arc__label arc__label--white" data-save="1" contenteditable="true">Arc ${i + 1}</div>
//     <div id="arc${i + 1}-val1-label" class="arc__label">CC Number</div>
//     <input id="arc${i + 1}-val1" class="arc__input" data-save="1" value="${i + 1}" />
//     <label id="arc${i + 1}-label" class="arc__label" for="arc${i + 1}">0 | ${i + 1}</label>
//     <input id="arc${i + 1}" name="arc${i + 1}" class="arc" data-save="1" type="range" value="0" max="127" />
//   </div>`;
//   container.innerHTML += htmlStr;
// }


var WebmidiController =
/** @class */
function () {
  function WebmidiController() {
    this.saveButton_ = null;
    this.clearButton_ = null;
    this.saveButton_ = document.querySelector('#save-button');
    this.clearButton_ = document.querySelector('#clear-button'); // Instantiate webmidi.

    var mh = new midihelper_1.MidiHelper();
    mh.connect(); // Instatiate sliders.

    document.querySelectorAll('.arc').forEach(function (arc) {
      new arc_1.Arc("#" + arc.id, mh);
    });
    this.fetchState();
    this.attach_();
  }

  WebmidiController.prototype.saveState = function () {
    var _this = this;

    console.log('Saving state in localStorage');
    var saves = document.querySelectorAll('*[data-save]');
    saves.forEach(function (item) {
      _this.localStorageSaveHandler_(item);
    });
  }; // Reinstate save state.


  WebmidiController.prototype.fetchState = function () {
    var _this = this;

    var saves = document.querySelectorAll('*[data-save]');
    saves.forEach(function (item) {
      var eventType = item.innerText ? 'input' : 'change';
      item.addEventListener(eventType, function () {
        _this.localStorageSaveHandler_(item);
      });
      var state = localStorage.getItem(item.id);

      if (state) {
        if (item.value) {
          item.value = state;
        } else if (item.innerText) {
          item.innerText = state;
        }
      } else {
        _this.localStorageSaveHandler_(item);
      }
    });
  };

  WebmidiController.prototype.attach_ = function () {
    if (this.clearButton_) {
      this.clearButton_.addEventListener('click', function () {
        console.log('Clearing saved localStorage states');
        localStorage.clear();
      });
    }

    if (this.saveButton_) {
      this.saveButton_.addEventListener('click', this.saveState.bind(this));
    }
  };

  WebmidiController.prototype.localStorageSaveHandler_ = function (item) {
    localStorage.setItem(item.id, item.value || item.innerText);
  };

  return WebmidiController;
}();

exports.WebmidiController = WebmidiController;
new WebmidiController();
},{"./ts/arc":"ts/arc.ts","./ts/midihelper":"ts/midihelper.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62465" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map