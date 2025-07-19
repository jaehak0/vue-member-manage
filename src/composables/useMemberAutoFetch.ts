import { watch, onMounted, nextTick } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'

export const useMemberAutoFetch = () => {
  const memberStore = useMemberStore()
  const memberService = useMemberService()

  let isInitialized = false

  // 초기 데이터 로드
  onMounted(async () => {
    await memberService.initialize()
    await nextTick()
    isInitialized = true
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
      if (!isInitialized) return

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
      if (!isInitialized) return

      if (newPage !== oldPage) {
        await memberService.fetchMemberList()
      }
    }
  )

  return {
    isInitialized,
  }
}
