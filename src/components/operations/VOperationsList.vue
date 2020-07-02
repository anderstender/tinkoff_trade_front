<template>
  <b-container class="v-operations-list">


    <v-operation-header />
    <v-operation-row v-for="(op, index) in operationsList"
      :key="index"
      :operation="op"
      :position="currentPosition.position"/>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import PositionContainer from "@/store/models/PositionContainer";
  import VOperationRow from "@/components/operations/VOperationRow.vue";
  import {vCabinetModule} from '@/store/vCabinet.module';
  import VOperationHeader from '@/components/operations/VOperationHeader.vue';


  @Component({
    components: {
      VOperationRow,
      VOperationHeader
    }
  })
  export default class VOperationsList extends Vue {
    @vCabinetModule.State currentPosition!: PositionContainer;

    excludeOperationTypes = [
      "BrokerCommission",
      "ExchangeCommission",
      "ServiceCommission",
      "MarginCommission",
      "OtherCommission"
    ];

    get operationsList() {
      return ((this.currentPosition && this.currentPosition.operations) || [])
        .filter(operation => !this.excludeOperationTypes.includes(String(operation.operationType)));
    }
  }
</script>

<style lang="scss">
  .v-operations-list {
    display: flex;
    flex-direction: column;

    &.container {
      margin-left: -15px;
      padding-right: 0;
      padding-left: 0;
    }
  }
</style>