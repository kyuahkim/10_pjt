<template>
  <div>
    <h1>게시물 상세 페이지</h1>
  </div>
  <hr>
  <div>
    <div >
      <span style="display: inline-block; margin-right: 20px;">좋아요 수 : {{ article.like_users.length }}</span>
      <span style="display: inline-block; margin-left: 20px;">
        <button @click.prevent="store.interestArticle(article, currentUser.id)" class="btn">
          <span v-if="article.like_users.includes(currentUser.id)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </span>
    </div>
    <hr>
    <h4>제목</h4>
    <p>{{ article.title }}</p>
    <hr>
    <h4>작성자</h4>
    <p>{{ writer.nickname }}</p>
    <hr>
    <h4>내용</h4>
    <p>{{ article.content }}</p>
  </div>
  <hr>
  <div>
    {{ article }}
  </div>
  <hr>
  <div>
    {{ writer }}
  </div>
  <hr>
  <!-- 댓글작성란 -->
</template>


<script setup>
import { useBankStore } from '@/stores/bank'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useBankStore()
const articleId = parseInt(route.params.articleId)

const article = store.articles.find((element) => element.id === articleId)
const writer = store.userdata.find((element) => element.id === article.user)
const currentUser = store.currentUserData
</script>


<style scoped>
</style>