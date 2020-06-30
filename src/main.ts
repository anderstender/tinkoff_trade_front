import Vue from 'vue';
import './bootstrap';
import store from "./store";

import App from "@/components/App.vue";
(async () => {
  const vApp = new Vue({
    render: h => h(App),
    store
  });
  await vApp.TS.connect();
  vApp.$mount('#app');
})();