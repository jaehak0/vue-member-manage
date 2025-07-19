<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useMemberService } from '@/service/memberService'
import { validateMemberForm } from '@/util/memberUtils'
import ResponsivePopup from '@/components/common/ResponsivePopup.vue'
import type { ViewMemberForm } from '@/types/memberViewTypes'

const memberStore = useMemberStore()
const memberService = useMemberService()

defineOptions({
  name: 'MemberPopup',
})

// 폼 데이터
const formData = ref<ViewMemberForm>({
  name: '',
  phone: '',
  age: '',
  email: '',
  gender: '',
  isValid: false,
  errors: {},
})

// 모달 상태
const isCreateMode = computed(() => memberStore.modalState.type === 'create')
const modalTitle = computed(() =>
  isCreateMode.value ? '새 회원 등록' : '회원 정보 수정'
)

// 팝업 열림 상태
const isOpen = computed(() => 
  memberStore.modalState.isOpen && 
  (memberStore.modalState.type === 'create' || memberStore.modalState.type === 'edit')
)

// 폼 유효성 검사
const validation = computed(() => {
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.phone ||
    !formData.value.age ||
    !formData.value.gender
  ) {
    return { isValid: false, errors: {} }
  }

  return validateMemberForm({
    nick: formData.value.name,
    email: formData.value.email,
    phone: formData.value.phone,
    age: parseInt(formData.value.age) || 0,
  })
})

// 저장 가능 여부
const canSave = computed(() => validation.value.isValid)

// 현재 회원 정보로 폼 초기화 (수정 모드)
watch(
  () => memberStore.currentMember,
  currentMember => {
    if (currentMember && !isCreateMode.value) {
      formData.value = {
        name: currentMember.name,
        phone: currentMember.phone,
        age: currentMember.age.toString(),
        email: currentMember.email,
        gender: currentMember.gender,
        isValid: true,
        errors: {},
      }
    }
  },
  { immediate: true }
)

// 모달이 열릴 때 폼 초기화
watch(
  () => memberStore.modalState.isOpen,
  isOpen => {
    if (isOpen) {
      if (isCreateMode.value) {
        // 추가 모드일 때 폼 초기화
        formData.value = {
          name: '',
          phone: '',
          age: '',
          email: '',
          gender: '',
          isValid: false,
          errors: {},
        }
      } else {
        // 수정 모드일 때 현재 회원 정보로 폼 초기화
        const currentMember = memberStore.currentMember
        if (currentMember) {
          formData.value = {
            name: currentMember.name,
            phone: currentMember.phone,
            age: currentMember.age.toString(),
            email: currentMember.email,
            gender: currentMember.gender,
            isValid: true,
            errors: {},
          }
        }
      }
    }
  }
)

// 전화번호 포맷팅
const handlePhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '') // 숫자만 추출

  // 010-0000-0000 형식으로 포맷팅
  if (value.length >= 11) {
    value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (value.length >= 7) {
    value = value.replace(/(\d{3})(\d{4})/, '$1-$2')
  } else if (value.length >= 4) {
    value = value.replace(/(\d{3})/, '$1-')
  }

  formData.value.phone = value
}

// 나이 입력 (숫자만)
const handleAgeInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '') // 숫자만
  formData.value.age = value
}

// 저장
const handleSave = async () => {
  if (!canSave.value) return

  try {
    if (isCreateMode.value) {
      await memberService.addMember(formData.value)
    } else {
      const targetId = memberStore.modalState.targetId
      if (targetId) {
        await memberService.editMember(targetId, formData.value)
      }
    }
  } catch (error) {
    console.error('저장 실패:', error)
  }
}

// 취소
const handleCancel = () => {
  memberService.closeModal()
}
</script>

