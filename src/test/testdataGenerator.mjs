// 테스트 데이터 생성 스크립트
// 실행: node src/test/testDataGenerator.js

import { apiTest } from './axiostest.js'

/**
 * @typedef {Object} MemberData
 * @property {string} nick
 * @property {string} phone
 * @property {string} email
 * @property {number} age
 * @property {'M' | 'F'} gender
 */

class TestdataGenerator {
  constructor() {
    this.endpoint = '/member/createMember'

    // 성씨
    this.lastNames = [
      '김',
      '이',
      '박',
      '최',
      '정',
      '강',
      '조',
      '윤',
      '장',
      '임',
      '한',
      '오',
      '서',
      '신',
      '권',
      '황',
      '안',
      '송',
      '류',
      '전',
      '홍',
      '고',
      '문',
      '양',
      '손',
      '배',
      '조',
      '백',
      '허',
      '유',
      '남',
      '심',
      '노',
      '하',
      '곽',
      '성',
      '차',
      '주',
      '우',
      '구',
    ]

    // 남성 이름
    this.maleNames = [
      '민수',
      '철수',
      '영수',
      '현우',
      '준호',
      '지훈',
      '성민',
      '동현',
      '태현',
      '승현',
      '준영',
      '현준',
      '지원',
      '성호',
      '민호',
      '태준',
      '승우',
      '현식',
      '종민',
      '상훈',
      '진우',
      '수현',
      '민재',
      '기훈',
      '성준',
      '태영',
      '승민',
      '현수',
      '종현',
      '상현',
      '진호',
      '수민',
      '민규',
      '기현',
      '성우',
      '태민',
      '승호',
      '현우',
      '종호',
      '상우',
      '진수',
      '수호',
      '민성',
      '기수',
      '성현',
      '태호',
      '승준',
      '현민',
      '종수',
      '상준',
    ]

    // 여성 이름
    this.femaleNames = [
      '지은',
      '수영',
      '민정',
      '지혜',
      '은영',
      '소영',
      '지영',
      '미영',
      '혜진',
      '예은',
      '수진',
      '민지',
      '지현',
      '은지',
      '소진',
      '지민',
      '미진',
      '혜원',
      '예진',
      '수빈',
      '민경',
      '지우',
      '은수',
      '소현',
      '지연',
      '미경',
      '혜영',
      '예림',
      '수현',
      '민서',
      '지원',
      '은정',
      '소연',
      '지수',
      '미선',
      '혜수',
      '예원',
      '수정',
      '민주',
      '지아',
      '은미',
      '소정',
      '지윤',
      '미정',
      '혜림',
      '예지',
      '수아',
      '민영',
      '지효',
      '은솔',
    ]

    // 이메일 도메인
    this.domains = [
      'gmail.com',
      'naver.com',
      'daum.net',
      'kakao.com',
      'hanmail.net',
      'hotmail.com',
      'yahoo.com',
      'outlook.com',
      'test.com',
      'example.com',
    ]
  }

