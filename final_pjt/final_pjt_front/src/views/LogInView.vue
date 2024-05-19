<template>
  <div class="container">
    <h1>로그인</h1>
    <hr>
    <form @submit.prevent="login">
      <div>
        <label for="username">이름 : </label>
        <input type="text" id="username" v-model.trim="username">
      </div>
      <br>
      <div>
        <label for="password">비밀번호 : </label>
        <input type="password" id="password" v-model.trim="password">
      </div>
      <br>
      <input type="submit" value="로그인">
      <br>
      <p v-if="loginError" style="color: red;">이름 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useBankStore } from '@/stores/bank' 

const username = ref(null)
const password = ref(null)
const loginError = ref(false) // 로그인 에러 상태 변수 추가

const store = useBankStore()

// const watch(() => token, (newValue, oldValue) => {
//   if (!newValue) {
//     // 토큰이 없을 때의 처리
//     // 예: loginError를 설정하거나 특정 동작 수행
//     loginError.value = true
//   }
// })

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