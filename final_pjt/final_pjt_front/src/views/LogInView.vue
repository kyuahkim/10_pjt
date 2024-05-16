<template>
  <div class="container">
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <label for="username">이름 : </label>
      <input type="text" id="username" v-model.trim="username">
      <br>
      <label for="password">비밀번호 : </label>
      <input type="password" id="password" v-model.trim="password">
      <br>
      <input type="submit" value="로그인">
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useBankStore } from '@/stores/bank' 

const username = ref(null)
const password = ref(null)

const store = useBankStore()
const login = function () {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.login(payload)
}

</script>


<style scoped>
</style>