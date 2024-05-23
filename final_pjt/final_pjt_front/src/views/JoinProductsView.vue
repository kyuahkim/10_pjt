<template>
  <h1>가입한 상품 목록</h1>
  <hr>

  <div class="row ">
    <div class="col-12 mb-4">
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
                  <tr v-for="product in products" :key="product.id" @click="goToDetail(product.id)">
                    <td>{{ product.kor_co_nm }}</td>
                    <td>{{ product.fin_prdt_nm }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <br>
              관심 상품을 등록해주세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
  <h1>가입한 상품 금리를 한번에 모아보세요</h1>
  <hr>
  <div v-if="chartData">
    <div class="row justify-content-center">
      <div class="col-12 mx-4">
        <div class="chart-container">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useBankStore } from '@/stores/bank'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useBankStore()
const productsNumbers = ref([])

const userId = ref(route.params.userId)

const getProductById = (id) => store.products.find(product => product.id === id)
const productOptions = ref({})
const type = ref(0)

const fetchProductOptions = (product) => {
  axios({
    method: 'get',
    url: `http://127.0.0.1:8000/api/deposit-products-options/${product.fin_prdt_cd}/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then(response => {
      productOptions.value = response.data
      type.value = productOptions.value[0].id
    })
    .catch(error => {
      console.error('Error fetching product options:', error)
    })
}

const goToDetail = function (id){
  router.push({ name: 'detail', params:{ id: id } })
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
        color: 'black'
      },
    },
    title: {
      display: true,
      text: '가입한 상품 금리',
      labels: {
        font: {
          family: 'Gowun Batang',
          size: 40, 
        },
      },
    },
    tooltip: {
      opacity: 1.0,
    },
  },
  elements: {
    bar: {
      borderWidth: 2, // Set border width for bars
      borderColor: 'rgba(0,0,0,0.2)', // Set border color for bars
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          family: 'Gowun Batang',
          size: 14,
        },
      },
    },
    x: {
      ticks: {
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
        backgroundColor: '#7F92DB',
        data: intrRates,
      },
      {
        label: '최고우대금리',
        backgroundColor: '#80AFDC',
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
  productsNumbers.value = store.currentUserData.financial_products
  // fetchProductOptions(product)
})
console.log(store.currentUserData)
</script>

<style scoped>

.chart-container{
  width: 70%;
  height: 40%;
  display: flex;
  justify-content: center;
}

</style>
