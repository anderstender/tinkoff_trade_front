import CandleContainer from '@/components/plots/candles/models/CandleContainer';
import {CandleStreaming} from '@/types/types';

export default class CandleRender {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  clear() {
    const ctx = this.canvas.getContext("2d");
    if(!ctx) {
      throw new Error('no canvas context');
    }
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get vOffset() {
    return this.canvas.height * 0.1;
  }

  get hOffset() {
    return this.canvas.width * 0.1;
  }
  candleWidth = 20;
  candleMargin = 2;

  renderCandle(candle: CandleContainer, index) {
    const cndl = candle.candles[index];
    console.log(cndl);
    const {
      o, c, h, l
    } = candle.candles[index];
    const color = o < c ? "green" : (o > c ? "red" : "grey");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error('no canvas context');
    }
    const max = candle.max;
    const min = candle.min;


    const x = this.indexToX(index);
    const y = Math.max(this.priceToY(o, min, max), this.priceToY(c, min, max));
    const ch = Math.abs(this.priceToY(o, min, max) - this.priceToY(c, min, max));
    console.log(x, y, this.candleWidth, ch)

    ctx.fillStyle = color;
    ctx.fillRect(
      x - (this.candleWidth / 2),
      y,
      this.candleWidth,
      ch
    );
  }

  priceToY(price, min, max) {
    if(max == min) {
      max = max * 1.2;
      min = min * 0.8
    }

    const diff = max - min;
    const scale = (diff) === 0 ? 0 : ((this.canvas.height*0.8) / diff);
    return ((max - price) * scale + this.vOffset);
  }

  indexToX(index) {
    return this.canvas.width - this.hOffset + ((index+1) * (this.candleWidth + this.candleMargin))
  }

  draw(candle: CandleContainer) {
    this.clear();
    for(let i = candle.candles.length - 1; i >= 0; i--){
      this.renderCandle(candle, i);
    }
  }

}