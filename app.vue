<template>
  <div id="main" class="w-full h-full fixed overflow-hidden bg-black flex justify-center items-center">
      <div class="w-8/12 h-5/6 bg-white/50 rounded-md p-6 backdrop-blur">
      <div class="flex items-end">
        <div class="w-10/12">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            FTM Address : {{adr}}
          </label>
          <input 
          v-model="adr" class="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adr" type="text" placeholder="0x...">
        </div>
        <div class="w-2/12 pl-1">
          <button @click="check" class="shadow appearance-none border-none  rounded w-full py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 leading-tight focus:outline-none focus:shadow-outline" type="button">CHECK</button>
        </div>
      </div>
      <div class="flex items-end mt-4 flex-wrap">
        <Nft v-for="id in ids" v-bind:key="id" v-bind:nft_id="id"></Nft>
      </div>
      </div>
  </div>
</template>
<script setup>
  import '@/assets/css/main.css';
</script>
<script>
import contractChad from './abi.js'
import Nft from './nft.vue';
import 'web3/dist/web3.min.js'
export default {
  components:{
    Nft
  },
  data() {
    return {
      adr: '',
      ids: [],
    }
  },
  methods:{
    async check(){
      this.ids = []
      const web3 = new Web3('https://rpcapi.fantom.network')
      var contract = new web3.eth.Contract(contractChad.abi, contractChad.adr);
      contract.methods.getTokensOf(this.adr).call({from: '0x453fA7DE96528738d8C9a73c8Af54c613ba96cE2'})
      .then((result) => {
        this.ids = result
      });
    }
  },
}
</script>
<style>
#main{
  background: url(@/assets/img/bg.jpg);
  background-size: cover;
}
</style>