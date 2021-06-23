import Vuex from 'vuex';
import axios$1 from 'axios';
import 'uuid';

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
//
var script$1 = {
  name: "AppLayout",
  props: ["loading"]
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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
  }, [_vm.loading ? _c('div', {
    staticClass: "loading-container"
  }, [_c('svg', {
    staticStyle: {
      "height": "64px",
      "width": "64px"
    },
    attrs: {
      "version": "1",
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "682.667",
      "height": "682.667",
      "viewBox": "0 0 512.000000 512.000000"
    }
  }, [_c('path', {
    staticStyle: {
      "fill": "#191919"
    },
    attrs: {
      "d": "M106.3 164.8l.3 89.7 2.6 10.6c3.3 13.5 9.5 29.8 15.2 40.2 17.1 31.5 45.8 57.5 78.5 71.2 8.6 3.6 21.6 7.8 28.5 9l3.6.7V277h-65v-2.3c0-1.2.6-4.5 1.4-7.2 3.9-14.8 13.9-25.6 28-30.5 4.9-1.7 8.4-2 20.9-2h15l-.6-12.5c-2-39.7-17.4-74.3-45.7-102.6-21.9-22-48.3-36.9-76.8-43.3l-6.3-1.4.4 89.6zM395.2 128.6c-21.8 6.4-38.3 14.6-55.4 27.4-18 13.5-33.5 31.7-43.7 51.1-5.2 9.9-11.1 23.9-11.1 26.4 0 1.3 4.1 1.5 28.6 1.5h28.6l-.7 4.7c-2.2 15-12.2 28.3-25.6 34.2-6.1 2.7-15.5 4.1-28.1 4.1H277v158.9l3.3-.6c23.8-4.5 52.5-19.1 73.3-37.2 25.6-22.2 44.6-56.5 50.5-90.9 1.8-10.7 1.9-16.8 1.9-96.8 0-67.7-.3-85.4-1.2-85.3-.7 0-5 1.1-9.6 2.5z"
    }
  })]), _vm._v(" "), _vm._m(0)]) : _vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "spinner",
    attrs: {
      "role": "spinner"
    }
  }, [_c('div', {
    staticClass: "spinner-icon"
  })]);
}];
/* style */

