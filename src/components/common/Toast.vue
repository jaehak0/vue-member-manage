<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore'
import type { ToastType } from '@/types/toastTypes'

const toastStore = useToastStore()

// 토스트 타입별 스타일
const getToastStyle = (type: ToastType) => {
  const baseStyle = 'flex items-center p-4 mb-3 text-sm rounded-lg shadow-lg'
  
  switch (type) {
    case 'success':
      return `${baseStyle} text-green-800 bg-green-50 border border-green-200`
    case 'error':
      return `${baseStyle} text-red-800 bg-red-50 border border-red-200`
    case 'warning':
      return `${baseStyle} text-yellow-800 bg-yellow-50 border border-yellow-200`
    case 'info':
      return `${baseStyle} text-blue-800 bg-blue-50 border border-blue-200`
    default:
      return `${baseStyle} text-gray-800 bg-gray-50 border border-gray-200`
  }
}

// 토스트 타입별 아이콘
const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'M5 13l4 4L19 7'
    case 'error':
      return 'M6 18L18 6M6 6l12 12'
    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
    case 'info':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

// 토스트 타입별 아이콘 색상
const getIconColor = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}
</script>

<template>
  <!-- 토스트 컨테이너 -->
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup
      name="toast"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="getToastStyle(toast.type)"
        class="min-w-80 max-w-sm"
      >
        <!-- 아이콘 -->
        <div class="flex-shrink-0">
          <svg
            :class="getIconColor(toast.type)"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="getToastIcon(toast.type)"
            />
          </svg>
        </div>

        <!-- 메시지 -->
        <div class="ml-3 flex-1 font-medium">
          {{ toast.message }}
        </div>

        <!-- 닫기 버튼 -->
        <button
          @click="toastStore.removeToast(toast.id)"
          class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* 토스트 애니메이션 */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
