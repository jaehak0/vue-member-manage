// composables/useMemberAutoFetch.ts
import { ref, watch, onMounted } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'

export const useMemberAutoFetch = () => {
  const memberStore = useMemberStore()
  const memberService = useMemberService()

  // ref로 반응형 상태 만들기
  const isInitialized = ref(false)

  // 초기 데이터 로드
  onMounted(async () => {
    await memberService.initialize()
    isInitialized.value = true
  })

  // 검색 폼 변화 시 자동 호출
  watch(
    () => ({
      searchType: memberStore.searchForm.searchType,
      searchValue: memberStore.searchForm.searchValue,
      isActive: memberStore.searchForm.isActive,
    }),
    async (newSearchForm, oldSearchForm) => {
      // 초기화 완료 후에만 API 호출
      if (!isInitialized.value) return

      // 실제로 값이 변경된 경우에만 호출
      const hasChanged = JSON.stringify(newSearchForm) !== JSON.stringify(oldSearchForm)
      if (hasChanged && newSearchForm.isActive) {
        // 검색이 활성화된 경우에만 API 호출
        await memberService.fetchMemberList()
      }
    },
    { deep: true }
  )

  // 페이지 변화 시 자동 호출
  watch(
    () => memberStore.pagination.currentPage,
    async (newPage, oldPage) => {
      if (!isInitialized.value) return

      if (newPage !== oldPage) {
        await memberService.fetchMemberList()
      }
    }
  )

  return {
    isInitialized, // ref 자체를 반환
  }
}
