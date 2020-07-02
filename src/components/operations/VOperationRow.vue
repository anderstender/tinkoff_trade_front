<template>
  <div class="v-operation-row">

    <div>{{operationType}} {{instrumentName}} {{operationName}} ({{operation.quantity}} шт.)</div>
    <v-balance-diff
      class="v-operation-row__diff"
      :show-arrow="false"
      :show-percent="false"
      :diff="operation.payment"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {Operation, PortfolioPosition} from "@/types/domain";
  import VBalanceDiff from '@/components/balance/VBalanceDiff.vue';
  import {instrumentType} from '@/helpers/translates';

  @Component({
    components: {VBalanceDiff}
  })
  export default class VOperationRow extends Vue {
    @Prop() operation !: Operation;
    @Prop() position !: PortfolioPosition;

    types = {
      "Buy": "Покупка",
      "Sell" : "Продажа"
    };

    get operationType() {
      return this.types[this.operation.operationType ?? ""] || "";
    }


    get operationName() {
      return this.position.name;
    }

    get instrumentName() {
      return instrumentType(this.operation.instrumentType).toLowerCase();
    }

  }
</script>

<style lang="scss">
  .v-operation-row {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    line-height: 1.41;
    justify-content: space-between;

    & &__diff {
      margin-left: 8px;
    }
  }
</style>