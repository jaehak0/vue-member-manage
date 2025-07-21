// src/types/viewTypes.ts

/**
 * 화면용 회원 데이터
 */
export interface ViewMember {
  id: number
  name: string
  phone: string
  age: number
  email: string
  gender: 'M' | 'F'

  // 계산된 필드들 (readonly)
  readonly genderText: string
  readonly ageGroup: string
}

/**
 * 화면용 페이지네이션
 */
export interface ViewPagination {
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number

  // 계산된 필드들 (readonly)
  readonly startItem: number
  readonly endItem: number
  readonly hasPrevious: boolean
  readonly hasNext: boolean
  readonly pageNumbers: number[]
}

/**
 * 화면용 검색 폼
 */
export interface ViewSearchForm {
  searchType: 'nick' | 'phone' | 'email' | 'all'
  searchValue: string

  // 검색 상태
  readonly isActive?: boolean
  readonly hasValue?: boolean
}

/**
 * 화면용 모달 상태
 */
export interface ViewModalState {
  isOpen: boolean
  type: 'create' | 'edit' | 'detail' | 'delete'
  targetId: number | null

  // 모달 상태
  readonly title: string
  readonly canSave: boolean
  readonly canDelete: boolean
}

/**
 * 회원 폼 데이터 (입력용)
 */
export interface ViewMemberForm {
  name: string
  phone: string
  age: string // 입력은 문자열
  email: string
  gender: 'M' | 'F' | '' // 미선택 상태 포함

  // 폼 상태
  readonly isValid: boolean
  readonly errors: Record<string, string>
}

/**
 * 화면용 회원 목록 데이터
 */
export interface ViewMemberListData {
  members: ViewMember[]
  pagination: ViewPagination
}

/**
 * 모달 타입
 */
export type ModalType = 'create' | 'edit' | 'detail' | 'delete'
