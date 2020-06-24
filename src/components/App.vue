<template>
  <div>
    test
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import TSocket from "@/socket/TSocket";

  @Component
  export default class App extends Vue {
    ts?: TSocket;

    async created(){

      this.ts = await (new TSocket()).connect();
      if(!this.ts) return ;


      this.ts.on('tinkoff:orderbook:update', (message) => {
      });

      this.ts.emit('from:front:event', 'Привет, Андрей!')
    }
  }
</script>

<style lang="scss">
</style>