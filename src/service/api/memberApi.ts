// src/api/memberApi.ts
import { api } from '@/config/axios.ts'
import type {
  CreateMemberRequest,
  UpdateMemberRequest,
  GetMemberListRequest,
  GetMemberListResponse,
  GetMemberDetailResponse,
} from '@/types/memberTypes.ts'

// ============= 회원 CRUD API =============

/**
 * 회원 추가
 */
export const createMember = async (memberData: CreateMemberRequest): Promise<void> => {
  await api.post('/member/createMember', memberData)
}

/**
 * 회원 수정
 */
export const updateMember = async (
  userKey: number,
  memberData: UpdateMemberRequest
): Promise<void> => {
  await api.put('/member/updateMember', {
    userKey,
    ...memberData,
  })
}

/**
 * 회원 삭제
 */
export const deleteMember = async (userKey: number): Promise<void> => {
  await api.delete('/member/deleteMember', {
    data: { user_key: userKey },
  })
}

/**
 * 회원 상세 조회
 */
export const getMemberDetail = async (userKey: number): Promise<GetMemberDetailResponse> => {
  const response = await api.post('/member/getMemberDetail', {
    user_key: userKey,
  })
  return response.data
}

/**
 * 회원 목록 조회 (검색)
 */
export const getMemberList = async (
  params: GetMemberListRequest
): Promise<GetMemberListResponse> => {
  const response = await api.post('/member/getMemberList', params)
  return response.data
}
