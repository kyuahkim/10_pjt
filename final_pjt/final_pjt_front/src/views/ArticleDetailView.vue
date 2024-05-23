<template>
  <h1>게시물 상세 페이지</h1>
  <div class="main bg-light p-4">
    <div class="row">
      <div class="col-12">
        <div v-if="article.user == currentUser.id && !editFlag" style="margin-bottom: 20px;">
          <button type="button" class="btn btn-outline-success" style="margin-right: 10px;" @click.prevent="editArticle">게시물 수정</button>
          <button type="button" class="btn btn-outline-danger" @click.prevent="confirmDeleteArticle(article.id)">게시물 삭제</button>
        </div>
        <div class="card card-body shadow-sm mb-4 ">
          <div class="row">
            <div class="col-md-12 mb-3">
              <div>
                <span style="display: inline-block; margin-right: 20px;">좋아요 수 : {{ article.like_users.length }}</span>
                <span style="display: inline-block; margin-left: 20px;">
                  <button @click.prevent="store.interestArticle(article, currentUser.id)" class="btn">
                    <span v-if="article.like_users.includes(currentUser.id)">❤️</span>
                    <span v-else>🤍</span>
                  </button>
                </span>
              </div>
              <div class="shadow-line"></div>
                <div v-if="editFlag">
                  <h4>제목 수정</h4>
                  <input type="text" v-model="updatedTitle"/>
                  <hr>
                  <h4>내용 수정</h4>
                  <textarea v-model="updatedContent" style="width: 500px; height: 500px;"></textarea>
                  <br>
                  <button type="button" class="btn btn-outline-success" @click.prevent="updateArticle(article.id)" style="margin-right: 10px;">저장</button>
                  <button type="button" class="btn btn-outline-danger"  @click.prevent="cancelEdit">취소</button>
                </div>
                <div v-else>
                  <h4>제목</h4>
                  <p>{{ updatedTitle }}</p>
                  <hr>
                  <h4>내용</h4>
                  <p>{{ updatedContent }}</p>
                </div>
              </div>
            <div class="shadow-line"></div>
            <div>
              <h4>댓글</h4>
              <ul v-if="comments.length">
                <li v-for="comment of comments">
                  <p>{{ comment.content }}</p>
                  <p v-if="comment.user == currentUser.id">
                    <div v-if="check != comment.id">
                      <button type="button" class="btn btn-outline-success" @click.prevent="change(comment.id)" style="display: inline-block; margin-right: 10px;">수정</button>
                      <button type="button" class="btn btn-outline-danger" @click.prevent="deleteComment(comment.id)" style="display: inline-block;">삭제</button>
                    </div>
                    <div v-if="check == comment.id">
                      <div>
                        <br>
                        <div>
                          <textarea type="text" id="content" v-model.trim="content2" style="width: 500px;height: 150px;"></textarea>
                        </div>
                        <br>
                        <button type="button" class="btn btn-outline-secondary" @click.prevent="updateComment(comment.id)">수정 완료</button>
                      </div>
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
              <form>
                <div>
                  <textarea type="text" id="content" v-model.trim="content" style="width: 500px;height: 150px;"></textarea>
                </div>
                <br>
                <button type="button" class="btn btn-outline-success" @click.prevent="createComment">댓글 작성</button>
              </form>
            </div>
            <div class="shadow-line"></div>
            <button type="button" class="btn btn-outline-dark" @click.prevent="goToCommunity">게시물 목록 돌아가기</button>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>


<script setup>
import { useBankStore } from '@/stores/bank'
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const store = useBankStore()
const articleId = parseInt(route.params.articleId)

const article = ref({})
const writer = ref({})

article.value = store.articles.find((element) => element.id === articleId)
writer.value = store.userdata.find((element) => element.id === article.value.user)
const currentUser = store.currentUserData
const editFlag = ref(false)
const updatedTitle = ref('')
updatedTitle.value = article.value.title
const updatedContent = ref('')
updatedContent.value = article.value.content

const comments = ref([])
const content = ref(null)
const content2 = ref(null)
content2.value = content.value
const check = ref(0)

onMounted(async () => {
  store.getArticles()
  getComments()
})

const deleteArticle = function (articleId) {
  const article = store.articles.find((element) => element.id === articleId)
  axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/articles/delete_article/${article.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      articleId: article.id
    }
  })
  .then((response) => {
    router.push({ name: 'community' }) // 게시물 삭제 후 커뮤니티 페이지로 이동
  })
  .catch((error) => {
    console.log(error)
  })
}

const confirmDeleteArticle = function (articleId) {
  Swal.fire({
    title: '이 게시물을 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    icon: 'warning'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteArticle(articleId)
      Swal.fire('삭제되었습니다.', '', 'info')
    } else {
      Swal.fire('삭제가 취소되었습니다.', '', 'info')
    }
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
    alert('게시물이 수정되었습니다')
  })
  .catch((err)=>{
    console.log(err)
  })
}

const editArticle = function () {
  editFlag.value = true
  updatedTitle.value = article.value.title
  updatedContent.value = article.value.content
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
  const article = store.articles.find((element) => element.id === articleId)
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
    alert('댓글을 작성해주세요')
  })
}

const change = function (commentId) {
  check.value = commentId - check.value
}

const updateComment = function (commentId) {
  const comment = comments.value.find((element) => element.id === commentId)
  axios({
    method: 'put',
    url: `http://127.0.0.1:8000/articles/${articleId}/update_comment/${comment.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    },
    data: {
      content: content2.value,
      articleId: article.id,
      commentId: comment.id,
    }
  })
  .then((response) => {
    getComments()
    change(commentId)
    content2.value = ''
    alert('댓글 수정이 완료되었습니다.')
  })
  .catch((error) => {
    alert("수정할 댓글을 입력해주세요.")
    console.log(error)
  })
}

const goToCommunity = function () {
  router.push({ name: 'community'})
}
</script>


<style scoped>
.row {
  display: flex;
  gap: 10px; /* form 태그 사이에 간격을 두고 싶으면 사용 */
  align-items: center; /* 수직 정렬을 중앙으로 맞추기 위해 사용 */
}

.shadow-line {
  height: 2px;
  background: #000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
}
</style>