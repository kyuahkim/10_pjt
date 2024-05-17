<template>
  <div class="container">
    HomePage
  </div>
  <div>
    {{ users }}
  </div>
</template>


<script setup>
import { useBankStore } from '@/stores/bank'

const store = useBankStore()
const users = store.users
</script>


<style scoped>
</style>