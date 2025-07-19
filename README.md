# Vue 회원 관리 시스템

Vue 3 + TypeScript + Vite를 기반으로 한 회원 관리 시스템입니다.

## 요구사항

### Node.js 버전

- **Node.js** v22.17.1

## 기술 스택

### 메인 프레임워크

- **Vue 3** (^3.5.17) - 프론트엔드 프레임워크
- **TypeScript** (~5.8.3) - 타입 안전성
- **Vite** (^7.0.4) - 빌드 도구

### 주요 라이브러리

- **Vue Router** (^4.5.1) - 라우팅
- **Pinia** (^3.0.3) - 상태 관리
- **Axios** (^1.10.0) - HTTP 클라이언트
- **TailwindCSS** (^4.1.11) - CSS 프레임워크

### 개발 도구

- **ESLint** (^9.31.0) - 코드 린팅
- **Prettier** (^3.6.2) - 코드 포맷팅
- **Vue DevTools** (^7.7.7) - 개발자 도구

## 현재 구현된 기능

### ✅ 완료된 기능

1. **상태 관리 시스템**
	- Pinia를 사용한 회원 데이터 상태 관리
	- 페이지네이션 상태 관리
	- 모달 상태 관리
	- 검색 조건 관리

2. **API 서비스**
	- 회원 CRUD 기능 (생성, 조회, 수정, 삭제)
	- 회원 목록 조회 및 검색
	- 회원 상세 정보 조회
	- Axios 기반 HTTP 클라이언트 설정

3. **TypeScript 타입 시스템**
	- 회원 관련 타입 정의
	- API 요청/응답 타입 정의
	- 페이지네이션 타입 정의
	- 모달 타입 정의

4. **유틸리티 함수**
	- 회원 데이터 처리 유틸리티
	- 공통 헬퍼 함수

5. **기본 컴포넌트 구조**
	- Header, Footer 공통 컴포넌트
	- Modal, Toast, Pagination 컴포넌트
	- 회원 관련 컴포넌트 (목록, 검색, 상세, 삭제 모달)

6. **라우팅 시스템**
	- Vue Router 설정
	- 페이지별 라우트 정의

7. **스타일링**
	- TailwindCSS 설정 및 적용
	- Pretendard 폰트 적용

### 🚧 진행 중인 작업

- 회원 관리 UI 컴포넌트 구현
- 반응형 디자인 적용
- 사용자 경험 개선

## 프로젝트 구조

```
src/
├── components/
│   ├── common/          # 공통 컴포넌트
│   │   ├── Header.vue   # 헤더 컴포넌트
│   │   ├── Footer.vue   # 푸터 컴포넌트
│   │   ├── Modal.vue    # 모달 컴포넌트
│   │   ├── Toast.vue    # 토스트 알림 컴포넌트
│   │   └── Pagnation.vue # 페이지네이션 컴포넌트
│   └── member/          # 회원 관련 컴포넌트
│       ├── MemberList.vue        # 회원 목록
│       ├── MemberSearchForm.vue  # 회원 검색 폼
│       ├── MemberDetail.vue      # 회원 상세 정보
│       ├── MemberModal.vue       # 회원 추가/수정 모달
│       └── MemberDeleteModal.vue # 회원 삭제 모달
├── views/               # 페이지 컴포넌트
│   ├── HomeView.vue     # 홈 페이지
│   ├── AboutView.vue    # 소개 페이지
│   ├── MemberView.vue   # 회원 관리 페이지
│   └── NotFoundView.vue # 404 페이지
├── stores/              # Pinia 상태 관리
│   └── memberStore.ts  # 회원 관리 스토어
├── service/             # API 서비스
│   └── memberApi.ts     # 회원 관련 API
├── types/               # TypeScript 타입 정의
├── util/                # 유틸리티 함수
│   └── memberUtils.ts   # 회원 관련 유틸리티
├── router/              # 라우터 설정
├── config/              # 설정 파일
└── test/                # 테스트 파일
```

## 개발 환경 설정

### 필수 요구사항

- Node.js (권장: 22.17.1 이상)
- pnpm (패키지 매니저)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 주요 기능

- 회원 목록 조회
- 회원 검색
- 반응형 UI (TailwindCSS)
- TypeScript 타입 안전성
- 모던 Vue 3 Composition API 사용

## 개발 가이드

이 프로젝트는 Vue 3의 `<script setup>` 문법을 사용합니다.
자세한 내용은 [Vue 3 Script Setup 문서](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)를
참고하세요.

TypeScript 설정에 대한 자세한
정보는 [Vue TypeScript 가이드](https://vuejs.org/guide/typescript/overview.html#project-setup)를 확인하세요.
