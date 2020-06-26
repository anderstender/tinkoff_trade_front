import Vuex from "vuex";
import {vPlotsNamespace} from '@/store/vPlots';
import vPlots from '@/store/vPlots';
export default new Vuex.Store({
  modules: {
    [vPlotsNamespace] : vPlots
  }
})