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
	- 디바운스 컴포저블 (`useDebounce.ts`) - 연속 이벤트 처리 최적화

5. **Vue 컴포저블**
	- **useDebounce**: 함수 호출을 디바운스 처리하는 컴포저블
		- 연속 이벤트 발생 시 마지막 이벤트만 처리하여 성능 최적화
		- 페이지네이션 버튼 연속 클릭 문제 해결에 활용
		- 반응형 처리 상태 제공 (isProcessing)
	- **useMemberAutoFetch**: 회원 데이터 자동 조회 컴포저블
		- 컴포넌트 마운트 시 초기 데이터 자동 로드
		- 검색 조건 변경 시 자동 데이터 조회
		- 페이지 변경 시 자동 데이터 조회
		- 초기화 상태 관리 (isInitialized)

6. **컴포넌트 구조**
	- **공통 컴포넌트**:
		- `Header.vue`, `Footer.vue` - 레이아웃 컴포넌트
		- `Modal.vue` - 범용 모달 컴포넌트
		- `Toast.vue` - 토스트 알림 컴포넌트
		- `Pagination.vue` - 페이지네이션 컴포넌트 (디바운싱 적용, 첫/마지막 페이지 이동 기능)
		- `ResponsivePopup.vue` - 반응형 팝업 컴포넌트
	- **회원 관련 컴포넌트**:
		- `MemberList.vue` - 회원 목록
		- `MemberSearchForm.vue` - 회원 검색 폼
		- `MemberDetail.vue` - 회원 상세 정보 (이름, 이메일, 전화번호, 성별, 나이 표시)
		- `MemberPopup.vue` - 회원 추가/수정 팝업 (나이 입력 필드 추가)
		- `MemberDeletePopup.vue` - 회원 삭제 팝업
		- `MemberPagination.vue` - 회원 전용 페이지네이션

7. **라우팅 시스템**
	- Vue Router 설정

8. **UI/UX 개선**
	- 페이지네이션 안정성 개선 (디바운싱 적용으로 연속 클릭 문제 해결)
	- 첫 페이지/마지막 페이지 바로가기 기능 추가
	- 회원 나이 정보 표시 및 입력 기능 추가
	- 레이아웃 개선 (flex 속성 조정으로 화면 비율 최적화)

9. **테스트 및 개발 도구**
	- 테스트 데이터 생성기 (`testdataGenerator.mjs`) - 대량의 테스트 회원 데이터 생성
	- 개발용 로깅 시스템 개선 - console.log 대신 커스텀 로깅 함수 사용

## 프로젝트 구조

```
vue-member-manage/
├── public/                 # 정적 파일
├── src/                    # 소스 코드
│   ├── assets/             # 이미지, 폰트 등 자산
│   ├── components/         # Vue 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   │   ├── Footer.vue
│   │   │   ├── Header.vue
│   │   │   ├── Modal.vue
│   │   │   ├── Pagination.vue
│   │   │   ├── ResponsivePopup.vue
│   │   │   └── Toast.vue
│   │   └── member/         # 회원 관련 컴포넌트
│   │       ├── MemberDetail.vue
│   │       ├── MemberList.vue
│   │       ├── MemberPagination.vue
│   │       ├── MemberPopup.vue
│   │       ├── MemberDeletePopup.vue
│   │       └── MemberSearchForm.vue
│   ├── composables/        # Vue 컴포저블
│   │   ├── useDebounce.ts  # 디바운스 처리 컴포저블
│   │   └── useMemberAutoFetch.ts # 회원 데이터 자동 조회 컴포저블
│   ├── router/             # Vue Router 설정
│   │   └── index.ts
│   ├── service/            # 서비스 레이어
│   │   ├── memberApi.ts    # 회원 API 클라이언트
│   │   └── memberService.ts # 회원 서비스 로직
│   ├── stores/             # Pinia 상태 관리
│   │   ├── memberStore.ts  # 회원 관리 스토어
│   │   └── toastStore.ts   # 토스트 알림 스토어
│   ├── types/              # TypeScript 타입 정의
│   │   ├── memberServerTypes.ts
│   │   ├── memberViewTypes.ts
│   │   └── toastTypes.ts
│   ├── util/               # 유틸리티 함수
│   │   ├── devLogger.ts    # 개발용 로깅 유틸리티
│   │   ├── memberDataTransforms.ts # 데이터 변환 유틸리티
│   │   └── memberUtils.ts  # 회원 관련 유틸리티
│   ├── views/              # 페이지 뷰 컴포넌트
│   │   ├── MemberView.vue  # 회원 관리 페이지
│   │   └── NotFoundView.vue # 404 페이지
│   ├── App.vue             # 루트 컴포넌트
│   ├── main.ts             # 애플리케이션 진입점
│   └── vite-env.d.ts       # Vite 환경 타입 정의
├── .eslintrc.config.cjs           # ESLint 설정
├── .gitignore              # Git 무시 파일 목록
├── .prettierrc             # Prettier 설정
├── index.html              # HTML 진입점
├── package.json            # 패키지 정보 및 의존성
├── pnpm-lock.yaml          # 패키지 잠금 파일
├── README.md               # 프로젝트 문서
├── tailwind.config.js      # TailwindCSS 설정
├── tsconfig.json           # TypeScript 기본 설정
├── tsconfig.app.json       # 애플리케이션용 TypeScript 설정
├── tsconfig.node.json      # Node.js용 TypeScript 설정
└── vite.config.ts          # Vite 설정
```

