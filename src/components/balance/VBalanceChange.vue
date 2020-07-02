<template>
  <div class="v-balance-change-container" :class="changeClass">
    <div class="v-balance-change-container__text">
      <v-balance-diff :diff="this.change" :diff-percent="diffPercent" />
    </div>

  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {PortfolioPosition} from '@/types/domain';
  import {currency} from '@/helpers/currencyHelper';
  import VBalanceDiff from '@/components/balance/VBalanceDiff.vue';

  @Component({
    components: {
      VBalanceDiff
    }
  })
  export default class VBalanceChange extends Vue {
    @Prop() position !: PortfolioPosition;
    @Prop({default: true}) showPercent !: boolean;

    get changeClass() {
      return this.changePerAction > 0 ? 'text-success' : (this.changePerAction < 0 ? 'text-danger' : 'text-secondary');
    }

    get arrowIcon(): string | false {
      return this.changePerAction > 0 ? 'arrow-up' : (this.changePerAction < 0 ? 'arrow-down' : false);
    }

    get price() {
      return this.position.averagePositionPrice?.value ?? 0;
    }

    get basePrice() {
      return this.price - this.changePerAction;
    }

    get diffPercent() {
      return (Math.round(((this.changePerAction)/this.basePrice) * 100 * 100) / 100);
    }

    get changePercent() {
      return this.diffPercent.splitZeros();
    }

    get change() {
      return (this.position.expectedYield?.value ?? 0)
    }

    get changePerAction() {
      return this.change/this.position.balance;
    }

    get changeText() {
      return this.change.currency(this.position.expectedYield?.currency);
    }
  }
</script>

<style lang="scss">
  .v-balance-change-container {
    & &__text {
      font-size: 12px;
      line-height: 1.41;
    }
  }
</style>