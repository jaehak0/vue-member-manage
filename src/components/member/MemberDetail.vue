<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore.ts'
import { useMemberService } from '@/service/memberService.ts'

const memberStore = useMemberStore()
const memberService = useMemberService()

const openEditModal = () => {
  if (!memberStore.currentMember) return
  memberService.openEditModal(memberStore.currentMember.id)
}

const openDeleteModal = () => {
  if (!memberStore.currentMember) return
  memberService.openDeleteModal(memberStore.currentMember.id)
}

defineOptions({
  name: 'MemberDetail',
})
</script>

<template>
  <div class="bg-slate-50 w-[300px]">
    <header
      class="border-l-4 border-l-blue-500 border-b-2 border-b-slate-200 px-5 py-4 text-lg font-semibold"
    >
      {{ memberStore.currentMember?.name }}님 상세 정보
    </header>
    <div class="p-5">
      <!-- 이름 -->
      <div class="detail-item">
        <div class="detail-label">이름:</div>
        <div class="detail-value">{{ memberStore.currentMember?.name }}</div>
      </div>
      <!-- 이메일 -->
      <div class="detail-item">
        <div class="detail-label">이메일:</div>
        <div class="detail-value">{{ memberStore.currentMember?.email }}</div>
      </div>
      <!-- 전화번호 -->
      <div class="detail-item">
        <div class="detail-label">전화번호:</div>
        <div class="detail-value">{{ memberStore.currentMember?.phone }}</div>
      </div>
      <!-- 성별 -->
      <div class="detail-item">
        <div class="detail-label">성별:</div>
        <div class="detail-value">{{ memberStore.currentMember?.genderText }}</div>
      </div>

      <div class="mt-5 p-5 border border-t-1 border-slate-100 flex gap-2">
        <button type="button" class="btn btn-blue flex-1" @click="openEditModal">수정</button>
        <button type="button" class="btn btn-red flex-1" @click="openDeleteModal">삭제</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

.detail-item {
  @apply flex mb-4 items-center;
}
.detail-value {
  @apply flex-1;
}
.detail-label {
  @apply w-20 mr-2.5 font-semibold;
}
</style>
