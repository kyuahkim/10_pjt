<template>
  <div>
    <h1>상품 세부 정보</h1>
  </div>
  <hr>
  <div>
    <h3>금융 상품명</h3>
    <p>
      {{ product.fin_prdt_nm }}
      <button @click.prevent="store.interest(product.id)" class="btn">
        <span v-if="store.currentUserData.financial_products.includes(product.id)">❤️</span>
        <span v-else>🤍</span>
      </button>
    </p><hr>
    <h5>금융 회사</h5>
    <p>{{ product.kor_co_nm }}</p>
    <h5>유의 사항</h5>
    <p>{{ product.etc_note }}</p>
    <h5>가입 제한</h5>
    <p>{{ product.join_deny }}</p>
    <h5>가입 대상</h5>
    <p>{{ product.join_member }}</p>
    <h5>가입 방법</h5>
    <p>{{ product.join_way }}</p>
    <h5>우대 조건</h5>
    <p>{{ product.spcl_cnd }}</p>
    <h5>만기후 이자율</h5>
    <p>{{ product.mtrt_int }}</p>
  </div>
  <hr>
  <div>
    <h3>금융 상품 옵션</h3>
    <br>
    <div v-for="productOption of productOptions">
      <p>타입 : {{ productOption.id - type + 1 }}</p>
      <p>저축 금리 유형 : {{ productOption.intr_rate_type_nm }}</p>
      <p>저축 기간 [단위: 개월] : {{ productOption.save_trm }}</p>
      <p>저축 금리 [소수점 2자리] : {{ productOption.intr_rate }}</p>
      <p>최고 우대 금리 [소수점 2자리] : {{ productOption.intr_rate2 }}</p>
      <hr>
    </div>
  </div>
  <div>
    <RouterLink
      :to="{ name: 'products'}">
      목록으로 돌아가기
    </RouterLink>
  </div>
  <!-- 같은 회사, 같은 상품 코드 같은 만기후 이자율 등 다른 상품 보기 -->
  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useBankStore } from '@/stores/bank'
import { onMounted, ref } from 'vue'
import axios from 'axios';

const route = useRoute()
const store = useBankStore()

const productId = parseInt(route.params.id)
const product = store.products.find((element) => element.id === productId)
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
  fetchProductOptions(product)
})
</script>


<style scoped>
</style>