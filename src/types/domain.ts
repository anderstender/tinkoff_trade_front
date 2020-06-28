/**
 ** This file was generated automatically by @tinkoff/invest-types-generator
 ** do not try amending it manually
 **/
declare type Empty = {
  trackingId: string;
  payload: any;
  status: string;
};
declare type Error = {
  trackingId: string;
  status: string;
  payload: ErrorPayload;
};
declare type PortfolioResponse = {
  trackingId: string;
  status: string;
  payload: Portfolio;
};
declare type Portfolio = {
  positions: PortfolioPosition[];
};
declare type UserAccountsResponse = {
  trackingId: string;
  status: string;
  payload: UserAccounts;
};
declare type UserAccounts = {
  accounts: UserAccount[];
};
declare type UserAccount = {
  brokerAccountType: BrokerAccountType;
  brokerAccountId: string;
};
declare type PortfolioCurrenciesResponse = {
  trackingId: string;
  status: string;
  payload: Currencies;
};
declare type Currencies = {
  currencies: CurrencyPosition[];
};
declare type CurrencyPosition = {
  currency: Currency;
  balance: number;
  blocked?: number;
};
declare type PortfolioPosition = {
  figi: string;
  ticker?: string;
  isin?: string;
  instrumentType: InstrumentType;
  balance: number;
  blocked?: number;
  expectedYield?: MoneyAmount;
  lots: number;
  averagePositionPrice?: MoneyAmount;
  averagePositionPriceNoNkd?: MoneyAmount;
  name: string;
};
declare type MoneyAmount = {
  currency: Currency;
  value: number;
};
declare type OrderbookResponse = {
  trackingId: string;
  status: string;
  payload: Orderbook;
};
declare type Orderbook = {
  figi: string;
  depth: number;
  bids: OrderResponse[];
  asks: OrderResponse[];
  tradeStatus: TradeStatus;
  minPriceIncrement: number;
  faceValue?: number;
  lastPrice?: number;
  closePrice?: number;
  limitUp?: number;
  limitDown?: number;
};
declare type OrderResponse = {
  price: number;
  quantity: number;
};
declare type CandlesResponse = {
  trackingId: string;
  status: string;
  payload: Candles;
};
declare type Candles = {
  figi: string;
  interval: CandleResolution;
  candles: Candle[];
};
declare type Candle = {
  figi: string;
  interval: CandleResolution;
  o: number;
  c: number;
  h: number;
  l: number;
  v: number;
  time: string;
};
declare type OperationsResponse = {
  trackingId: string;
  status: string;
  payload: Operations;
};
declare type Operations = {
  operations: Operation[];
};
declare type OperationTrade = {
  tradeId: string;
  date: string;
  price: number;
  quantity: number;
};
declare type Operation = {
  id: string;
  status: OperationStatus;
  trades?: OperationTrade[];
  commission?: MoneyAmount;
  currency: Currency;
  payment: number;
  price?: number;
  quantity?: number;
  figi?: string;
  instrumentType?: InstrumentType;
  isMarginCall: boolean;
  date: string;
  operationType?: OperationTypeWithCommission;
};
declare type OrdersResponse = {
  trackingId: string;
  status: string;
  payload: Order[];
};
declare type Order = {
  orderId: string;
  figi: string;
  operation: OperationType;
  status: OrderStatus;
  requestedLots: number;
  executedLots: number;
  type: OrderType;
  price: number;
};
declare type LimitOrderRequest = {
  lots: number;
  operation: OperationType;
  price: number;
};
declare type LimitOrderResponse = {
  trackingId: string;
  status: string;
  payload: PlacedLimitOrder;
};
declare type PlacedLimitOrder = {
  orderId: string;
  operation: OperationType;
  status: OrderStatus;
  rejectReason?: string;
  message?: string;
  requestedLots: number;
  executedLots: number;
  commission?: MoneyAmount;
};
declare type MarketOrderRequest = {
  lots: number;
  operation: OperationType;
};
declare type MarketOrderResponse = {
  trackingId: string;
  status: string;
  payload: PlacedMarketOrder;
};
declare type PlacedMarketOrder = {
  orderId: string;
  operation: OperationType;
  status: OrderStatus;
  rejectReason?: string;
  message?: string;
  requestedLots: number;
  executedLots: number;
  commission?: MoneyAmount;
};
declare type TradeStatus = "NormalTrading" | "NotAvailableForTrading";
declare type OperationType = "Buy" | "Sell";
declare type OperationTypeWithCommission = "Buy" | "BuyCard" | "Sell" | "BrokerCommission" | "ExchangeCommission" | "ServiceCommission" | "MarginCommission" | "OtherCommission" | "PayIn" | "PayOut" | "Tax" | "TaxLucre" | "TaxDividend" | "TaxCoupon" | "TaxBack" | "Repayment" | "PartRepayment" | "Coupon" | "Dividend" | "SecurityIn" | "SecurityOut";
declare type OperationStatus = "Done" | "Decline" | "Progress";
declare type CandleResolution = "1min" | "2min" | "3min" | "5min" | "10min" | "15min" | "30min" | "hour" | "day" | "week" | "month";
declare type OrderStatus = "New" | "PartiallyFill" | "Fill" | "Cancelled" | "Replaced" | "PendingCancel" | "Rejected" | "PendingReplace" | "PendingNew";
declare type OrderType = "Limit" | "Market";
declare type SandboxRegisterRequest = {
  brokerAccountType?: BrokerAccountType;
};
declare type SandboxRegisterResponse = {
  trackingId: string;
  status: string;
  payload: SandboxAccount;
};
declare type SandboxAccount = {
  brokerAccountType: BrokerAccountType;
  brokerAccountId: string;
};
declare type SandboxSetCurrencyBalanceRequest = {
  currency: SandboxCurrency;
  balance: number;
};
declare type SandboxSetPositionBalanceRequest = {
  figi?: string;
  balance: number;
};
declare type MarketInstrumentListResponse = {
  trackingId: string;
  status: string;
  payload: MarketInstrumentList;
};
declare type MarketInstrumentList = {
  total: number;
  instruments: MarketInstrument[];
};
declare type SearchMarketInstrumentResponse = {
  trackingId: string;
  status: string;
  payload: SearchMarketInstrument;
};
declare type MarketInstrumentResponse = {
  trackingId: string;
  status: string;
  payload: MarketInstrument;
};
declare type SearchMarketInstrument = {
  figi: string;
  ticker: string;
  isin?: string;
  minPriceIncrement?: number;
  lot: number;
  currency?: Currency;
  name: string;
  type: InstrumentType;
};
declare type MarketInstrument = {
  figi: string;
  ticker: string;
  isin?: string;
  minPriceIncrement?: number;
  lot: number;
  currency?: Currency;
  name: string;
  type: InstrumentType;
};
declare type SandboxCurrency = "RUB" | "USD" | "EUR" | "GBP" | "HKD" | "CHF" | "JPY" | "CNY" | "TRY";
declare type Currency = "RUB" | "USD" | "EUR" | "GBP" | "HKD" | "CHF" | "JPY" | "CNY" | "TRY";
declare type InstrumentType = "Stock" | "Currency" | "Bond" | "Etf";
declare type BrokerAccountType = "Tinkoff" | "TinkoffIis";
declare type ErrorPayload = {
  message?: string;
  code?: string;
};

export { BrokerAccountType, Candle, CandleResolution, Candles, CandlesResponse, Currencies, Currency, CurrencyPosition, Empty, Error, ErrorPayload, InstrumentType, LimitOrderRequest, LimitOrderResponse, MarketInstrument, MarketInstrumentList, MarketInstrumentListResponse, MarketInstrumentResponse, MarketOrderRequest, MarketOrderResponse, MoneyAmount, Operation, OperationStatus, OperationTrade, OperationType, OperationTypeWithCommission, Operations, OperationsResponse, Order, OrderResponse, OrderStatus, OrderType, Orderbook, OrderbookResponse, OrdersResponse, PlacedLimitOrder, PlacedMarketOrder, Portfolio, PortfolioCurrenciesResponse, PortfolioPosition, PortfolioResponse, SandboxAccount, SandboxCurrency, SandboxRegisterRequest, SandboxRegisterResponse, SandboxSetCurrencyBalanceRequest, SandboxSetPositionBalanceRequest, SearchMarketInstrument, SearchMarketInstrumentResponse, TradeStatus, UserAccount, UserAccounts, UserAccountsResponse };