  /**
   * 한글을 영문으로 변환하는 매핑
   */
  getEnglishName(koreanName) {
    const nameMap = {
      // 성씨
      김: 'kim',
      이: 'lee',
      박: 'park',
      최: 'choi',
      정: 'jung',
      강: 'kang',
      조: 'cho',
      윤: 'yoon',
      장: 'jang',
      임: 'lim',
      한: 'han',
      오: 'oh',
      서: 'seo',
      신: 'shin',
      권: 'kwon',
      황: 'hwang',
      안: 'ahn',
      송: 'song',
      류: 'ryu',
      전: 'jeon',
      홍: 'hong',
      고: 'ko',
      문: 'moon',
      양: 'yang',
      손: 'son',
      배: 'bae',
      백: 'baek',
      허: 'heo',
      유: 'yoo',
      남: 'nam',
      심: 'sim',
      노: 'noh',
      하: 'ha',
      곽: 'kwak',
      성: 'sung',
      차: 'cha',
      주: 'joo',
      우: 'woo',
      구: 'koo',

      // 남성 이름
      민수: 'minsu',
      철수: 'cheolsu',
      영수: 'youngsu',
      현우: 'hyunwoo',
      준호: 'junho',
      지훈: 'jihoon',
      성민: 'sungmin',
      동현: 'donghyun',
      태현: 'taehyun',
      승현: 'seunghyun',
      준영: 'junyoung',
      현준: 'hyunjun',
      지원: 'jiwon',
      성호: 'sungho',
      민호: 'minho',
      태준: 'taejun',
      승우: 'seungwoo',
      현식: 'hyunsik',
      종민: 'jongmin',
      상훈: 'sanghoon',
      진우: 'jinwoo',
      수현: 'suhyun',
      민재: 'minjae',
      기훈: 'kihoon',
      성준: 'sungjun',
      태영: 'taeyoung',
      승민: 'seungmin',
      현수: 'hyunsu',
      종현: 'jonghyun',
      상현: 'sanghyun',
      진호: 'jinho',
      수민: 'sumin',
      민규: 'mingyu',
      기현: 'kihyun',
      성우: 'sungwoo',
      태민: 'taemin',
      승호: 'seungho',
      종호: 'jongho',
      상우: 'sangwoo',
      진수: 'jinsu',
      수호: 'suho',
      민성: 'minsung',
      기수: 'kisu',
      성현: 'sunghyun',
      태호: 'taeho',
      승준: 'seungjun',
      현민: 'hyunmin',
      종수: 'jongsu',
      상준: 'sangjun',

      // 여성 이름
      지은: 'jieun',
      수영: 'sooyoung',
      민정: 'minjung',
      지혜: 'jihye',
      은영: 'eunyoung',
      소영: 'soyoung',
      지영: 'jiyoung',
      미영: 'miyoung',
      혜진: 'hyejin',
      예은: 'yeeun',
      수진: 'sujin',
      민지: 'minji',
      지현: 'jihyun',
      은지: 'eunji',
      소진: 'sojin',
      지민: 'jimin',
      미진: 'mijin',
      혜원: 'hyewon',
      예진: 'yejin',
      수빈: 'subin',
      민경: 'minkyung',
      지우: 'jiwoo',
      은수: 'eunsu',
      소현: 'sohyun',
      지연: 'jiyeon',
      미경: 'mikyung',
      혜영: 'hyeyoung',
      예림: 'yerim',
      민서: 'minseo',
      은정: 'eunjung',
      소연: 'soyeon',
      지수: 'jisu',
      미선: 'misun',
      혜수: 'hyesu',
      예원: 'yewon',
      수정: 'sujung',
      민주: 'minju',
      지아: 'jia',
      은미: 'eunmi',
      소정: 'sojung',
      지윤: 'jiyoon',
      미정: 'mijung',
      혜림: 'hyerim',
      예지: 'yeji',
      수아: 'sua',
      민영: 'minyoung',
      지효: 'jihyo',
      은솔: 'eunsol',
    }

    return nameMap[koreanName] || koreanName.toLowerCase()
  }

  /**
   * 단일 회원 데이터 생성 (수정된 버전)
   * @param {number} index
   * @returns {MemberData}
   */
  generateMemberData(index) {
    const gender = index % 2 === 0 ? 'M' : 'F'
    const lastName = this.lastNames[index % this.lastNames.length]
    const firstName =
      gender === 'M'
        ? this.maleNames[index % this.maleNames.length]
        : this.femaleNames[index % this.femaleNames.length]

    const nick = lastName + firstName

    // 전화번호 생성 (중복 방지)
    const phone = `010-${String(1000 + (index % 9000)).padStart(4, '0')}-${String(1000 + ((index * 7) % 9000)).padStart(4, '0')}`

    // 영문 이메일 생성
    const englishLastName = this.getEnglishName(lastName)
    const englishFirstName = this.getEnglishName(firstName)
    const emailPrefix = `${englishFirstName}${englishLastName}${index}`
    const domain = this.domains[index % this.domains.length]
    const email = `${emailPrefix}@${domain}`

    // 나이 생성 (20-65세)
    const age = 20 + (index % 46)

    return {
      nick,
      phone,
      email,
      age,
      gender,
    }
  }

