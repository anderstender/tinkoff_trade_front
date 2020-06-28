<template>
  <b-row align-v="stretch" class="v-balance-row">
    <b-row align-v="stretch" class="v-balance-row__top">
      <b-col cols="6">{{name}}</b-col>
      <b-col cols="6">{{sum}}</b-col>
    </b-row>
    <b-row align-v="stretch" class="v-balance-row__bottom">
      <b-col cols="2">{{position.balance}} шт.</b-col>
      <b-col cols="10">{{change}}</b-col>
    </b-row>
  </b-row>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {PortfolioPosition} from "@/types/domain";
  import {currency} from "@/helpers/currencyHelper";


  @Component
  export default class VBalanceRow extends Vue {
    @Prop() position !: PortfolioPosition;


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
  }
</style>