<template>
  <div class="about-view">
    <h1>About 페이지</h1>
    <p>2025년 Vue 3 + TypeScript + Vite 스택</p>
    <RouterLink to="/" class="back-link"> 홈으로 돌아가기 </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// 라우트 메타 정보 활용
console.log('현재 라우트 메타:', route.meta)
</script>

<style scoped>
.about-view {
  text-align: center;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: background-color 0.25s;
}

.back-link:hover {
  background-color: #e5e7eb;
}
</style>
