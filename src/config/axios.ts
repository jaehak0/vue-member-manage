import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

type apiCase = 'snake_case' | 'camelCase'
const apiCaseFormat: apiCase = import.meta.env.VITE_BACKEND_REQUEST_CASE_FORMAT || 'snake_case'

// 기본 axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/',
})

// 요청 인터셉터 (camel case -> snake case or snake case -> camel case)
api.interceptors.request.use(config => {
  if (config.data) {
    config.data =
      apiCaseFormat === 'camelCase' ? camelizeKeys(config.data) : decamelizeKeys(config.data)
  }
  if (config.params) {
    config.params =
      apiCaseFormat === 'camelCase' ? camelizeKeys(config.params) : decamelizeKeys(config.params)
  }
  return config
})

// 응답 인터셉터 (snake case -> camel case)
api.interceptors.response.use(response => {
  if (response.data) {
    response.data = camelizeKeys(response.data)
  }
  return response
})

export default api
