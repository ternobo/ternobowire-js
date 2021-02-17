'use strict';Object.defineProperty(exports,'__esModule',{value:true});var Vuex=require('vuex');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vuex__default=/*#__PURE__*/_interopDefaultLegacy(Vuex);function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}/**
 * Ternobo WireLink Component
 */
var WireLink = {
  name: "WireLink",
  functional: true,
  props: {
    href: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'get'
    },
    replace: {
      type: Boolean,
      default: false
    },
    preserveScroll: {
      type: Boolean,
      default: false
    },
    as: {
      type: String,
      default: "a"
    }
  },
  render: function render(h, node) {
    var props = node.props,
        data = node.data,
        children = node.children;

    var visit = function visit(event) {
      event.preventDefault();
      node.parent.$store.state.ternoboWireApp.visit(props.href, {
        method: props.method
      });
    };

    return h(props.as, _objectSpread2(_objectSpread2({}, data), {}, {
      attrs: _objectSpread2(_objectSpread2({}, data.attrs), {}, {
        href: props.href
      }),
      on: _objectSpread2(_objectSpread2({}, data.on || {}), {}, {
        click: visit
      })
    }), children);
  }
};//
//
//
//
//
//
var script = {
  name: "AppLayout"
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-71a803c7";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
var script$1 = {
  methods: {
    updateComponent: function updateComponent() {
      var _this = this;

      this.resolveComponent(this.component).then(function (value) {
        _this.componentInstance = value.default;

        if (_this.componentInstance.layout != null) {
          _this.layout = _this.componentInstance.layout;
        }

        if (_this.componentInstance.props) {
          _this.propsToBind = {};

          if (Array.isArray(_this.componentInstance.props)) {
            _this.componentInstance.props.forEach(function (item) {
              _this.propsToBind[item] = _this.data[item];
            });
          } else {
            Object.keys(_this.componentInstance.props).forEach(function (item) {
              _this.propsToBind[item] = _this.data[item];
            });
          }
        }

        _this.$forceUpdate();

        _this.ready = true;
      });
    }
  },
  data: function data() {
    return {
      propsToBind: {},
      component: null,
      componentInstance: null,
      layout: __vue_component__,
      ready: false,
      data: {}
    };
  },
  created: function created() {
    var _this2 = this;

    this.data = this.initialData.data;
    this.component = this.initialComponent;
    this.$store.commit("userUpdate");
    this.$store.commit("setupApp", {
      data: this.data,
      app: this
    });
    this.$store.commit("updatedShared", this.initialData.shared);
    this.$nextTick(function () {
      _this2.updateComponent();
    });
  },
  props: ["initialData", "resolveComponent", "initialComponent"]
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.ready ? _c(_vm.layout, {
    tag: "component"
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c(_vm.componentInstance, _vm._b({
    tag: "component"
  }, 'component', _vm.propsToBind, false))], 1)], 1) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-c31acb3c";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);/**
 * Check if URL is from Same Origin.
 * @param {string} url 
 */

function testSameOrigin(url) {
  var loc = window.location,
      a = document.createElement('a');
  a.href = url;
  return a.hostname == loc.hostname && a.port == loc.port && a.protocol == loc.protocol;
}
/**
 * TernoboWire Base Class
 */


