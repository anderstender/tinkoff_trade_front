import Vue from "vue";

import {
  BootstrapVue,
  IconsPlugin,
  LayoutPlugin,
  ModalPlugin,
  CardPlugin ,
  VBScrollspyPlugin,
  DropdownPlugin,
  TablePlugin} from "bootstrap-vue";

Vue.use(DropdownPlugin);
Vue.use(TablePlugin);
Vue.use(VBScrollspyPlugin);
Vue.use(ModalPlugin);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(LayoutPlugin);
Vue.use(BootstrapVue);