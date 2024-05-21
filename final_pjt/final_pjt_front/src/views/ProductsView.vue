<template>

<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 bg-light">


  <main class="content">
    <div class="row ">
      <div class="col-12 mb-4">
        <div class="card border-light shadow-sm ">
          <div class="card-body">
            <h1>전체 상품 목록</h1>
            
            <div  class="mt-3 mb-3" style="margin-left:50px; margin-right:50px">
                <!-- searchbar start  -->
              <!-- <div class="d-flex justify-content-center mb-2" style=" height:100px;">
                <div class="row">
                  <div class="col align-self-center">
                    <input type="text" v-model="$store.state.board.searchWord" @keydown.enter="boardList" placeholder="검색어를 입력하세요" class="form-control" id="searchText" style="width:400px;" />
                  </div>
                  <div class="col align-self-center">
                    <button @click="boardList" class="btn btn-secondary" type="button">Search</button> </div>
                </div>
              </div> -->
              <!-- <div class="row"  style="float:right; margin-right:20px;">
              <button class="btn mb-3 btn-secondary btn-rounded"
                data-mdb-ripple-color="dark" @click="showInsertModal">글쓰기</button></div> -->
              <table class="table table-hover text-center">
                <thead class="bg-primary text-white">
                  <tr>
                    <th class="border-gray-200">은행명</th>
                    <th class="border-gray-200" style="width:700px;">상품명</th>
                    <th class="border-gray-200">관심 상품</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <!-- <tr v-for="(board, index) in listGetters" @click="boardDetail(board.boardId)" v-bind:key="index"> -->
                  <tr v-for="product in products" :key="product.id" @click="goToDetail(product.id)">
                    <td>{{ product.id }}</td>
                    <td>
                      {{ product.kor_co_nm }} - {{ product.fin_prdt_nm }}</td>
                    <td><button @click.stop.prevent="store.interest(product.id)" class="btn">
                      <span v-if="store.currentUserData.financial_products.includes(product.id)">❤️</span>
                      <span v-else>🤍</span>
                    </button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <pagination v-on:call-parent="movePage"></pagination> -->

            

            <!-- <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
            <detail-modal v-on:call-parent-change-to-update="changeToUpdate" v-on:call-parent-change-to-delete="changeToDelete"></detail-modal>
            <update-modal v-on:call-parent-update="closeAfterUpdate"></update-modal> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useBankStore } from '@/stores/bank'

const store = useBankStore()
store.getProducts()
const products = store.products
const router = useRouter()

const goToDetail = function (id){
  router.push({ name: 'detail', params:{ id: id } })
}
</script>


<style scoped>
thead{
  color : blue
}
</style>