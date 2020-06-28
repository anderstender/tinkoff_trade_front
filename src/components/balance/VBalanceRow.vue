<template>
  <div class="v-balance-row" @click.stop="instrumentPortfolio">
    <div class="v-balance-row__top">
      <div class="v-balance-row__top__name">{{name}}</div>
      <div class="v-balance-row__top__sum">{{sum}}</div>
    </div>
    <div class="v-balance-row__bottom">
      <div class="v-balance-row__bottom__balance">{{position.balance}} шт.</div>
      <div class="v-balance-row__bottom__change">{{change}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {PortfolioPosition} from "@/types/domain";
  import {currency} from "@/helpers/currencyHelper";


  @Component
  export default class VBalanceRow extends Vue {
    @Prop() position !: PortfolioPosition;




    instrumentPortfolio(){
      this.TS.on('tinkoff:instrument_portfolio:get', (message, ws) => {
        console.log(message);
      });
    }

    get sum() {
      return currency((this.position.averagePositionPrice?.value ?? 0) * this.position.balance, this.position.averagePositionPrice?.currency);
    }

    get name() {
      return `${this.position.name}(${this.position.ticker})`;
    }

    get changeValue() {
      return this.position.expectedYield?.value ?? 0;
    }

    get changeSymbol() {
      return this.changeValue > 0 ? '+' : '';
    }

    get change() {
      return this.changeSymbol + currency(this.changeValue, this.position.expectedYield?.currency)
    }
  }
</script>

<style lang="scss">
  .v-balance-row {
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin-top: 8px;
    background: #efefef;
    cursor: pointer;

    & &__top,
    & &__bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &:hover {
      background: #e1e1e1;
    }
  }
</style>