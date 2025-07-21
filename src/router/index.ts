import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import { error, log } from '@/util/devLogger.ts'

// Vite 7.0 ESM-only 환경에 최적화된 동적 import
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/MemberView.vue'),
    meta: {
      title: '회원관리',
      requiresAuth: false,
      keepAlive: true,
    },
  },
  {
    // Vite 7.0 향상된 404 처리
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '페이지를 찾을 수 없음',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  // Vite 7.0 baseline-widely-available 타겟에 최적화된 스크롤
  scrollBehavior(to, _, savedPosition) {
    // 모던 브라우저 기능 활용
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // 헤더 높이 고려
      }
    }

    return { top: 0, behavior: 'smooth' }
  },
})

// Vite 7.0 향상된 타입 안전성과 함께하는 네비게이션 가드
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 페이지 제목 설정
    const title = to.meta?.title as string
    document.title = title ? `${title} | My App` : 'My App'

    // 인증 체크 (필요시)
    if (to.meta?.requiresAuth) {
      // 인증 로직 구현
      log('인증이 필요한 페이지입니다.')
    }

    // Vite 7.0 HMR 개선사항과 함께 개발 모드 로깅
    log(`[Router] ${from.name as string} → ${to.name as string}`)

    next()
  }
)

// Vite 7.0 에러 처리 향상
router.onError(err => {
  error('[Router Error]:', err)
})

export default router
