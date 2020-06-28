import Vue from 'vue';
import TSocket from "@/socket/TSocket";
import TS from "@/plugins/TSocketPlugin";

Vue.use(TS);

declare module 'vue/types/vue' {
  export interface Vue {
    TS: TSocket
  }
}