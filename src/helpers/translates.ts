import {InstrumentType} from '@/types/domain';

export function instrumentType(type: InstrumentType | undefined) {
  if(!type) {
    return "";
  }
  const dict = {
    "Stock" : "Акции",
    "Currency" : "Валюта",
    "Etf" : "Etf",
    "Bond" : "Облигации"
  };
  return dict[type];
}

export function operations(op) {
  const types = {
    "Buy": "Покупка",
    "Sell" : "Продажа"
  };
  return types[op] ?? op;
}