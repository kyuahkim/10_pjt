<template>
  <h1>가입한 상품 목록</h1>
  <hr>

  <div class="row ">
    <div class="col-12">
      <div class="card border-light shadow-sm ">
        <div class="card-body">
          <div class="mt-3 mb-3" style="margin-left:50px; margin-right:50px">
            <div v-if="products.length">
              <table class="table table-hover text-center">
                <thead class="bg-primary text-white">
                  <tr>
                    <th class="border-gray-200">은행명</th>
                    <th class="border-gray-200" style="width:700px;">상품명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td>{{ product.kor_co_nm }}</td>
                    <td>{{ product.fin_prdt_nm }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <br>
              가입한 상품이 없습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ productOptions }} -->
  <div v-if="chartData">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import { useBankStore } from '@/stores/bank'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const route = useRoute()
const store = useBankStore()
const productOptions = ref([])
const products = ref([])

const userId = ref(route.params.userId)

const getProductsByOptions = () => {
  const productIds = productOptions.value.map(option => option.product)
  return store.products.filter(product => productIds.includes(product.id))
}

const fetchProductOptions = () => {
  axios({
    method: 'get',
    url: `http://127.0.0.1:8000/api/user_join_options/`,
    headers: {
      Authorization: `Token ${store.token}`,
    },
  })
    .then(response => {
      productOptions.value = response.data
    })
    .catch(error => {
      console.error('Error fetching product options:', error)
    })
}

const chartData = ref(null)
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          family: 'Gowun Batang',
          size: 14, 
        },
      },
    },
    title: {
      display: true,
      text: '가입한 상품 금리',
      labels: {
        font: {
          family: 'Gowun Batang',
          size: 14, 
        },
      },
    },
  },
})

const loadChartData = () => {
  const productIds = productOptions.value.map(option => option.product)
  const products = store.products.filter(product => productIds.includes(product.id))
  const labels = products.map(product=>product.fin_prdt_nm)
  // label로 product name을 선택
  const intrRates = productOptions.value.map(option => option.intr_rate)
  const intrRates2 = productOptions.value.map(option => option.intr_rate2)

  const averageRate = intrRates.reduce((sum, rate) => sum + rate, 0) / intrRates.length
  const averageRate2 = intrRates2.reduce((sum, rate) => sum + rate, 0) / intrRates2.length

  const averageRatesArray = Array(intrRates.length).fill(averageRate)
  const averageRates2Array = Array(intrRates2.length).fill(averageRate2)

  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: '저축금리',
        backgroundColor: '#f87979',
        data: intrRates,
      },
      {
        label: '최고우대금리',
        backgroundColor: '#7acbf9',
        data: intrRates2,
      },
      // {
      //   label: 'Average Interest Rate',
      //   backgroundColor: '#f8e879',
      //   data: averageRatesArray,
      //   borderWidth: 1,
      //   borderColor: '#f8e879',
      //   type: 'line',
      // },
      // {
      //   label: 'Average Interest Rate 2',
      //   backgroundColor: '#79f8d1',
      //   data: averageRates2Array,
      //   borderWidth: 1,
      //   borderColor: '#79f8d1',
      //   type: 'line',
      // },
    ],
  }
}
watch(productOptions, (newOptions) => {
  products.value = getProductsByOptions()
  loadChartData()
})

onMounted(() => {
  store.getUserInfo()
  store.getCurrentUser()
  fetchProductOptions()
})
</script>

<style scoped>
@import url("@/assets/styles/main.css");


</style>
