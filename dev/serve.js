import Vue from 'vue';
import {
  store,
  plugin,
} from '@/entry';

import TernoboApp from '@/Layouts/AppLayout.vue';
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(plugin);

let vuexStore = store();

window.axios = axios;

new Vue({
  store: vuexStore,
  render: (h) =>
    h(TernoboApp, {
      props: {
        loading: true
      },
    })
}).$mount("#app");