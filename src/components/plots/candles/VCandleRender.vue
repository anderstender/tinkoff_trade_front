<template>
  <div class="v-candle-render" ref="canvasContainer">
    <canvas class="v-candle-render__canvas" ref="canvas"/>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop, Ref, Watch} from "vue-property-decorator";
  import CandleContainer from '@/components/plots/candles/models/CandleContainer';
  import CandleRender from '@/components/plots/candles/CandleRender';

  @Component
  export default class VCandleRender extends Vue {
    @Prop({required: true}) candle !: CandleContainer;
    @Ref() readonly canvas !: HTMLCanvasElement;
    @Ref() readonly canvasContainer !: HTMLDivElement;

    renderer!: CandleRender;

    async created(){
      this.$nextTick(() => {
        this.canvas.width = this.canvasContainer.offsetWidth;
        this.canvas.height = this.canvasContainer?.offsetHeight;

        this.renderer = new CandleRender(this.canvas);
        this.draw(this.candle);
      });
    }

    get candles(){
      return this.candle.candles;
    }

    get counter() {
      return this.candle.counter;
    }

    @Watch('counter')
    draw(candle){
      if(!this.renderer) return;
      this.renderer.clear();
      this.renderer.draw(this.candle);
    }

    get min() {
      return this.candle.min;
    }

    get max() {
      return this.candle.max;
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