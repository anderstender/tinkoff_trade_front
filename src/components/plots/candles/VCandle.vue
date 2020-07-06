<template>
  <div class="v-candle">
      <v-candle-render
          v-if="instrument"
          :candle="candle"
          :instrument="instrument"/>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop, Watch} from "vue-property-decorator";
  import {Candles, CandlesResponse, MarketInstrument, PortfolioPosition} from '@/types/domain';
  import {
    FRONT_SEARCH_ONE_GET,
    TINKOFF_OPERATIONS_GET,
    TINKOFF_SEARCH_ONE_GET,
    TINKOFF_CANDLE_SUBSCRIBE,
    TINKOFF_CANDLE_UNSUBSCRIBE,
    TINKOFF_CANDLE_UPDATE,
    FRONT_CANDLE_SUBSCRIBE,
    FRONT_CANDLE_UNSUBSCRIBE,
    FRONT_CANDLE_GET,
    TINKOFF_CANDLE_GET
  } from '@/events/constants';
  import {CandleStreaming, Interval} from '@/types/types';
  import CandleContainer from '@/components/plots/candles/models/CandleContainer';
  import VCandleRender from '@/components/plots/candles/VCandleRender.vue';

  const moment = require('moment');

  @Component({
    components: {
      VCandleRender
    }
  })
  export default class VCandle extends Vue {
    @Prop({required: true}) figi !: string;

    instrument: MarketInstrument | null = null;

    candle: CandleContainer = new CandleContainer('');

    async created() {
      this.TS.on(TINKOFF_SEARCH_ONE_GET, this.setInstrument);
      this.getHistory();
      this.getInstrument(this.historyParamsByInterval);
    }

    async beforeDestroy() {
      this.TS.clear(TINKOFF_SEARCH_ONE_GET, this.setInstrument);
      this.TS.clear(TINKOFF_CANDLE_GET, this.loadHistory);
      this.unsubscribe(this.figi);
    }

    updateCandle(candleStreaming: CandleStreaming) {
      this.candle.push(candleStreaming);
    }

    interval: Interval = "5min";

    subscribe(figi) {
      this.candle = new CandleContainer(figi);
      this.TS.on(TINKOFF_CANDLE_UPDATE, this.updateCandle);
      this.TS.emit(FRONT_CANDLE_SUBSCRIBE, {
        figi,
        interval: this.interval
      })
    }

    unsubscribe(figi?) {
      if(!figi) return;
      this.TS.emit(FRONT_CANDLE_UNSUBSCRIBE, {
        figi,
        interval: this.interval
      });
      this.TS.clear(TINKOFF_CANDLE_UPDATE, this.updateCandle);
    }


    @Watch('historyParamsByInterval')
    getInstrument(params, oldParams?) {
      this.getHistory();
      this.TS.emit(FRONT_SEARCH_ONE_GET, {
        figi: params.figi
      });
      this.unsubscribe(oldParams?.figi || undefined);
      this.subscribe(params.figi);
    }

    get historyParamsByInterval() {
      let from = moment().subtract(1, 'day');
      switch (this.interval) {
        case "1min":
        case "2min":
        case "3min":
        case "5min":
        case "10min":
        case "15min":
        case "30min":
          from = moment().subtract(1, 'day');
          break;
        case "hour":
        case "2hour":
        case "4hour":
          from = moment().subtract(7, 'day');
          break;
        case "day":
          from = moment().subtract(1, 'year');
          break;
        case "week":
          from = moment().subtract(2, 'year');
          break;
        case "month":
          from = moment().substract(10, 'year');
          break;
      }
      return {
        figi: this.figi,
        interval: this.interval,
        to: String(moment().toISOString()),
        from: String(from.toISOString())
      }
    }

    loadHistory(history: Candles) {
      this.candle.setHistory(history.candles)
    }

    getHistory(){
      this.TS.clear(TINKOFF_CANDLE_GET, this.loadHistory);
      this.TS.on(TINKOFF_CANDLE_GET, this.loadHistory);
      this.TS.emit(FRONT_CANDLE_GET, this.historyParamsByInterval);
    }

    setInstrument(instrument: MarketInstrument) {
      if(instrument.figi === this.figi) {
        this.instrument = instrument;
      }
    }

  }
</script>

<style lang="scss">
  .v-candle {
    height: 100%;
  }
</style>