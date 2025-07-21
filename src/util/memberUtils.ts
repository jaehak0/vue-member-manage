// src/utils/memberUtils.ts
import type { ValidationField } from '@/types/types.ts'

// ============= 포맷팅 함수 =============

/**
 * 성별 한글 변환
 */
export const getGenderText = (gender: 'M' | 'F'): string => {
  return gender === 'M' ? '남성' : '여성'
}

/**
 * 전화번호 포맷 변환 (하이픈 추가)
 * 예: 01012345678 -> 010-1234-5678
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')

  // 010, 011 등에 따라 다르게 포맷팅
  if (cleaned.startsWith('010')) {
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone
  } else {
    // 011, 016, 017, 018, 019의 경우
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/)
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone
  }
}

/**
 * 전화번호에서 하이픈 제거
 */
export const removePhoneHyphens = (phone: string): string => {
  return phone.replace(/-/g, '')
}

/**
 * 숫자만 추출 (나이 입력용)
 */
export const extractNumbers = (value: string): string => {
  return value.replace(/\D/g, '')
}

// ============= 유효성 검사 함수 =============

/**
 * 이메일 유효성 검사 (Spring Boot @Email 규칙과 동일)
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

/**
 * 전화번호 유효성 검사 (백엔드와 동일한 규칙)
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/
  return phoneRegex.test(phone)
}

/**
 * 이름 유효성 검사
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 10
}

/**
 * 나이 유효성 검사
 */
export const validateAge = (age: number): boolean => {
  return age >= 1 && age <= 200
}

/**
 * 나이 그룹 반환
 */
export const getAgeGroup = (age: number): string => {
  if (age < 20) return '10대'
  if (age < 30) return '20대'
  if (age < 40) return '30대'
  if (age < 50) return '40대'
  if (age < 60) return '50대'
  return '60대 이상'
}

/**
 * 페이지 번호 배열 생성
 */
export const generatePageNumbers = (currentPage: number, totalPages: number): number[] => {
  const pages: number[] = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)

  // 끝에서 시작점 조정
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

/**
 * 전체 폼 유효성 검사
 */
export const validateMemberForm = (data: {
  nick: string
  email: string
  phone: string
  age: number
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!validateName(data.nick)) {
    errors.nick = '이름은 2~10자 사이로 입력해주세요.'
  }

  if (!validateEmail(data.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.'
  }

  if (!validatePhoneNumber(data.phone)) {
    errors.phone = '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)'
  }

  if (!validateAge(data.age)) {
    errors.age = '나이는 1~200 사이로 입력해주세요.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * 단일 필드 유효성 검사 메시지 반환
 */
export const getValidationMessage = (
  field: ValidationField,
  value: string | number
): string | null => {
  switch (field) {
    case 'nick':
      if (!validateName(value as string)) {
        return '이름은 2~10자 사이로 입력해주세요.'
      }
      break
    case 'email':
      if (!validateEmail(value as string)) {
        return '올바른 이메일 형식이 아닙니다.'
      }
      break
    case 'phone':
      if (!validatePhoneNumber(value as string)) {
        return '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)'
      }
      break
    case 'age':
      if (!validateAge(value as number)) {
        return '나이는 1~200 사이로 입력해주세요.'
      }
      break
  }
  return null
}

// ============= 기타 유틸리티 =============

/**
 * 검색어 하이라이트 HTML 생성
 */
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

/**
 * 테이블 정렬 함수
 */
export const sortMembers = <T>(data: T[], field: keyof T, direction: 'asc' | 'desc'): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * 페이지네이션 계산
 */
export const calculatePagination = (currentPage: number, totalCount: number, pageSize: number) => {
  const totalPages = Math.ceil(totalCount / pageSize)
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  return {
    totalPages,
    startItem,
    endItem,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  }
}
