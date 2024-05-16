<template>
  <div class="container">
    <h1>회원 가입</h1>
    <form>
      <label for="username">이름 : </label>
      <input type="text" id="username" v-model.trim="username">
      <br>
      <label for="password">비밀번호 : </label>
      <input type="text" id="password" v-model.trim="password">
      <br>
      <input type="submit" value="로그인">
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const username = ref(null)
const password = ref(null)
</script>


<style scoped>
</style>