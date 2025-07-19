<script setup lang="ts">
import MemberDetail from '@/components/member/MemberDetail.vue'
import MemberList from '@/components/member/MemberList.vue'
import MemberSearchForm from '@/components/member/MemberSearchForm.vue'
import { useMemberAutoFetch } from '@/composables/useMemberAutoFetch'
import MemberPagination from '@/components/member/MemberPagination.vue'

const { isInitialized } = useMemberAutoFetch()

defineOptions({
  name: 'MemberView',
})
</script>

<template>
  <div v-if="isInitialized" class="flex">
    <div class="flex flex-col flex-1">
      <MemberSearchForm />
      <MemberList />
      <MemberPagination />
    </div>
    <MemberDetail />
  </div>
</template>

<style scoped></style>
