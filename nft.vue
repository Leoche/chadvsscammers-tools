<template>
    <div class="w-3/12 p-1 box-border">
    <div class="bg-white/30 rounded-md p-2 text-center">
        <span class="text-xs text-center text-blue-700" v-if="isThief === true">Chad #{{nft_id}}</span>
        <span class="text-xs text-center text-red-700" v-if="isThief === false">Scammer #{{nft_id}}</span>
        <div v-if="isThief === null" class="animate-pulse h-5 bg-white rounded"></div>
        <div class="bg-white/80 rounded-md py-1 px-2 mt-1 text-xs ">
            <div v-if="revenue === null" class="animate-pulse h-3 bg-white rounded"></div>
            <span v-if="revenue !== null">{{revenue}} BAT</span>
        </div>
    </div>
    </div>
    
</template>
<script>
import contractChad from './abi.js'
import 'web3/dist/web3.min.js'
export default {
  props:['nft_id'],
  data() {
    return {
      revenue: null,
      isThief: null
    }
  },
  mounted: async function(){
      const web3 = new Web3('https://rpcapi.fantom.network');
      var contract = new web3.eth.Contract(contractChad.abi, contractChad.adr);

      contract.methods.estimatedRevenuesOf([this.nft_id]).call({from:'0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
        this.revenue = Math.floor(result/Math.pow(10,18));
        this.$emit('revenueUpdate', this.revenue)
      });

      contract.methods.isThief(this.nft_id).call({from:'0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
          this.isThief = result;
      });
  }
}
</script>