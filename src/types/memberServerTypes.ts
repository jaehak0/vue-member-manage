// src/types/serverTypes.ts

/**
 * 서버 회원 엔티티
 */
export interface ServerMember {
  userKey: number
  nick: string
  phone: string
  age: number
  email: string
  gender: 'M' | 'F'
  deleteYn?: 0 | 1
}

/**
 * 서버 회원 등록 요청
 */
export interface ServerCreateMemberRequest {
  nick: string
  phone: string
  email: string
  age: number
  gender: 'M' | 'F'
}

/**
 * 서버 회원 수정 요청
 */
export interface ServerUpdateMemberRequest {
  nick: string
  phone: string
  email: string
  age: number
  gender: 'M' | 'F'
}

/**
 * 서버 회원 목록 조회 요청
 */
export interface ServerGetMemberListRequest {
  nick?: string
  phone?: string
  email?: string
  page: number
  size: number
}

/**
 * 서버 회원 목록 응답
 */
export interface ServerMemberListResponse {
  members: ServerMember[]
  totalCount: number
  page: number
  size: number
  totalPages: number
}

/**
 * 서버 회원 상세 응답
 */
export interface ServerMemberDetailResponse {
  userKey: number
  nick: string
  age: number
  phone: string
  email: string
  gender: 'M' | 'F'
}
