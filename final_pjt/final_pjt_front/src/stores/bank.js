import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useBankStore = defineStore('article', () => {
  const products = ref([])
  const token = ref(null)
  const router = useRouter()
  const API_URL = 'http://127.0.0.1:8000'
  const API_KEY = '1855094a2cbbfd266414bf0d3408369e'

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

  const signup = function (payload) {
    const { username, password1, password2} = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
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
        router.push({ name: 'home' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logout = function () {
    token.value = null
    router.push({ name: 'login' })
  }

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  return { products, token, getProducts, signup, login, logout, isLogin }
}, { persist : true})
