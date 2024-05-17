<template>
    <h1>Home</h1>
    <SideBar />
    <!-- <exchangeRateView /> -->
    <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useBankStore } from './stores/bank'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import SideBar from '@/components/SideBar.vue'
import exchangeRateView from './views/exchangeRateView.vue';
import LogInView from './views/LogInView.vue';
const store = useBankStore()
</script>


<style scoped>
@import './assets/css/volt.css';
</style>