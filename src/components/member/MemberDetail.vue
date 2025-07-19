<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore.ts'

const memberStore = useMemberStore()
const members = memberStore.members

defineOptions({
  name: 'MemberDetail',
})
</script>

<template>
  <div class="grid grid-cols-5">
    <div>
      <div>번호</div>
      <div>이름</div>
      <div>이메일</div>
      <div>전화번호</div>
      <div>성별</div>
    </div>
    <div></div>
  </div>
</template>

<style scoped></style>
