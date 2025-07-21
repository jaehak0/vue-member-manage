// src/stores/toastStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ToastMessage, ToastType } from '@/types/toastTypes.ts'

export const useToastStore = defineStore('toast', () => {
  // ============= 상태 =============

  const toasts = ref<ToastMessage[]>([])

  // ============= 액션 =============

  /**
   * 토스트 메시지 표시
   */
  const showToast = (message: string, type: ToastType = 'success', duration: number = 2000) => {
    const id = Date.now().toString()

    const toast: ToastMessage = {
      id,
      message,
      type,
      duration,
    }

    toasts.value.push(toast)

    // 자동 제거
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  /**
   * 성공 메시지
   */
  const showSuccess = (message: string, duration?: number) => {
    showToast(message, 'success', duration)
  }

  /**
   * 에러 메시지
   */
  const showError = (message: string, duration?: number) => {
    showToast(message, 'error', duration)
  }

  /**
   * 정보 메시지
   */
  const showInfo = (message: string, duration?: number) => {
    showToast(message, 'info', duration)
  }

  /**
   * 경고 메시지
   */
  const showWarning = (message: string, duration?: number) => {
    showToast(message, 'warning', duration)
  }

  /**
   * 특정 토스트 제거
   */
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * 모든 토스트 제거
   */
  const clearToasts = () => {
    toasts.value = []
  }

  return {
    // 상태
    toasts,

    // 액션
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearToasts,
  }
})
