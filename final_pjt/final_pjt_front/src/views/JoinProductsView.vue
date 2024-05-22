<template>
  <h1>가입한 상품 목록</h1>
  <hr>

  <main class="content">
    <div class="row ">
      <div class="col-12 mb-4">
        <div class="card border-light shadow-sm ">
          <div class="card-body">
            <div  class="mt-3 mb-3" style="margin-left:50px; margin-right:50px">
              <div v-if="productsNumbers.length">
                <table class="table table-hover text-center">
                  <thead class="bg-primary text-white">
                    <tr>
                      <th class="border-gray-200">은행명</th>
                      <th class="border-gray-200" style="width:700px;">상품명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="number of productsNumbers">
                      <template v-if="product = getProductById(number)">
                        <td>{{ product.kor_co_nm }}</td>
                        <td>{{ product.fin_prdt_nm }}</td>
                      </template>
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
    </main>

  
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
onMounted(() => {
  store.getUserInfo()
  store.getCurrentUser()
  productsNumbers.value = store.currentUserData.financial_products
  // fetchProductOptions(product)
})
console.log(store.currentUserData)
</script>

<style scoped>

</style>