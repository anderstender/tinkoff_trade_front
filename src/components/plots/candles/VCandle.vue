<template>
  <div class="v-candle">
      {{name}}
      <v-candle-render :candle="candle" />
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop, Watch} from "vue-property-decorator";
  import {MarketInstrument, PortfolioPosition} from '@/types/domain';
  import {
    FRONT_SEARCH_ONE_GET,
    TINKOFF_OPERATIONS_GET,
    TINKOFF_SEARCH_ONE_GET,
    TINKOFF_CANDLE_SUBSCRIBE,
    TINKOFF_CANDLE_UNSUBSCRIBE,
    TINKOFF_CANDLE_UPDATE,
    FRONT_CANDLE_SUBSCRIBE,
    FRONT_CANDLE_UNSUBSCRIBE
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
      this.getInstrument(this.figi);
      //this.subscribe(this.figi);
    }

    async beforeDestroy() {
      this.TS.clear(TINKOFF_SEARCH_ONE_GET, this.setInstrument);
      this.unsubscribe(this.figi);
    }

    updateCandle(candleStreaming: CandleStreaming) {
      this.candle.push(candleStreaming);
    }

    interval: Interval = "1min";

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


    @Watch('figi')
    getInstrument(figi, oldFigi?) {
      this.TS.emit(FRONT_SEARCH_ONE_GET, {
        figi
      });
      this.unsubscribe(oldFigi);
      this.subscribe(figi);
    }

    setInstrument(instrument: MarketInstrument) {
      if(instrument.figi === this.figi) {
        this.instrument = instrument;
      }
    }

    get name() {
      return (this.instrument && this.instrument.name) || '';
    }
  }
</script>

<style lang="scss">
  .v-candle {
    height: 100%;
  }
</style>