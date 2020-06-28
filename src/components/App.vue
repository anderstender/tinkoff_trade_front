<template>
  <b-container class="v-app-container" fluid="ld">
    <b-row align-v="stretch">
      <b-col cols="2">test1</b-col>
      <b-col cols="10">test2</b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import TSocket from "@/socket/TSocket";
  import {vPlotsModule, vPlotsNamespace} from '@/store/vPlots.module';


  import vPlots from '@/store/vPlots.module';
  import vCabinet, {vCabinetModule, vCabinetNamespace} from "@/store/vCabinet.module";
  import {Portfolio} from "@/types/domain";
  import {WssEventListener} from "@/types/types";


  @Component({
    vuexModules: {
      [vPlotsNamespace]: vPlots,
      [vCabinetNamespace]: vCabinet
    }
  })
  export default class App extends Vue {

    @vCabinetModule.Action sub !: (event: string, handler: WssEventListener) => any;
    @vCabinetModule.Action connect;
    @vCabinetModule.Action send !: (event: string, message: any) => any;

    @vCabinetModule.Mutation setPortfolio;

    @vCabinetModule.State portfolio;

    ts?: TSocket;

    async created(){
      this.ts =  await (new TSocket()).connect();
      this.ts.on('tinkoff:orderbook:update', (message, ws) => {});;
      this.ts.on('tinkoff:portfolio:get', (message, ws) => {
        this.setPortfolio(message as Portfolio);
        console.log(this.portfolio);
      });

      this.ts.emit('fron:candle:sub', {
        tiker: 'AAPL'
      });

      this.ts.emit('front:portfolio:get', {});

    }
  }
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .v-app-container {
    padding: 8px;
  }
</style>