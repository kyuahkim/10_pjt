import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useBankStore = defineStore('bank', () => {
  const products = ref([])
  const token = ref(null)
  const id = ref(null)
  const currentUserData = ref({})
  const userdata = ref([])
  const router = useRouter()
  const API_URL = 'http://127.0.0.1:8000'

  const getProducts = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/products/`,
    })
    .then((response) => {
      // console.log(response.data)
      products.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // DB에 저장된 모든 사용자를 불러오는 함수
  const getUserInfo = function () {
    axios({
      method: 'get',
      url: `${API_URL}/users/save-users/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((response) => {
      // 요청이 성공했을 때 실행되는 코드
      // console.log('사용자 정보:', response.data);
      userdata.value = response.data
    })
    .catch((error) => {
      console.error('사용자 정보를 불러오는 중 오류 발생:', error);
    })
  }

  const getCurrentUser = function () {
    if (isLogin.value) {
      axios({
        method: 'get',
        url: `${API_URL}/users/current-user/`,
        headers: {
          Authorization: `Token ${token.value}`
        }
      })
      .then((response) => {
        // 현재 사용자 정보
        currentUserData.value = response.data
        // if (userdata.value.financial_products) {
        //   interestProdcuts.value = userdata.value.financial_products.split(',').map(id => parseInt(id, 10))
        // }
      })
      .catch((error) => {
        console.error('현재 사용자 정보를 불러오는 중 오류 발생:', error)
      })
    }
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
    if (currentUserData.value.financial_products.includes(productId)) {
      const Index = currentUserData.value.financial_products.findIndex((id) => id === productId)
      currentUserData.value.financial_products.splice(Index, 1)
    } else {
      currentUserData.value.financial_products.push(productId)
    }
    updateUserFinancialProducts()
  }

  const updateUserFinancialProducts = function () {
    axios({
      method: 'put',
      url: `${API_URL}/users/update-financial-products/`,
      headers: {
        Authorization: `Token ${token.value}`
      },
      data: {
        financial_products: currentUserData.value.financial_products
      }
    })
    .then((response) => {
      console.log('사용자 금융 상품 정보 업데이트 성공')
    })
    .catch((error) => {
      console.error('사용자 금융 상품 정보 업데이트 중 오류 발생:', error)
    })
  }

  return { products, token, id, userdata, currentUserData, getProducts, getUserInfo, getCurrentUser, signup, login, logout, isLogin, interest, updateUserFinancialProducts, }
}, { persist : true})