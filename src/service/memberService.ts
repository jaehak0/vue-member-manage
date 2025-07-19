// src/services/memberService.ts
import { useMemberStore } from '@/stores/memberStore'
import { useToastStore } from '@/stores/toastStore'
import { log, info, warn, error, apiLog, stateLog, performanceLog } from '@/util/devLogger'

// 서버 API 타입
import type {
  ServerCreateMemberRequest,
  ServerUpdateMemberRequest,
  ServerGetMemberListRequest,
} from '@/types/memberServerTypes'

// 화면 타입
import type { ViewSearchForm, ViewMemberForm } from '@/types/memberViewTypes'

// 변환 함수들
import {
  serverToViewMemberList,
  serverDetailToViewMember,
  viewFormToServerCreate,
  viewFormToServerUpdate,
  viewSearchToServerRequest,
} from '@/util/serverToViewData'

// API 함수들
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
  const fetchMemberList = async () => {
    log('📋 회원 목록 조회 시작')

    try {
      // 화면 검색 폼 → 서버 요청 변환
      const serverRequest: ServerGetMemberListRequest = viewSearchToServerRequest(
        memberStore.searchForm,
        {
          page: memberStore.pagination.currentPage,
          size: memberStore.pagination.pageSize,
        }
      )

      stateLog('memberService', 'searchParams', 'ViewSearchForm', serverRequest)
      apiLog('POST', '/member/getMemberList', serverRequest)

      // 성능 측정과 함께 API 호출
      const serverResponse = await performanceLog('fetchMemberList API', async () => {
        return await getMemberList(serverRequest)
      })

      apiLog('POST', '/member/getMemberList', serverRequest, serverResponse)

      // 서버 응답 → 화면 데이터 변환
      const viewData = serverToViewMemberList(serverResponse)

      stateLog(
        'memberStore',
        'setMemberListData',
        `기존 ${memberStore.members.length}명`,
        `새로 ${viewData.members.length}명`
      )

      // 화면 데이터로 스토어 업데이트
      memberStore.setMemberListData(viewData)

      info(
        '✅ 회원 목록 조회 성공',
        `총 ${viewData.pagination.totalCount}명, ${viewData.pagination.totalPages}페이지`
      )
    } catch (err) {
      error('❌ 회원 목록 조회 실패:', err)
      toastStore.showToast('회원 목록 조회에 실패했습니다.', 'error')
    }
  }

  /**
   * 회원 상세 정보 조회
   */
  const fetchMemberDetail = async (id: number) => {
    log('👤 회원 상세 조회 시작', `id: ${id}`)

    try {
      const requestData = { user_key: id }
      apiLog('POST', '/member/getMemberDetail', requestData)

      const serverResponse = await getMemberDetail(id)

      apiLog('POST', '/member/getMemberDetail', requestData, serverResponse)

      // 서버 응답 → 화면 데이터 변환
      const viewMember = serverDetailToViewMember(serverResponse)

      const oldMember = memberStore.currentMember
      memberStore.setCurrentMember(viewMember)
      stateLog('memberStore', 'setCurrentMember', oldMember, viewMember)

      info('✅ 회원 상세 조회 성공', `${viewMember.name}`)
    } catch (err) {
      error('❌ 회원 상세 조회 실패:', err)
      toastStore.showToast('회원 정보 조회에 실패했습니다.', 'error')
    }
  }

  // ============= 회원 CRUD 작업 =============

  /**
   * 회원 추가
   */
  const addMember = async (viewForm: ViewMemberForm) => {
    log('➕ 회원 추가 시작', viewForm)

    try {
      // 화면 폼 → 서버 요청 변환
      const serverRequest: ServerCreateMemberRequest = viewFormToServerCreate(viewForm)

      apiLog('POST', '/member/createMember', serverRequest)

      const serverResponse = await performanceLog('createMember API', async () => {
        return await createMember(serverRequest)
      })

      apiLog('POST', '/member/createMember', serverRequest, serverResponse)

      toastStore.showToast('회원이 성공적으로 등록되었습니다.', 'success')

      info('✅ 회원 추가 성공', `${viewForm.name} 님이 등록되었습니다`)
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
  const editMember = async (id: number, viewForm: ViewMemberForm) => {
    log('✏️ 회원 수정 시작', { id, viewForm })

    try {
      // 화면 폼 → 서버 요청 변환
      const serverRequest: ServerUpdateMemberRequest = viewFormToServerUpdate(viewForm)
      const requestData = { userKey: id, ...serverRequest }

      apiLog('PUT', '/member/updateMember', requestData)

      await performanceLog('updateMember API', async () => {
        await updateMember(id, serverRequest)
      })

      apiLog('PUT', '/member/updateMember', requestData, 'success')

      toastStore.showToast('회원 정보가 성공적으로 수정되었습니다.', 'success')

      // 화면 폼 → 화면 회원 데이터 변환 (로컬 상태 업데이트용)
      const updatedViewMember = {
        id,
        name: viewForm.name,
        phone: viewForm.phone,
        age: parseInt(viewForm.age),
        email: viewForm.email,
        gender: viewForm.gender as 'M' | 'F',
      }

      const oldMember = memberStore.members.find(m => m.id === id)
      memberStore.updateMemberInList(id, updatedViewMember)

      stateLog(
        'memberStore',
        'updateMemberInList',
        oldMember ? `${oldMember.name}` : 'Unknown',
        `${updatedViewMember.name} (수정됨)`
      )

      memberStore.closeModal()

      info('✅ 회원 수정 성공 (로컬 상태 업데이트)', `${updatedViewMember.name} 님 정보 수정`)
    } catch (err) {
      error('❌ 회원 수정 실패:', err)
      toastStore.showToast('회원 정보 수정에 실패했습니다.', 'error')
    }
  }

  /**
   * 회원 삭제
   */
  const removeMember = async (id: number) => {
    log('🗑️ 회원 삭제 시작', `id: ${id}`)

    try {
      // 삭제할 회원 정보 백업 (로깅용)
      const targetMember = memberStore.members.find(m => m.id === id)
      log('삭제 대상 회원:', targetMember ? `${targetMember.name}` : 'Unknown')

      const requestData = { user_key: id }
      apiLog('DELETE', '/member/deleteMember', requestData)

      await performanceLog('deleteMember API', async () => {
        await deleteMember(id)
      })

      apiLog('DELETE', '/member/deleteMember', requestData, 'success')

      toastStore.showToast('회원이 성공적으로 삭제되었습니다.', 'success')

      // 로컬 상태에서 해당 회원만 제거 (실시간 반영)
      const beforeCount = memberStore.members.length
      memberStore.removeMemberFromList(id)
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
        targetMember ? `${targetMember.name} 삭제됨` : `id: ${id} 삭제됨`
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
  const searchMembers = async (searchData: ViewSearchForm) => {
    log('🔍 회원 검색 시작', searchData)

    const oldSearchForm = { ...memberStore.searchForm }
    memberStore.setSearchForm(searchData)
    stateLog('memberStore', 'setSearchForm', oldSearchForm, memberStore.searchForm)

    // 검색 시 첫 페이지로 이동
    memberStore.setCurrentPage(1)

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
  const openEditModal = async (id: number) => {
    const targetMember = memberStore.members.find(m => m.id === id)
    log('✏️ 회원 수정 모달 열기', targetMember ? `${targetMember.name}` : `id: ${id}`)

    memberStore.openModal('edit', id)
    stateLog('memberStore', 'openModal', 'closed', `edit-${id}`)

    await fetchMemberDetail(id)

    info('✅ 수정 모달 준비 완료')
  }

  /**
   * 상세보기 모달 열기
   */
  const openDetailModal = async (id: number) => {
    const targetMember = memberStore.members.find(m => m.id === id)
    log('👁️ 회원 상세보기 모달 열기', targetMember ? `${targetMember.name}` : `id: ${id}`)

    memberStore.openModal('detail', id)
    stateLog('memberStore', 'openModal', 'closed', `detail-${id}`)

    await fetchMemberDetail(id)

    info('✅ 상세보기 모달 준비 완료')
  }

  /**
   * 삭제 확인 모달 열기
   */
  const openDeleteModal = (id: number) => {
    const targetMember = memberStore.members.find(m => m.id === id)
    log('🗑️ 회원 삭제 확인 모달 열기', targetMember ? `${targetMember.name}` : `id: ${id}`)

    memberStore.openModal('delete', id)
    stateLog('memberStore', 'openModal', 'closed', `delete-${id}`)
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
