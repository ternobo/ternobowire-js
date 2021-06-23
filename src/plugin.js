import WireLink from "./Components/WireLink";
import router from "./mixins/router";
import Vuex from "vuex";

export default {
    install(Vue) {
        Vue.use(Vuex);
        Vue.mixin(router);
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
    }
}