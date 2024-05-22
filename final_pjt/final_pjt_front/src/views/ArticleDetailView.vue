<template>
  <div>
    <h1>게시물 상세 페이지</h1>
  </div>
  <div v-if="article.user == currentUser.id">
    <button @click.prevent="deleteArticle(article.id)">
      게시물 삭제
    </button>
    <button @click.prevent="editArticle">게시물 수정</button>
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
        <div v-if="editFlag">
        <h4>제목 수정</h4>
        <input type="text" v-model="updatedTitle" />
        <h4>내용 수정</h4>
        <textarea v-model="updatedContent"></textarea>
        <button @click.prevent="updateArticle(article.id)">저장</button>
        <button @click.prevent="cancelEdit">취소</button>
        </div>
        <div v-else>
          <h4>제목</h4>
          <p>{{ updatedTitle }}</p>
          <h4>내용</h4>
          <p>{{ updatedContent }}</p>
        </div>

  </div>
  <hr>
  <RouterLink :to="{name:'community'}">게시물 목록 돌아가기</RouterLink>
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

const article = ref({})
const writer = ref({})

article.value = store.articles.find((element) => element.id === articleId)
writer.value = store.userdata.find((element) => element.id === article.user)
const currentUser = store.currentUserData
const editFlag = ref(false)
const updatedTitle = ref('')
updatedTitle.value = article.value.title
const updatedContent = ref('')
updatedContent.value = article.value.content

const comments = ref([])
const content = ref(null)
const check = ref(0)


onMounted(async () => {
  store.getArticles()
  getComments()
})
const deleteArticle = function (articleId) {
  const article = store.articles.find((element) => element.id === articleId)
  axios({
    method:'delete',
    url: `http://127.0.0.1:8000/articles/delete_article/${article.id}/`,
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

const updateArticle = function (articleId){
  const article_local = store.articles.find((element) => element.id === articleId)
  axios({
    method:'put',
    url: `http://127.0.0.1:8000/articles/article_update/${article_local.id}/`,
    headers:{
      Authorization: `Token ${store.token}`
    },
    data:{
      title:updatedTitle.value,
      content:updatedContent.value,
    }
  })
  .then((response)=>{
    console.log(response)
    editFlag.value = false
    store.getArticles()
  })
  .catch((err)=>{
    console.log(err)
  })
}

const editArticle = function () {
  editFlag.value = true
  updatedTitle.value = article.title
  updatedContent.value = article.content
}

const cancelEdit = function () {
  editFlag.value = false
}

const getComments = function () {
  axios({
    method:'get',
    url: `http://127.0.0.1:8000/articles/${article.value.id}/comment/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      articleId: article.value.id,
      
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
    url: `http://127.0.0.1:8000/articles/${article.value.id}/comment/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      content: content.value,
      articleId: article.value.id
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
    alert("수정할 댓글을 입력해주세요.")
    console.log(error)
  })
}

</script>


<style scoped>
</style>