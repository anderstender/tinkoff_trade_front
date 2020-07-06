import CandleContainer from '@/components/plots/candles/models/CandleContainer';
import {CandleStreaming} from '@/types/types';
import {MarketInstrument} from "@/types/domain";
import {max} from "moment";

export default class CandleRender {
  canvas: HTMLCanvasElement;
  instrument: MarketInstrument;

  constructor(canvas: HTMLCanvasElement, instrument: MarketInstrument) {
    this.canvas = canvas;
    this.instrument = instrument;
  }

  setInstrument(instrument: MarketInstrument) {
    this.instrument = instrument;
  }
  clear() {
    const ctx = this.context();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get vOffset() {
    return Math.round(this.canvas.height * 0.2);
  }

  get hOffset() {
    return Math.round(this.canvas.width * 0.05);
  }
  candleWidth = 2;
  candleMargin = 3;

  context() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error('no canvas context');
    }
    return ctx;
  }

  renderCandle(candle: CandleContainer, cndl: CandleStreaming, offsetX) {
    const {
      o, c, h, l
    } = cndl;
    const color = o < c ? "green" : (o > c ? "red" : "white");
    const max = candle.max;
    const min = candle.min;
    const candleX = offsetX - this.candleWidth;
    const candleY = this.priceToY(Math.max(o,c), min, max);
    const candleHeight = Math.abs(this.priceToY(o, min, max) - this.priceToY(c, min, max)) || 1;
    const candleWidth = this.candleWidth*2;
    const yH = this.priceToY(h, min, max);
    const yL = this.priceToY(l, min, max);
    const xShadow = Math.round(offsetX);

    this.drawCandleShadow(xShadow, yH, yL, color);
    this.drawCandleBody(candleX, candleY, candleWidth, candleHeight, color);
  }

  drawCandleShadow(x, yH, yL, color) {
    const ctx = this.context();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(x, yH);
    ctx.lineTo(x, yL);
    ctx.stroke();
  }

  drawCandleBody(x, y, width, height, color) {
    const ctx = this.context();

    ctx.fillStyle = color;
    ctx.fillRect(
      x,
      y,
      width,
      height
    );
  }


  scale(min, max) {
    const diff = max - min;
    const pt = this.toPoints(diff);
    const vPixelsCount = this.canvas.height - this.vOffset*2;

    return vPixelsCount / pt ;
  }

  toPoints(pts) {
    return (pts / (this.instrument.minPriceIncrement || 1)) || 1;
  }

  priceToY(price, min, max) {
    const scale = this.scale(min, max);
    const diffPrice = (price - min);
    return Math.round(this.canvas.height - this.toPoints(diffPrice) * scale - this.vOffset);
  }

  indexToX(index) {
    return Math.round((index * (this.candleWidth*2 + this.candleMargin)) - this.hOffset);
  }

  get renderCount() {
    return Math.round(this.canvas.width / (this.candleWidth*2 + this.candleMargin));
  }

  /*TODO : нужный жесткий рефакторинг, это лютое говно*/
  draw(candle: CandleContainer) {
    this.clear();
    candle.candles = candle.candles.slice(-this.renderCount);
    const len = candle.candles.length;
    for(let i = len - 1; i >= 0; i--){
      this.renderCandle(candle, candle.candles[i], this.indexToX(i + (this.renderCount - len)));
    }
  }

}