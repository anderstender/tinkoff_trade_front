<template>
  <b-container class="v-balance-container">
    <v-spinner v-if="loading"/>
    <template v-else>
      <template v-if="portfolioList.length">
        <div class="v-balance-container__h2">Акции</div>
        <v-balance-row v-for="(pos, index) in portfolioList"
           :key="'p_' + index"
           :position="pos"
            @click="(e) => $emit('instrument-click', e)"
        />
      </template>

      <template v-if="currenciesList.length">
        <div class="v-balance-container__h2">Валюта</div>
        <v-balance-row-currency v-for="(cur, index) in currenciesList"
            :key="'c_' +index"
            :currency="cur"/>
      </template>
    </template>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {vCabinetModule} from "@/store/vCabinet.module";
  import {Currencies, Portfolio, PortfolioPosition} from "@/types/domain";
  import VBalanceRow from "@/components/balance/VBalanceRow.vue";
  import VBalanceRowCurrency from "@/components/balance/VBalanceRowCurrency.vue";
  import VSpinner from '@/components/VSpinner.vue';

  import {
    TINKOFF_PORTFOLIO_GET,
    TINKOFF_PORTFOLIO_CURRENCIES_GET,
    FRONT_PORTFOLIO_GET,
    FRONT_PORTFOLIO_CURRENCIES_GET
  } from '@/events/constants';


  @Component({
    components: {
      VBalanceRow,
      VBalanceRowCurrency,
      VSpinner
    }
  })
  export default class VBalance extends Vue {
    @vCabinetModule.State portfolio !: Portfolio;
    @vCabinetModule.State currencies !: Currencies;

    @vCabinetModule.Mutation setPortfolio;
    @vCabinetModule.Mutation setCurrencies;

    loading: boolean = true;

    get portfolioList() {
      return this.portfolio.positions;
    }

    get currenciesList() {
      return this.currencies.currencies.filter(cur => cur.balance)
    }

    updatePortfolio(portfolio: Portfolio) {
      this.setPortfolio(portfolio);
      this.loading = false;
    }

    updateCurrencies(currencies: Currencies) {
      this.setCurrencies(currencies);
      this.loading = false;
    }

    async created(){
      this.loading = true;
      this.TS.on(TINKOFF_PORTFOLIO_GET, this.updatePortfolio);
      this.TS.on(TINKOFF_PORTFOLIO_CURRENCIES_GET, this.updateCurrencies);


      this.TS.emit(FRONT_PORTFOLIO_GET, {});
      this.TS.emit(FRONT_PORTFOLIO_CURRENCIES_GET, {});
    }


    async beforeDestroy() {
      this.TS.clear(TINKOFF_PORTFOLIO_GET, this.updatePortfolio);
      this.TS.clear(TINKOFF_PORTFOLIO_CURRENCIES_GET, this.updateCurrencies);
    }
  }
</script>

<style lang="scss">
  .v-balance-container {
    padding: 8px;
    background: #f9f9f9;
    max-height: 48vh;
    min-height: 48vh;
    overflow-y: auto;

    & &__h2 {
      margin-top: 16px;
    }
  }
</style>