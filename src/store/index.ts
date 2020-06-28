import Vuex from "vuex";
import {vPlotsNamespace} from '@/store/vPlots.module';
import {vCabinetNamespace} from "@/store/vCabinet.module";
import vPlots from '@/store/vPlots.module';
import vCabinet from "@/store/vCabinet.module";
export default new Vuex.Store({
  modules: {
    [vPlotsNamespace] : vPlots,
    [vCabinetNamespace]: vCabinet
  }
})