## 개발 가이드

### 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

### 환경 설정

프로젝트 실행 전 `.env` 파일을 설정해야 합니다:

1. 프로젝트 루트에 있는 `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
```bash
cp .env.example .env
```

2. `.env` 파일을 열고 필요한 환경 변수를 설정합니다:
```
# 백엔드 URL 설정
VITE_BACKEND_URL=http://your-backend-url

# 요청 데이터 형식 설정 (snake_case 또는 camelCase)
VITE_BACKEND_REQUEST_CASE_FORMAT=snake_case
```

## 📸 주요 화면

### 🖥️ 데스크톱 화면

#### 메인 화면 - 회원 목록 관리
![브라우저 메인화면](https://github.com/user-attachments/assets/2a3afb58-d791-4337-90ff-011856d94580)
*회원 목록 조회, 검색, 페이지네이션 기능을 제공하는 메인 화면*

#### 회원 정보 수정 모달
![브라우저 회원수정 모달창](https://github.com/user-attachments/assets/343c160f-4d33-4551-b8fd-c4e8ec0e50c9)
*회원 정보 수정을 위한 모달 창 (이름, 이메일, 전화번호, 나이, 성별 입력)*

#### 회원 삭제 확인 모달
![브라우저 회원정보 삭제 시 모달창](https://github.com/user-attachments/assets/d4f7c3c7-4bb2-472d-8334-b7b6c72fa20e)
*회원 삭제 전 확인을 위한 경고 모달*

#### 성공 토스트 알림
![브라우저 수정 성공 시 토스트](https://github.com/user-attachments/assets/0279ffa0-2f65-4bbf-be99-057e1d0d5c7c)
*회원 정보 수정 성공 시 표시되는 토스트 알림*

#### 실패 알림
![회원정보 수정 실패시 토스트](https://github.com/user-attachments/assets/b3bc923b-ce3b-40df-b700-d94e615fd3c4)
*회원 정보 수정 실패 시 에러 토스트 알림*

### 📱 모바일 반응형 화면

#### 모바일 메인 화면
![모바일 메인화면](https://github.com/user-attachments/assets/4574bae0-42b5-49b8-be54-c2e7091c69b7)
*모바일에 최적화된 회원 목록 (이름, 전화번호만 표시)*

#### 모바일 회원 상세정보
![모바일 회원 상세정보 화면](https://github.com/user-attachments/assets/86455c49-208f-44c2-968e-fddef5c305b4)
*모바일에서 하단 슬라이드업 패널로 표시되는 회원 상세정보*

#### 모바일 회원정보 생성
![모바일 회원정보 생성 화면](https://github.com/user-attachments/assets/d3a861bb-eed1-43e4-b5b8-fde038f8edc2)
*모바일 전용 전체 화면 회원 추가 폼*

#### 모바일 회원 삭제 확인
![모바일 회원정보 삭제 화면](https://github.com/user-attachments/assets/fc211a0a-051c-4f33-a6ca-fc63c9175982)
*모바일에 최적화된 삭제 확인 모달*

#### 모바일 성공 알림
![모바일 회원정보 수정 성공 시 토스트](https://github.com/user-attachments/assets/18d63793-9d98-4c35-a462-560609637b6b)
*회원 정보 수정 성공 시 모바일 토스트 알림*

### 코딩 컨벤션

- **컴포넌트 네이밍**: PascalCase 사용 (예: `MemberList.vue`)
- **변수 및 함수 네이밍**: camelCase 사용 (예: `fetchMemberList`)
- **타입 네이밍**: PascalCase 사용 (예: `MemberData`)
- **파일 네이밍**: 
  - 컴포넌트: PascalCase (예: `MemberDetail.vue`)
  - 유틸리티/서비스: camelCase (예: `memberService.ts`)
  - 컴포저블: camelCase, 'use' 접두사 사용 (예: `useDebounce.ts`)

### 디자인 시스템

- **색상 팔레트**: TailwindCSS 기본 팔레트 사용
- **폰트**: Pretendard 폰트 사용
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원 고려
- **성능**: 불필요한 리렌더링 방지 및 최적화
- **피드백**: 토스트 알림을 통한 사용자 액션 피드백
