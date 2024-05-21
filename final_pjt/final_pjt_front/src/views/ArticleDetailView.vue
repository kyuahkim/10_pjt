<template>
  <div>
    <h1>게시물 상세 페이지</h1>
  </div>
  <div v-if="article.user == currentUser.id">
    <button @click.prevent="deleteArticle(article.id)">
      게시물 삭제
    </button>
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
  <RouterLink :to="{name:'community'}">게시물 목록 돌아가기</RouterLink>
  <hr>
  <div>
    {{ article }}
  </div>
  <hr>
  <div>
    {{ writer }}
  </div>
  <hr>
  <div>
    {{ currentUser }}
  </div>
  <hr>
  <div>
    <h4>댓글</h4>
    <ul v-if="comments.length">
      <li v-for="comment of comments">
        {{ comment }}
        <p>{{ comment.content }}</p>
        <p>작성자 : {{ comment.user }}</p>
        <p v-if="comment.user == currentUser.id">
          <form @submit.prevent="deleteComment(comment.id)">
            <input type="submit" value="삭제">
          </form>
          <form @submit.prevent="change">
            <input type="submit" value="수정">
          </form>
          <div v-if="check">
            <form @submit.prevent="updateComment(comment.id)">
              <div>
                <textarea type="text" id="content" v-model.trim="content" style="width: 500px;height: 150px;"></textarea>
              </div>
              <br>
              <input type="submit" value="수정 완료">
            </form>
          </div>
        </p>
      </li>
    </ul>
    <ul v-else>
      <p>아직 등록된 댓글이 없습니다.</p>
    </ul>
  </div>
  <hr>
  <div>
    <form @submit.prevent="createComment">
      <div>
        <textarea type="text" id="content" v-model.trim="content" style="width: 500px;height: 150px;"></textarea>
      </div>
      <br>
      <input type="submit" value="댓글 작성">
    </form>
  </div>
  <hr>
  <RouterView />
</template>


<script setup>
import { useBankStore } from '@/stores/bank'
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useBankStore()
const articleId = parseInt(route.params.articleId)

const article = store.articles.find((element) => element.id === articleId)
const writer = store.userdata.find((element) => element.id === article.user)
const currentUser = store.currentUserData

const comments = ref([])
const content = ref(null)
const check = ref(0)

const deleteArticle = function (articleId) {
  const article = store.articles.find((element) => element.id === articleId)
  axios({
    method:'delete',
    url: `http://127.0.0.1:8000/articles/delete_article/${article.id}`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      articleId: article.id
    }
  })
  .then((response) => {
    router.push({ name: 'community' })
  })
  .catch((error) => {
    console.log(error)
  })
}

const getComments = function () {
  axios({
    method:'get',
    url: `http://127.0.0.1:8000/articles/${article.id}/comment/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      articleId: article.id
    }
  })
  .then((response) => {
    comments.value = response.data
    content.value = ''
  })
  .catch((error) => {
    console.log(error)
  })
}

const deleteComment = function (commentId) {
  const comment = comments.value.find((element) => element.id === commentId)
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/articles/${article.id}/update_comment/${comment.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      articleId: article.id,
      commentId: comment.id,
    }
  })
  .then((response) => {
    getComments()
  })
  .catch((error) => {
    console.log(error)
  })
}

const createComment = function () {
  axios({
    method: 'post',
    url: `http://127.0.0.1:8000/articles/${article.id}/comment/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      content: content.value,
      articleId: article.id
    }
  })
  .then((response) => {
    getComments()
  })
  .catch((error) => {
    console.log(error)
  })
}

const change = function () {
  check.value = 1-check.value
}

const updateComment = function (commentId) {
  const comment = comments.value.find((element) => element.id === commentId)
  axios({
    method: 'put',
    url: `http://127.0.0.1:8000/articles/${article.id}/update_comment/${comment.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      content: content.value,
      articleId: article.id,
      commentId: comment.id,
    }
  })
  .then((response) => {
    getComments()
    change()
    content.value = ''
  })
  .catch((error) => {
    console.log(error)
  })
}

onMounted(() => {
  store.getArticles()
  getComments()
})
</script>


<style scoped>
</style>