import { createApp } from 'vue'
import '@/index.css'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

// Vite 7.0 ESM-only 환경 활용
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Vite 7.0 향상된 라우터 준비 체크
router
  .isReady()
  .then(() => {
    app.mount('#app')

    // Vite 7.0 개발 모드에서 추가 정보
    if (import.meta.env.DEV) {
      console.log('🚀 App mounted with Vite 7.0 + Pinia 3.0!')
      console.log('Router ready, initial route:', router.currentRoute.value.path)
    }
  })
  .catch(error => {
    console.error('라우터 초기화 실패:', error)
  })

// Vite 7.0 HMR 개선사항 활용
if (import.meta.hot) {
  import.meta.hot.accept()
}
