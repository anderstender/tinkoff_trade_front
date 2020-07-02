<template>
  <div class="v-operation-header">
    <b-col class="v-operation-header__row" cols="4">Время</b-col>
    <b-col class="v-operation-header__row" cols="2">Операция</b-col>
    <b-col class="v-operation-header__row" cols="2">Инструмент</b-col>
    <b-col class="v-operation-header__row" cols="2">Количество</b-col>
    <b-col class="v-operation-header__row" cols="2">Сумма</b-col>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class VOperationHeader extends Vue {

  }
</script>

<style lang="scss">
  .v-operation-header {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    line-height: 1.41;
    justify-content: space-between;
    height: 24px;
    border-bottom: solid 1px #ddd;
    margin-bottom: 8px;
  }
</style>