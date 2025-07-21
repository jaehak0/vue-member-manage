// src/stores/memberStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generatePageNumbers } from '@/util/memberUtils'
import type {
  ViewMember,
  ViewPagination,
  ViewMemberListData,
  ViewSearchForm,
  ViewModalState,
  ModalType,
} from '@/types/memberViewTypes'

export const useMemberStore = defineStore('member', () => {
  // ============= 상태 (State) - 모두 View 타입 =============

  // 회원 목록 (화면 전용 타입)
  const members = ref<ViewMember[]>([])

  // 현재 선택된 회원 (화면 전용 타입)
  const currentMember = ref<ViewMember | null>(null)

  // 페이지네이션 정보 (화면 전용 타입)
  const pagination = ref<ViewPagination>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    startItem: 0,
    endItem: 0,
    hasPrevious: false,
    hasNext: false,
    pageNumbers: [],
  })

  // 검색 폼 (화면 전용 타입)
  const searchForm = ref<ViewSearchForm>({
    searchType: 'all',
    searchValue: '',
    isActive: false,
    hasValue: false,
  })

  // 모달 상태 (화면 전용 타입)
  const modalState = ref<ViewModalState>({
    isOpen: false,
    type: 'create',
    targetId: null,
    title: '',
    canSave: false,
    canDelete: false,
  })

  // ============= 계산된 속성 (Getters) =============

  // 총 회원 수
  const totalMemberCount = computed(() => pagination.value.totalCount)

  // 현재 페이지 정보
  const currentPageInfo = computed(() => ({
    start: pagination.value.startItem,
    end: pagination.value.endItem,
    total: pagination.value.totalCount,
  }))

  // 이전/다음 페이지 존재 여부
  const hasPreviousPage = computed(() => pagination.value.hasPrevious)
  const hasNextPage = computed(() => pagination.value.hasNext)

  // 페이지 번호 배열 (계산된 속성)
  const pageNumbers = computed(() =>
    generatePageNumbers(pagination.value.currentPage, pagination.value.totalPages)
  )

  // 검색 활성 상태
  const isSearchActive = computed(() => searchForm.value.hasValue)

  // 모달 제목
  const modalTitle = computed(() => {
    switch (modalState.value.type) {
      case 'create':
        return '회원 추가'
      case 'edit':
        return '회원 수정'
      case 'detail':
        return '회원 상세'
      case 'delete':
        return '회원 삭제'
      default:
        return ''
    }
  })

  // ============= 데이터 업데이트 액션 =============

  /**
   * 회원 목록 데이터 설정 (화면 전용 타입)
   */
  const setMemberListData = (data: ViewMemberListData) => {
    members.value = data.members
    pagination.value = data.pagination
  }

  /**
   * 현재 회원 설정 (화면 전용 타입)
   */
  const setCurrentMember = (member: ViewMember | null) => {
    currentMember.value = member
  }

  /**
   * 목록에서 특정 회원 업데이트 (수정 시 사용)
   */
  const updateMemberInList = (id: number, updatedMember: Partial<ViewMember>) => {
    const index = members.value.findIndex(member => member.id === id)
    if (index !== -1) {
      members.value[index] = { ...members.value[index], ...updatedMember }
    }
  }

  /**
   * 목록에서 특정 회원 제거 (삭제 시 사용)
   */
  const removeMemberFromList = (id: number) => {
    members.value = members.value.filter(member => member.id !== id)

    // 총 개수 감소
    pagination.value = {
      ...pagination.value,
      totalCount: Math.max(0, pagination.value.totalCount - 1),
    }

    // 현재 페이지에 데이터가 없으면 이전 페이지로
    if (members.value.length === 0 && pagination.value.currentPage > 1) {
      pagination.value = {
        ...pagination.value,
        currentPage: pagination.value.currentPage - 1,
      }
    }
  }

  /**
   * 목록에 새 회원 추가 (추가 시 사용)
   */
  const addMemberToList = (newMember: ViewMember) => {
    members.value.unshift(newMember) // 맨 앞에 추가
    pagination.value = {
      ...pagination.value,
      totalCount: pagination.value.totalCount + 1,
    }
  }

  // ============= 검색 관련 =============

  /**
   * 검색 폼 설정
   */
  const setSearchForm = (searchData: Partial<ViewSearchForm>) => {
    searchForm.value = {
      ...searchForm.value,
      ...searchData,
      // 계산된 필드 업데이트
      isActive: !!(searchData.searchValue || searchForm.value.searchValue),
      hasValue: !!(searchData.searchValue || searchForm.value.searchValue),
    }
  }

  /**
   * 검색 초기화
   */
  const resetSearch = () => {
    searchForm.value = {
      searchType: 'all',
      searchValue: '',
      isActive: false,
      hasValue: false,
    }
  }

  // ============= 페이지네이션 =============

  /**
   * 현재 페이지 설정
   */
  const setCurrentPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value = {
        ...pagination.value,
        currentPage: page,
      }
    }
  }

  // ============= 모달 관리 =============

  /**
   * 모달 열기
   */
  const openModal = (type: ModalType, targetId?: number) => {
    modalState.value = {
      isOpen: true,
      type,
      targetId: targetId || null,
      title: getModalTitle(type),
      canSave: type === 'create' || type === 'edit',
      canDelete: type === 'delete',
    }
  }

  /**
   * 모달 닫기 (currentMember 유지)
   */
  const resetModalState = () => {
    modalState.value = {
      isOpen: false,
      type: 'create',
      targetId: null,
      title: '',
      canSave: false,
      canDelete: false,
    }
    // currentMember는 유지 (취소 시 기존 선택 유지)
  }

  /**
   * 모달 닫기 (currentMember 초기화)
   */
  const resetModalStateWithMember = () => {
    modalState.value = {
      isOpen: false,
      type: 'create',
      targetId: null,
      title: '',
      canSave: false,
      canDelete: false,
    }
    currentMember.value = null
  }

  /**
   * 모달 제목 가져오기
   */
  const getModalTitle = (type: ModalType): string => {
    switch (type) {
      case 'create':
        return '회원 추가'
      case 'edit':
        return '회원 수정'
      case 'detail':
        return '회원 상세'
      case 'delete':
        return '회원 삭제'
      default:
        return ''
    }
  }

  // ============= 초기화 =============

  /**
   * 스토어 초기화
   */
  const resetStore = () => {
    members.value = []
    currentMember.value = null
    pagination.value = {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
      startItem: 0,
      endItem: 0,
      hasPrevious: false,
      hasNext: false,
      pageNumbers: [],
    }
    resetSearch()
    resetModalStateWithMember()
  }

  return {
    // 상태
    members,
    currentMember,
    pagination,
    searchForm,
    modalState,

    // 계산된 속성
    totalMemberCount,
    currentPageInfo,
    hasPreviousPage,
    hasNextPage,
    isSearchActive,
    modalTitle,
    pageNumbers,

    // 액션
    setMemberListData,
    setCurrentMember,
    updateMemberInList,
    removeMemberFromList,
    addMemberToList,
    setSearchForm,
    resetSearch,
    setCurrentPage,
    openModal,
    resetModalState,
    resetModalStateWithMember,
    resetStore,
  }
})