  /**
   * 단일 회원 등록 API 호출
   * @param {MemberData} memberData
   * @returns {Promise<boolean>}
   */
  async createMember(memberData) {
    try {
      await apiTest.post(this.endpoint, memberData)
      console.log(`✅ 성공: ${memberData.nick} (${memberData.email})`)
      return true
    } catch (error) {
      console.error(`❌ 실패: ${memberData.nick}`)

      if (error.response) {
        console.error(`   Status: ${error.response.status}`)
        console.error(`   Data:`, error.response.data)
      } else if (error.request) {
        console.error(`   네트워크 오류: ${error.message}`)
      } else {
        console.error(`   설정 오류: ${error.message}`)
      }

      return false
    }
  }

  /**
   * 지연 함수 (API 호출 간격 조절)
   * @param {number} ms
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 100개 테스트 데이터 생성 및 등록
   * @returns {Promise<void>}
   */
  async generateTestData() {
    console.log('🚀 테스트 데이터 생성을 시작합니다...')
    console.log('📊 총 100개의 회원 데이터를 생성합니다.\n')

    let successCount = 0
    let failCount = 0

    for (let i = 0; i < 100; i++) {
      const memberData = this.generateMemberData(i)

      console.log(`[${i + 1}/100] 등록 중: ${memberData.nick}`)

      const success = await this.createMember(memberData)

      if (success) {
        successCount++
      } else {
        failCount++
      }

      // API 호출 간격 조절 (서버 부하 방지)
      if (i < 99) {
        await this.delay(100) // 100ms 대기
      }

      // 진행 상황 출력 (10개씩)
      if ((i + 1) % 10 === 0) {
        console.log(`\n📈 진행률: ${i + 1}/100 (${(((i + 1) / 100) * 100).toFixed(1)}%)`)
        console.log(`✅ 성공: ${successCount}개, ❌ 실패: ${failCount}개\n`)
      }
    }

    console.log('\n🎉 테스트 데이터 생성이 완료되었습니다!')
    console.log(`📊 최종 결과:`)
    console.log(`   ✅ 성공: ${successCount}개`)
    console.log(`   ❌ 실패: ${failCount}개`)
    console.log(`   🎯 성공률: ${((successCount / 100) * 100).toFixed(1)}%`)
  }

  /**
   * 단일 테스트 (연결 확인용)
   * @returns {Promise<void>}
   */
  async testConnection() {
    console.log('🔧 서버 연결 테스트를 시작합니다...')

    /** @type {MemberData} */
    const testData = {
      nick: '연결테스트',
      phone: '010-0000-0001',
      email: 'connection.test@test.com',
      age: 25,
      gender: 'M',
    }

    const success = await this.createMember(testData)

    if (success) {
      console.log('✅ 서버 연결이 정상입니다!')
    } else {
      console.log('❌ 서버 연결에 문제가 있습니다.')
    }
  }
}

// 스크립트 실행 부분
async function main() {
  const generator = new TestdataGenerator()

  // 명령행 인수 확인
  const args = process.argv.slice(2)

  if (args.includes('--test') || args.includes('-t')) {
    // 연결 테스트만 실행
    await generator.testConnection()
  } else {
    // 전체 데이터 생성 실행
    try {
      await generator.generateTestData()
    } catch (error) {
      console.error('💥 스크립트 실행 중 오류가 발생했습니다:', error)
    }
  }
}

main()