var TernoboWire = /*#__PURE__*/function () {
  _createClass(TernoboWire, null, [{
    key: "getInstance",

    /**
     * 
     * @param {Vue} vm Current Vue Instance
     * @returns { TernoboWire }
     */
    value: function getInstance(vm) {
      return vm.$store.state.ternoboWireApp;
    }
    /**
     * setup TernoboWire Application. Automatic Setup on WireApp.vue
     * @param {Vue} application - TernoboWire Application root
     * @param {object} data - Initial Data.
     */

  }]);

  function TernoboWire(application, data) {
    var _this = this;

    _classCallCheck(this, TernoboWire);

    this.app = application;
    this.data = data;
    window.history.replaceState({
      visitId: "wire"
    }, "", window.location.href);
    window.addEventListener('popstate', function (event) {
      if (JSON.stringify(window.history.state) == JSON.stringify(_this.createVisitId())) {
        _this.visit(window.location.href, {}, 'get', false);
      }
    });
  }
  /**
   * Get page data without reredndering Page component 
   * @param {string} location - request url
   * @param {boolean} navigateLoading - if true, dispatch navigation event to window.document
   * @param {object} data - request body (object)
   * @param {string} type - request method (POST,GET,PUT,DELETE,PATCH)
   * @param {boolean} pushState - if true, push history state
   */


  _createClass(TernoboWire, [{
    key: "getData",
    value: function getData(location) {
      var _this2 = this;

      var navigateLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var pushState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'get';
      return new Promise(function (resolve, reject) {
        var onStart = new CustomEvent('ternobo:navigate', {
          detail: {
            location: location
          }
        });

        if (navigateLoading) {
          window.document.dispatchEvent(onStart);
        }

        axios({
          method: type,
          data: data,
          url: location,
          headers: {
            "X-TernoboWire": true
          }
        }).then(function (response) {
          resolve(response.data.data);

          if (response.headers['x-ternobowire']) {
            if (pushState) {
              window.history.pushState(_this2.createVisitId(), "", location);
            }

            var onLoaded = new CustomEvent('ternobo:loaded', {
              detail: {
                location: location
              }
            });

            if (navigateLoading) {
              window.document.dispatchEvent(onLoaded);
            }
          }
        }).catch(function (err) {
          if (!TernoboWire.production) {
            console.log(err);
          }

          reject(err);
        }).then(function () {
          if (navigateLoading) {
            var onFinish = new CustomEvent('ternobo:finish', {
              detail: {
                location: location
              }
            });
            window.document.dispatchEvent(onFinish);
          }

          resolve();
        });
      });
    }
    /**
     * Reload current page
     * @param {object} options - reload options (Documented on TernoboWire-Laravel)
     */

  }, {
    key: "reload",
    value: function reload() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var location = window.location.href;
      var onStart = new CustomEvent('ternobo:navigate', {
        detail: {
          location: location
        }
      });
      window.document.dispatchEvent(onStart);
      axios({
        method: "GET",
        data: {
          options: options
        },
        url: location,
        headers: {
          "X-ReloadData": true,
          "X-TernoboWire": true
        }
      }).then(function (response) {
        if (response.headers['x-ternobowire']) {
          _this3.app.$store.commit("updatedShared", response.data.shared);

          _this3.loadComponent(response.data.component, response.data.data);

          var onLoaded = new CustomEvent('ternobo:loaded', {
            detail: {
              location: location
            }
          });
          window.document.dispatchEvent(onLoaded);
        } else {
          window.location.reload();
        }
      }).catch(function (err) {
        if (!TernoboWire.production) {
          console.log(err);
        }
      }).then(function () {
        var onFinish = new CustomEvent('ternobo:finish', {
          detail: {
            location: location
          }
        });
        window.document.dispatchEvent(onFinish);
      });
    }
    /**
     * Visit URL 
     * @param {string} location - request url
     * @param {boolean} navigateLoading - if true, dispatch navigation event to window.document
     * @param {object} data - request body (object)
     * @param {string} type - request method (POST,GET,PUT,DELETE,PATCH)
     * @param {boolean} pushState - if true, push history state
     */

  }, {
    key: "visit",
    value: function visit(location) {
      var _this4 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
      var pushState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (!testSameOrigin(location)) {
        window.open(location);
      }

      var onStart = new CustomEvent('ternobo:navigate', {
        detail: {
          location: location
        }
      });
      window.document.dispatchEvent(onStart);
      axios({
        method: type,
        data: data,
        url: location,
        headers: {
          "X-TernoboWire": true
        }
      }).then(function (response) {
        if (response.headers['x-ternobowire']) {
          _this4.app.$store.commit("updatedShared", response.data.shared);

          _this4.loadComponent(response.data.component, response.data.data);

          if (pushState) {
            window.history.pushState(_this4.createVisitId(), "", location);
          }

          var onLoaded = new CustomEvent('ternobo:loaded', {
            detail: {
              location: location
            }
          });
          window.document.dispatchEvent(onLoaded);
        } else {
          window.location = location;
        }
      }).catch(function (err) {
        if (!TernoboWire.production) {
          console.log(err);
        }
      }).then(function () {
        var onFinish = new CustomEvent('ternobo:finish', {
          detail: {
            location: location
          }
        });
        window.document.dispatchEvent(onFinish);
      });
    }
  }, {
    key: "loadComponent",
    value: function loadComponent(component, data) {
      this.app.component = component;
      this.app.data = data;
      this.app.updateComponent();
    }
  }, {
    key: "createVisitId",
    value: function createVisitId() {
      this.visitId = {
        visitId: "wire"
      };
      return this.visitId;
    }
  }]);

  return TernoboWire;
}();
var plugin = {
  install: function install(Vue) {
    Vue.use(Vuex__default['default']);
    Vue.component("wire-link", WireLink);
    Vue.directive("t-infinite-scroll", {
      bind: function bind(el, binding, vnode) {
        el.addEventListener("scroll", function (e) {
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            binding.value();
          }
        });
      }
    });
    Vue.directive('click-outside', {
      bind: function bind(el, binding, vnode) {
        var event = function event(_event) {
          return vnode.context.$emit(binding.expression, _event);
        };

        document.body.addEventListener('click', event);
      }
    });
  }
};
function store() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    state: null,
    getters: {},
    mutations: null
  };

  if (options.state != null && _typeof(options.state) == "object") {
    options.state.user = null;
    options.state.ternoboWireApp = null;
    options.state.shared = {};
  } else {
    options.state = {
      user: {},
      ternoboWireApp: null,
      shared: {}
    };
  }

  if (options.mutations != null && _typeof(options.mutations) == "object") {
    options.mutations.setupApp = function (state, payload) {
      state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
    };

    options.mutations.updatedShared = function (state, payload) {
      state.shared = payload;
    };

    options.mutations.userUpdate = function (state) {
      axios.post("/ternobo-wire/get-user").then(function (response) {
        state.user = response.data.user;
      });
    };
  } else {
    options.mutations = {
      updatedShared: function updatedShared(state, payload) {
        state.shared = payload;
      },
      userUpdate: function userUpdate(state) {
        axios.post("/ternobo-wire/get-user").then(function (response) {
          state.user = response.data.user;
        });
      },
      setupApp: function setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
      }
    };
  }

  return new Vuex__default['default'].Store(options);
}exports.TernoboWire=TernoboWire;exports.default=__vue_component__$1;exports.plugin=plugin;exports.store=store;