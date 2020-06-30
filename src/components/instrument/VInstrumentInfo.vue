<template>
  <b-container class="v-instrument-info-container">

  </b-container>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import {PortfolioPosition} from '@/types/domain';

  @Component
  export default class VInstrumentInfo extends Vue {
    @Prop() position !: PortfolioPosition;

    async created() {
      this.TS.on('tinkoff:operations:get', (message, ws) => {
        console.log(message);
      })

      this.reqOperationData(this.position);
    }

    @Watch('position')
    reqOperationData(position: PortfolioPosition) {
      this.TS.emit('front:operations:get', {
        from: new Date(2020, 1, 1).toISOString(),
        to: (new Date()).toISOString(),
        figi: position.figi
      });
    }
  }
</script>

<style lang="scss">
</style>