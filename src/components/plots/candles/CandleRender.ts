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
    return this.canvas.height * 0.05;
  }

  get hOffset() {
    return this.canvas.width * 0.05;
  }
  candleWidth = 5;
  candleMargin = 1;

  renderCandle(candle: CandleContainer, cndl: CandleStreaming, offset) {
    const {
      o, c, h, l
    } = cndl;
    const color = o < c ? "green" : (o > c ? "red" : "white");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error('no canvas context');
    }
    const max = candle.max;
    const min = candle.min;


    const x = offset - (this.candleWidth / 2);
    const y = this.priceToY(Math.max(o,c), min, max);
    const ch = Math.abs(this.priceToY(o, min, max) - this.priceToY(c, min, max)) || 1;
    console.log(x, y, this.candleWidth, ch, cndl);


    const y2 = this.priceToY(h, min, max);
    const y3 = this.priceToY(l, min, max);
    const x1 = offset;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y2);
    ctx.lineTo(x1, y3);
    ctx.stroke();


    ctx.fillStyle = color;
    ctx.fillRect(
      x,
      y,
      this.candleWidth,
      ch
    );


  }

  scale(min, max) {
    if(max == min) {
      max = max * 20;
      min = min * 0.05
    }
    const diff = max - min;
    const sc = (diff === 0) ? 0 : ((this.canvas.height - (this.vOffset*2)) / diff);
    return sc > 800 ? 800 :sc;
  }

  priceToY(price, min, max) {
    const scale = this.scale(min, max);
    return (this.canvas.height/2 - (price - min) * scale + this.vOffset);
  }

  indexToX(index) {
    return (index * (this.candleWidth + this.candleMargin)) - this.hOffset;
  }

  draw(candle: CandleContainer) {
    this.clear();

    const maxCnt = Math.round(this.canvas.width / (this.candleWidth + this.candleMargin));
    const len = candle.candles.length;
    const minIndex = Math.round((len - maxCnt) >=0 ? (len - maxCnt) : 0);
    let counter = maxCnt;
    for(let i = len - 1; i >= minIndex; i--, counter--){
      this.renderCandle(candle, candle.candles[i], this.indexToX(counter));
    }
  }

}