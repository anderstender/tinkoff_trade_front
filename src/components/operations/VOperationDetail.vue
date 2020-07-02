<template>
  <div class="v-operation-detail">
    <div class="v-operation-detail__h2">{{operationType}}</div>
    <div class="v-operation-detail__diff">
      <v-balance-diff
        :show-arrow="false"
        :show-percent="false"
        :diff="operation.payment"/>
    </div>

    <div class="v-operation-detail__info">
      <div class="v-operation-detail__info__row">
        <div class="v-operation-detail__info__row__label">Количество</div>
        <div class="v-operation-detail__info__row__value">{{qnt}} шт.</div>
      </div>
      <div class="v-operation-detail__info__row">
        <div class="v-operation-detail__info__row__label">Цена</div>
        <div class="v-operation-detail__info__row__value">{{priceText}}</div>
      </div>
      <div class="v-operation-detail__info__row" v-if="nkd && hasNKD">
        <div class="v-operation-detail__info__row__label">НКД</div>
        <div class="v-operation-detail__info__row__value">{{nkd}}</div>
      </div>
      <div class="v-operation-detail__info__row">
        <div class="v-operation-detail__info__row__label">Комиссия</div>
        <div class="v-operation-detail__info__row__value">{{commission}}</div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {Operation, PortfolioPosition} from '@/types/domain';
  import {operations} from '@/helpers/translates';
  import VBalanceDiff from '@/components/balance/VBalanceDiff.vue';

  @Component({
    components: {
      VBalanceDiff
    }
  })
  export default class VOperationDetail extends Vue {
    @Prop({required: true}) operation !: Operation;
    @Prop({required: true}) position !: PortfolioPosition;

    get operationType() {
      return operations(this.operation.operationType);
    }
    get qnt() {
      return this.operation?.quantity ?? 1;
    }

    get nkd(){
      if(!this.operation) return 0;
      return Math.abs(this.price * this.qnt - Math.abs(this.operation.payment)).currency(this.operation.currency);
    }

    get price() {
      return this.operation?.price ?? 0;
    }

    get priceText() {
      return this.price.currency(this.operation.currency);
    }

    get commission() {
      return (this.operation.commission?.value ?? 0).currency(this.operation.commission?.currency);
    }


    get hasNKD() {
      return this.position.instrumentType === 'Bond';
    }
  }
</script>

<style lang="scss">
  .v-operation-detail {
    display: flex;
    flex-direction: column;


    & &__h2 {
      text-align: center;
      font-size: 18px;
      color: #666666;
    }

    & &__info {
      display: flex;
      flex-direction: column;
      &__row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &:not(:last-child) {
          border-bottom: solid 1px #dddddd;
        }
      }
    }

    & &__diff {
      font-size: 14px;
      .v-balance-diff-container {
        justify-content: center;
      }
    }
  }
</style>