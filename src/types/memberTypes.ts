// src/types/member.ts

// ============= 회원 기본 타입 =============

/**
 * 회원 기본 정보
 */
export interface Member {
  userKey: number
  nick: string
  phone: string
  age: number
  email: string
  gender: 'M' | 'F' // M: male, F: female
  deleteYn?: 0 | 1 // 0: 사용, 1: 삭제
}

// ============= 요청 타입 =============

/**
 * 회원 등록 요청
 */
export interface CreateMemberRequest {
  nick: string
  phone: string
  age: number
  gender: 'M' | 'F'
}

/**
 * 회원 수정 요청
 */
export interface UpdateMemberRequest {
  nick: string
  phone: string
  age: number
  gender: 'M' | 'F'
}

/**
 * 회원 목록 조회 요청
 */
export interface GetMemberListRequest {
  nick?: string
  phone?: string
  email?: string
  page: number
  size: number
}

// ============= 응답 타입 =============

/**
 * 회원 목록 응답
 */
export interface GetMemberListResponse {
  members: Member[]
  totalCount: number
  page: number
  size: number
  totalPages: number
}

/**
 * 회원 상세 응답
 */
export interface GetMemberDetailResponse {
  userKey: number
  nick: string
  age: number
  phone: string
  email: string
  gender: 'M' | 'F'
}

// ============= 폼 관련 타입 =============

/**
 * 회원 폼 데이터 (추가/수정 공통)
 */
export interface MemberFormData {
  nick: string
  phone: string
  age: number | string
  email: string
  gender: 'M' | 'F'
}

/**
 * 검색 폼 데이터
 */
export interface SearchFormData {
  searchType: 'nick' | 'phone' | 'email' | 'all'
  searchValue: string
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
}

// ============= 유틸리티 타입 =============

/**
 * 모달 타입
 */
export type ModalType = 'create' | 'edit' | 'detail' | 'delete'

/**
 * 유효성 검사 필드
 */
export type ValidationField = 'nick' | 'email' | 'phone' | 'age'

/**
 * 정렬 옵션
 */
export interface SortOption {
  field: keyof Member
  direction: 'asc' | 'desc'
}
