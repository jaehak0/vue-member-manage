<script setup lang="ts">
// 2025년 스타일: 최소한의 setup
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Toast from '@/components/common/Toast.vue'
</script>

<template>
  <div class="container mx-auto max-w-[1280px] flex flex-col min-h-screen">
    <Header />
    <main class="flex flex-1">
      <!-- 2025년 방식: 향상된 라우터 뷰 -->
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta?.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer />

    <!-- 토스트 컴포넌트 -->
    <Toast />
  </div>
</template>

<style scoped></style>
