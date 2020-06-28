import Vue from 'vue';
import './bootstrap';
import store from "./store";

import App from "@/components/App.vue";
import TSocket from "@/socket/TSocket";

(async () => {
  Vue.prototype.$ts = await (new TSocket()).connect();
  new Vue({
    render: h => h(App),
    store
  }).$mount('#app');
})();