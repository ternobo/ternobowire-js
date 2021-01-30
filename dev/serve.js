import Vue from 'vue';
import {
  store,
  plugin,
} from '@/TernoboWire';

import TernoboApp from '@/WireApp.vue';
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(plugin);

let vuexStore = store();

let component = "Index";
let data = {};

window.axios = axios;

new Vue({
  store: vuexStore,
  render: (h) =>
    h(TernoboApp, {
      props: {
        initialData: data,
        initialComponent: component,
        resolveComponent: (component) => import(`./Pages/${component}`),
      },
    })
}).$mount("#app");