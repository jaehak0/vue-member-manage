// src/services/memberService.ts
import { useMemberStore } from '@/stores/memberStore'
import { useToastStore } from '@/stores/toastStore'
import { log, info, warn, error, apiLog, stateLog, performanceLog } from '@/util/devLogger'

import type {
  CreateMemberRequest,
  UpdateMemberRequest,
  GetMemberListRequest,
  SearchFormData,
} from '@/types/memberTypes'
import {
  getMemberList,
  createMember,
  updateMember,
  deleteMember,
  getMemberDetail,
} from '@/service/api/memberApi'

export const useMemberService = () => {
  const memberStore = useMemberStore()
  const toastStore = useToastStore()

  // ============= 회원 목록 관리 =============

  /**
   * 회원 목록 조회
   */
  const fetchMemberList = async (params?: Partial<GetMemberListRequest>) => {
    log('📋 회원 목록 조회 시작', params)

    try {
      // 검색 파라미터 업데이트
      if (params) {
        const oldParams = { ...memberStore.searchParams }
        memberStore.updateSearchParams(params)
        stateLog('memberStore', 'updateSearchParams', oldParams, memberStore.searchParams)
      }

      // API 요청 로깅
      apiLog('POST', '/member/getMemberList', memberStore.searchParams)

      // 성능 측정과 함께 API 호출
      const response = await performanceLog('fetchMemberList API', async () => {
        return await getMemberList(memberStore.searchParams)
      })

      // API 응답 로깅
      apiLog('POST', '/member/getMemberList', memberStore.searchParams, response)

      // 스토어에 데이터 저장
      const storeData = {
        members: response.members,
        pagination: {
          currentPage: response.page,
          pageSize: response.size,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
        },
      }

      const oldMembers = [...memberStore.members]
      memberStore.setMemberList(storeData)
      stateLog(
        'memberStore',
        'setMemberList',
        `기존 ${oldMembers.length}명`,
        `새로 ${storeData.members.length}명`
      )

      info('✅ 회원 목록 조회 성공', `총 ${response.totalCount}명, ${response.totalPages}페이지`)
    } catch (err) {
      error('❌ 회원 목록 조회 실패:', err)
      toastStore.showToast('회원 목록 조회에 실패했습니다.', 'error')
    }
  }

  /**
   * 회원 상세 정보 조회
   */
  const fetchMemberDetail = async (userKey: number) => {
    log('👤 회원 상세 조회 시작', `userKey: ${userKey}`)

    try {
      const requestData = { user_key: userKey }
      apiLog('POST', '/member/getMemberDetail', requestData)

      const response = await getMemberDetail(userKey)

      apiLog('POST', '/member/getMemberDetail', requestData, response)

      const memberData = {
        userKey: response.userKey,
        nick: response.nick,
        age: response.age,
        phone: response.phone,
        email: response.email,
        gender: response.gender,
      }

      const oldMember = memberStore.currentMember
      memberStore.setCurrentMember(memberData)
      stateLog('memberStore', 'setCurrentMember', oldMember, memberData)

      info('✅ 회원 상세 조회 성공', `${memberData.nick} (${memberData.email})`)
    } catch (err) {
      error('❌ 회원 상세 조회 실패:', err)
      toastStore.showToast('회원 정보 조회에 실패했습니다.', 'error')
    }
  }

  // ============= 회원 CRUD 작업 =============

  /**
   * 회원 추가
   */
  const addMember = async (memberData: CreateMemberRequest) => {
    log('➕ 회원 추가 시작', memberData)

    try {
      apiLog('POST', '/member/createMember', memberData)

      const response = await performanceLog('createMember API', async () => {
        return await createMember(memberData)
      })

      apiLog('POST', '/member/createMember', memberData, response)

      toastStore.showToast('회원이 성공적으로 등록되었습니다.', 'success')

      info('✅ 회원 추가 성공', `${memberData.nick} 님이 등록되었습니다`)
      log('🔄 목록 새로고침 시작...')

      // 전체 목록 새로고침 (새 회원은 서버에서 ID 받아야 하므로)
      await fetchMemberList()
      memberStore.closeModal()

      info('✅ 목록 새로고침 및 모달 닫기 완료')
    } catch (err) {
      error('❌ 회원 등록 실패:', err)
      toastStore.showToast('회원 등록에 실패했습니다.', 'error')
    }
  }

  /**
   * 회원 수정
   */
  const editMember = async (userKey: number, memberData: UpdateMemberRequest) => {
    log('✏️ 회원 수정 시작', { userKey, memberData })

    try {
      const requestData = { userKey, ...memberData }
      apiLog('PUT', '/member/updateMember', requestData)

      await performanceLog('updateMember API', async () => {
        await updateMember(userKey, memberData)
      })

      apiLog('PUT', '/member/updateMember', requestData, 'success')

      toastStore.showToast('회원 정보가 성공적으로 수정되었습니다.', 'success')

      // 로컬 상태에서 해당 회원 정보만 업데이트
      const updatedMember = { userKey, ...memberData }
      const oldMember = memberStore.members.find(m => m.userKey === userKey)

      memberStore.updateMemberInList(userKey, updatedMember)
      stateLog(
        'memberStore',
        'updateMemberInList',
        oldMember ? `${oldMember.nick} (${oldMember.email})` : 'Unknown',
        `${updatedMember.nick} (수정됨)`
      )

      memberStore.closeModal()

      info('✅ 회원 수정 성공 (로컬 상태 업데이트)', `${updatedMember.nick} 님 정보 수정`)
    } catch (err) {
      error('❌ 회원 수정 실패:', err)
      toastStore.showToast('회원 정보 수정에 실패했습니다.', 'error')
    }
  }

  /**
   * 회원 삭제
   */
  const removeMember = async (userKey: number) => {
    log('🗑️ 회원 삭제 시작', `userKey: ${userKey}`)

    try {
      // 삭제할 회원 정보 백업 (로깅용)
      const targetMember = memberStore.members.find(m => m.userKey === userKey)
      log(
        '삭제 대상 회원:',
        targetMember ? `${targetMember.nick} (${targetMember.email})` : 'Unknown'
      )

      const requestData = { user_key: userKey }
      apiLog('DELETE', '/member/deleteMember', requestData)

      await performanceLog('deleteMember API', async () => {
        await deleteMember(userKey)
      })

      apiLog('DELETE', '/member/deleteMember', requestData, 'success')

      toastStore.showToast('회원이 성공적으로 삭제되었습니다.', 'success')

      // 로컬 상태에서 해당 회원만 제거 (실시간 반영)
      const beforeCount = memberStore.members.length
      memberStore.removeMemberFromList(userKey)
      const afterCount = memberStore.members.length

      stateLog(
        'memberStore',
        'removeMemberFromList',
        `삭제 전: ${beforeCount}명`,
        `삭제 후: ${afterCount}명`
      )

      memberStore.closeModal()

      info(
        '✅ 회원 삭제 성공 (실시간 UI 반영)',
        targetMember ? `${targetMember.nick} 님이 삭제되었습니다` : `userKey: ${userKey} 삭제됨`
      )
    } catch (err) {
      error('❌ 회원 삭제 실패:', err)
      toastStore.showToast('회원 삭제에 실패했습니다.', 'error')
    }
  }

  // ============= 검색 및 페이지네이션 =============

  /**
   * 검색 실행
   */
  const searchMembers = async (searchData: SearchFormData) => {
    log('🔍 회원 검색 시작', searchData)

    const oldSearchParams = { ...memberStore.searchParams }
    memberStore.setSearchCondition(searchData)
    stateLog('memberStore', 'setSearchCondition', oldSearchParams, memberStore.searchParams)

    await fetchMemberList()

    info('✅ 회원 검색 완료')
  }

  /**
   * 페이지 이동
   */
  const goToPage = async (page: number) => {
    if (page >= 1 && page <= memberStore.pagination.totalPages) {
      log('📄 페이지 이동', `${memberStore.pagination.currentPage} → ${page}`)

      const oldPage = memberStore.pagination.currentPage
      memberStore.setCurrentPage(page)
      stateLog('memberStore', 'setCurrentPage', `${oldPage}페이지`, `${page}페이지`)

      await fetchMemberList()

      info('✅ 페이지 이동 완료', `${page}/${memberStore.pagination.totalPages} 페이지`)
    } else {
      warn(
        '⚠️ 잘못된 페이지 번호',
        `요청: ${page}, 유효 범위: 1~${memberStore.pagination.totalPages}`
      )
    }
  }

  /**
   * 다음 페이지
   */
  const goToNextPage = async () => {
    if (memberStore.hasNextPage) {
      const nextPage = memberStore.pagination.currentPage + 1
      log('▶️ 다음 페이지로 이동', `${memberStore.pagination.currentPage} → ${nextPage}`)
      await goToPage(nextPage)
    } else {
      warn('⚠️ 다음 페이지 없음', '마지막 페이지입니다')
    }
  }

  /**
   * 이전 페이지
   */
  const goToPreviousPage = async () => {
    if (memberStore.hasPreviousPage) {
      const prevPage = memberStore.pagination.currentPage - 1
      log('◀️ 이전 페이지로 이동', `${memberStore.pagination.currentPage} → ${prevPage}`)
      await goToPage(prevPage)
    } else {
      warn('⚠️ 이전 페이지 없음', '첫 번째 페이지입니다')
    }
  }

  // ============= 모달 관리 =============

  /**
   * 추가 모달 열기
   */
  const openCreateModal = () => {
    log('➕ 회원 추가 모달 열기')
    memberStore.openModal('create')
    stateLog('memberStore', 'openModal', 'closed', 'create')
  }

  /**
   * 수정 모달 열기
   */
  const openEditModal = async (userKey: number) => {
    const targetMember = memberStore.members.find(m => m.userKey === userKey)
    log(
      '✏️ 회원 수정 모달 열기',
      targetMember ? `${targetMember.nick} (userKey: ${userKey})` : `userKey: ${userKey}`
    )

    memberStore.openModal('edit', userKey)
    stateLog('memberStore', 'openModal', 'closed', `edit-${userKey}`)

    await fetchMemberDetail(userKey)

    info('✅ 수정 모달 준비 완료')
  }

  /**
   * 상세보기 모달 열기
   */
  const openDetailModal = async (userKey: number) => {
    const targetMember = memberStore.members.find(m => m.userKey === userKey)
    log(
      '👁️ 회원 상세보기 모달 열기',
      targetMember ? `${targetMember.nick} (userKey: ${userKey})` : `userKey: ${userKey}`
    )

    memberStore.openModal('detail', userKey)
    stateLog('memberStore', 'openModal', 'closed', `detail-${userKey}`)

    await fetchMemberDetail(userKey)

    info('✅ 상세보기 모달 준비 완료')
  }

  /**
   * 삭제 확인 모달 열기
   */
  const openDeleteModal = (userKey: number) => {
    const targetMember = memberStore.members.find(m => m.userKey === userKey)
    log(
      '🗑️ 회원 삭제 확인 모달 열기',
      targetMember ? `${targetMember.nick} (userKey: ${userKey})` : `userKey: ${userKey}`
    )

    memberStore.openModal('delete', userKey)
    stateLog('memberStore', 'openModal', 'closed', `delete-${userKey}`)
  }

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    log('❌ 모달 닫기', `현재 모달: ${memberStore.modalState.type}`)
    const oldState = memberStore.modalState.type
    memberStore.closeModal()
    stateLog('memberStore', 'closeModal', oldState, 'closed')
  }

  // ============= 초기화 =============

  /**
   * 초기 데이터 로드
   */
  const initialize = async () => {
    log('🚀 회원 서비스 초기화 시작')

    await performanceLog('Member Service Initialize', async () => {
      await fetchMemberList()
    })

    info(
      '✅ 회원 서비스 초기화 완료',
      `총 ${memberStore.totalMemberCount}명의 회원이 로드되었습니다`
    )
  }

  return {
    // 회원 목록 관리
    fetchMemberList,
    fetchMemberDetail,

    // CRUD 작업
    addMember,
    editMember,
    removeMember,

    // 검색 및 페이지네이션
    searchMembers,
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // 모달 관리
    openCreateModal,
    openEditModal,
    openDetailModal,
    openDeleteModal,
    closeModal,

    // 초기화
    initialize,
  }
}
