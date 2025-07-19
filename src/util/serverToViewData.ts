// src/utils/transforms.ts
import type {
  ServerMember,
  ServerMemberListResponse,
  ServerMemberDetailResponse,
  ServerCreateMemberRequest,
  ServerUpdateMemberRequest,
  ServerGetMemberListRequest,
} from '@/types/memberServerTypes'
import type {
  ViewMember,
  ViewPagination,
  ViewMemberListData,
  ViewSearchForm,
  ViewMemberForm,
} from '@/types/memberViewTypes'
import {
  formatPhoneNumber,
  getGenderText,
  getAgeGroup,
  generatePageNumbers,
} from '@/util/memberUtils'

// ============= Server → View 변환 =============

/**
 * 서버 회원 → 화면 회원 변환
 */
export const serverToViewMember = (serverMember: ServerMember): ViewMember => {
  const viewMember = {
    id: serverMember.userKey,
    name: serverMember.nick,
    phone: serverMember.phone,
    age: serverMember.age,
    email: serverMember.email,
    gender: serverMember.gender,

    // 계산된 필드들
    get displayName(): string {
      return `${this.name} (${this.age}세)`
    },
    get formattedPhone(): string {
      return formatPhoneNumber(this.phone)
    },
    get genderText(): string {
      return getGenderText(this.gender)
    },
    get ageGroup(): string {
      return getAgeGroup(this.age)
    },
  } as ViewMember

  return viewMember
}

/**
 * 서버 회원 상세 → 화면 회원 변환
 */
export const serverDetailToViewMember = (serverDetail: ServerMemberDetailResponse): ViewMember => {
  return serverToViewMember({
    userKey: serverDetail.userKey,
    nick: serverDetail.nick,
    phone: serverDetail.phone,
    age: serverDetail.age,
    email: serverDetail.email,
    gender: serverDetail.gender,
  })
}

/**
 * 서버 페이지네이션 → 화면 페이지네이션 변환
 */
export const serverToViewPagination = (
  serverResponse: ServerMemberListResponse
): ViewPagination => {
  const { page, size, totalCount, totalPages } = serverResponse

  const viewPagination = {
    currentPage: page,
    pageSize: size,
    totalCount,
    totalPages,

    // 계산된 필드들
    get startItem(): number {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    get endItem(): number {
      return Math.min(this.currentPage * this.pageSize, this.totalCount)
    },
    get hasPrevious(): boolean {
      return this.currentPage > 1
    },
    get hasNext(): boolean {
      return this.currentPage < this.totalPages
    },
    get pageNumbers(): number[] {
      return generatePageNumbers(this.currentPage, this.totalPages)
    },
  } as ViewPagination

  return viewPagination
}

/**
 * 서버 응답 → 화면 회원 목록 변환
 */
export const serverToViewMemberList = (
  serverResponse: ServerMemberListResponse
): ViewMemberListData => {
  return {
    members: serverResponse.members.map(serverToViewMember),
    pagination: serverToViewPagination(serverResponse),
  }
}

// ============= View → Server 변환 =============

/**
 * 화면 회원 폼 → 서버 등록 요청 변환
 */
export const viewFormToServerCreate = (viewForm: ViewMemberForm): ServerCreateMemberRequest => {
  return {
    nick: viewForm.name.trim(),
    phone: viewForm.phone.replace(/-/g, ''), // 하이픈 제거
    age: parseInt(viewForm.age),
    gender: viewForm.gender as 'M' | 'F',
  }
}

/**
 * 화면 회원 폼 → 서버 수정 요청 변환
 */
export const viewFormToServerUpdate = (viewForm: ViewMemberForm): ServerUpdateMemberRequest => {
  return {
    nick: viewForm.name.trim(),
    phone: viewForm.phone.replace(/-/g, ''), // 하이픈 제거
    age: parseInt(viewForm.age),
    gender: viewForm.gender as 'M' | 'F',
  }
}

/**
 * 화면 회원 → 서버 수정 요청 변환
 */
export const viewMemberToServerUpdate = (viewMember: ViewMember): ServerUpdateMemberRequest => {
  return {
    nick: viewMember.name,
    phone: viewMember.phone.replace(/-/g, ''), // 하이픈 제거
    age: viewMember.age,
    gender: viewMember.gender,
  }
}

/**
 * 화면 검색 폼 → 서버 검색 요청 변환
 */
export const viewSearchToServerRequest = (
  viewSearch: ViewSearchForm,
  pagination: { page: number; size: number }
): ServerGetMemberListRequest => {
  const request: ServerGetMemberListRequest = {
    page: pagination.page,
    size: pagination.size,
  }

  // 검색 조건 설정
  if (viewSearch.searchValue.trim()) {
    if (viewSearch.searchType === 'all') {
      request.nick = viewSearch.searchValue.trim()
      request.phone = viewSearch.searchValue.trim()
      request.email = viewSearch.searchValue.trim()
    } else {
      request[viewSearch.searchType] = viewSearch.searchValue.trim()
    }
  }

  return request
}

// ============= 화면 전용 변환 =============

/**
 * 화면 회원 → 화면 폼 변환 (수정 시 사용)
 */
export const viewMemberToViewForm = (viewMember: ViewMember): ViewMemberForm => {
  const viewForm = {
    name: viewMember.name,
    phone: viewMember.phone,
    age: viewMember.age.toString(),
    email: viewMember.email,
    gender: viewMember.gender,

    // 폼 상태 계산
    get isValid(): boolean {
      return (
        this.name.trim().length >= 2 &&
        this.phone.length >= 10 &&
        parseInt(this.age) > 0 &&
        this.email.includes('@') &&
        (this.gender === 'M' || this.gender === 'F')
      )
    },
    get errors(): Record<string, string> {
      const errors: Record<string, string> = {}

      if (this.name.trim().length < 2) {
        errors.name = '이름은 2자 이상 입력해주세요.'
      }
      if (this.phone.length < 10) {
        errors.phone = '올바른 전화번호를 입력해주세요.'
      }
      if (!parseInt(this.age) || parseInt(this.age) <= 0) {
        errors.age = '올바른 나이를 입력해주세요.'
      }
      if (!this.email.includes('@')) {
        errors.email = '올바른 이메일을 입력해주세요.'
      }
      if (this.gender !== 'M' && this.gender !== 'F') {
        errors.gender = '성별을 선택해주세요.'
      }

      return errors
    },
  } as ViewMemberForm

  return viewForm
}
