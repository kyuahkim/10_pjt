<template>
  <div>
    <h1>마이 페이지</h1>
    <hr>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useBankStore } from '@/stores/bank'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const store = useBankStore()
const user = ref(null)

const userId = ref(route.params.userId)
</script>


<style scoped>
</style>