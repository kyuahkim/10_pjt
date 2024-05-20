<template>
  <div>
    <h1>게시물 작성</h1>
  </div>
  <hr>
  <div>
    <form @submit.prevent="createArticle">
      <div>
        <label for="title">제목 : </label>
        <input type="text" id="title" v-model.trim="title">
      </div>
      <br>
      <div>
        <label for="content">내용 : </label>
        <input type="text" id="content" v-model.trim="content">
      </div>
      <br>
      <input type="submit" value="게시글 등록">
    </form>
  </div>
</template>


<script setup>
import { useBankStore } from '@/stores/bank'
import { ref } from 'vue'

const store = useBankStore()
const title = ref('')
const content = ref('')

const createArticle = function () {
  const payload = {
    title: title.value,
    content: content.value
  }
  store.createArticle(payload)
}
</script>


<style scoped>
</style>
