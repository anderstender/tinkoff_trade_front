<template>
  <b-container class="v-instrument-info-container">

    <v-balance-row v-for="(pos, index) in portfolio.positions"
                   :key="index"
                   :position="pos"/>
  </b-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class VInstrumentInfo extends Vue {

  }
</script>

<style lang="scss">
</style>