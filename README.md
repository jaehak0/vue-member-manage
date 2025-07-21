# Vue 회원 관리 시스템

Vue 3 + TypeScript + Vite를 기반으로 한 회원 관리 시스템입니다.

> 면접 과제 프로젝트  
> 이 프로젝트는 개발자 면접을 위한 과제로 제작되었습니다.

## 프로젝트 개요

### 과제 목표
- Vue 3 + TypeScript 기반의 현대적인 프론트엔드 개발 역량 증명
- 상태 관리, API 통신, 컴포넌트 설계 등 실무 개발 능력 시연
- 코드 품질, 타입 안전성, 사용자 경험을 고려한 개발

### 아키텍처 설계 원칙
- 관심사 분리: 컴포넌트, 서비스, 유틸리티의 명확한 역할 분담
- 타입 안전성: TypeScript를 활용한 컴파일 타임 오류 방지
- 재사용성: 공통 컴포넌트와 유틸리티 함수의 모듈화
- 확장성: 새로운 기능 추가가 용이한 구조 설계
- 사용자 경험: 직관적이고 반응형인 UI/UX 제공

## 요구사항

### Node.js 및 패키지 매니저 버전

- **Node.js** v22.17.1
- **pnpm** v10.13.1

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
- **Humps** (^2.0.1) - 객체 키 케이스 변환
- **Pretendard** (^1.3.9) - 웹폰트

### 개발 도구

- **ESLint** (^9.31.0) - 코드 린팅
- **Prettier** (^3.6.2) - 코드 포맷팅
- **Vue DevTools** (^7.7.7) - 개발자 도구
- **TypeScript ESLint** (^8.37.0) - TypeScript 린팅

## 현재 구현된 기능

### 완료된 기능

1. **상태 관리 시스템**
	- Pinia를 사용한 회원 데이터 상태 관리 (`memberStore.ts`)
	- 토스트 알림 상태 관리 (`toastStore.ts`)
	- 페이지네이션 상태 관리
	- 모달/팝업 상태 관리
	- 검색 조건 관리

2. **API 서비스**
	- 회원 CRUD 기능 (생성, 조회, 수정, 삭제)
	- 회원 목록 조회 및 검색
	- 회원 상세 정보 조회
	- Axios 기반 HTTP 클라이언트 설정
	- 요청/응답 데이터 케이스 변환 (snake_case ↔ camelCase)
	- 회원 서비스 레이어 (`memberService.ts`)

3. **TypeScript 타입 시스템**
	- 회원 관련 타입 정의 (`memberServerTypes.ts`, `memberViewTypes.ts`)
	- API 요청/응답 타입 정의
	- 페이지네이션 타입 정의
	- 토스트 알림 타입 정의 (`toastTypes.ts`)
	- 라우터 타입 정의 (`router.d.ts`)

4. **유틸리티 함수**
	- 회원 데이터 처리 유틸리티 (`memberUtils.ts`)
	- 서버-뷰 데이터 변환 유틸리티 (`memberDataTransforms.ts`)
	- 개발 로거 유틸리티 (`devLogger.ts`)

5. **컴포넌트 구조**
	- **공통 컴포넌트**:
		- `Header.vue`, `Footer.vue` - 레이아웃 컴포넌트
		- `Modal.vue` - 범용 모달 컴포넌트
		- `Toast.vue` - 토스트 알림 컴포넌트
		- `Pagination.vue` - 페이지네이션 컴포넌트
		- `ResponsivePopup.vue` - 반응형 팝업 컴포넌트
	- **회원 관련 컴포넌트**:
		- `MemberList.vue` - 회원 목록
		- `MemberSearchForm.vue` - 회원 검색 폼
		- `MemberDetail.vue` - 회원 상세 정보
		- `MemberPopup.vue` - 회원 추가/수정 팝업
		- `MemberDeletePopup.vue` - 회원 삭제 팝업
		- `MemberPagination.vue` - 회원 전용 페이지네이션

6. **라우팅 시스템**
	- Vue Router 설정
	- 페이지별 라우트 정의

7. **스타일링**
	- TailwindCSS 설정 및 적용
	- Pretendard 폰트 적용
	- 반응형 디자인

### 진행 중인 작업

