import WireApp from "./WireApp.vue";
import { testSameOrigin } from "./utilities";
import plugin from './plugin';
import store from "./store";
import {
  fireNavigate,
  fireNavigationFinish,
  firePageLoad
} from "./events"
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
    this.page = {
      component: component,
      data: data
    };

    window.history.replaceState(this.createVisitId(this.page), "", window.location.href);

    this.handleInitialPageVisit();
    this.handlePopstate();
  }

  handlePopstate() {
    window.addEventListener('popstate', (event) => {
      let state = event.state;
      setTimeout(() => {
        if (state.visitId == "wire") {
          window.scrollTo(0, 0);
          this.loadComponent(window.location.pathname, event.target.location.pathname, state.data.component, state.data.data)
        }
      }, 0);
    });
  }

  handleInitialPageVisit() {
    if (this.isBackForwardVisit()) {
      this.handleBackForwardVisit(this.page)
    } else {
      this.loadComponent(null, window.location.pathname, this.page.component, this.page.data);
    }
  }

  isBackForwardVisit() {
    return window.history.state
      && window.performance
      && window.performance.getEntriesByType('navigation').length > 0
      && (window.performance.getEntriesByType('navigation')[0]).type === 'back_forward'
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
      axios({
        method: type,
        data: data,
        url: location,
        headers: {
          "X-TernoboWire": true,
          Accept: 'text/html, application/xhtml+xml',
          'X-Requested-With': 'XMLHttpRequest',
        }
      }).then((response) => {
        resolve(response.data.data);
        if (response.headers['x-ternobowire']) {
          if (pushState) {
            this.pushState(location, response.data);
          }
          if (navigateLoading) {
            firePageLoad(location);
          }
        }
      }).catch((err) => {
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
        this.loadComponent(window.location.pathname, window.location.pathname, response.data.component, response.data.data);
        firePageLoad(location);
      } else {
        window.location.reload();
      }
    }).catch((err) => {
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
      axios({
        method: type,
        data: data,
        url: location,
        headers: {
          "X-TernoboWire": true,
          Accept: 'text/html, application/xhtml+xml',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }).then((response) => {
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
      }).catch((err) => {
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
    window.history.replaceState(data, "", url)
  }

  loadComponent(from, to, component, data) {
    this.app.component = component;
    this.app.data = data;
    return this.app.emitbeforeRouteEnter(to, from);
  }

  createVisitId(data) {
    this.visitId = { data: data, visitId: "wire" }
    return this.visitId
  }
}

export default WireApp;

export {
  plugin,
  store
};