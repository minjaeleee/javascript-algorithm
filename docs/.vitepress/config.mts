import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'JavaScript Algorithm',
  description: 'JavaScript 자료구조와 알고리즘 학습 노트',
  base: '/javascript-algorithm/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#5b5bd6' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    siteTitle: 'JS Algorithm',
    nav: [
      { text: '홈', link: '/' },
      { text: '학습 목차', link: '/curriculum' },
      { text: '작성 가이드', link: '/guide/writing' }
    ],
    sidebar: [
      {
        text: '시작하기',
        items: [
          { text: '전체 학습 목차', link: '/curriculum' },
          { text: '학습 노트 작성법', link: '/guide/writing' }
        ]
      },
      {
        text: '1. 핵심 자료구조',
        collapsed: false,
        items: [
          { text: '챕터 소개', link: '/01-data-structures/' },
          { text: '1. 자료구조', link: '/01-data-structures/01-data-structure' },
          { text: '2. 배열과 리스트', link: '/01-data-structures/02-array-and-list' },
          { text: '3. 스택', link: '/01-data-structures/03-stack' },
          { text: '4. 큐', link: '/01-data-structures/04-queue' },
          { text: '5. 트리와 우선순위 큐', link: '/01-data-structures/05-tree-and-priority-queue' },
          { text: '6. 그래프의 표현', link: '/01-data-structures/06-graph-representation' }
        ]
      },
      {
        text: '2. 정렬 알고리즘',
        collapsed: false,
        items: [
          { text: '챕터 소개', link: '/02-sorting/' },
          { text: '1. 선택 정렬', link: '/02-sorting/01-selection-sort' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '이 페이지의 목차'
    },
    docFooter: {
      prev: '이전 글',
      next: '다음 글'
    },
    lastUpdated: {
      text: '마지막 수정',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '검색',
            buttonAriaLabel: '문서 검색'
          },
          modal: {
            noResultsText: '검색 결과가 없습니다.',
            resetButtonTitle: '검색 초기화',
            footer: {
              selectText: '선택',
              navigateText: '이동',
              closeText: '닫기'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/minjaeleee/javascript-algorithm' }
    ]
  }
})
