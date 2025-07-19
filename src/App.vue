<template>
  <div id="app">
    <header class="app-header">
      <nav class="main-nav">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/about" class="nav-item">About</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <!-- 2025년 방식: 향상된 라우터 뷰 -->
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta?.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
// 2025년 스타일: 최소한의 setup
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s;
}

.nav-item:hover {
  color: #111827;
}

.nav-item.router-link-active {
  color: #3b82f6;
}

.main-content {
  padding: 2rem;
}

/* 2025년 추가: 부드러운 페이지 전환 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
