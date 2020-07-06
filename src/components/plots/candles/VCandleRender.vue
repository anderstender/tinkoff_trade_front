<template>
  <div class="v-candle-render" ref="canvasContainer">
    <canvas class="v-candle-render__canvas" ref="canvas"/>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop, Ref, Watch} from "vue-property-decorator";
  import CandleContainer from '@/components/plots/candles/models/CandleContainer';
  import CandleRender from '@/components/plots/candles/CandleRender';
  import {MarketInstrument} from "@/types/domain";

  @Component
  export default class VCandleRender extends Vue {
    @Prop({required: true}) candle !: CandleContainer;
    @Prop({required: true}) instrument !: MarketInstrument;
    @Ref() readonly canvas !: HTMLCanvasElement;
    @Ref() readonly canvasContainer !: HTMLDivElement;

    renderer!: CandleRender;


    init() {
      this.canvas.width = this.canvasContainer.offsetWidth;
      this.canvas.height = this.canvasContainer?.offsetHeight;
      this.renderer = new CandleRender(this.canvas, this.instrument);
      this.draw();
    }

    async created(){
      this.$nextTick(this.init);
    }

    @Watch('instrument')
    initInstrument(){
      this.renderer.setInstrument(this.instrument);
    }

    async beforeDestroy() {
      window.cancelAnimationFrame(this.animFrameId);
    }
    animFrameId: number = 0;

    draw(){
      if(!this.renderer) return;
      this.renderer.draw(this.candle);
      this.animFrameId = window.requestAnimationFrame(this.draw);
    }
  }
</script>

<style lang="scss">
  .v-candle-render {
    height: 100%;
    border: solid 1px #e1e1e1;
    & &__canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>