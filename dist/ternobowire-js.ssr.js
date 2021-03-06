'use strict';Object.defineProperty(exports,'__esModule',{value:true});var Vuex=require('vuex'),axios$1=require('axios');require('uuid');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vuex__default=/*#__PURE__*/_interopDefaultLegacy(Vuex);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios$1);function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

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
}//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: "AppLayout",
  props: ["loading"]
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      'ternobo-loading': _vm.loading
    },
    attrs: {
      "id": "app"
    }
  }, [_vm.loading ? _vm._ssrNode("<div class=\"loading-container\" data-v-63280e30>", "</div>", [_vm._ssrNode("<svg version=\"1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"682.667\" height=\"682.667\" viewBox=\"0 0 512.000000 512.000000\" style=\"height: 64px; width: 64px\" data-v-63280e30><path d=\"M106.3 164.8l.3 89.7 2.6 10.6c3.3 13.5 9.5 29.8 15.2 40.2 17.1 31.5 45.8 57.5 78.5 71.2 8.6 3.6 21.6 7.8 28.5 9l3.6.7V277h-65v-2.3c0-1.2.6-4.5 1.4-7.2 3.9-14.8 13.9-25.6 28-30.5 4.9-1.7 8.4-2 20.9-2h15l-.6-12.5c-2-39.7-17.4-74.3-45.7-102.6-21.9-22-48.3-36.9-76.8-43.3l-6.3-1.4.4 89.6zM395.2 128.6c-21.8 6.4-38.3 14.6-55.4 27.4-18 13.5-33.5 31.7-43.7 51.1-5.2 9.9-11.1 23.9-11.1 26.4 0 1.3 4.1 1.5 28.6 1.5h28.6l-.7 4.7c-2.2 15-12.2 28.3-25.6 34.2-6.1 2.7-15.5 4.1-28.1 4.1H277v158.9l3.3-.6c23.8-4.5 52.5-19.1 73.3-37.2 25.6-22.2 44.6-56.5 50.5-90.9 1.8-10.7 1.9-16.8 1.9-96.8 0-67.7-.3-85.4-1.2-85.3-.7 0-5 1.1-9.6 2.5z\" style=\"fill: #191919\" data-v-63280e30></path></svg> <div role=\"spinner\" class=\"spinner\" data-v-63280e30><div class=\"spinner-icon\" data-v-63280e30></div></div>")], 2) : _vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-63280e30_0", {
    source: "@-webkit-keyframes spinner-indicating{0%{transform:translateX(0);width:80px}50%{transform:translateX(190px);width:0}to{transform:translateX(0)}}@keyframes spinner-indicating{0%{transform:translateX(0);width:80px}50%{transform:translateX(190px)}100%{transform:translateX(-40px)}}",
    map: undefined,
    media: undefined
  }), inject("data-v-63280e30_1", {
    source: ".ternobo-loading[data-v-63280e30]{display:flex;height:100vh;width:100vw;justify-content:center;align-items:center}.loading-container[data-v-63280e30]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:120px}.spinner[data-v-63280e30]{width:212px;height:5px;direction:ltr;background:#fff;margin-top:40px;box-shadow:0 6px 20px rgba(0,0,0,.1);overflow:hidden;border-radius:2px}.spinner .spinner-icon[data-v-63280e30]{background:#191919;height:100%;border-radius:2px;transition:.7s all;width:80px;animation-name:spinner-indicating;animation-duration:2s;animation-timing-function:cubic-bezier(0,0,.2,1);animation-iteration-count:infinite}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-63280e30";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-63280e30";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
var script = {
  methods: {
    emitBeforeRouteLeave: function emitBeforeRouteLeave(to, from, next) {
      this.$refs["pageInstance"].$options.beforeRouteLeave(to, from, next, this.$refs["pageInstance"]);
    },
    emitbeforeRouteEnter: function emitbeforeRouteEnter(to, from) {
      var _this = this;

      return this.resolveComponent(this.component).then(function (value) {
        _this.destroyPage();

        var page = value.default;

        var next = function next() {
          _this.loadPage(page);
        };

        if (page.beforeRouteEnter) {
          _this.componentInstance.beforeRouteEnter(to, from, next);
        } else {
          next();
        }
      });
    },
    destroyPage: function destroyPage() {
      if (this.$refs["pageInstance"]) {
        this.$refs["pageInstance"].$destroy();
      }
    },
    loadPage: function loadPage(page) {
      var _this2 = this;

      this.componentInstance = page;

      if (this.componentInstance.layout != null) {
        this.layout = this.componentInstance.layout;
      }

      if (this.componentInstance.props) {
        this.propsToBind = {};

        if (Array.isArray(this.componentInstance.props)) {
          this.componentInstance.props.forEach(function (item) {
            _this2.propsToBind[item] = _this2.data[item];
          });
        } else {
          Object.keys(this.componentInstance.props).forEach(function (item) {
            _this2.propsToBind[item] = _this2.data[item];
          });
        }
      }

      this.$forceUpdate();
      this.ready = true;
    }
  },
  data: function data() {
    return {
      loading: true,
      propsToBind: {},
      component: null,
      componentInstance: null,
      layout: __vue_component__$1,
      ready: false,
      data: {}
    };
  },
  created: function created() {
    var _this3 = this;

    axios.post("/ternobo-wire/get-data/" + this.dataToken).then(function (response) {
      var data = response.data;
      _this3.data = data.data;
      _this3.component = data.component;

      _this3.$store.commit("updateShared", data.shared);

      _this3.loading = false;

      _this3.$store.dispatch("loadUser");

      _this3.$store.commit("setupApp", {
        data: _this3.data,
        component: _this3.component,
        app: _this3
      });
    }).catch(function () {
      window.location.reload();
    });
  },
  props: ["dataToken", "resolveComponent"]
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.layout, {
    tag: "component",
    attrs: {
      "loading": _vm.loading
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_vm.ready ? _c(_vm.componentInstance, _vm._b({
    ref: "pageInstance",
    tag: "component"
  }, 'component', _vm.propsToBind, false)) : _vm._e()], 1)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-51f30dd6";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/**
 * Check if URL is from Same Origin.
 * @param {string} url 
 */
function testSameOrigin(url) {
  var loc = window.location,
      a = document.createElement('a');
  a.href = url;
  return a.hostname == loc.hostname && a.port == loc.port && a.protocol == loc.protocol;
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
    linkDisabled: {
      type: Boolean,
      default: false
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
    var requestData = props.data ? props.data : {};

    var visit = function visit(event) {
      event.preventDefault();

      if (!node.props.linkDisabled) {
        node.parent.$store.state.ternoboWireApp.visit(props.href, requestData, props.method);
      }
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
};var router = {
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    next();
  }
};var plugin = {
  install: function install(Vue) {
    Vue.use(Vuex__default['default']);
    Vue.mixin(router);
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
  }
};function fireNavigate(location) {
  window.document.dispatchEvent(new CustomEvent('ternobo:navigate', {
    detail: {
      location: location
    }
  }));
}

function firePageLoad(location) {
  window.document.dispatchEvent(new CustomEvent('ternobo:loaded', {
    detail: {
      location: location
    }
  }));
}

function fireNavigationFinish(location) {
  window.document.dispatchEvent(new CustomEvent('ternobo:finish', {
    detail: {
      location: location
    }
  }));
}

function fireSharedataLoaded() {
  var onSharedDataLoad = new CustomEvent('ternobo:sharedataloaded', {
    detail: {
      user: response.data.user
    }
  });
  window.document.dispatchEvent(onSharedDataLoad);
}

function fireUserloaded(user) {
  var onUserLoad = new CustomEvent('ternobo:userloaded', {
    detail: {
      user: user
    }
  });
  window.document.dispatchEvent(onUserLoad);
}function store () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    state: {},
    actions: {},
    mutations: {}
  };

  var storeOptions = _objectSpread2(_objectSpread2({}, options), {}, {
    state: _objectSpread2(_objectSpread2({}, options.state), {}, {
      user: {},
      ternoboWireApp: null,
      shared: {}
    }),
    actions: _objectSpread2(_objectSpread2({}, options.actions), {}, {
      loadUser: function loadUser(context) {
        axios__default['default'].post("/ternobo-wire/get-user").then(function (response) {
          context.commit("setUser", response.data.user);
          fireUserloaded(response.data.user);
        });
      },
      loadShared: function loadShared(context) {
        axios__default['default'].post("/ternobo-wire/get-shared").then(function (response) {
          context.commit("updateShared", response.data.shared);
          fireSharedataLoaded(response.data.shared);
        });
      }
    }),
    mutations: _objectSpread2(_objectSpread2({}, options.mutations), {}, {
      setUser: function setUser(state, payload) {
        state.user = payload;
      },
      setupApp: function setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.component, payload.data);
      },
      updateShared: function updateShared(state, payload) {
        state.shared = payload;
      }
    })
  });

  return new Vuex__default['default'].Store(storeOptions);
}/**
 * TernoboWire Base Class
 */

