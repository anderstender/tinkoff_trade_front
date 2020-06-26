<template>
  <div>
    test
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import TSocket from "@/socket/TSocket";
  import {vPlotsModule, vPlotsNamespace} from '@/store/vPlots';
  import vPlots from '@/store/vPlots';

  @Component({
    vuexModules: {
      [vPlotsNamespace]: vPlots
    }
  })
  export default class App extends Vue {
    ts?: TSocket;

    @vPlotsModule.State graph;
    @vPlotsModule.Mutation push;

    async created(){
      this.push('test')
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