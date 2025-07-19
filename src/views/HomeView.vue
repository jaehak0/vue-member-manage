<template>
  <div class="home-view">
    <h1>홈 페이지</h1>
    <p>Vue Router 4.5.1과 함께하는 2025년 설정!</p>
    <nav class="navigation">
      <RouterLink to="/about" class="nav-link"> About 페이지로 이동 </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
// 2025년 방식: 라우터 컴포저블 활용
// import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
// const route = useRoute()
//
// // 프로그래밍 방식 네비게이션 예시
// const navigateToAbout = () => {
//   router.push({ name: 'About' })
// }
</script>

<style scoped>
.home-view {
  text-align: center;
  padding: 2rem;
}

.navigation {
  margin-top: 2rem;
}

.nav-link {
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.nav-link:hover {
  color: #747bff;
}
</style>
