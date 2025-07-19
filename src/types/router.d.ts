// Vite 7.0 ESM-only 환경에 최적화된 타입 정의
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    layout?: 'default' | 'auth' | 'admin'
    keepAlive?: boolean
    transition?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down'
    roles?: string[]
    breadcrumb?: string[]
  }
}

// Vite 7.0 Environment API 타입
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

export {}
