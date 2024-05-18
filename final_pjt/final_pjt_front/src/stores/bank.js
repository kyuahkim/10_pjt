import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useBankStore = defineStore('bank', () => {
  const products = ref([])
  const interestProdcuts = ref([])
  const token = ref(null)
  const id = ref(null)
  const userdata = ref({})
  const router = useRouter()
  const API_URL = 'http://127.0.0.1:8000'

  const getProducts = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/products/`,
      // params: {
      //   auth: API_KEY,
      //   topFinGrpNo: '020000',
      //   pageNo: 1
      // },
      // headers:{
      //   Authorization: `Token ${token.value}`
      // }
    })
    .then((response) => {
      // console.log(response.data)
      products.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getUserInfo = function () {
    axios({
      method: 'get',
      url: `${API_URL}/users/save-users/`, // 특정 사용자의 ID를 이용하여 요청 URL 생성
      headers: {
        Authorization: `Token ${token.value}` // 인증 토큰 헤더 추가
      }
    })
    .then((response) => {
      // 요청이 성공했을 때 실행되는 코드
      console.log('사용자 정보:', response.data);
      userdata.value = response.data
    })
    .catch((error) => {
      console.error('사용자 정보를 불러오는 중 오류 발생:', error);
    })
  }

  const signup = function (payload) {
    const username = payload.username
    const password1 = payload.password1
    const password = payload.password1
    const nickname = payload.nickname
    const email = payload.email
    const age = payload.age
    const money = payload.money
    const salary = payload.salary
    axios({
      method: 'post',
      url: `${API_URL}/users/save-users/`,
      data: {
        username, password, nickname, email, age, money, salary,
      }
    })
      .then((response) => {
        console.log('회원가입 성공')
        const password = password1
        login({ username, password })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const login = function (payload) {
    const { username, password } = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
      .then((response) => {
        token.value = response.data.key
        getCurrentUser()
        router.push({ name: 'home' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logout = function () {
    token.value = null
    userdata.value = {}
    router.push({ name: 'login' })
  }

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  const interest = function (productId) {
    if (interestProdcuts.value.includes(productId)) {
      const Index = interestProdcuts.value.findIndex((id) => id === productId)
      interestProdcuts.value.splice(Index, 1)
    } else {
      interestProdcuts.value.push(productId)
    }
  }

  const interestProdcutsList = computed(() => {
    const interests = products.value.filter((product) => interestProdcuts.value.includes(product.id))
    return interests
  })

  const getCurrentUser = function () {
    if (isLogin) {
      axios({
        method: 'get',
        url: `${API_URL}/users/current-user/`,
        headers: {
          Authorization: `Token ${token.value}`
        }
      })
      .then((response) => {
        // 현재 사용자 정보
        userdata.value = response.data
      })
      .catch((error) => {
        console.error('현재 사용자 정보를 불러오는 중 오류 발생:', error)
      })
    }
  }

  return { products, interestProdcuts, token, id, userdata, getProducts, getUserInfo, getCurrentUser, signup, login, logout, isLogin, interest, interestProdcutsList, }
}, { persist : true})