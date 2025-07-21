<script setup lang="ts">
import { computed } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'
import ResponsivePopup from '@/components/common/ResponsivePopup.vue'

const memberStore = useMemberStore()
const memberService = useMemberService()

defineOptions({
  name: 'MemberDeletePopup',
})

// 현재 선택된 회원 정보
const currentMember = computed(() => memberStore.currentMember)

// 팝업 열림 상태
const isOpen = computed(
  () => memberStore.modalState.isOpen && memberStore.modalState.type === 'delete'
)

// 삭제 확인
const handleDelete = async () => {
  const targetId = memberStore.modalState.targetId
  if (targetId) {
    try {
      await memberService.removeMember(targetId)
    } catch (error) {
      console.error('삭제 실패:', error)
    }
  }
}

// 취소
const handleCancel = () => {
  memberService.closeModal()
}
</script>

<template>
  <ResponsivePopup :is-open="isOpen" title="회원 삭제" modal-size="sm" @close="handleCancel">
    <!-- 모바일 내용 -->
    <template #mobile-content>
      <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full mx-auto text-center space-y-6">
          <!-- 경고 아이콘 -->
          <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <!-- 메시지 -->
          <div class="mb-4 flex flex-col items-center space-y-1">
            <h3 class="text-lg font-semibold text-gray-900">{{ currentMember?.name }} 님을</h3>
            <p class="text-gray-600 mb-2">회원에서 삭제하시겠습니까?</p>
            <div class="bg-red-50 border border-red-200 rounded-md px-10 py-3 mb-4">
              <p class="text-sm text-red-600">* 삭제 시 복구할 수 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 모바일 푸터 -->
    <template #mobile-footer>
      <div class="flex gap-3">
        <button
          @click="handleDelete"
          type="button"
          class="flex-1 py-3 px-4 text-base font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          삭제
        </button>
        <button
          @click="handleCancel"
          type="button"
          class="flex-1 py-3 px-4 text-base font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
      </div>
    </template>

    <!-- 데스크톱 내용 -->
    <template #desktop-content>
      <div class="text-center py-4">
        <div class="flex flex-col items-center space-y-1">
          <div class="flex mx-auto justify-center items-center gap-1">
            <div class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ currentMember?.name }} 님을</h3>
          </div>
          <p class="text-gray-600 mb-1">회원에서 삭제하시겠습니까?</p>
        </div>

        <div class="bg-red-50 border border-red-200 rounded-md p-3">
          <p class="text-sm text-red-600">* 삭제 시 복구할 수 없습니다.</p>
        </div>
      </div>
    </template>

    <!-- 데스크톱 푸터 -->
    <template #desktop-footer>
      <div class="flex gap-3 justify-center">
        <button
          @click="handleDelete"
          type="button"
          class="px-6 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          삭제
        </button>
        <button
          @click="handleCancel"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
      </div>
    </template>
  </ResponsivePopup>
</template>

<style scoped>
/* 추가적인 스타일링이 필요한 경우 */
</style>
