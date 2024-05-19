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
    <h3>금융 회사명</h3>
    <p>{{ product.kor_co_nm }}</p><hr>
    <h3>유의 사항</h3>
    <p>{{ product.etc_note }}</p><hr>
    <h3>가입 제한</h3>
    <p>{{ product.join_deny }}</p><hr>
    <h3>가입 대상</h3>
    <p>{{ product.join_member }}</p><hr>
    <h3>가입 방법</h3>
    <p>{{ product.join_way }}</p><hr>
    <h3>우대 조건</h3>
    <p>{{ product.spcl_cnd }}</p><hr>
    <h3>만기후 이자율</h3>
    <p>{{ product.mtrt_int }}</p><hr>
  </div>
  <!-- 같은 회사, 같은 상품 코드 같은 만기후 이자율 등 다른 상품 보기 -->
</template>


<script setup>
import { useRoute } from 'vue-router'
import { useBankStore } from '@/stores/bank'

const route = useRoute()
const store = useBankStore()

const productId = parseInt(route.params.id)
const product = store.products.find((element) => element.id === productId)

// products의 options를 불러오도록 하자
// const product_options = () => {
//   axios({
//     method: 'get',
//     url: `http://127.0.0.1:8000/api/deposit-products-options/<str:fin_prdt_cd>/`,
//     headers: {
//       Authorization: `Token ${store.token}`
//     }
//   })
//   .then(() => {
//     alert('회원 탈퇴가 완료되었습니다.')
//     store.logout()
//     router.push({ name: 'home' })
//   })
//   .catch((error) => {
//     console.error('회원 탈퇴 중 오류 발생:', error)
//     alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.')
//   })
// }
</script>


<style scoped>
</style>