<template>
  <ResponsivePopup
    :is-open="isOpen"
    :title="modalTitle"
    modal-size="md"
    @close="handleCancel"
  >
    <!-- 모바일 내용 -->
    <template #mobile-content>
      <div class="p-4">
        <div class="max-w-md mx-auto space-y-6">
          <!-- 이름 -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              이름 <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="김새음"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              :class="{ 'border-red-500': validation.errors.nick }"
            />
            <p v-if="validation.errors.nick" class="mt-1 text-sm text-red-600">
              {{ validation.errors.nick }}
            </p>
          </div>

          <!-- 이메일 -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              이메일 <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="saeum@susoft.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              :class="{ 'border-red-500': validation.errors.email }"
            />
            <p v-if="validation.errors.email" class="mt-1 text-sm text-red-600">
              {{ validation.errors.email }}
            </p>
          </div>

          <!-- 전화번호 -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              전화번호 <span class="text-red-500">*</span>
            </label>
            <input
              :value="formData.phone"
              @input="handlePhoneInput"
              type="text"
              placeholder="010-0000-0000"
              maxlength="13"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              :class="{ 'border-red-500': validation.errors.phone }"
            />
            <p v-if="validation.errors.phone" class="mt-1 text-sm text-red-600">
              {{ validation.errors.phone }}
            </p>
          </div>

          <!-- 나이 -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              나이 <span class="text-red-500">*</span>
            </label>
            <input
              :value="formData.age"
              @input="handleAgeInput"
              type="text"
              placeholder="25"
              maxlength="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              :class="{ 'border-red-500': validation.errors.age }"
            />
            <p v-if="validation.errors.age" class="mt-1 text-sm text-red-600">
              {{ validation.errors.age }}
            </p>
          </div>

          <!-- 성별 -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              성별 <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-6">
              <label class="flex items-center">
                <input
                  v-model="formData.gender"
                  type="radio"
                  value="M"
                  class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-3 text-base text-gray-700">남성</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="formData.gender"
                  type="radio"
                  value="F"
                  class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-3 text-base text-gray-700">여성</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 모바일 푸터 -->
    <template #mobile-footer>
      <div class="flex gap-3">
        <button
          @click="handleSave"
          :disabled="!canSave"
          type="button"
          class="flex-1 py-3 px-4 text-base font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isCreateMode ? '등록' : '수정' }}
        </button>
        <button
          @click="handleCancel"
          type="button"
          class="flex-1 py-3 px-4 text-base font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
      </div>
    </template>

    <!-- 데스크톱 내용 -->
    <template #desktop-content>
      <div class="space-y-4">
        <!-- 이름 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            이름 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="김새음"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': validation.errors.nick }"
          />
          <p v-if="validation.errors.nick" class="mt-1 text-sm text-red-600">
            {{ validation.errors.nick }}
          </p>
        </div>

        <!-- 이메일 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            이메일 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="saeum@susoft.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': validation.errors.email }"
          />
          <p v-if="validation.errors.email" class="mt-1 text-sm text-red-600">
            {{ validation.errors.email }}
          </p>
        </div>

        <!-- 전화번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            전화번호 <span class="text-red-500">*</span>
          </label>
          <input
            :value="formData.phone"
            @input="handlePhoneInput"
            type="text"
            placeholder="010-0000-0000"
            maxlength="13"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': validation.errors.phone }"
          />
          <p v-if="validation.errors.phone" class="mt-1 text-sm text-red-600">
            {{ validation.errors.phone }}
          </p>
        </div>

        <!-- 나이 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            나이 <span class="text-red-500">*</span>
          </label>
          <input
            :value="formData.age"
            @input="handleAgeInput"
            type="text"
            placeholder="25"
            maxlength="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': validation.errors.age }"
          />
          <p v-if="validation.errors.age" class="mt-1 text-sm text-red-600">
            {{ validation.errors.age }}
          </p>
        </div>

        <!-- 성별 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            성별 <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input
                v-model="formData.gender"
                type="radio"
                value="M"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">남성</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="formData.gender"
                type="radio"
                value="F"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">여성</span>
            </label>
          </div>
        </div>
      </div>
    </template>

    <!-- 데스크톱 푸터 -->
    <template #desktop-footer>
      <div class="flex gap-3 justify-end">
        <button
          @click="handleCancel"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
        <button
          @click="handleSave"
          :disabled="!canSave"
          type="button"
          class="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isCreateMode ? '등록' : '수정' }}
        </button>
      </div>
    </template>
  </ResponsivePopup>
</template>

<style scoped>
/* 모바일 최적화 */
@media (max-width: 768px) {
  .form-group {
    margin-bottom: 1.5rem;
  }
}
</style>
