<template>
  <h1>환율 정보</h1>
  <hr>
  <div class="py-4 bg-light">
    <div class="row mx-3">
      <div class="col-12">
        <div>

          <h3>외화로 환전</h3>
          <p>한화 ⇒ 외화</p>


          <div class="input-group mb-3" style="height: 70px;">
            <select class="form-select form-select-sm" name="외화" id="foreign" v-model="selectedForeign" style="width: 20%;">
              <option value="" selected>국가/통화</option>
              <option v-for="exchange in exchanges" :key="exchange.cur_unit" :value="exchange.cur_unit">
                {{ exchange.cur_unit }} - {{ exchange.cur_nm }}
              </option>
            </select>
          <input class="form-control" type="text" id="calculatedWon" v-model.trim="calculatedWon" style="width: 80%;">
          <br>
          <p v-if="selectedExchange">
              {{ selectedExchange.cur_nm }} : {{ calculateToForeign() }}
            </p>
        </div>
        <br>
        <div>
          <h3>한화로 환전</h3>
          <p>외화 ⇒ 한화</p>
          <div class="input-group mb-3" style="height: 70px;">
            <select class="form-select form-select-sm" name="외화" id="foreignToWon" v-model="selectedForeignToWon" style="width: 20%;">
              <option value="" selected>국가/통화</option>
              <option v-for="exchange in exchanges" :key="exchange.cur_unit" :value="exchange.cur_unit">
                {{ exchange.cur_unit }} - {{ exchange.cur_nm }}
              </option>
            </select>
            <input class="form-control" type="text" id="calculatedForeign" v-model.trim="calculatedForeign" style="width: 80%;">
            <br>
            <p v-if="selectedExchangeToWon">
              {{ selectedExchangeToWon.cur_nm }} : {{ calculateToWon() }}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      exchanges: null,
      selectedForeign: '',
      selectedForeignToWon: '',
      selectedExchange: null,
      selectedExchangeToWon: null,
      calculatedWon : 0,
      calculatedForeign: 0,
    };
  },
  mounted() {
    this.get_exchange_rate();
  },
  methods: {
    async get_exchange_rate() {
      try {
        const response = await axios.get('http://localhost:8000/api/get_exchange_rate/')
        this.exchanges = response.data;
      } catch (error) {
        console.error('Error getting exchange rate data:', error)
      }
    },
    calculateToForeign() {
      if (!this.calculatedWon || !this.selectedExchange || !this.selectedExchange.tts) {
        return 'Invalid Input'
      }
      const tts = parseFloat(this.selectedExchange.tts.replace(/,/g, ''))
      const result = parseFloat(this.calculatedWon) / tts;
      this.calculatedForeign = result.toFixed(2)
      return result.toFixed(2)
    },
    calculateToWon() {
      if (!this.calculatedForeign || !this.selectedExchangeToWon || !this.selectedExchangeToWon.ttb) {
        return 'Invalid Input'
      }
      const ttb = parseFloat(this.selectedExchangeToWon.ttb.replace(/,/g, ''))
      const result = parseFloat(this.calculatedForeign) * ttb
      this.calculatedWon = result.toFixed(0)
      return result.toFixed(0)
    }
  },
  watch: {
    selectedForeign(newValue) {
      this.selectedExchange = this.exchanges.find(exchange => exchange.cur_unit === newValue);
    },
    selectedForeignToWon(newValue) {
      this.selectedExchangeToWon = this.exchanges.find(exchange => exchange.cur_unit === newValue);
    },
  },
}
</script>


<style scoped>
pre {
  background-color: #f8f9fa; /* Light grey background */
  padding: 15px;            /* Padding around the content */
  border-radius: 5px;       /* Rounded corners */
  border: 1px solid #dee2e6; /* Light grey border */
  color: 1px solid black;
  overflow: auto;           /* Enable scrolling if content overflows */
}
</style>