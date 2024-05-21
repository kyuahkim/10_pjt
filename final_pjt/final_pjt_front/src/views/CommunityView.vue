<template>
  <div>
    <h1>커뮤니티</h1>
  </div>
  <hr>
  <RouterLink
    :to="{ name: 'createarticle'}">
    게시물 생성
  </RouterLink>
  <hr>
  <div>
    <ul v-if="articles.length">
      <li v-for="article of articles">
        <RouterLink
          :to="{ name: 'articledetail', params: { 'articleId': article.id }}">
          {{ article.title }}
        </RouterLink> | 좋아요 수 : {{ article.like_users.length }} | 
        <button @click.stop.prevent="store.interestArticle(article, currentUser.id)" class="btn">
          <span v-if="article.like_users.includes(currentUser.id)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </li>
    </ul>
    <ul v-else>
      <p>아직 등록된 게시물이 없습니다.</p>
    </ul>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useBankStore } from '@/stores/bank'
import { onMounted, ref, } from 'vue'

const store = useBankStore()
const currentUser = store.currentUserData
const articles = ref([])

store.getArticles()
articles.value = store.articles
</script>


<style scoped>
</style>