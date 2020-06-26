import Vue from "vue";
import {Action, Mutation, Module, VuexModule} from 'vuex-module-decorators';
import {namespace} from 'vuex-class';

export const vPlotsNamespace = "vPlots";
export const vPlotsModule = namespace(vPlotsNamespace);

@Module({namespaced: true, stateFactory: true})
export default class vPlots extends VuexModule {

  graph: Array<any> = [];

  @Mutation
  push(item: any) {
    this.graph.push(item);
  }

  @Mutation
  shift(){
    this.graph.shift();
  }
}