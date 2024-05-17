<template>
  <div>
    <h1>전체 상품 목록</h1>
    <p>'은행명 - 상품명', '관심 상품 등록 여부' 순서로 표시됩니다.</p>
    <hr>
    <ul>
      <li v-for="product of products">
        <!-- 이름만 가지고는 판별하기 힘들다 -->
        <!-- 어떤 특징을 쓸 것인지 고민 -> 이름, 은행이름, 금리...? -->
        <!-- 어느 부분을 눌러서 넘길건지 고민 -> 전체 박스인지 이름 클릭으로 넘길것인지? -->
        <RouterLink
          :to="{ name: 'detail', params:{ id: product.id } }">
          {{ product.kor_co_nm }} - {{ product.fin_prdt_nm }}
        </RouterLink>
        <button @click.prevent="store.interest(product.id)" class="btn">
          <span v-if="store.interestProdcuts.includes(product.id)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </li>
    </ul>
  </div>
  <RouterView />
</template>


<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useBankStore } from '@/stores/bank'

const store = useBankStore()
store.getProducts()
const products = store.products
</script>


<style scoped>
</style>