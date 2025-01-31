import { OperationType } from "./domain";
export declare type Interval = '1min' | '2min' | '3min' | '5min' | '10min' | '15min' | '30min' | 'hour' | '2hour' | '4hour' | 'day' | 'week' | 'month';
export declare type Depth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare type HttpMethod = 'get' | 'post';
export declare type SocketEventType = 'orderbook' | 'candle' | 'instrument_info';
export declare type Dict<T> = {
  [x: string]: T;
};
export declare type OrderbookStreaming = {
  figi: string;
  depth: Depth;
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
};
export declare type InstrumentId = {
  ticker: string;
} | {
  figi: string;
};
export declare type CandleStreaming = {
  o: number;
  c: number;
  h: number;
  l: number;
  v: number;
  time: string;
  interval: Interval;
  figi: string;
};
export declare type LimitOrderParams = {
  figi: string;
  lots: number;
  operation: OperationType;
  price: number;
};
export declare type FIGI = {
  figi: string;
};


export declare type WssEventListener = (data: any, ws?: WebSocket) => void;
export declare type WssEventListeners = Array<WssEventListener>;
export declare type WssHandlerDict = { [key: string]: WssEventListeners };
export declare type CurrencyItem = {
  code: string;
  symbol: string;
  name: string;
};
export declare type CurrencyDict = {
  [key: string]: CurrencyItem
}
