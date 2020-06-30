<template>
  <b-container class="v-balance-container">

    <div class="v-balance-container__h2">Акции</div>
    <v-balance-row v-for="(pos, index) in portfolioList"
       :key="'p_' + index"
       :position="pos"
        @click="(e) => $emit('instrument-click', e)"
    />

    <div class="v-balance-container__h2">Валюта</div>
    <v-balance-row-currency v-for="(cur, index) in currenciesList"
        :key="'c_' +index"
        :currency="cur"/>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {vCabinetModule} from "@/store/vCabinet.module";
  import {Currencies, Portfolio, PortfolioPosition} from "@/types/domain";
  import VBalanceRow from "@/components/balance/VBalanceRow.vue";
  import VBalanceRowCurrency from "@/components/balance/VBalanceRowCurrency.vue";


  @Component({
    components: {
      VBalanceRow,
      VBalanceRowCurrency
    }
  })
  export default class VBalance extends Vue {
    @vCabinetModule.State portfolio !: Portfolio;
    @vCabinetModule.State currencies !: Currencies;

    get portfolioList() {
      return this.portfolio.positions;
    }

    get currenciesList() {
      return this.currencies.currencies.filter(cur => cur.balance)
    }

    async created(){
      setInterval(() => {
        this.TS.emit('front:portfolio:get', {});
        this.TS.emit('front:portfolio_currencies:get', {});
      },500);/**/
    }
  }
</script>

<style lang="scss">
  .v-balance-container {
    padding: 8px;
    background: #f9f9f9;

    & &__h2 {
      margin-top: 16px;
    }
  }
</style>