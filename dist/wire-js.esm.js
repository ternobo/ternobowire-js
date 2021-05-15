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

//
//
//
//
//
//
//
//
//
var script = {
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
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
  }, [_vm.loading ? _c('svg', {
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
      "fill": "#757575"
    },
    attrs: {
      "d": "M106.3 164.8l.3 89.7 2.6 10.6c3.3 13.5 9.5 29.8 15.2 40.2 17.1 31.5 45.8 57.5 78.5 71.2 8.6 3.6 21.6 7.8 28.5 9l3.6.7V277h-65v-2.3c0-1.2.6-4.5 1.4-7.2 3.9-14.8 13.9-25.6 28-30.5 4.9-1.7 8.4-2 20.9-2h15l-.6-12.5c-2-39.7-17.4-74.3-45.7-102.6-21.9-22-48.3-36.9-76.8-43.3l-6.3-1.4.4 89.6zM395.2 128.6c-21.8 6.4-38.3 14.6-55.4 27.4-18 13.5-33.5 31.7-43.7 51.1-5.2 9.9-11.1 23.9-11.1 26.4 0 1.3 4.1 1.5 28.6 1.5h28.6l-.7 4.7c-2.2 15-12.2 28.3-25.6 34.2-6.1 2.7-15.5 4.1-28.1 4.1H277v158.9l3.3-.6c23.8-4.5 52.5-19.1 73.3-37.2 25.6-22.2 44.6-56.5 50.5-90.9 1.8-10.7 1.9-16.8 1.9-96.8 0-67.7-.3-85.4-1.2-85.3-.7 0-5 1.1-9.6 2.5z"
    }
  })]) : _vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-37504ae2_0", {
    source: ".ternobo-loading[data-v-37504ae2]{display:flex;height:100vh;width:100vh;justify-content:center;align-items:center}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-37504ae2";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
var script$1 = {
  methods: {
    emitBeforeRouteLeave(to, from, next) {
      this.$refs["pageInstance"].$options.beforeRouteLeave(to, from, next);
    },

    emitbeforeRouteEnter(to, from) {
      let next = () => {
        this.updateComponent();
      };

      this.componentInstance.beforeRouteEnter(to, from, next);
    },

    destroyPage() {
      if (this.componentInstance) {
        this.componentInstance.$destroy();
      }
    },

    updateComponent() {
      this.resolveComponent(this.component).then(value => {
        this.destroyPage();
        let page = value.default;
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
      });
    }

  },

  data() {
    return {
      loading: true,
      propsToBind: {},
      component: null,
      componentInstance: null,
      layout: __vue_component__,
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
      this.$nextTick(() => {
        this.updateComponent();
      });
      this.loading = false;
      this.$store.dispatch("loadUser");
      this.$store.commit("setupApp", {
        data: this.data,
        component: this.component,
        app: this
      });
    });
  },

  props: ["dataToken", "resolveComponent"]
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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

var router = {
  beforeRouteEnter(to, from, next) {
    next();
  },

  beforeRouteLeave(to, from, next) {
    next();
  }

};

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


  constructor(application, component, data) {
    this.app = application;
    this.data = data;
    window.history.replaceState(this.createVisitId({
      component: component,
      data: data
    }), "", window.location.href);
    window.addEventListener('popstate', event => {
      let state = event.state;

      if (state.visitId == "wire") {
        window.scrollTo(0, 0);
        window.history.replaceState(event.state, "", window.location.href);
        this.loadComponent(window.location.pathname, event.target.location.pathname, state.data.component, state.data.data);
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
            window.history.pushState(this.createVisitId(response.data), "", location);
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
        this.app.$store.commit("updateShared", response.data.shared);
        this.loadComponent(window.location.pathname, window.location.pathname, response.data.component, response.data.data);
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
        this.app.$store.commit("updateShared", response.data.shared);
        this.loadComponent(window.location.pathname, location, response.data.component, response.data.data);

        if (pushState) {
          window.history.pushState(this.createVisitId(response.data), "", location);
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

  loadComponent(from, to, component, data) {
    this.app.component = component;
    this.app.data = data;
    this.app.emitbeforeRouteEnter(to, from);
  }

  createVisitId(data) {
    this.visitId = {
      data: data,
      visitId: "wire"
    };
    return this.visitId;
  }

}
const plugin = {
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
    Vue.directive('click-outside', {
      bind(el, binding, vnode) {
        let event = event => vnode.context.$emit(binding.expression, event);

        document.body.addEventListener('click', event);
      }

    });
  }

};
function store(options = {
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
        axios.post("/ternobo-wire/get-user").then(response => {
          context.commit("setUser", response.data.user);
          const onUserLoad = new CustomEvent('ternobo:userloaded', {
            detail: {
              user: response.data.user
            }
          });
          window.document.dispatchEvent(onUserLoad);
        });
      },

      loadShared(context) {
        axios.post("/ternobo-wire/get-shared").then(response => {
          context.commit("updateShared", response.data.shared);
          const onSharedDataLoad = new CustomEvent('ternobo:sharedataloaded', {
            detail: {
              user: response.data.user
            }
          });
          window.document.dispatchEvent(onSharedDataLoad);
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

export default __vue_component__$1;
export { TernoboWire, plugin, store };
