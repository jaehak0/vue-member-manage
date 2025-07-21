<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMemberStore } from '@/stores/memberStore.ts'
import { useMemberService } from '@/service/memberService.ts'

const memberStore = useMemberStore()
const memberService = useMemberService()

// 반응형 상태
const isMobile = ref(false)

// 화면 크기 체크
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const closeModalInMobile = () => {
  if (isMobile.value) {
    memberStore.resetModalStateWithMember()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

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
  <div v-if="!!memberStore.currentMember">
    <!-- 데스크톱 버전 (기존 UI) -->
    <div v-if="!isMobile" class="bg-slate-50 w-[300px] h-full">
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

    <!-- 모바일 버전 (하단 슬라이드업 패널) -->
    <div v-else class="mobile-slide-panel">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black/30 z-40" @click="closeModalInMobile"></div>

      <!-- 슬라이드업 패널 -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 ease-out translate-y-0"
      >
        <!-- 핸들 바 -->
        <div class="flex justify-center pt-3 pb-2">
          <!--          <div class="w-12 h-1 bg-gray-300 rounded-full"></div>-->
        </div>

        <!-- 헤더 -->
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-900">
            {{ memberStore.currentMember?.name }}님 상세 정보
          </h2>
        </div>

        <!-- 내용 -->
        <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <!-- 이름 -->
          <div class="mobile-detail-item">
            <div class="mobile-detail-label">이름</div>
            <div class="mobile-detail-value">{{ memberStore.currentMember?.name }}</div>
          </div>

          <!-- 이메일 -->
          <div class="mobile-detail-item">
            <div class="mobile-detail-label">이메일</div>
            <div class="mobile-detail-value">{{ memberStore.currentMember?.email }}</div>
          </div>

          <!-- 전화번호 -->
          <div class="mobile-detail-item">
            <div class="mobile-detail-label">전화번호</div>
            <div class="mobile-detail-value">{{ memberStore.currentMember?.phone }}</div>
          </div>

          <!-- 성별 -->
          <div class="mobile-detail-item">
            <div class="mobile-detail-label">성별</div>
            <div class="mobile-detail-value">{{ memberStore.currentMember?.genderText }}</div>
          </div>
        </div>

        <!-- 하단 버튼 영역 -->
        <div class="px-6 py-4 border-t border-gray-100 bg-white rounded-b-3xl">
          <div class="flex gap-3">
            <button
              type="button"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
              @click="openEditModal"
            >
              수정
            </button>
            <button
              type="button"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
              @click="openDeleteModal"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

/* 데스크톱 스타일 */
.detail-item {
  @apply flex mb-4 items-center;
}
.detail-value {
  @apply flex-1;
}
.detail-label {
  @apply w-20 mr-2.5 font-semibold;
}

/* 모바일 슬라이드업 패널 스타일 */
.mobile-slide-panel {
  @apply fixed inset-0 z-40;
}

.mobile-detail-item {
  @apply py-4 border-b border-gray-50 last:border-b-0;
}

.mobile-detail-label {
  @apply text-sm font-medium text-gray-500 mb-1;
}

.mobile-detail-value {
  @apply text-base font-medium text-gray-900;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  input[type='text'],
  input[type='email'] {
    font-size: 16px; /* iOS 줌 방지 */
  }
}
</style>
