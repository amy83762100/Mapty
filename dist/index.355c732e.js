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
        this
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
})({"1vSbZ":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "6c289700c20eac7e3f164c94355c732e";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
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
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
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
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
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
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
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
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3GZMZ":[function(require,module,exports) {
"use strict";
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ["January","February","March","April","May","June","July","August","September","October","Novenber","December"];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()} ${(this.date.getHours() + "").padStart(2, 0)}:${(
      this.date.getMinutes() + ""
    ).padStart(2, 0)}:${(this.date.getSeconds() + "").padStart(2, 0)}`;
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this._calcPace();
    this._setDescription();
  }
  _calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this._calcSpeed();
    this._setDescription();
  }
  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form_input-type");
const inputDistance = document.querySelector("#distance");
const inputDuration = document.querySelector("#duration");
const inputCadence = document.querySelector("#cadence");
const inputElevGain = document.querySelector("#elevGain");
const btnShowSortOptions = document.querySelector(".btn_sort");
const containerSortOptions = document.querySelector(".sort_option");
const btnSort = document.querySelector(".btn_oldest");
const btnSortOldest = document.querySelector(".btn_oldest");
const btnSortNewest = document.querySelector(".btn_newest");
const btnOverview = document.querySelector(".btn_overview");
const btnDeleteAll = document.querySelector(".btn_deleteAll");
const btnYesDelete = document.querySelector(".btn_yesDelete");
const btnNoDelete = document.querySelector(".btn_noDelete");
const btnToggleSideBar = document.querySelector(".btn_closeSideBar");
const confirmationMsg = document.querySelector(".confirmation_msg");
const sidebarContent = document.querySelector(".sidebarContent");
class App {
  #map;
  #mapZoom = 15;
  #mapEven;
  #workouts = [];
  #sortOption = 0;
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    btnToggleSideBar.addEventListener("click", this._toggleSideBar);
    btnShowSortOptions.addEventListener("click", this._showSortOptions);
    btnSortNewest.addEventListener("click", this._sortWorkout.bind(this, 0));
    btnSortOldest.addEventListener("click", this._sortWorkout.bind(this, 1));
    btnDeleteAll.addEventListener("click", this._toggleConfirmationMsg);
    btnYesDelete.addEventListener("click", this._deleteAll.bind(this));
    btnNoDelete.addEventListener("click", this._toggleConfirmationMsg);
    btnOverview.addEventListener("click", this._overview.bind(this));
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener(
      "click",
      this._workoutClicked.bind(this)
    );
    containerWorkouts.addEventListener(
      "submit",
      this._modifyWorkout.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoom);
    //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
    this.#workouts.forEach((workout) => this._renderWorkoutMarker(workout));
  }

  _showForm(mapE) {
    if (sidebarContent.classList.contains("hidden"))
      sidebarContent.classList.remove("hidden");
    this.#mapEven = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest(".form_row").classList.toggle("form_row-hidden");
    inputElevGain.closest(".form_row").classList.toggle("form_row-hidden");
  }
  _validInput = (...values) => values.every((value) => Number.isFinite(value));
  _allPositive = (...values) => values.every((value) => value > 0);
  _newWorkout(event) {
    event.preventDefault();
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEven.latlng;
    let workout;

    // If workout is running. create running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      if (
        !this._validInput(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If workout cycling. create cycling object
    if (type === "cycling") {
      const elevGain = +inputElevGain.value;
      if (
        !this._validInput(distance, duration, elevGain) ||
        !this._allPositive(distance, duration)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout = new Cycling([lat, lng], distance, duration, elevGain);
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    // Render workout on map as marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkoutList(workout);
    // Hide form + clear input fields
    this._hideForm();
    // remove sort
    this._sortWorkout(0);
    // Set local storage to all workouts
    this._setLocalStorage();
  }
  _modifyWorkout(event) {
    event.preventDefault();
    if (!event.target.classList.contains("workout_form")) return;
    let index = this._findWorkout(event);
    const workout = this.#workouts[index];
    const distance = +event.target.children[0].children[1].value;
    const duration = +event.target.children[1].children[1].value;
    if (workout.type === "running") {
      const cadence = +event.target.children[3].children[1].value;
      console.log(
        this._validInput(distance, duration, cadence),
        this._allPositive(distance, duration, cadence)
      );
      if (
        !this._validInput(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout.cadence = cadence;
      workout.pace = duration / distance;
    }
    if (workout.type === "cycling") {
      const elevGain = event.target.children[3].children[1].value;
      if (
        !this._validInput(distance, duration, elevGain) ||
        !this._allPositive(distance, duration)
      )
        // Check if data is valid
        return alert("Inputs have to be positive numbers!");
      workout.elevGain = elevGain;
      workout.speed = distance / (duration / 60);
    }
    workout.distance = distance;
    workout.duration = duration;
    console.log(workout);
    this._setLocalStorage();
    location.reload();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkoutList(workout) {
    let html = `<li class="workout workout-${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout_title">${workout.description}</h2>
    <button type="button" class="workout_closeBtn">&times;</button>
    <form class="workout_form">
    <div class="workout_details">
      <label class="workout_icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</label>
      <input value="${
        workout.distance
      }" class="workout_input workout_input-distance" type="text" />
      <span class="workout_unit">km</span>
    </div>
    <div class="workout_details">
      <label class="workout_icon">⏱</label>
      <input value="${
        workout.duration
      }" class="workout_input workout_input-duration" type="text" />
      <span class="workout_unit">min</span>
    </div>`;
    if (workout.type === "running") {
      html += `<div class="workout_details">
      <span class="workout_icon">⚡️</span>
      <span class="workout_value">${workout.pace.toFixed(1)}</span>
      <span class="workout_unit">min/km</span>
    </div>
    <div class="workout_details">
      <label class="workout_icon">🦶🏼</label>
      <input value="${
        workout.cadence
      }" class="workout_input workout_input-cadence" type="text" />
      <span class="workout_unit">spm</span>
    </div>
    <button type="submit" class="form_btn"></button>
    </form>
  </li>`;
    }
    if (workout.type === "cycling") {
      html += `
      <div class="workout_details">
        <span class="workout_icon">⚡️</span>
        <span class="workout_value">${workout.speed.toFixed(1)}</span>
        <span class="workout_unit">km/h</span>
      </div>
      <div class="workout_details">
        <span class="workout_icon">⛰</span>
        <input value="${
          workout.elevGain
        }" class="workout_input workout_input-elevGain" type="text"/>
        <span class="workout_unit">m</span>
      </div>
      <button type="submit" class="form_btn"></button>
      </form>
    </li>`;
    }
    containerWorkouts.insertAdjacentHTML("afterbegin", html);
  }
  _hideForm() {
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevGain.value =
      "";
  }
  _findWorkout(event) {
    const workoutEl = event.target.closest(".workout");
    if (!workoutEl) return;
    const index = this.#workouts.findIndex(
      (workout) => workout.id === workoutEl.dataset.id
    );
    return index;
  }
  _workoutClicked(event) {
    // findWorkout
    let index = this._findWorkout(event);
    if (index === undefined) return;
    const found = this.#workouts[index];
    // const found = this.#workouts.find(
    //   (workout) => workout.id === workoutEl.dataset.id
    // );
    // moveToPopup
    this.#map.setView(found.coords, this.#mapZoom);
    // closeWorkout
    if (event.target.classList.contains("workout_closeBtn")) {
      this.#workouts.splice(index, 1);
      this._setLocalStorage();
      location.reload();
    }
  }
  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach((workout) => this._renderWorkoutList(workout));
  }
  _showSortOptions() {
    containerSortOptions.classList.toggle("hidden");
  }
  _sortWorkout(option) {
    let tmpWorkouts;
    containerSortOptions.classList.add("hidden");
    containerWorkouts.innerHTML = "";
    this.#sortOption = option;
    if (this.#sortOption === 0) {
      tmpWorkouts = this.#workouts;
    }
    if (this.#sortOption === 1) {
      tmpWorkouts = this.#workouts
        .slice()
        .sort((recent, old) => old.id - recent.id);
    }

    tmpWorkouts.forEach((workout) => this._renderWorkoutList(workout));
  }
  _overview() {
    // if there are no workouts return
    if (this.#workouts.length === 0) return;

    // find lowest and highest lat and long to make map bounds that fit all markers
    const latitudes = this.#workouts.map((w) => {
      return w.coords[0];
    });
    const longitudes = this.#workouts.map((w) => {
      return w.coords[1];
    });
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLong = Math.min(...longitudes);
    const maxLong = Math.max(...longitudes);
    // fit bounds with coordinates
    this.#map.fitBounds(
      [
        [maxLat, minLong],
        [minLat, maxLong],
      ],
      { padding: [70, 70] }
    );
  }
  _toggleConfirmationMsg() {
    confirmationMsg.classList.toggle("hidden");
  }
  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
  _deleteAll() {
    confirmationMsg.classList.toggle("hidden");
    this.reset();
  }
  _toggleSideBar() {
    sidebarContent.classList.toggle("hidden");
    btnToggleSideBar.textContent = sidebarContent.classList.contains("hidden")
      ? "≡"
      : "×";
  }
}
const app = new App();
//@43.7690267,-79.3785276,15z

},{}]},["1vSbZ","3GZMZ"], "3GZMZ", "parcelRequiredaff")

//# sourceMappingURL=index.355c732e.js.map
