import TSocket from '@/socket/TSocket';

Number.prototype.currency = function (currency="RUB") {
  return this.toLocaleString("ru", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol"
  });
}
Number.prototype.splitZeros = function () {
  if(this == 0) return '0,00';

  const symbols = this.toString().split('');
  for(let i = symbols.length-1; i >=0; i--){
    const s = symbols[i];
    if(s === '0' || s === '.' || s === ',') {
      symbols.pop();
    }else {
      break;
    }
  }
  return symbols.join('');
}

declare global {
  interface Number {
    currency: Function;
    splitZeros: () => string;
  }
}
