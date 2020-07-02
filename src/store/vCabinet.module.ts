import Vue from "vue";
import {Action, Mutation, Module, VuexModule} from 'vuex-module-decorators';
import {namespace} from 'vuex-class';
import TSocket from "@/socket/TSocket";
import {Currencies, Portfolio} from "@/types/domain";
import {WssEventListener} from "@/types/types";
import PositionContainer from "@/store/models/PositionContainer";

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

  currentPosition: PositionContainer | null = null;


  @Mutation
  setPortfolio(portfolio: Portfolio) {
    this.portfolio = portfolio;
  }

  @Mutation
  setCurrencies(currencies: Currencies) {
    this.currencies = currencies;
  }

  @Mutation setCurrentPosition(operations: PositionContainer | null) {
    this.currentPosition = operations;
  }

}
