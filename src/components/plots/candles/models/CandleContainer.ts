import {CandleStreaming} from '@/types/types';
import {Candle} from "@/types/domain";
export default class CandleContainer {
  figi: string;
  candles: (CandleStreaming | Candle)[] = [];

  counter: number = 0;

  constructor(figi) {
    this.figi = figi;
  }

  get lastCandle(): CandleStreaming | Candle {
    return this.candles[this.candles.length-1];
  }
  set lastCandle(candle: CandleStreaming | Candle) {
    if(!this.candles.length) {
      this.candles.push(candle);
    }else {
      this.candles[this.candles.length-1] = candle;
    }
  }

  setHistory(candles: (CandleStreaming | Candle)[]) {
    let tmp = [...this.candles];
    this.candles = candles;
  }

  push(candle: CandleStreaming | Candle) {
    /*this.candles.push(candle);
    return;/**/
    if(!this.lastCandle){
      this.candles.push(candle);
      this.counter++;
      return;
    }
    if(this.lastCandle.figi !== candle.figi) return;


    if(this.lastCandle.time === candle.time) {
      this.lastCandle = candle;
    }else {
      this.candles.push(candle);
    }
    this.counter++;
  }

  get min() {
    let min = Number.MAX_SAFE_INTEGER;
    this.candles.forEach((c) => {
      min = Math.min(min, c.c, c.h, c.l, c.o);
    });
    return min;
  }

  get max() {
    let max = Number.MIN_SAFE_INTEGER;
    this.candles.forEach((c) => {
      max = Math.max(max, c.c, c.h, c.l, c.o);
    });
    return max;
  }
}