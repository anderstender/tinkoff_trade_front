<template>
  <div class="v-operation-row" :id="targetId" tabindex="0">

      <b-col class="v-operation-row__row" cols="4" :title="date">{{date}}</b-col>
      <b-col class="v-operation-row__row" cols="2" :title="operationType">{{operationType}}</b-col>
      <b-col class="v-operation-row__row" cols="2" :title="instrumentName">{{instrumentName}}</b-col>
      <b-col class="v-operation-row__row" cols="2" :title="qntText">{{qntText}}</b-col>
      <v-balance-diff
        class="v-operation-row__diff v-operation-row__row col-2"
        :show-arrow="false"
        :show-percent="false"
        :diff="operation.payment"/>
    <b-popover
      custom-class="v-operation-row__popover"
      :target="targetId"
      triggers="click blur"
      placement="top"
      :title="positionName"
    >
      <v-operation-detail :operation="operation" :position="position"/>
    </b-popover>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {Operation, PortfolioPosition} from "@/types/domain";
  import VBalanceDiff from '@/components/balance/VBalanceDiff.vue';
  import {instrumentType} from '@/helpers/translates';
  import VOperationDetail from '@/components/operations/VOperationDetail.vue';
  const moment = require('moment');

  @Component({
    components: {
      VBalanceDiff,
      VOperationDetail
    }
  })
  export default class VOperationRow extends Vue {
    @Prop() operation !: Operation;
    @Prop() position !: PortfolioPosition;

    types = {
      "Buy": "Покупка",
      "Sell" : "Продажа"
    };

    get targetId() {
      return `v-operation-${this.operation.id}`;
    }

    get operationType() {
      return this.types[this.operation.operationType ?? ""] || "";
    }


    get positionName() {
      return this.position.name;
    }

    get instrumentName() {
      return instrumentType(this.operation.instrumentType);
    }

    get qntText() {
      return this.operation.quantity;
    }

    get date() {
      return moment(this.operation.date).format('YYYY.MM.DD HH:mm:ss');
    }

  }
</script>

<style lang="scss">
  .v-operation-row {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    justify-content: space-between;
    height: 24px;
    line-height: 24px;

    cursor: pointer;

    &__popover {
      min-width: 300px;
    }

    &:hover {
      background: #e1e1e1;
    }

    & &__row {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }

    & &__diff {
    }
  }
</style>