<template>
  <div class="v-operation-row">
    
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {Operation} from "@/types/domain";

  @Component
  export default class VOperationRow extends Vue {
    @Prop() operation !: Operation;
  }
</script>

<style lang="scss">
  .v-operation-row {

  }
</style>