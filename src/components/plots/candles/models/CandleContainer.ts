import {CandleStreaming} from '@/types/types';
export default class CandleContainer {
  figi: string;
  candles: CandleStreaming[] = [];

  constructor(figi) {
    this.figi = figi;
  }

  get lastCandle(): CandleStreaming {
    return this.candles[this.candles.length-1];
  }
  set lastCandle(candle: CandleStreaming) {
    if(!this.candles.length) {
      this.candles.push(candle);
    }else {
      this.candles[this.candles.length-1] = candle;
    }
  }

  push(candle: CandleStreaming) {
    if(!this.lastCandle){
      this.candles.push(candle);
      return;
    }
    if(this.lastCandle.figi !== candle.figi) return;

    if(this.lastCandle.time === candle.time) {
      this.lastCandle = candle;
    }else {
      this.candles.push(candle);
    }
  }

  get min() {
    let min = Number.MAX_SAFE_INTEGER;
    this.candles.forEach((c) => {
      min = Math.min(min, c.c, c.h, c.l, c.o);
    })
    return min;
  }

  get max() {
    let max = Number.MIN_SAFE_INTEGER;
    this.candles.forEach((c) => {
      max = Math.max(max, c.c, c.h, c.l, c.o);
    })
    return max;
  }
}