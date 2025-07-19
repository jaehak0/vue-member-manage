import axios from 'axios'

// 기본 axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/',
})

export default api
