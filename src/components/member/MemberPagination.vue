<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'
import Pagination from '@/components/common/Pagination.vue'
import { log } from '@/util/devLogger.ts'

const memberStore = useMemberStore()
const memberService = useMemberService()

defineOptions({
  name: 'MemberPagination',
})

// 페이지 이동
const handleGoToPage = (page: number) => {
  memberService.goToPage(page)
}

// 이전 페이지
const handleGoToPrevious = () => {
  memberService.goToPreviousPage()
}

// 다음 페이지
const handleGoToNext = () => {
  memberService.goToNextPage()
}

// 첫 페이지
const handleGoToFirst = () => {
  memberService.goToFirstPage()
}

// 마지막 페이지
const handleGoToLast = () => {
  memberService.goToLastPage()
}

log('MemberPagination', memberStore.pagination)
</script>

<template>
  <Pagination
    :current-page="memberStore.pagination.currentPage"
    :total-pages="memberStore.pagination.totalPages"
    :total-count="memberStore.totalMemberCount"
    :start-item="memberStore.currentPageInfo.start"
    :end-item="memberStore.currentPageInfo.end"
    :has-previous="memberStore.hasPreviousPage"
    :has-next="memberStore.hasNextPage"
    :page-numbers="memberStore.pageNumbers"
    @go-to-page="handleGoToPage"
    @go-to-previous="handleGoToPrevious"
    @go-to-next="handleGoToNext"
    @go-to-first="handleGoToFirst"
    @go-to-last="handleGoToLast"
  />
</template>
