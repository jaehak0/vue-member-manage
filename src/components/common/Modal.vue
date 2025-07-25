<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  mobileFullscreen?: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  mobileFullscreen: true,
})

const emit = defineEmits<Emits>()

defineOptions({
  name: 'Modal',
})

// 모달 크기 클래스
const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

// ESC 키로 모달 닫기
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    props.isOpen && emit('close')
  }
}
</script>

<template>
  <!-- 모달 오버레이 -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @keydown="handleKeydown"
    >
      <!-- 배경 -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>
      <!-- 모달 컨테이너 -->
      <div
        class="relative w-full mx-4 bg-white rounded-lg shadow-xl"
        :class="[
          sizeClasses[size],
          mobileFullscreen
            ? 'md:mx-4 md:max-h-[90vh] max-md:mx-0 max-md:h-full max-md:rounded-none max-md:max-w-none'
            : 'max-h-[90vh]',
        ]"
        @click.stop
      >
        <!-- 모달 헤더 -->
        <div
          v-if="title || $slots.header"
          class="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <div class="flex items-center">
            <slot name="header">
              <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
            </slot>
          </div>
          <button
            @click="emit('close')"
            class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- 모달 바디 -->
        <div class="p-4 overflow-y-auto max-md:flex-1">
          <slot />
        </div>

        <!-- 모달 푸터 -->
        <div v-if="$slots.footer" class="p-4 border-t border-gray-200">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
