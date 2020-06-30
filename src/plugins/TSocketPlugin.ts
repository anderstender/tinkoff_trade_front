import {Vue as _Vue} from 'vue/types/vue';
import TSocket from "@/socket/TSocket";
export default (Vue: typeof _Vue) => {
  Vue.prototype.TS = new TSocket();
}