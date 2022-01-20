<template>
    <div class="w-3/12 p-1 box-border">
    <div class="bg-white/30 rounded-md p-2 text-center">
        <div>
          <div class="w-40 h-40 circle mx-auto animate-pulse bg-white/80 rounded-full	" v-if="isThief === null"></div>
          <div class="w-40 h-40 circle mx-auto bg-white/80 rounded" v-if="isThief !== null">
            <img :src="img" alt="">
          </div>
        </div>
        <span class="text-center text-black" v-if="isThief === true">{{name}}</span>
        <span class="text-center text-red-700" v-if="isThief === false">{{name}}</span>
        <span class="text-center text-black animate-pulse" v-if="isThief === null">Loading... #{{nft_id}}</span>
        <div class="bg-white/80 rounded-md py-1 px-2 mt-1 ">
            <div v-if="revenue === null" class="animate-pulse h-3 bg-white rounded"></div>
            <span v-if="revenue !== null">{{revenue}} BAT</span>
        </div>
    </div>
    </div>
    
</template>
<script>
import abiChad from '../abi.js'
import abiNft from '../nft.js'
import Web3 from 'web3/dist/web3.min.js'
export default {
  props:['nft_id'],
  data() {
    return {
      revenue: null,
      isThief: null,
      name:null,
      img:null,
    }
  },
  mounted: async function(){
      const web3 = new Web3('https://rpcapi.fantom.network');
      var contractBank = new web3.eth.Contract(abiChad.abi, abiChad.adr);
      var contractNft = new web3.eth.Contract(abiNft.abi, abiNft.adr);

      contractBank.methods.estimatedRevenuesOf([this.nft_id]).call({from:'0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
        this.revenue = Math.floor(result/Math.pow(10,18));
        this.$emit('revenueUpdate', this.revenue)
      });

      contractNft.methods.tokenURI(this.nft_id).call({from:'0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
        let decodedResult = JSON.parse(atob(result.split(',')[1]));
        console.log(decodedResult);
        this.name = decodedResult.name;
        this.img = decodedResult.image;
        this.isThief = decodedResult.name.includes('Chad');
      });

      /* contract.methods.isThief(this.nft_id).call({from:'0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
          this.isThief = result;
      }); */
  }
}
</script>