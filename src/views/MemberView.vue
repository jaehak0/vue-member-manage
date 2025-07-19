<script setup lang="ts">
import MemberDetail from '@/components/member/MemberDetail.vue'
import { useMemberAutoFetch } from '@/composables/useMemberAutoFetch'

const { isInitialized } = useMemberAutoFetch()

defineOptions({
  name: 'MemberView',
})
</script>

<template>
  <div v-if="isInitialized" class="flex">
    <div class="flex flex-col flex-1"></div>
    <MemberDetail />
  </div>
</template>

<style scoped></style>
