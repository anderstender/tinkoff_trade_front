<template>
  <b-container class="v-app-container" fluid="ld">
    <b-row align-v="stretch">
      <b-col cols="4">
        <v-balance @instrument-click="showInstrument"/>
        <v-instrument-info
          v-if="selectedPosition"
          :position="selectedPosition" />
      </b-col>
      <b-col cols="8">test2</b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import TSocket from "@/socket/TSocket";
  import {vPlotsModule, vPlotsNamespace} from '@/store/vPlots.module';


  import vPlots from '@/store/vPlots.module';
  import vCabinet, {vCabinetModule, vCabinetNamespace} from "@/store/vCabinet.module";
  import {Currencies, Portfolio, PortfolioPosition} from "@/types/domain";
  import {WssEventListener} from "@/types/types";
  import VBalance from "@/components/balance/VBalance.vue";
  import VInstrumentInfo from '@/components/instrument/VInstrumentInfo.vue';

  @Component({
    components: {
      VBalance,
      VInstrumentInfo
    },
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
    @vCabinetModule.Mutation setCurrencies;
    @vCabinetModule.State currencies;

    selectedPosition: PortfolioPosition | null = null;

    async created(){
      this.$nextTick(() => {
        this.TS.on('tinkoff:orderbook:update', (message, ws) => {});

      });
    }

    showInstrument(position: PortfolioPosition) {
      if(!this.selectedPosition || (this.selectedPosition.figi !== position.figi)) {
        this.selectedPosition = position;
      } else {
        this.selectedPosition = null;
      }

    }
  }
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .v-app-container {
    padding: 8px;
    overflow: hidden;
  }
</style>