const __vue_inject_styles__$1 = function (inject) {
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


const __vue_scope_id__$1 = "data-v-63280e30";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
var script = {
  methods: {
    emitBeforeRouteLeave(to, from, next) {
      this.$refs["pageInstance"].$options.beforeRouteLeave(to, from, next, this.$refs["pageInstance"]);
    },

    emitbeforeRouteEnter(to, from) {
      return this.resolveComponent(this.component).then(value => {
        this.destroyPage();
        let page = value.default;

        let next = () => {
          this.loadPage(page);
        };

        if (page.beforeRouteEnter) {
          this.componentInstance.beforeRouteEnter(to, from, next);
        } else {
          next();
        }
      });
    },

    destroyPage() {
      if (this.$refs["pageInstance"]) {
        this.$refs["pageInstance"].$destroy();
      }
    },

    loadPage(page) {
      this.componentInstance = page;

      if (this.componentInstance.layout != null) {
        this.layout = this.componentInstance.layout;
      }

      if (this.componentInstance.props) {
        this.propsToBind = {};

        if (Array.isArray(this.componentInstance.props)) {
          this.componentInstance.props.forEach(item => {
            this.propsToBind[item] = this.data[item];
          });
        } else {
          Object.keys(this.componentInstance.props).forEach(item => {
            this.propsToBind[item] = this.data[item];
          });
        }
      }

      this.$forceUpdate();
      this.ready = true;
    }

  },

  data() {
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

  created() {
    axios.post("/ternobo-wire/get-data/" + this.dataToken).then(response => {
      let data = response.data;
      this.data = data.data;
      this.component = data.component;
      this.$store.commit("updateShared", data.shared);
      this.loading = false;
      this.$store.dispatch("loadUser");
      this.$store.commit("setupApp", {
        data: this.data,
        component: this.component,
        app: this
      });
    }).catch(() => {
      window.location.reload();
    });
  },

  props: ["dataToken", "resolveComponent"]
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/**
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

  render(h, node) {
    let props = node.props,
        data = node.data,
        children = node.children;
    let requestData = props.data ? props.data : {};

    const visit = event => {
      event.preventDefault();
      node.parent.$store.state.ternoboWireApp.visit(props.href, requestData, props.method);
    };

    return h(props.as, { ...data,
      attrs: { ...data.attrs,
        href: props.href
      },
      on: { ...(data.on || {}),
        click: visit
      }
    }, children);
  }

};

var router = {
  beforeRouteEnter(to, from, next, vm = {}) {
    next();
  },

  beforeRouteLeave(to, from, next) {
    next();
  }

};

var plugin = {
  install(Vue) {
    Vue.use(Vuex);
    Vue.mixin(router);
    Vue.component("wire-link", WireLink);
    Vue.directive("t-infinite-scroll", {
      bind(el, binding, vnode) {
        el.addEventListener("scroll", e => {
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            binding.value();
          }
        });
      }

    });
  }

};

function fireNavigate(location) {
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
  const onSharedDataLoad = new CustomEvent('ternobo:sharedataloaded', {
    detail: {
      user: response.data.user
    }
  });
  window.document.dispatchEvent(onSharedDataLoad);
}

function fireUserloaded(user) {
  const onUserLoad = new CustomEvent('ternobo:userloaded', {
    detail: {
      user: user
    }
  });
  window.document.dispatchEvent(onUserLoad);
}

function store (options = {
  state: {},
  actions: {},
  mutations: {}
}) {
  let storeOptions = { ...options,
    state: { ...options.state,
      user: {},
      ternoboWireApp: null,
      shared: {}
    },
    actions: { ...options.actions,

      loadUser(context) {
        axios$1.post("/ternobo-wire/get-user").then(response => {
          context.commit("setUser", response.data.user);
          fireUserloaded(response.data.user);
        });
      },

      loadShared(context) {
        axios$1.post("/ternobo-wire/get-shared").then(response => {
          context.commit("updateShared", response.data.shared);
          fireSharedataLoaded(response.data.shared);
        });
      }

    },
    mutations: { ...options.mutations,

      setUser(state, payload) {
        state.user = payload;
      },

      setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.component, payload.data);
      },

      updateShared(state, payload) {
        state.shared = payload;
      }

    }
  };
  return new Vuex.Store(storeOptions);
}

/**
 * TernoboWire Base Class
 */

class TernoboWire {
  /**
   * 
   * @param {Vue} vm Current Vue Instance
   * @returns { TernoboWire }
   */
  static getInstance(vm) {
    return vm.$store.state.ternoboWireApp;
  }
  /**
   * setup TernoboWire Application. Automatic Setup on WireApp.vue
   * @param {Vue} application - TernoboWire Application root
   * @param {object} data - Initial Data.
   */


  constructor(application, component, data) {
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

  handlePopstate() {
    window.addEventListener('popstate', event => {
      let state = event.state;
      setTimeout(() => {
        if (state.visitId == "wire") {
          window.scrollTo(0, 0);
          this.loadComponent(window.location.pathname, event.target.location.pathname, state.data.component, state.data.data);
        }
      }, 0);
    });
  }

  handleInitialPageVisit() {
    if (this.isBackForwardVisit()) {
      this.handleBackForwardVisit(this.page);
    } else {
      this.loadComponent(null, window.location.pathname, this.page.component, this.page.data);
    }
  }

  isBackForwardVisit() {
    return window.history.state && window.performance && window.performance.getEntriesByType('navigation').length > 0 && window.performance.getEntriesByType('navigation')[0].type === 'back_forward';
  }

  handleBackForwardVisit(page) {
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


  getData(location, navigateLoading = true, pushState = false, data = {}, type = 'get') {
    return new Promise((resolve, reject) => {
      if (navigateLoading) {
        fireNavigate(location);
      }

      axios$1({
        method: type,
        data: data,
        url: location,
        headers: {
          "X-TernoboWire": true,
          Accept: 'text/html, application/xhtml+xml',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(response => {
        resolve(response.data.data);

        if (response.headers['x-ternobowire']) {
          if (pushState) {
            this.pushState(location, response.data);
          }

          if (navigateLoading) {
            firePageLoad(location);
          }
        }
      }).catch(err => {
        if (!TernoboWire.production) {
          console.log(err);
        }

        reject(err);
      }).then(() => {
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


  reload(options = {}) {
    let location = window.location.href;
    fireNavigate(location);
    axios$1({
      method: "GET",
      data: {
        options: options
      },
      url: location,
      headers: {
        "X-ReloadData": true,
        "X-TernoboWire": true
      }
    }).then(response => {
      if (response.headers['x-ternobowire']) {
        this.app.$store.commit("updateShared", response.data.shared);
        this.loadComponent(window.location.pathname, window.location.pathname, response.data.component, response.data.data);
        firePageLoad(location);
      } else {
        window.location.reload();
      }
    }).catch(err => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    }).then(() => {
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


  visit(location, data = {}, type = 'get', pushState = true) {
    this.app.emitBeforeRouteLeave(window.location.pathname, location, () => {
      if (!testSameOrigin(location)) {
        window.open(location);
      }

      fireNavigate(location);
      axios$1({
        method: type,
        data: data,
        url: location,
        headers: {
          "X-TernoboWire": true,
          Accept: 'text/html, application/xhtml+xml',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }).then(response => {
        if (response.headers['x-ternobowire']) {
          this.app.$store.commit("updateShared", response.data.shared);
          this.loadComponent(window.location.pathname, location, response.data.component, response.data.data);

          if (pushState) {
            this.pushState(location, response.data);
          }

          firePageLoad(location);
        } else {
          window.location = location;
        }
      }).catch(err => {
        if (!TernoboWire.production) {
          console.log(err);
        }
      }).then(() => {
        fireNavigationFinish(location);
      });
    });
  }

  pushState(url, data) {
    window.scrollTo(0, 0);
    this.page = data;
    window.history.pushState(this.createVisitId(data), "", url);
  }

  replaceState(url, data) {
    this.page = data;
    window.history.replaceState(data, "", url);
  }

  loadComponent(from, to, component, data) {
    this.app.component = component;
    this.app.data = data;
    return this.app.emitbeforeRouteEnter(to, from);
  }

  createVisitId(data) {
    this.visitId = {
      data: data,
      visitId: "wire"
    };
    return this.visitId;
  }

}

export default __vue_component__;
export { TernoboWire, plugin, store };
