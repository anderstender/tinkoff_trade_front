<template>
  <div class="v-balance-row-currency">
    <div class="v-balance-row-currency__top">
      <div class="v-balance-row-currency__top__name">{{name}}</div>
      <div class="v-balance-row-currency__top__sum">{{sum}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {CurrencyPosition} from "@/types/domain";
  import {currency, getCurrency} from "@/helpers/currencyHelper";

  @Component
  export default class VBalanceRowCurrency extends Vue {
    @Prop() currency !: CurrencyPosition;

    get name() {
      return getCurrency(this.currency.currency)?.name ?? this.currency.currency;
    }

    get sum() {
      return currency((this.currency.balance ?? 0), this.currency.currency);
    }
  }
</script>

<style lang="scss">
  .v-balance-row-currency {
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin-top: 8px;
    background: #efefef;

    & &__top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

</style>