- 회원 관리 UI 컴포넌트 구현
- 반응형 디자인 적용
- 사용자 경험 개선

## 프로젝트 구조

```
src/
├── components/
│   ├── common/              # 공통 컴포넌트
│   │   ├── Header.vue       # 헤더 컴포넌트
│   │   ├── Footer.vue       # 푸터 컴포넌트
│   │   ├── Modal.vue        # 모달 컴포넌트
│   │   ├── Toast.vue        # 토스트 알림 컴포넌트
│   │   ├── Pagination.vue   # 페이지네이션 컴포넌트
│   │   └── ResponsivePopup.vue # 반응형 팝업 컴포넌트
│   └── member/              # 회원 관련 컴포넌트
│       ├── MemberList.vue           # 회원 목록
│       ├── MemberSearchForm.vue     # 회원 검색 폼
│       ├── MemberDetail.vue         # 회원 상세 정보
│       ├── MemberPopup.vue          # 회원 추가/수정 팝업
│       ├── MemberDeletePopup.vue    # 회원 삭제 팝업
│       └── MemberPagination.vue     # 회원 전용 페이지네이션
├── views/                   # 페이지 컴포넌트
│   ├── HomeView.vue         # 홈 페이지
│   ├── AboutView.vue        # 소개 페이지
│   ├── MemberView.vue       # 회원 관리 페이지
│   └── NotFoundView.vue     # 404 페이지
├── stores/                  # Pinia 상태 관리
│   ├── memberStore.ts       # 회원 관리 스토어
│   └── toastStore.ts        # 토스트 알림 스토어
├── service/                 # API 서비스
│   ├── api/
│   │   └── memberApi.ts     # 회원 관련 API
│   └── memberService.ts     # 회원 서비스 레이어
├── types/                   # TypeScript 타입 정의
│   ├── memberServerTypes.ts # 서버 회원 타입
│   ├── memberViewTypes.ts   # 뷰 회원 타입
│   ├── toastTypes.ts        # 토스트 타입
│   ├── router.d.ts          # 라우터 타입
│   └── types.ts             # 공통 타입
├── util/                    # 유틸리티 함수
│   ├── memberUtils.ts       # 회원 관련 유틸리티
│   ├── memberDataTransforms.ts  # 데이터 변환 유틸리티
│   └── devLogger.ts         # 개발 로거
├── composables/             # Vue Composables
├── router/                  # 라우터 설정
├── config/                  # 설정 파일
│   └── axios.ts             # Axios 설정
├── assets/                  # 정적 자산
├── test/                    # 테스트 파일
├── App.vue                  # 루트 컴포넌트
├── main.ts                  # 애플리케이션 진입점
├── index.css                # 글로벌 스타일
└── vite-env.d.ts           # Vite 타입 정의
```

## 개발 환경 설정

### 필수 요구사항

- Node.js (권장: v22.17.1 이상)
- pnpm v10.13.1 (패키지 매니저)

### 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일을 생성합니다.
2. `.env.example` 파일을 참고하여 필요한 환경 변수를 설정합니다.

```bash
# .env.example 파일을 복사하여 .env 파일 생성
cp .env.example .env
```

