<template>
  <b-spinner class="v-spinner"
             type="grow"
             variant="info" />
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class VSpinner extends Vue {

  }
</script>

<style lang="scss">
  .v-spinner {
    margin-left: calc(50% - 16px);
    margin-top: calc(40% - 16px);
  }
</style>