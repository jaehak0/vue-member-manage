<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Modal from '@/components/common/Modal.vue'

interface Props {
  isOpen: boolean
  title: string
  modalSize?: 'sm' | 'md' | 'lg'
  showFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modalSize: 'md',
  showFooter: true,
})

const emit = defineEmits<{
  close: []
}>()

// 반응형 상태
const isMobile = ref(false)

// 화면 크기 체크
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 닫기
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <!-- 모바일: 전체 화면 -->
  <div v-if="isMobile && isOpen" class="fixed inset-0 z-50 bg-white flex flex-col">
    <!-- 헤더 -->
    <div>
      <div
        class="flex items-center justify-between py-4 border-b border-gray-200 bg-white max-w-md mx-auto"
      >
        <h1 class="text-lg font-semibold text-gray-900">{{ title }}</h1>
        <button
          @click="handleClose"
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 내용 -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-md mx-auto">
        <slot name="mobile-content" />
      </div>
    </div>

    <!-- 하단 버튼 (옵션) -->
    <div v-if="showFooter" class="bg-white">
      <div class="max-w-md mx-auto py-4 border-t border-gray-200">
        <slot name="mobile-footer" />
      </div>
    </div>
  </div>

  <!-- 데스크톱: 모달 -->
  <Modal v-else :is-open="isOpen" :title="title" :size="modalSize" @close="handleClose">
    <!-- 모달 내용 -->
    <slot name="desktop-content" />

    <!-- 모달 푸터 -->
    <template v-if="showFooter" #footer>
      <slot name="desktop-footer" />
    </template>
  </Modal>
</template>

<style scoped>
/* 모바일 최적화 */
@media (max-width: 768px) {
  input[type='text'],
  input[type='email'] {
    font-size: 16px; /* iOS 줌 방지 */
  }
}
</style>
