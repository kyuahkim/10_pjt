<template>
  <div>

  </div>
</template>


<script setup>
import { useBankStore } from '@/stores/bank'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const store = useBankStore()

const userId = parseInt(route.params.userId)
</script>


<style scoped>
</style>