<template>
  <div class="v-balance-diff-container" :class="changeClass">
    <b-icon class="v-balance-diff-container__icon" v-if="showArrow && arrowIcon" :icon="arrowIcon" />
    <div class="v-balance-diff-container__text">
      {{changeText}}
      <template v-if="showPercent">
        ({{changePercent}}%)
      </template>
    </div>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component
  export default class VBalanceDiff extends Vue {
    @Prop({default: true}) showArrow !: boolean;
    @Prop({default: true}) showPercent !: boolean;
    @Prop({default: 0}) diff !: number;
    @Prop({default: 0}) diffPercent !: number;
    @Prop({default: "RUB"}) currency !: string;

    get changeClass() {
      return this.diff > 0 ? 'text-success' : (this.diff < 0 ? 'text-danger' : 'text-secondary');
    }

    get arrowIcon(): string | false {
      return this.diff > 0 ? 'arrow-up' : (this.diff < 0 ? 'arrow-down' : false);
    }

    get changeText() {
      return this.diff.currency(this.currency);
    }

    get changePercent() {
      return this.diffPercent.splitZeros();
    }
  }
</script>

<style lang="scss">
  .v-balance-diff-container {
    display: flex;
    flex-direction: row;
    & &__icon {
      font-size: 121%;
    }
    & &__text {
      display: flex;
      flex-direction: row;
    }
  }
</style>