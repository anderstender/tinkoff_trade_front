import {Vue as _Vue} from 'vue/types/vue';
import TSocket from "@/socket/TSocket";
export default async (Vue: typeof _Vue) => {
  Vue.prototype.TS = await (new TSocket()).connect();
}