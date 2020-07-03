<template>
  <div class="v-candle-render">
    <canvas class="v-candle-render__canvas" ref="canvas"/>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop, Ref} from "vue-property-decorator";
  import CandleContainer from '@/components/plots/candles/models/CandleContainer';

  @Component
  export default class VCandleRender extends Vue {
    @Prop({required: true}) candle !: CandleContainer;
    @Ref() readonly canvas !: HTMLCanvasElement;


    canvasClear() {
      const context = this.canvas.getContext("2d");
      if(!context) {
        throw new Error('no canvas context');
      }
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.fillStyle = "#111";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    async created(){
      this.$nextTick(() => {
        console.log(this.canvas);
        this.canvasClear();
      });
    }

    get candles() {
      return this.candle.candles;
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