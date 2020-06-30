<template>
  <div class="v-balance-row" @click="$emit('click', position)">
    <div class="v-balance-row__top">
      <div class="v-balance-row__top__name">{{name}}</div>
      <div class="v-balance-row__top__sum">{{sum}}</div>
    </div>
    <div class="v-balance-row__bottom">
      <div class="v-balance-row__bottom__balance text-secondary">{{position.balance}} шт.</div>
      <div class="v-balance-row__bottom__change">
        <v-balance-change :position="position" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {PortfolioPosition} from "@/types/domain";
  import {currency} from "@/helpers/currencyHelper";
  import VBalanceChange from '@/components/balance/VBalanceChange.vue';

  @Component({
    components: {
      VBalanceChange
    }
  })
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
    margin-top: 8px;
    background: #efefef;
    cursor: pointer;

    & &__top,
    & &__bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    & &__bottom {
      line-height: 12px;
      &__balance {
        font-size: 12px;
      }
    }

    &:hover {
      background: #e1e1e1;
    }
  }
</style>