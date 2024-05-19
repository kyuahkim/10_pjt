<template>
  <div>
    <h1>개인 정보 상세 페이지</h1>
    <hr>
    <h4>{{ store.currentUserData.username }}님의 정보입니다.</h4>
    <button @click="confirmDeleteAccount">
      회원 탈퇴
    </button>
    <hr>
    <p>이름 : {{ store.currentUserData.username }}</p>
    <p>별명 : {{ store.currentUserData.nickname }}</p>
    <p>이메일 : {{ store.currentUserData.email }}</p>
    <p>나이 : {{ store.currentUserData.age }}</p>
    <p>현재 소유 금액 : {{ store.currentUserData.money }} (만원)</p>
    <p>연봉 : {{ store.currentUserData.salary }} (만원)</p>
    <hr>
    <div>
      <h5>관심 상품 번호</h5>
      <ul v-if="exist">
        <br>
        관심 상품을 등록해주세요.
      </ul>
      <ul v-else>
        <li v-for="number of productsNumbers">
          <RouterLink :to="{ name: 'detail', params:{ id: number } }">
            {{ number }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <hr>
  </div>
  <div>
    <RouterLink :to="{ name: 'updateprofile' }">
      회원 정보 수정
    </RouterLink>
  </div>
  <RouterView />
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useBankStore } from '@/stores/bank'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useBankStore()
const productsNumbers = ref([])
const exist = ref(false)

const userId = ref(route.params.userId)

onMounted(() => {
  if (store.isLogin) {
    store.getUserInfo()
    store.getCurrentUser()
    productsNumbers.value = store.currentUserData.financial_products
    if (productsNumbers==[]) {
      exist.value=false
    } else {
      exist.value=true
    }
  }
})

console.log(store.currentUserData)

const deleteAccount = () => {
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/users/delete-user/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
  .then(() => {
    alert('회원 탈퇴가 완료되었습니다.')
    store.logout()
    router.push({ name: 'home' })
  })
  .catch((error) => {
    console.error('회원 탈퇴 중 오류 발생:', error)
    alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.')
  })
}

const confirmDeleteAccount = () => {
  if (confirm('정말로 회원탈퇴를 하시겠습니까?')) {
    deleteAccount()
  }
}
</script>


<style scoped>
</style>