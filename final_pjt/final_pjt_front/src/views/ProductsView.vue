<template>
  <h1>전체 상품 목록</h1>
  <hr>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 bg-light">
    <!-- <div class="bg-light"> -->
    <div class="row ">
      <div class="col-12 mb-">
        <h6 style="margin-left: 50px;">필터링 정보</h6>
        <div class="row" style="margin-left: 30px;">
          <div class="col align-self-center">
            <select name="bankname" id="bankname" v-model="selectBank" class="form-select select" aria-label="은행 이름">
              <option value="은행 이름" selected disabled>은행 이름</option>
              <option v-for="bankname of banknames" :key="bankname" :value="bankname">{{ bankname }}</option>
            </select>
          </div>
          <div class="col align-self-center">
            <select name="DepoSave" id="DepoSave" v-model="selectDepoSaves" class="form-select select" aria-label="구">
              <option value="" selected disabled>예금/적금</option>
              <option v-for="DepoSave of DepoSaves" :key="DepoSave" :value="DepoSave">{{ DepoSave }}</option>
            </select>
          </div>
          <div class="col align-self-center">
            <select name="month" id="month" v-model="selectMonths" class="form-select select" aria-label="은행">
              <option value="" selected disabled>개월 수</option>
              <option v-for="month of months" :key="month" :value="month">{{ month }}</option>
            </select>
          </div>
          <div class="col align-self-center">
            <!-- <input type="button" class="btn btn-secondary ml-3" value="검색"  @click="searchPlaces" :disabled="selectedDongCode == 'empty' || loadingCount != 0" /> -->
            <input type="button" class="btn btn-secondary ml-3" value="검색"  @click="searchPlaces" />
          </div>
        </div>
        <br>
        <div class="card border-light shadow-sm ">
          <div class="card-body">
            <div  class="mt-3 mb-3" style="margin-left:50px; margin-right:50px">
                <!-- searchbar start  -->
              <!-- <div class="d-flex justify-content-center mb-2" style=" height:100px;">
                <div class="row">
                  <div class="col align-self-center">
                    <input type="text" v-model="$store.state.board.searchWord" @keydown.enter="boardList" placeholder="검색어를 입력하세요" class="form-control" id="searchText" style="width:400px;" />
                  </div>
                </div> -->
                <!-- <div class="row"  style="float:right; margin-right:20px;">
                <button class="btn mb-3 btn-secondary btn-rounded"
                  data-mdb-ripple-color="dark" @click="showInsertModal">글쓰기</button></div> -->
              <table class="table table-hover text-center">
                <thead class="bg-primary text-white">
                  <tr>
                    <th class="border-gray-200">상품 번호</th>
                    <th class="border-gray-200" style="width:700px;">상품명</th>
                    <th class="border-gray-200">관심 상품</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="(board, index) in listGetters" @click="boardDetail(board.boardId)" v-bind:key="index"> -->
                  <tr v-for="product in products" :key="product.id" @click="goToDetail(product.id)">
                    <td>{{ product.id }}</td>
                    <td>{{ product.kor_co_nm }} - {{ product.fin_prdt_nm }}</td>
                    <td>
                      <button @click.stop.prevent="store.interest(product.id)" class="btn">
                        <span v-if="store.currentUserData.financial_products.includes(product.id)">❤️</span>
                        <span v-else>🤍</span>
                      </button>
                    </td>
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
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useBankStore } from '@/stores/bank'
import { ref } from 'vue'

const store = useBankStore()
store.getProducts()
const products = store.products
const router = useRouter()

const banknames = ref(['경남은행', '광주은행', '국민은행', '농협은행주식회사', '대구은행', '부산은행', '수협은행', '신한은행', '우리은행', '전북은행', '재주은행', '주식회사 카카오뱅크', '주식회사 케이뱅크', '중소기업은행', '토스뱅크 주식회사', '하나은행', '한국산업은행', '한국스탠다드차타드은행', ]) 
const DepoSaves = ref(['예금', '적금'])
const months = ref([1, 3, 6, 12, 24, 46])

const selectBank = ref()
const selectDepoSaves = ref()
const selectMonths = ref()

const goToDetail = function (id){
  router.push({ name: 'detail', params:{ id: id } })
}
</script>


<style scoped>
thead{
  color : blue
}

table {
  cursor: pointer;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-left: 70px; /* 카드 자체를 가운데로 정렬 */
}

.card-content {
  text-align: center; /* 내용물을 가운데 정렬 */
}
</style>