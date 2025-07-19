// src/stores/memberStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Member,
  GetMemberListRequest,
  PaginationInfo,
  SearchFormData,
  ModalType,
} from '@/types/memberTypes'

export const useMemberStore = defineStore('member', () => {
  // ============= 상태 (State) =============

  // 회원 목록
  const members = ref<Member[]>([])

  // 현재 선택된 회원 (상세보기/수정용)
  const currentMember = ref<Member | null>(null)

  // 페이지네이션 정보
  const pagination = ref<PaginationInfo>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })

  // 검색 조건
  const searchParams = ref<GetMemberListRequest>({
    page: 1,
    size: 10,
    nick: '',
    phone: '',
    email: '',
  })

  // 모달 상태
  const modalState = ref({
    isOpen: false,
    type: 'create' as ModalType,
    targetUserKey: null as number | null,
  })

  // ============= 계산된 속성 (Getters) =============

  // 총 회원 수
  const totalMemberCount = computed(() => pagination.value.totalCount)

  // 현재 페이지의 시작/끝 번호
  const currentPageInfo = computed(() => {
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize + 1
    const end = Math.min(
      pagination.value.currentPage * pagination.value.pageSize,
      pagination.value.totalCount
    )
    return { start, end }
  })

  // 이전/다음 페이지 존재 여부
  const hasPreviousPage = computed(() => pagination.value.currentPage > 1)
  const hasNextPage = computed(() => pagination.value.currentPage < pagination.value.totalPages)

  // ============= 데이터 업데이트 액션 =============

  /**
   * 회원 목록 업데이트
   */
  const setMemberList = (data: { members: Member[]; pagination: PaginationInfo }) => {
    members.value = data.members
    pagination.value = data.pagination
  }

  /**
   * 현재 회원 정보 설정
   */
  const setCurrentMember = (member: Member | null) => {
    currentMember.value = member
  }

  /**
   * 목록에서 특정 회원 정보 업데이트 (수정 시 사용)
   */
  const updateMemberInList = (userKey: number, updatedMember: Partial<Member>) => {
    const index = members.value.findIndex(member => member.userKey === userKey)
    if (index !== -1) {
      members.value[index] = { ...members.value[index], ...updatedMember }
    }
  }

  /**
   * 목록에서 특정 회원 제거 (삭제 시 사용)
   */
  const removeMemberFromList = (userKey: number) => {
    members.value = members.value.filter(member => member.userKey !== userKey)

    // 총 개수도 감소
    pagination.value.totalCount = Math.max(0, pagination.value.totalCount - 1)

    // 현재 페이지에 데이터가 없으면 이전 페이지로
    if (members.value.length === 0 && pagination.value.currentPage > 1) {
      pagination.value.currentPage -= 1
    }
  }

  /**
   * 목록에 새 회원 추가 (추가 시 사용 - 선택적)
   */
  const addMemberToList = (newMember: Member) => {
    members.value.unshift(newMember) // 맨 앞에 추가
    pagination.value.totalCount += 1
  }

  /**
   * 검색 파라미터 업데이트
   */
  const updateSearchParams = (params: Partial<GetMemberListRequest>) => {
    Object.assign(searchParams.value, params)
  }

  /**
   * 검색 조건 설정
   */
  const setSearchCondition = (searchData: SearchFormData) => {
    // 검색 조건 초기화
    searchParams.value.nick = ''
    searchParams.value.phone = ''
    searchParams.value.email = ''

    // 선택한 검색 타입에 따라 조건 설정
    if (searchData.searchType === 'all') {
      searchParams.value.nick = searchData.searchValue
      searchParams.value.phone = searchData.searchValue
      searchParams.value.email = searchData.searchValue
    } else {
      searchParams.value[searchData.searchType] = searchData.searchValue
    }

    // 페이지를 1로 리셋
    searchParams.value.page = 1
  }

  /**
   * 페이지 변경
   */
  const setCurrentPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      searchParams.value.page = page
    }
  }

  // ============= 모달 관리 =============

  /**
   * 모달 열기
   */
  const openModal = (type: ModalType, userKey?: number) => {
    modalState.value = {
      isOpen: true,
      type,
      targetUserKey: userKey || null,
    }
  }

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    modalState.value = {
      isOpen: false,
      type: 'create',
      targetUserKey: null,
    }
    currentMember.value = null
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
    }
    searchParams.value = {
      page: 1,
      size: 10,
      nick: '',
      phone: '',
      email: '',
    }
    closeModal()
  }

  return {
    // 상태
    members,
    currentMember,
    pagination,
    searchParams,
    modalState,

    // 계산된 속성
    totalMemberCount,
    currentPageInfo,
    hasPreviousPage,
    hasNextPage,

    // 액션
    setMemberList,
    setCurrentMember,
    updateMemberInList,
    removeMemberFromList,
    addMemberToList,
    updateSearchParams,
    setSearchCondition,
    setCurrentPage,
    openModal,
    closeModal,
    resetStore,
  }
})
