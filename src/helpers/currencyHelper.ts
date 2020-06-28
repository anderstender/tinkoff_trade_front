import {CurrencyDict, CurrencyItem} from "@/types/types";

export const currencyDict : CurrencyDict = {
  "RUB": {
    symbol: "₽",
    code: "RUB",
    name: "Russian ruble"
  },
  "BGN": {
    symbol: "лв",
    code: "BGN",
    name: "Bulgarian lev"
  },
  "CHF": {
    symbol: "CHF",
    code: "CHF",
    name: "Swiss franc"
  },
  "CZK": {
    symbol: "Kč",
    code: "CZK",
    name: "Czech koruna"
  },
  "DKK": {
    symbol: "kr",
    code: "DKK",
    name: "Danish krone"
  },
  "EUR": {
    symbol: "€",
    code: "EUR",
    name: "Euro"
  },
  "GBP": {
    symbol: "£",
    code: "GBP",
    name: "Pounds sterling"
  },
  "HRK": {
    symbol: "kn",
    code: "HRK",
    name: "Croatian Kuna"
  },
  "GEL": {
    symbol: "₾",
    code: "GEL",
    name: "Georgian lari"
  },
  "HUF": {
    symbol: "ft",
    code: "HUF",
    name: "Hungarian forint"
  },
  "NOK": {
    symbol: "kr",
    code: "NOK",
    name: "Norwegian krone"
  },
  "PLN": {
    symbol: "zł",
    code: "PLN",
    name: "Polish zloty"
  },
  "RON": {
    symbol: "lei",
    code: "RON",
    name: "Romanian leu"
  },
  "SEK": {
    symbol: "kr",
    code: "SEK",
    name: "Swedish krona"
  },
  "TRY": {
    symbol: "₺",
    code: "TRY",
    name: "Turkish lira"
  },
  "UAH": {
    symbol: "₴",
    code: "UAH",
    name: "Ukrainian hryvna"
  },
  "AED": {
    symbol: "د.إ",
    code: "AED",
    name: "Emirati dirham"
  },
  "ILS": {
    symbol: "₪",
    code: "ILS",
    name: "Israeli shekel",
  },
  "KES": {
    symbol: "Ksh",
    code: "KES",
    name: "Kenyan shilling"
  },
  "MAD": {
    symbol: ".د.م",
    code: "MAD",
    name: "Moroccan dirham"
  },
  "NGN": {
    symbol: "₦",
    code: "NGN",
    name: "Nigerian naira"
  },
  "ZAR": {
    symbol: "R",
    code: "ZAR",
    name: "South african rand"
  },
  "BRL": {
    symbol: "R$",
    code: "BRL",
    name: "Brazilian real"
  },
  "CAD": {
    symbol: "$",
    code: "CAD",
    name: "Canadian dollars"
  },
  "CLP": {
    symbol: "$",
    code: "CLP",
    name: "Chilean peso"
  },
  "COP": {
    symbol: "$",
    code: "COP",
    name: "Colombian peso"
  },
  "MXN": {
    symbol: "$",
    code: "MXN",
    name: "Mexican peso"
  },
  "PEN": {
    symbol: "S/.",
    code: "PEN",
    name: "Peruvian sol"
  },
  "USD": {
    symbol: "$",
    code: "USD",
    name: "US dollar"
  },
  "AUD": {
    symbol: "$",
    code: "AUD",
    name: "Australian dollars"
  },
  "BDT": {
    symbol: "৳",
    code: "BDT",
    name: "Bangladeshi taka"
  },
  "CNY": {
    symbol: "¥ /元",
    code: "CNY",
    name: "Chinese yuan"
  },
  "HKD": {
    symbol: "$",
    code: "HKD",
    name: "Hong Kong dollar"
  },
  "IDR": {
    symbol: "Rp",
    code: "IDR",
    name: "Indonesian rupiah"
  },
  "INR": {
    symbol: "₹",
    code: "INR",
    name: "Indian rupee"
  },
  "JPY": {
    symbol: "¥",
    code: "JPY",
    name: "Japanese yen"
  },
  "MYR": {
    symbol: "RM",
    code: "MYR",
    name: "Malaysian ringgit"
  },
  "NZD": {
    symbol: "$",
    code: "NZD",
    name: "New Zealand dollar"
  },
  "PHP": {
    symbol: "₱",
    code: "PHP",
    name: "Philippine peso"
  },
  "PKR": {
    symbol: "Rs",
    code: "PKR",
    name: "Pakistani rupee"
  },
  "SGD": {
    symbol: "$",
    code: "SGD",
    name: "Singapore dollar"
  },
  "KRW	": {
    symbol: "₩",
    code: "KRW",
    name: "South Korean won"
  },
  "LKR": {
    symbol: "Rs",
    code: "LKR",
    name: "Sri Lankan rupee"
  },
  "THB": {
    symbol: "฿",
    code: "THB",
    name: "Thai baht"
  },
  "VND": {
    symbol: "₫",
    code: "VND",
    name: "Vietnamese dong"
  },

};

export function currency(value: number, code="RUB") {
  return value.toLocaleString("ru", {
    style: "currency",
    currency: code,
    currencyDisplay: "symbol"
  });
}

export function getCurrency(code="RUB"): CurrencyItem | undefined {
  return currencyDict[code];
}