<template>
  <div class="v-operations-list">
    <v-operation-row v-for="(op, index) in operationsList"
      :key="index"
      :operation="op"
      :position="operationsContainer.position"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import OperationsContainer from "@/store/models/OperationsContainer";
  import VOperationRow from "@/components/operations/VOperationRow.vue";


  @Component({
    components: {
      VOperationRow
    }
  })
  export default class VOperationsList extends Vue {
    @Prop() operationsContainer!: OperationsContainer;

    excludeOperationTypes = [
      "BrokerCommission",
      "ExchangeCommission",
      "ServiceCommission",
      "MarginCommission",
      "OtherCommission"
    ];

    get operationsList() {
      return (this.operationsContainer.operations || [])
        .filter(operation => !this.excludeOperationTypes.includes(String(operation.operationType)));
    }
  }
</script>

<style lang="scss">
  .v-operations-list {
    display: flex;
    flex-direction: column;
  }
</style>