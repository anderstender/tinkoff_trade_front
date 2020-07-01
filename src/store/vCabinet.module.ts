import Vue from "vue";
import {Action, Mutation, Module, VuexModule} from 'vuex-module-decorators';
import {namespace} from 'vuex-class';
import TSocket from "@/socket/TSocket";
import {Currencies, Portfolio} from "@/types/domain";
import {WssEventListener} from "@/types/types";
import OperationsContainer from "@/store/models/OperationsContainer";

export const vCabinetNamespace = "vPlots";
export const vCabinetModule = namespace(vCabinetNamespace);

@Module({namespaced: true, stateFactory: true})
export default class vCabinet extends VuexModule {
  socket?: TSocket;

  portfolio: Portfolio = {
    positions: []
  };

  currencies: Currencies = {
    currencies: []
  };

  currentOperations: OperationsContainer | null = null;


  @Mutation
  setPortfolio(portfolio: Portfolio) {
    this.portfolio = portfolio;
  }

  @Mutation
  setCurrencies(currencies: Currencies) {
    this.currencies = currencies;
  }

  @Mutation setCurrentOperations(operations: OperationsContainer | null) {
    this.currentOperations = operations;
  }

}
