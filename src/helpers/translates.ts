import {InstrumentType} from '@/types/domain';

export function instrumentType(type: InstrumentType | undefined) {
  if(!type) {
    return "";
  }
  const dict = {
    "Stock" : "Акция",
    "Currency" : "Валюта",
    "Etf" : "Etf",
    "Bond" : "Облигация"
  };
  return dict[type];
}