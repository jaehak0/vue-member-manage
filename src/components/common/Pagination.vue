<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalCount: number
  startItem: number
  endItem: number
  hasPrevious: boolean
  hasNext: boolean
  pageNumbers: number[]
}

interface Emits {
  (e: 'goToPage', page: number): void
  (e: 'goToPrevious'): void
  (e: 'goToNext'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

defineOptions({
  name: 'Pagination',
})

// 디버깅용 로그
console.log('Pagination props:', {
  currentPage: props.currentPage,
  totalPages: props.totalPages,
  totalCount: props.totalCount,
  pageNumbers: props.pageNumbers,
})
</script>

<template>
  <div class="bg-white border-t px-6 py-4">
    <!-- 페이지 정보 -->
    <div class="flex items-center justify-between mb-4 text-sm text-gray-700">
      <div>총 {{ totalCount }}명 중 {{ startItem }}-{{ endItem }}번째 회원</div>
      <div class="page-info">{{ currentPage }} / {{ totalPages }} 페이지</div>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex items-center justify-center gap-1">
      <!-- 이전 페이지 버튼 -->
      <button
        @click="$emit('goToPrevious')"
        :disabled="!hasPrevious"
        class="flex items-center justify-center w-10 h-10 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        ‹
      </button>

      <!-- 페이지 번호들 -->
      <button
        v-for="pageNum in pageNumbers"
        :key="pageNum"
        @click="$emit('goToPage', pageNum)"
        :class="[
          'flex items-center justify-center w-10 h-10 text-sm border border-gray-300 rounded transition-colors',
          pageNum === currentPage
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white hover:bg-gray-50',
        ]"
      >
        {{ pageNum }}
      </button>

      <!-- 다음 페이지 버튼 -->
      <button
        @click="$emit('goToNext')"
        :disabled="!hasNext"
        class="flex items-center justify-center w-10 h-10 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 모바일에서 페이지네이션 조정 */
@media (max-width: 768px) {
  .flex.items-center.justify-between {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .w-8.h-8 {
    width: 2rem;
    height: 2rem;
  }

  .page-info {
    display: none;
  }
}

@media (max-width: 480px) {
  .px-6.py-4 {
    padding: 0.75rem 1rem;
  }

  .w-8.h-8 {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.75rem;
  }

  .gap-2 {
    gap: 0.25rem;
  }
}
</style>
