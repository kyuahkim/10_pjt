<template>
  <div class="container">
    <h1>회원 가입</h1>
    <form @submit.prevent="signUp">
      <label for="username">이름 : </label>
      <input type="text" id="username" v-model.trim="username">
      <br>
      <label for="password1">비밀번호 : </label>
      <input type="password" id="password1" v-model.trim="password1">
      <br>
      <label for="password2">비밀번호 확인 : </label>
      <input type="password" id="password2" v-model.trim="password2">
      <br>
      <input type="submit" value="회원 가입">
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useBankStore } from '@/stores/bank'

const store = useBankStore()

const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)

const signUp = function() {
  const payload = {
    username: username.value,
    password1: password1.value,
    password2: password2.value,
  }
  store.signup(payload)
}
</script>


<style scoped>
</style>