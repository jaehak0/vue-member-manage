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
    // nextTick 제거하고 바로 true로 설정
    isInitialized.value = true
  })

  // 검색 조건 변화 시 자동 호출
  watch(
    () => ({
      nick: memberStore.searchParams.nick,
      phone: memberStore.searchParams.phone,
      email: memberStore.searchParams.email,
    }),
    async (newSearchParams, oldSearchParams) => {
      // 초기화 완료 후에만 API 호출
      if (!isInitialized.value) return

      // 실제로 값이 변경된 경우에만 호출
      const hasChanged = JSON.stringify(newSearchParams) !== JSON.stringify(oldSearchParams)
      if (hasChanged) {
        // 페이지를 1로 리셋하고 검색
        memberStore.setCurrentPage(1)
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
    isInitialized, // ref 자체를 반환 (함수 아님)
  }
}
