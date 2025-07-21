<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'
import type { ViewMember } from '@/types/memberViewTypes'

const memberStore = useMemberStore()
const memberService = useMemberService()

defineOptions({
  name: 'MemberList',
})

// 회원 행 클릭 시 상세정보 표시
const handleRowClick = (member: ViewMember) => {
  memberStore.setCurrentMember(member)
}
</script>

<template>
  <div class="bg-white overflow-hidden">
    <!-- Grid 컨테이너 -->
    <div class="grid-container text-sm">
      <!-- Grid 헤더 -->
      <div class="grid-header bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
        <!-- 번호 -->
        <div class="col-number px-4 py-3">번호</div>
        <!-- 이름 -->
        <div class="col-name px-4 py-3">이름</div>
        <!-- 이메일 -->
        <div class="col-email px-4 py-3">이메일</div>
        <!-- 전화번호 -->
        <div class="col-phone px-4 py-3">전화번호</div>
        <!-- 성별 -->
        <div class="col-gender px-4 py-3">성별</div>
        <!--나이-->
        <div class="col-age px-4 py-3">나이</div>
      </div>

      <!-- Grid 바디 -->
      <div class="grid-body bg-white">
        <div
          v-for="(member, _) in memberStore.members"
          :key="member.id"
          class="grid-row hover:bg-blue-50 cursor-pointer transition-colors duration-200 border-b border-gray-100"
          :class="{
            'bg-blue-50': memberStore.currentMember?.id === member.id,
          }"
          @click="handleRowClick(member)"
        >
          <!-- 번호 -->
          <div class="col-number px-4 py-3 text-gray-900">
            {{ member.id }}
          </div>

          <!-- 이름 -->
          <div class="col-name px-4 py-3 text-gray-900 font-medium">
            {{ member.name }}
          </div>

          <!-- 이메일 -->
          <div class="col-email px-4 py-3 text-gray-600">
            {{ member.email }}
          </div>

          <!-- 전화번호 -->
          <div class="col-phone px-4 py-3 text-gray-900">
            {{ member.phone }}
          </div>

          <!-- 성별 -->
          <div class="col-gender px-4 py-3 text-gray-900">
            {{ member.genderText }}
          </div>

          <!--나이-->
          <div class="col-age px-4 py-3 text-gray-900">
            {{ member.age }}
          </div>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-if="memberStore.members.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">회원이 없습니다</h3>
      <p class="text-gray-500 mb-4">새로운 회원을 추가해보세요.</p>
      <button @click="memberService.openCreateModal()" class="btn btn-green">회원 추가</button>
    </div>
  </div>
</template>

<style scoped>
/* Grid 레이아웃 기본 설정 */
.grid-container {
  display: grid;
}

.grid-header,
.grid-row {
  display: grid;
}

/* 데스크톱 (769px 이상) - 이메일만 가변, 나머지 고정 */
@media (min-width: 769px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .grid-header,
  .grid-row {
    grid-template-columns: 80px 120px 1fr 140px 80px 60px;
    grid-template-areas: 'number name email phone gender age';
  }

  .col-number {
    grid-area: number;
  }
  .col-name {
    grid-area: name;
  }
  .col-email {
    grid-area: email;
  }
  .col-phone {
    grid-area: phone;
  }
  .col-gender {
    grid-area: gender;
  }
  .col-age {
    grid-area: age;
  }
}

/* 모바일 (768px 이하) - 2컬럼 그리드 (이름, 전화번호만) */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .grid-header,
  .grid-row {
    grid-template-columns: 120px 140px;
    grid-template-areas: 'name phone';
  }

  .col-number,
  .col-email,
  .col-gender,
  .col-age {
    display: none;
  }

  .col-name {
    grid-area: name;
  }
  .col-phone {
    grid-area: phone;
  }

  /* 모바일에서 텍스트 크기와 패딩 조정 */

  .grid-header > div,
  .grid-row > div {
    padding: 0.5rem 0.75rem; /* px-3 py-2 */
  }
}
</style>
