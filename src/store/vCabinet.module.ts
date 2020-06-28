import Vue from "vue";
import {Action, Mutation, Module, VuexModule} from 'vuex-module-decorators';
import {namespace} from 'vuex-class';
import TSocket from "@/socket/TSocket";
import {Portfolio} from "@/types/domain";
import {WssEventListener} from "@/types/types";

export const vCabinetNamespace = "vPlots";
export const vCabinetModule = namespace(vCabinetNamespace);

@Module({namespaced: true, stateFactory: true})
export default class vCabinet extends VuexModule {
  socket?: TSocket;

  portfolio: Portfolio = {
    positions: []
  };

  @Mutation
  setPortfolio(portfolio: Portfolio) {
    this.portfolio = portfolio;
  }

}
