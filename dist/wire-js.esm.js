import Vuex from 'vuex';

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

    const visit = event => {
      event.preventDefault();
      node.parent.$store.state.ternoboWireApp.visit(props.href, {
        method: props.method
      });
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

//
//
//
//
//
//
var script = {
  name: "AppLayout"
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

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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

//
var script$1 = {
  methods: {
    updateComponent() {
      this.resolveComponent(this.component).then(value => {
        this.componentInstance = value.default;

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
      });
    }

  },

  data() {
    return {
      propsToBind: {},
      component: null,
      componentInstance: null,
      layout: __vue_component__,
      ready: false,
      data: {}
    };
  },

  created() {
    this.data = this.initialData.data;
    this.component = this.initialComponent;
    this.$store.commit("userUpdate");
    this.$store.commit("setupApp", {
      data: this.data,
      app: this
    });
    this.$store.commit("updatedShared", this.initialData.shared);
    this.$nextTick(() => {
      this.updateComponent();
    });
  },

  props: ["initialData", "resolveComponent", "initialComponent"]
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

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


  constructor(application, data) {
    this.app = application;
    this.data = data;
    window.history.replaceState({
      visitId: "wire"
    }, "", window.location.href);
    window.addEventListener('popstate', event => {
      if (JSON.stringify(window.history.state) == JSON.stringify(this.createVisitId())) {
        this.visit(window.location.href, {}, 'get', false);
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


  getData(location, navigateLoading = true, pushState = false, data = {}, type = 'get') {
    return new Promise((resolve, reject) => {
      let onStart = new CustomEvent('ternobo:navigate', {
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
      }).then(response => {
        resolve(response.data.data);

        if (response.headers['x-ternobowire']) {
          if (pushState) {
            window.history.pushState(this.createVisitId(), "", location);
          }

          const onLoaded = new CustomEvent('ternobo:loaded', {
            detail: {
              location: location
            }
          });

          if (navigateLoading) {
            window.document.dispatchEvent(onLoaded);
          }
        }
      }).catch(err => {
        if (!TernoboWire.production) {
          console.log(err);
        }

        reject(err);
      }).then(() => {
        if (navigateLoading) {
          const onFinish = new CustomEvent('ternobo:finish', {
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


  reload(options = {}) {
    let location = window.location.href;
    let onStart = new CustomEvent('ternobo:navigate', {
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
    }).then(response => {
      if (response.headers['x-ternobowire']) {
        this.app.$store.commit("updatedShared", response.data.shared);
        this.loadComponent(response.data.component, response.data.data);
        const onLoaded = new CustomEvent('ternobo:loaded', {
          detail: {
            location: location
          }
        });
        window.document.dispatchEvent(onLoaded);
      } else {
        window.location.reload();
      }
    }).catch(err => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    }).then(() => {
      const onFinish = new CustomEvent('ternobo:finish', {
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


  visit(location, data = {}, type = 'get', pushState = true) {
    if (!testSameOrigin(location)) {
      window.open(location);
    }

    let onStart = new CustomEvent('ternobo:navigate', {
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
    }).then(response => {
      if (response.headers['x-ternobowire']) {
        this.app.$store.commit("updatedShared", response.data.shared);
        this.loadComponent(response.data.component, response.data.data);

        if (pushState) {
          window.history.pushState(this.createVisitId(), "", location);
        }

        const onLoaded = new CustomEvent('ternobo:loaded', {
          detail: {
            location: location
          }
        });
        window.document.dispatchEvent(onLoaded);
      } else {
        window.location = location;
      }
    }).catch(err => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    }).then(() => {
      const onFinish = new CustomEvent('ternobo:finish', {
        detail: {
          location: location
        }
      });
      window.document.dispatchEvent(onFinish);
    });
  }

  loadComponent(component, data) {
    this.app.component = component;
    this.app.data = data;
    this.app.updateComponent();
  }

  createVisitId() {
    this.visitId = {
      visitId: "wire"
    };
    return this.visitId;
  }

}
const plugin = {
  install(Vue) {
    Vue.use(Vuex);
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
    Vue.directive('click-outside', {
      bind(el, binding, vnode) {
        let event = event => vnode.context.$emit(binding.expression, event);

        document.body.addEventListener('click', event);
      }

    });
  }

};
function store(options = {
  state: null,
  getters: {},
  mutations: null
}) {
  if (options.state != null && typeof options.state == "object") {
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

  if (options.mutations != null && typeof options.mutations == "object") {
    options.mutations.setupApp = function (state, payload) {
      state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
    };

    options.mutations.updatedShared = function (state, payload) {
      state.shared = payload;
    };

    options.mutations.userUpdate = function (state) {
      axios.post("/ternobo-wire/get-user").then(response => {
        state.user = response.data.user;
      });
    };
  } else {
    options.mutations = {
      updatedShared(state, payload) {
        state.shared = payload;
      },

      userUpdate(state) {
        axios.post("/ternobo-wire/get-user").then(response => {
          state.user = response.data.user;
        });
      },

      setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
      }

    };
  }

  return new Vuex.Store(options);
}

export default __vue_component__$1;
export { TernoboWire, plugin, store };
