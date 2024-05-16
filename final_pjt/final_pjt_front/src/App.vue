<template>
  <div class="container">
    <!-- 로그인이 되지 않은 경우 -> home, 로그인, 회원가입 -->
    <RouterLink :to="{ name: 'home'}">Home</RouterLink> | 
    <RouterLink :to="{ name: 'login'}">로그인</RouterLink> | 
    <RouterLink :to="{ name: 'signup'}">회원 가입</RouterLink> | 
    <RouterLink :to="{ name: 'products'}">전체 상품 목록</RouterLink>
    <!-- 로그인이 된 경우 -> home, 로그아웃, 전체 상품 목록 조회 -->
    <!-- 회원 탈퇴의 경우에는 마이페이지에서 사용 -->
  </div>
  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style scoped>
</style>