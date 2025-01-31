<template>
  <b-container class="v-instrument-info-container">
    <v-spinner v-if="loading"/>
    <div v-else>
      <v-operations-list v-if="currentPosition"/>
    </div>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import {Operations, PortfolioPosition} from '@/types/domain';
  import {vCabinetModule} from "@/store/vCabinet.module";
  import PositionContainer from "@/store/models/PositionContainer";
  import VOperationsList from "@/components/operations/VOperationsList.vue";
  import VSpinner from '@/components/VSpinner.vue';


  import {
    TINKOFF_OPERATIONS_GET,
    FRONT_OPERATIONS_GET } from "@/events/constants";

  @Component({
    components: {
      VOperationsList,
      VSpinner
    }
  })
  export default class VInstrumentInfo extends Vue {
    @Prop() position !: PortfolioPosition;

    @vCabinetModule.State currentPosition!: PositionContainer;
    @vCabinetModule.Mutation setCurrentPosition!: (operations: PositionContainer | null) => void;

    operationsGetHandle(message, ws) {
      if(this.currentPosition){
        this.currentPosition.setOperations(message as Operations);
      }
    }

    async created() {
      this.TS.on(TINKOFF_OPERATIONS_GET, this.operationsGetHandle);

      this.reqOperationData(this.position);
    }

    async beforeDestroy() {
      this.setCurrentPosition(null);
      this.TS.clear(TINKOFF_OPERATIONS_GET, this.operationsGetHandle);
    }

    @Watch('position')
    reqOperationData(position: PortfolioPosition) {
      const positionContainer = new PositionContainer(position);
      this.setCurrentPosition(positionContainer);
      this.TS.emit(FRONT_OPERATIONS_GET, {
        from: new Date(2020, 1, 1).toISOString(),
        to: (new Date()).toISOString(),
        figi: position.figi
      });
    }

    get loading() {
      return (this.currentPosition?.loading ?? true);
    }
  }
</script>

<style lang="scss">
  .v-instrument-info-container {
    max-height: 48vh;
    min-height: 48vh;
    overflow-y: auto;
    padding: 8px;
    background: #f9f9f9;
    margin-top: 8px;
  }
</style>