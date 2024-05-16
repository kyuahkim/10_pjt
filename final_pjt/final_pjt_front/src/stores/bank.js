import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBankStore = defineStore('bank', () => {
  const products = ref([])
  const API_URL = 'http://127.0.0.1:8000'
  // 전체 상품 조회
  const getProducts = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/products/`
    })
      .then((response) => {
        products.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signup = function (payload) {
    const { username, password1, password2 } = payload
    const password = password1

    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
      .then((response) => {
        console.log('회원가입이 완료되었습니다')
        // login({username, password})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // const login = function (payload) {

  // }

  return { products, API_URL, getProducts, signup }
}, { persist: true })
