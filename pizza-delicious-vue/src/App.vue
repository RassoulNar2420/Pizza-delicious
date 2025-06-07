<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import MainHeader from "@/components/MainHeader.vue"
import MainFooter from "@/components/MainFooter.vue"

const authStore = useAuthStore()

onMounted(() => {
  const userToken = localStorage.getItem('jwt_token') || null
  authStore.setSession(userToken)
})
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>