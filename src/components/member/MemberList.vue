<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'
import type { ViewMember } from '@/types/memberViewTypes'

const memberStore = useMemberStore()
const memberService = useMemberService()

defineOptions({
  name: 'MemberList',
})

// 선택된 회원 (상세보기용)
let selectedMember: ViewMember | null = null

// 회원 행 클릭 시 상세정보 표시
const handleRowClick = (member: ViewMember) => {
  selectedMember = member
}

// 회원 수정
const handleEditMember = (member: ViewMember) => {
  memberService.openEditModal(member.id)
}

// 회원 삭제
const handleDeleteMember = (member: ViewMember) => {
  memberService.openDeleteModal(member.id)
}
</script>

<template>
  <div class="flex gap-6">
    <!-- 왼쪽: 회원 목록 테이블 -->
    <div class="flex-1 bg-white rounded-lg shadow">
      <!-- 테이블 -->
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">번호</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">이름</th>
              <th
                class="px-4 py-3 text-left text-sm font-medium text-gray-700 md:table-cell hidden"
              >
                이메일
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">전화번호</th>
              <th
                class="px-4 py-3 text-left text-sm font-medium text-gray-700 md:table-cell hidden"
              >
                성별
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(member, index) in memberStore.members"
              :key="member.id"
              class="hover:bg-blue-50 cursor-pointer transition-colors duration-200"
              :class="{ 'bg-blue-50': selectedMember?.id === member.id }"
              @click="handleRowClick(member)"
            >
              <td class="px-4 py-4 text-sm text-gray-900">
                {{ memberStore.currentPageInfo.start + index }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900 font-medium">
                {{ member.name }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                {{ member.email }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                {{ member.formattedPhone }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                {{ member.genderText }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 빈 상태 -->
        <div v-if="memberStore.members.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">회원이 없습니다</h3>
          <p class="mt-1 text-sm text-gray-500">새로운 회원을 추가해보세요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 모바일에서 반응형 처리 */
@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .w-80 {
    width: 100%;
  }
}
</style>
