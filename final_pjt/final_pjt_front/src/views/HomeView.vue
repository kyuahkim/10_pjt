<template>
  <div class="container">
    <h1>Home</h1>
    <hr>
    <div v-if="store.isLogin">
      <p>어서오세요 {{ store.currentUserData.nickname }}님!</p>
    </div>
    <div v-else>
      <p>로그인 또는 회원가입이 필요합니다.</p>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useBankStore } from '@/stores/bank'

const store = useBankStore()

onMounted(() => {
  if (store.isLogin) {
    store.getUserInfo()
    store.getCurrentUser()
  }
})
</script>


<style scoped>
</style>