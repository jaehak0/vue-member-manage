<script setup lang="ts">
import { useMemberService } from '@/service/memberService.ts'
import { ref } from 'vue'

const memberService = useMemberService()
const searchData = ref<string>('')

const onChangeInput = (e: Event) => {
  searchData.value = (e.target as HTMLInputElement).value
}

const onSearch = () => {
  memberService.searchMembers({
    searchType: 'all',
    searchValue: searchData.value,
  })
}

const onAddMember = () => {
  memberService.openCreateModal()
}

// Enter 키로 검색
const handleKeyup = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    onSearch()
  }
}

defineOptions({
  name: 'MemberSearchForm',
})
</script>

<template>
  <div class="p-5 flex gap-2 bg-slate-50">
    <input
      type="text"
      placeholder="이름, 이메일, 전화번호로 검색..."
      v-model="searchData"
      @keyup.enter="onSearch"
      class="w-full p-2 border border-slate-300 bg-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <button type="button" class="btn btn-blue" @click="onSearch">검색</button>
    <button type="button" class="btn btn-green" @click="onAddMember">회원 추가</button>
  </div>
</template>

<style scoped></style>
