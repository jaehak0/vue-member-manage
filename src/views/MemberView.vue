<script setup lang="ts">
import MemberDetail from '@/components/member/MemberDetail.vue'
import MemberList from '@/components/member/MemberList.vue'
import MemberSearchForm from '@/components/member/MemberSearchForm.vue'
import MemberPagination from '@/components/member/MemberPagination.vue'
import MemberPopup from '@/components/member/MemberPopup.vue'
import MemberDeletePopup from '@/components/member/MemberDeletePopup.vue'
import { useMemberAutoFetch } from '@/composables/useMemberAutoFetch'

const { isInitialized } = useMemberAutoFetch()

defineOptions({
  name: 'MemberView',
})
</script>

<template>
  <div v-if="isInitialized" class="flex flex-1">
    <div class="flex flex-col flex-1">
      <MemberSearchForm />
      <MemberList />
      <MemberPagination />
    </div>
    <MemberDetail />

    <!-- 모달들 -->
    <MemberPopup />
    <MemberDeletePopup />
  </div>
</template>

<style scoped></style>
