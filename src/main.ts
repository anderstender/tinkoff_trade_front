import Vue from 'vue';
import './bootstrap';
import store from "./store";

import App from "@/components/App.vue";


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
