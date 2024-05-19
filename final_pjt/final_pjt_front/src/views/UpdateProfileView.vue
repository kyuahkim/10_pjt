<template>
  <div>
    <h1>회원 정보 수정</h1>
    <form @submit.prevent="updateUserInfo">
      <label for="nickname">별명:</label>
      <input id="nickname" v-model="updatedUserData.nickname" type="text" />
      <hr>
      <label for="email">이메일:</label>
      <input id="email" v-model="updatedUserData.email" type="email" />
      <hr>
      <label for="age">나이:</label>
      <input id="age" v-model="updatedUserData.age" type="number" />
      <hr>
      <label for="money">현재 소유 금액 (만원):</label>
      <input id="money" v-model="updatedUserData.money" type="number" />
      <hr>
      <label for="salary">연봉 (만원):</label>
      <input id="salary" v-model="updatedUserData.salary" type="number" />
      <hr>
      <button type="submit">수정</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useBankStore } from '@/stores/bank'
import { useRouter } from 'vue-router'

const store = useBankStore()
const router = useRouter()

const updatedUserData = ref({
  nickname: store.currentUserData.nickname,
  email: store.currentUserData.email,
  age: store.currentUserData.age,
  money: store.currentUserData.money,
  salary: store.currentUserData.salary
})

const updateUserInfo = () => {
  axios({
    method: 'put',
    url: `http://127.0.0.1:8000/users/current-user/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: updatedUserData.value
  })
    .then((response) => {
      store.currentUserData = response.data
      alert('회원 정보가 성공적으로 업데이트되었습니다.')
      router.push({ name: 'profile', params:{ userId: store.currentUserData.id} })
    })
    .catch((error) => {
      alert('회원 정보를 바르게 수정해 주세요.')
    })
}
</script>


<style scoped>
</style>