// src/util/devLogger.ts

/**
 * 개발 환경에서만 작동하는 로거 유틸리티
 */
class DevLogger {
  private isDev: boolean

  constructor() {
    this.isDev = import.meta.env.DEV
  }

  /**
   * 개발 환경에서만 console.log 실행
   */
  log(...args: any[]): void {
    if (this.isDev) {
      console.log('[DEV]', ...args)
    }
  }

  /**
   * 개발 환경에서만 console.info 실행
   */
  info(...args: any[]): void {
    if (this.isDev) {
      console.info('[DEV INFO]', ...args)
    }
  }

  /**
   * 개발 환경에서만 console.warn 실행
   */
  warn(...args: any[]): void {
    if (this.isDev) {
      console.warn('[DEV WARN]', ...args)
    }
  }

  /**
   * 개발 환경에서만 console.error 실행
   */
  error(...args: any[]): void {
    if (this.isDev) {
      console.error('[DEV ERROR]', ...args)
    }
  }

  /**
   * 개발 환경에서만 console.debug 실행
   */
  debug(...args: any[]): void {
    if (this.isDev) {
      console.debug('[DEV DEBUG]', ...args)
    }
  }

  /**
   * 개발 환경에서만 console.table 실행
   */
  table(data: any): void {
    if (this.isDev) {
      console.log('[DEV TABLE]')
      console.table(data)
    }
  }

  /**
   * 개발 환경에서만 console.group 실행
   */
  group(label: string): void {
    if (this.isDev) {
      console.group(`[DEV] ${label}`)
    }
  }

  /**
   * 개발 환경에서만 console.groupEnd 실행
   */
  groupEnd(): void {
    if (this.isDev) {
      console.groupEnd()
    }
  }

  /**
   * 개발 환경에서만 console.time 실행
   */
  time(label: string): void {
    if (this.isDev) {
      console.time(`[DEV] ${label}`)
    }
  }

  /**
   * 개발 환경에서만 console.timeEnd 실행
   */
  timeEnd(label: string): void {
    if (this.isDev) {
      console.timeEnd(`[DEV] ${label}`)
    }
  }

  /**
   * API 요청/응답 로깅 (개발 환경에서만)
   */
  apiLog(method: string, url: string, data?: any, response?: any): void {
    if (this.isDev) {
      this.group(`API ${method.toUpperCase()} ${url}`)

      if (data) {
        console.log('Request Data:', data)
      }

      if (response) {
        console.log('Response:', response)
      }

      this.groupEnd()
    }
  }

  /**
   * 상태 변화 로깅 (개발 환경에서만)
   */
  stateLog(storeName: string, action: string, oldState?: any, newState?: any): void {
    if (this.isDev) {
      this.group(`Store ${storeName} - ${action}`)

      if (oldState !== undefined) {
        console.log('Previous State:', oldState)
      }

      if (newState !== undefined) {
        console.log('New State:', newState)
      }

      this.groupEnd()
    }
  }

  /**
   * 컴포넌트 라이프사이클 로깅 (개발 환경에서만)
   */
  lifecycleLog(componentName: string, lifecycle: string, data?: any): void {
    if (this.isDev) {
      const message = `[${componentName}] ${lifecycle}`

      if (data) {
        console.log(message, data)
      } else {
        console.log(message)
      }
    }
  }

  /**
   * 성능 측정 (개발 환경에서만)
   */
  performanceLog<T>(label: string, fn: () => T | Promise<T>): T | Promise<T> {
    if (this.isDev) {
      this.time(label)
      const result = fn()

      if (result instanceof Promise) {
        return result.finally(() => this.timeEnd(label))
      } else {
        this.timeEnd(label)
        return result
      }
    } else {
      return fn()
    }
  }

  /**
   * 환경 정보 출력 (개발 환경에서만)
   */
  envInfo(): void {
    if (this.isDev) {
      this.group('Environment Info')
      console.log('Mode:', import.meta.env.MODE)
      console.log('Base URL:', import.meta.env.BASE_URL)
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL || 'Not set')
      console.log('All env vars:', import.meta.env)
      this.groupEnd()
    }
  }
}

// 싱글톤 인스턴스 생성
export const devLogger = new DevLogger()

// 기본 export (간단한 사용을 위해)
export default devLogger

// 개별 함수들을 직접 export (더 간편한 사용)
export const log = (...args: any[]) => devLogger.log(...args)
export const info = (...args: any[]) => devLogger.info(...args)
export const warn = (...args: any[]) => devLogger.warn(...args)
export const error = (...args: any[]) => devLogger.error(...args)
export const debug = (...args: any[]) => devLogger.debug(...args)
export const table = (data: any) => devLogger.table(data)
export const group = (label: string) => devLogger.group(label)
export const groupEnd = () => devLogger.groupEnd()
export const time = (label: string) => devLogger.time(label)
export const timeEnd = (label: string) => devLogger.timeEnd(label)
export const apiLog = (method: string, url: string, data?: any, response?: any) =>
  devLogger.apiLog(method, url, data, response)
export const stateLog = (storeName: string, action: string, oldState?: any, newState?: any) =>
  devLogger.stateLog(storeName, action, oldState, newState)
export const lifecycleLog = (componentName: string, lifecycle: string, data?: any) =>
  devLogger.lifecycleLog(componentName, lifecycle, data)
export const performanceLog = <T>(label: string, fn: () => T | Promise<T>) =>
  devLogger.performanceLog(label, fn)
export const envInfo = () => devLogger.envInfo()
