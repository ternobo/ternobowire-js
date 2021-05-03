import WireLink from "./Components/WireLink";
import Vuex from 'vuex';
import WireApp from "./WireApp.vue";

/**
 * Check if URL is from Same Origin.
 * @param {string} url 
 */
function testSameOrigin(url) {
  var loc = window.location,
    a = document.createElement('a');
  a.href = url;
  return a.hostname == loc.hostname &&
    a.port == loc.port &&
    a.protocol == loc.protocol;
}

/**
 * TernoboWire Base Class
 */
export class TernoboWire {

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
    window.addEventListener('popstate', (event) => {
      let state = event.state;
      if (state.visitId == "wire") {
        window.scrollTo(0, 0);
        window.history.replaceState(event.state, "", window.location.href);
        this.loadComponent(state.data.component, state.data.data);
      }
    })
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
      let onStart = new CustomEvent('ternobo:navigate', { detail: { location: location } });
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
      }).then((response) => {
        resolve(response.data.data);
        if (response.headers['x-ternobowire']) {
          if (pushState) {
            window.history.pushState(this.createVisitId(response.data), "", location);
          }
          const onLoaded = new CustomEvent('ternobo:loaded', { detail: { location: location } });
          if (navigateLoading) {
            window.document.dispatchEvent(onLoaded);
          }
        }
      }).catch((err) => {
        if (!TernoboWire.production) {
          console.log(err);
        }
        reject(err);
      }).then(() => {
        if (navigateLoading) {
          const onFinish = new CustomEvent('ternobo:finish', { detail: { location: location } });
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
    let onStart = new CustomEvent('ternobo:navigate', { detail: { location: location } });
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
    }).then((response) => {
      if (response.headers['x-ternobowire']) {
        this.app.$store.commit("updateShared", response.data.shared);
        this.loadComponent(response.data.component, response.data.data);
        const onLoaded = new CustomEvent('ternobo:loaded', { detail: { location: location } });
        window.document.dispatchEvent(onLoaded);
      } else {
        window.location.reload();
      }
    }).catch((err) => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    }).then(() => {
      const onFinish = new CustomEvent('ternobo:finish', { detail: { location: location } });
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
    let onStart = new CustomEvent('ternobo:navigate', { detail: { location: location } });
    window.document.dispatchEvent(onStart);
    axios({
      method: type,
      data: data,
      url: location,
      headers: {
        "X-TernoboWire": true
      }
    }).then((response) => {
      if (response.headers['x-ternobowire']) {
        this.app.$store.commit("updateShared", response.data.shared);
        this.loadComponent(response.data.component, response.data.data);
        if (pushState) {
          window.history.pushState(this.createVisitId(response.data), "", location);
        }
        const onLoaded = new CustomEvent('ternobo:loaded', { detail: { location: location } });
        window.document.dispatchEvent(onLoaded);
      } else {
        window.location = location;
      }
    }).catch((err) => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    }).then(() => {
      const onFinish = new CustomEvent('ternobo:finish', { detail: { location: location } });
      window.document.dispatchEvent(onFinish);
    });
  }

  loadComponent(component, data) {
    this.app.component = component;
    this.app.data = data;
    this.app.updateComponent();
  }

  createVisitId(data) {
    this.visitId = { data: data, visitId: "wire" }
    return this.visitId
  }
}
export const plugin = {
  install(Vue) {
    Vue.use(Vuex);
    Vue.component("wire-link", WireLink);
    Vue.directive("t-infinite-scroll", {
      bind(el, binding, vnode) {
        el.addEventListener("scroll", (e) => {
          if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            binding.value();
          }
        });
      }
    });
    Vue.directive('click-outside', {
      bind(el, binding, vnode) {
        let event = event => vnode.context.$emit(binding.expression, event);
        document.body.addEventListener('click', event)
      }
    });
  }
}


export default WireApp;

export function store(options = { state: {}, actions: {}, mutations: {} }) {
  let storeOptions = {
    ...options,
    state: {
      ...options.state,
      user: {},
      ternoboWireApp: null,
      shared: {},
    },
    actions: {
      ...options.actions,
      loadUser(context) {
        axios.post("/ternobo-wire/get-user").then((response) => {
          context.commit("setUser", response.data.user);
          const onUserLoad = new CustomEvent('ternobo:userloaded', { detail: { user: response.data.user } });
          window.document.dispatchEvent(onUserLoad);
        });
      },
      loadShared(context) {
        axios.post("/ternobo-wire/get-shared").then((response) => {
          context.commit("updateShared", response.data.shared);
          const onSharedDataLoad = new CustomEvent('ternobo:sharedataloaded', { detail: { user: response.data.user } });
          window.document.dispatchEvent(onSharedDataLoad);
        });
      }
    },
    mutations: {
      ...options.mutations,
      setUser(state, payload) {
        state.user = payload;
      },
      setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.component, payload.data);
      },
      updateShared(state, payload) {
        state.shared = payload
      }
    }
  };

  return new Vuex.Store(storeOptions);
};