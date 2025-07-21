// src/composables/useDebounce.ts
import { ref } from 'vue'

/**
 * 함수 호출을 디바운스 처리하는 컴포저블
 * @param fn 디바운스 처리할 함수
 * @param delay 디바운스 지연 시간 (ms)
 * @returns 디바운스 처리된 함수와 처리 상태
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
) {
  const isProcessing = ref(false)

  return {
    // 디바운스 처리된 함수
    debouncedFn: ((...args: Parameters<T>) => {
      if (isProcessing.value) return

      isProcessing.value = true
      fn(...args)

      setTimeout(() => {
        isProcessing.value = false
      }, delay)
    }) as T,
    
    // 현재 처리 중인지 여부
    isProcessing
  }
}
