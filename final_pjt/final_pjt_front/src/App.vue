<template>
  <div class="container">
    <!-- 로그인이 되지 않은 경우 -> home, 로그인, 회원가입 -->
    <div v-if="!store.isLogin">
      <RouterLink :to="{ name: 'home'}">Home</RouterLink> | 
      <RouterLink :to="{ name: 'login'}">로그인</RouterLink> | 
      <RouterLink :to="{ name: 'signup'}">회원 가입</RouterLink> | 
      <RouterLink :to="{ name: 'products'}">전체 상품 목록</RouterLink>
    </div>
    <!-- 로그인이 된 경우 -> home, 로그아웃, 전체 상품 목록 조회 -->
    <!-- 회원 탈퇴의 경우에는 마이페이지에서 사용 -->
    <div v-else>
      <RouterLink :to="{ name: 'home'}">Home</RouterLink> | 
      <RouterLink :to="{ name: 'products'}">전체 상품 목록</RouterLink> | 
      <!-- <RouterLink :to="{ name: 'profile', params: { userId: id }}">전체 상품 목록</RouterLink> -->
      <button @click="logout">로그 아웃</button>
    </div>
  </div>
  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useBankStore } from './stores/bank'

const store = useBankStore()
</script>


<style scoped>
</style>