var TernoboWire = /*#__PURE__*/function () {
  /**
   * setup TernoboWire Application. Automatic Setup on WireApp.vue
   * @param {Vue} application - TernoboWire Application root
   * @param {object} data - Initial Data.
   */
  function TernoboWire(application, component, data) {
    _classCallCheck(this, TernoboWire);

    this.app = application;
    this.data = data;
    this.page = {
      component: component,
      data: data
    };
    window.history.replaceState(this.createVisitId(this.page), "", window.location.href);
    this.handleInitialPageVisit();
    this.handlePopstate();
  }

  _createClass(TernoboWire, [{
    key: "handlePopstate",
    value: function handlePopstate() {
      var _this = this;

      window.addEventListener('popstate', function (event) {
        var state = event.state;
        setTimeout(function () {
          if (state.visitId == "wire") {
            window.scrollTo(0, 0);

            _this.loadComponent(window.location.pathname, event.target.location.pathname, state.data.component, state.data.data);
          }
        }, 0);
      });
    }
  }, {
    key: "handleInitialPageVisit",
    value: function handleInitialPageVisit() {
      if (this.isBackForwardVisit()) {
        this.handleBackForwardVisit(this.page);
      } else {
        this.loadComponent(null, window.location.pathname, this.page.component, this.page.data);
      }
    }
  }, {
    key: "isBackForwardVisit",
    value: function isBackForwardVisit() {
      return window.history.state && window.performance && window.performance.getEntriesByType('navigation').length > 0 && window.performance.getEntriesByType('navigation')[0].type === 'back_forward';
    }
  }, {
    key: "handleBackForwardVisit",
    value: function handleBackForwardVisit(page) {
      this.loadComponent(null, window.location.pathname, page.component, page.data);
    }
    /**
     * Get page data without reredndering Page component 
     * @param {string} location - request url
     * @param {boolean} navigateLoading - if true, dispatch navigation event to window.document
     * @param {object} data - request body (object)
     * @param {string} type - request method (POST,GET,PUT,DELETE,PATCH)
     * @param {boolean} pushState - if true, push history state
     */

  }, {
    key: "getData",
    value: function getData(location) {
      var _this2 = this;

      var navigateLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var pushState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'get';
      return new Promise(function (resolve, reject) {
        if (navigateLoading) {
          fireNavigate(location);
        }

        axios__default['default']({
          method: type,
          data: data,
          url: location,
          headers: {
            "X-TernoboWire": true,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then(function (response) {
          resolve(response.data.data);

          if (response.headers['x-ternobowire']) {
            if (pushState) {
              _this2.pushState(location, response.data);
            }

            if (navigateLoading) {
              firePageLoad(location);
            }
          }
        }).catch(function (err) {
          if (!TernoboWire.production) {
            console.log(err);
          }

          reject(err);
        }).then(function () {
          if (navigateLoading) {
            fireNavigationFinish(location);
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
      fireNavigate(location);
      axios__default['default']({
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
          _this3.app.$store.commit("updateShared", response.data.shared);

          _this3.loadComponent(window.location.pathname, window.location.pathname, response.data.component, response.data.data);

          firePageLoad(location);
        } else {
          window.location.reload();
        }
      }).catch(function (err) {
        if (!TernoboWire.production) {
          console.log(err);
        }
      }).then(function () {
        fireNavigationFinish(location);
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
      this.app.emitBeforeRouteLeave(window.location.pathname, location, function () {
        if (!testSameOrigin(location)) {
          window.open(location);
        }

        fireNavigate(location);
        axios__default['default']({
          method: type,
          data: data,
          url: location,
          headers: {
            "X-TernoboWire": true,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }).then(function (response) {
          if (response.headers['x-ternobowire']) {
            _this4.app.$store.commit("updateShared", response.data.shared);

            _this4.loadComponent(window.location.pathname, location, response.data.component, response.data.data);

            if (pushState) {
              _this4.pushState(location, response.data);
            }

            firePageLoad(location);
          } else {
            window.location = location;
          }
        }).catch(function (err) {
          if (!TernoboWire.production) {
            console.log(err);
          }
        }).then(function () {
          fireNavigationFinish(location);
        });
      });
    }
  }, {
    key: "pushState",
    value: function pushState(url, data) {
      window.scrollTo(0, 0);
      this.page = data;
      window.history.pushState(this.createVisitId(data), "", url);
    }
  }, {
    key: "replaceState",
    value: function replaceState(url, data) {
      this.page = data;
      window.history.replaceState(data, "", url);
    }
  }, {
    key: "loadComponent",
    value: function loadComponent(from, to, component, data) {
      this.app.component = component;
      this.app.data = data;
      return this.app.emitbeforeRouteEnter(to, from);
    }
  }, {
    key: "createVisitId",
    value: function createVisitId(data) {
      this.visitId = {
        data: data,
        visitId: "wire"
      };
      return this.visitId;
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * 
     * @param {Vue} vm Current Vue Instance
     * @returns { TernoboWire }
     */
    function getInstance(vm) {
      return vm.$store.state.ternoboWireApp;
    }
  }]);

  return TernoboWire;
}();exports.TernoboWire=TernoboWire;exports.default=__vue_component__;exports.plugin=plugin;exports.store=store;