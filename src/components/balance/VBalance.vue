<template>
  <b-container class="v-balance-container">

    <v-balance-row v-for="(pos, index) in portfolio.positions"
       :key="index"
       :position="pos"/>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {vCabinetModule} from "@/store/vCabinet.module";
  import {Portfolio, PortfolioPosition} from "@/types/domain";
  import {currency} from "@/helpers/currencyHelper";
  import VBalanceRow from "@/components/balance/VBalanceRow.vue";


  @Component({
    components: {
      VBalanceRow
    }
  })
  export default class VBalance extends Vue {
    @vCabinetModule.State portfolio !: Portfolio;

    async created(){

    }

  }
</script>

<style lang="scss">
  .v-balance-container {
    padding: 8px;
    background: #efefef;
  }
</style>