<template>
  <div>
    <ul>
      <li v-for="product of products">
        <!-- 이름만 가지고는 판별하기 힘들다 -->
        <!-- 어떤 특징을 쓸 것인지 고민 -> 이름, 은행이름, 금리...? -->
        <!-- 어느 부분을 눌러서 넘길건지 고민 -> 전체 박스인지 이름 클릭으로 넘길것인지? -->
        <RouterLink :to="{ name: 'detail', params:{ id: product.id } }">{{ product.name }}</RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useBankStore } from '@/stores/bank'

const store = useBankStore()
const products = store.products
</script>


<style scoped>
</style>