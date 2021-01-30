import WireLink from "./Components/WireLink";
import Vuex from 'vuex';

class TernoboWire {
  constructor(application, data) {
    this.app = application;
    this.data = data;
    window.history.replaceState({ visitId: "wire" }, "", window.location.pathname + window.location.hash);
    window.addEventListener('popstate', (event) => {
      if (JSON.stringify(window.history.state) == JSON.stringify(this.createVisitId())) {
        this.visit(window.location.pathname + window.location.hash, {}, 'get', false);
      }
    })
  }

  getData(location, data = {}, type = 'get', pushState = true) {
    return new Promise((resolve, reject) => {
      if (location != (window.location.pathname + window.location.search)) {
        let onStart = new CustomEvent('ternobo:navigate', { detail: { location: location } });
        window.dispatchEvent(onStart);
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
              window.history.pushState(this.createVisitId(), "", location);
            }
            const onLoaded = new CustomEvent('ternobo:loaded', { detail: { location: location } });
            window.dispatchEvent(onLoaded);
          } else {
            window.location = location;
          }
        }).catch((err) => {
          if (!TernoboWire.production) {
            console.log(err);
          }
          reject(err);
        }).then(() => {
          resolve();
        });
      }
    });
  }

  visit(location, data = {}, type = 'get', pushState = true) {
    let onStart = new CustomEvent('ternobo:navigate', { detail: { location: location } });
    window.dispatchEvent(onStart);
    axios({
      method: type,
      data: data,
      url: location,
      headers: {
        "X-TernoboWire": true
      }
    }).then((response) => {
      if (response.headers['x-ternobowire']) {
        this.loadComponent(response.data.component, response.data.data);
        if (pushState) {
          window.history.pushState(this.createVisitId(), "", location);
        }
        const onLoaded = new CustomEvent('ternobo:loaded', { detail: { location: location } });
        window.dispatchEvent(onLoaded);
      } else {
        window.location = location;
      }
    }).catch((err) => {
      if (!TernoboWire.production) {
        console.log(err);
      }
    });
  }
  loadComponent(component, data) {
    this.app.component = component;
    this.app.data = data;
    this.app.updateComponent();
  }
  createVisitId() {
    this.visitId = { visitId: "wire" }
    return this.visitId
  }
}
export const plugin = {
  install(Vue) {
    Vue.use(Vuex);
    Vue.component("wire-link", WireLink);
    Vue.directive("infinite-scroll", {
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

export function store(options = { state: null, getters: {}, mutations: null }) {
  if (options.state != null && typeof (options.state) == "object") {
    options.state.user = null;
    options.state.ternoboWireApp = null;
  } else {
    options.state = {
      user: {},
      ternoboWireApp: null
    };
  }
  if (options.mutations != null && typeof (options.mutations) == "object") {
    options.mutations.setupApp = function (state, payload) {
      state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
    };

    options.mutations.userUpdate = function (state,) {
      axios.post("/ternobo-wire/get-user").then((response) => {
        state.user = response.data.user
      });
    };
  } else {
    options.mutations = {
      userUpdate(state) {
        axios.post("/ternobo-wire/get-user").then((response) => {
          state.user = response.data.user
        });
      },
      setupApp(state, payload) {
        state.ternoboWireApp = new TernoboWire(payload.app, payload.data);
      }
    };
  }
  return new Vuex.Store(options);
};