**환경 변수 설명:**
- `VITE_BACKEND_URL`: 백엔드 API 서버 URL (기본값: http://localhost:8080)
- `VITE_BACKEND_REQUEST_CASE_FORMAT`: API 요청 시 사용할 케이스 형식 (snake_case 또는 camelCase)

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

- **회원 관리**: 회원 목록 조회, 추가, 수정, 삭제
- **검색 기능**: 다양한 조건으로 회원 검색
- **페이지네이션**: 대용량 데이터 효율적 처리
- **반응형 UI**: TailwindCSS를 활용한 모바일 친화적 디자인
- **타입 안전성**: TypeScript를 통한 컴파일 타임 오류 방지
- **상태 관리**: Pinia를 통한 효율적인 상태 관리
- **토스트 알림**: 사용자 액션에 대한 피드백 제공
- **모던 Vue 3**: Composition API와 `<script setup>` 문법 사용

## 개발 가이드

### Vue 3 Composition API

이 프로젝트는 Vue 3의 `<script setup>` 문법을 사용합니다.
자세한 내용은 [Vue 3 Script Setup 문서](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)를 참고하세요.

### TypeScript 설정

TypeScript 설정에 대한 자세한 정보는 [Vue TypeScript 가이드](https://vuejs.org/guide/typescript/overview.html#project-setup)를 확인하세요.

### API 통신

- Axios를 사용한 HTTP 클라이언트
- Humps 라이브러리를 통한 요청/응답 데이터 자동 케이스 변환
- 에러 핸들링 및 인터셉터 설정
- 서비스 레이어를 통한 비즈니스 로직 분리

### 상태 관리

- Pinia를 사용한 중앙집중식 상태 관리
- 회원 데이터, 페이지네이션, 모달 상태 등 관리
- 토스트 알림 상태 관리

### 컴포넌트 구조

- 공통 컴포넌트와 도메인별 컴포넌트 분리
- 재사용 가능한 컴포넌트 설계
- 반응형 팝업 및 모달 시스템

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 개발 과정에서 고려한 사항

### 기술적 의사결정

1. **상태 관리**: Pinia 선택
   - Vue 3에 최적화된 현대적인 상태 관리 라이브러리
   - TypeScript 지원이 우수하고 개발자 도구 지원

2. **데이터 변환**: 양방향 변환 함수 설계
   - 서버 데이터 ↔ 화면 데이터 간 명확한 변환 로직
   - 타입 안전성을 보장하는 변환 함수

3. **컴포넌트 설계**: 재사용 가능한 컴포넌트 구조
   - 공통 컴포넌트와 도메인별 컴포넌트 분리
   - Props와 이벤트를 통한 명확한 인터페이스

4. **API 통신**: Axios + 인터셉터 활용
   - 요청/응답 데이터 자동 케이스 변환
   - 에러 핸들링 및 로딩 상태 관리

### 사용자 경험 고려사항

- **반응형 디자인**: 모바일부터 데스크톱까지 최적화
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원 고려
- **성능**: 불필요한 리렌더링 방지 및 최적화
- **피드백**: 토스트 알림을 통한 사용자 액션 피드백

### 코드 품질 관리

- **ESLint + Prettier**: 일관된 코드 스타일 유지
- **TypeScript**: 타입 안전성 및 개발자 경험 향상
- **명명 규칙**: 직관적이고 일관된 변수/함수명 사용
- **주석**: 복잡한 로직에 대한 명확한 설명 제공

## 최근 업데이트 (2025.07.21)

### 🎨 **모바일 UX 개선**
- **MemberDetail 모바일 슬라이드업 패널**: 모바일에서 하단 슬라이드업 패널로 회원 상세 정보 표시
  - 데스크톱: 기존 사이드바 형태 유지
  - 모바일: 하단에서 올라오는 슬라이드 패널 (배경 오버레이 포함)
  - 부드러운 CSS 애니메이션과 터치 친화적 UI

### 🖱️ **모달/팝업 UX 개선**
- **배경 클릭으로 모달 닫기**: 모든 모달과 팝업에서 배경 클릭 시 자동 닫기 기능
  - Modal.vue: 배경 div에 직접 클릭 이벤트 추가
  - 이벤트 전파 방지로 모달 내부 클릭 시 닫히지 않음
  - ResponsivePopup, MemberPopup, MemberDeletePopup 모두 적용

### ⌨️ **검색 UX 개선**
- **Enter 키 검색**: MemberSearchForm에서 Enter 키로 검색 실행
  - 기존 검색 버튼 클릭 방식 유지
  - v-model을 사용한 양방향 바인딩으로 코드 간소화
  - 모바일에서도 Enter 키 지원

### 🎯 **UI/UX 세부 개선**
- **Toast z-index 조정**: z-[100]으로 설정하여 모든 모달 위에 표시
- **ResponsivePopup 모바일 레이아웃**: 최대 너비 제한으로 가독성 향상
- **MemberDeletePopup 디자인**: 경고 아이콘과 메시지 레이아웃 개선
- **Header 동적 회원 수**: 실시간 회원 수 표시 (memberStore.totalMemberCount)

### 🔧 **기술적 개선사항**
- **반응형 감지**: window.innerWidth를 사용한 실시간 화면 크기 감지
- **이벤트 최적화**: resize 이벤트 리스너 적절한 등록/해제
- **코드 품질**: ESLint/Prettier 규칙에 따른 코드 정리
