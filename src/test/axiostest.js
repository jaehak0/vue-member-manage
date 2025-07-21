import axios from 'axios'
import https from 'https'
// 기본 axios 인스턴스 생성

// SSL 검증을 우회하는 agent 생성
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // SSL 인증서 검증 우회
})

export const apiTest = axios.create({
  baseURL: process.env.VITE_BACKEND_URL || 'https://anytalk.com:8701/',
  httpsAgent: httpsAgent, // SSL 우회 agent 적용
  timeout: 10000, // 10초 타임아웃
})

export default apiTest
