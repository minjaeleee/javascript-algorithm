---
title: 트리(Tree)와 우선순위 큐(Priority Queue)
description: 트리와 이진 트리의 용어, 힙 기반 우선순위 큐의 원리와 구현을 알아봅니다.
---

# 트리(Tree)와 우선순위 큐(Priority Queue)

## 학습 목표

- 트리의 기본 용어와 계층 구조를 설명한다.
- 이진 트리와 균형의 중요성을 이해한다.
- 최소 힙 기반 우선순위 큐를 JavaScript로 구현한다.

## 트리

트리는 부모와 자식 관계로 계층을 표현하는 비선형 자료구조다. 파일 시스템, 조직도, DOM처럼 계층적인 데이터를 나타낼 때 사용한다.

```text
          A         ← 루트
        /   \
       B     C
      / \     \
     D   E     F    ← 리프
```

### 기본 용어

- **루트 노드(root)**: 부모가 없는 최상위 노드
- **부모 노드(parent)**: 다른 노드로 내려가는 간선을 가진 바로 위 노드
- **자식 노드(child)**: 부모 노드 바로 아래에 연결된 노드
- **형제 노드(sibling)**: 같은 부모를 가진 노드
- **리프 노드(leaf)**: 자식이 없는 노드
- **깊이(depth)**: 루트에서 특정 노드까지의 간선 수
- **높이(height)**: 특정 노드에서 가장 먼 리프까지의 간선 수
- **서브트리(subtree)**: 특정 노드와 그 자손들로 이루어진 트리

## 이진 트리와 균형

이진 트리는 각 노드가 최대 두 개의 자식을 갖는 트리다. 이진 탐색 트리에서는 일반적으로 왼쪽 서브트리에 더 작은 값, 오른쪽 서브트리에 더 큰 값을 둔다.

트리가 한쪽으로 치우치면 높이가 `n`에 가까워져 탐색이 `O(n)`까지 느려질 수 있다. 반대로 높이가 균형을 이루면 탐색 범위가 단계마다 줄어들어 탐색, 삽입, 삭제를 `O(log n)`에 수행할 수 있다.

## 우선순위 큐

우선순위 큐는 먼저 들어온 순서가 아니라 **우선순위가 높은 원소를 먼저 꺼내는** 자료구조다.

- 최소 우선순위 큐: 값이 작은 원소부터 추출
- 최대 우선순위 큐: 값이 큰 원소부터 추출

우선순위 큐는 보통 완전 이진 트리 형태의 **힙(heap)**으로 구현한다. 최소 힙에서는 모든 부모가 자식보다 작거나 같다.

```text
        1
      /   \
     3     5
    / \   /
   7   9 8
```

완전 이진 트리는 배열로 효율적으로 표현할 수 있다. 인덱스 `i`를 기준으로 관계는 다음과 같다.

- 부모: `Math.floor((i - 1) / 2)`
- 왼쪽 자식: `2 * i + 1`
- 오른쪽 자식: `2 * i + 2`

## 최소 힙 구현

JavaScript 표준 내장 객체에는 범용 우선순위 큐가 없으므로 코딩 테스트에서는 직접 구현하는 경우가 많다.

```js
class MinHeap {
  #heap = []

  get size() {
    return this.#heap.length
  }

  peek() {
    return this.#heap[0]
  }

  push(value) {
    this.#heap.push(value)
    this.#bubbleUp()
  }

  pop() {
    if (this.size === 0) return undefined
    if (this.size === 1) return this.#heap.pop()

    const min = this.#heap[0]
    this.#heap[0] = this.#heap.pop()
    this.#bubbleDown()
    return min
  }

  #bubbleUp() {
    let index = this.size - 1

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (this.#heap[parent] <= this.#heap[index]) break

      ;[this.#heap[parent], this.#heap[index]] = [
        this.#heap[index],
        this.#heap[parent]
      ]
      index = parent
    }
  }

  #bubbleDown() {
    let index = 0

    while (true) {
      const left = index * 2 + 1
      const right = index * 2 + 2
      let smallest = index

      if (left < this.size && this.#heap[left] < this.#heap[smallest]) {
        smallest = left
      }
      if (right < this.size && this.#heap[right] < this.#heap[smallest]) {
        smallest = right
      }
      if (smallest === index) break

      ;[this.#heap[index], this.#heap[smallest]] = [
        this.#heap[smallest],
        this.#heap[index]
      ]
      index = smallest
    }
  }
}

const heap = new MinHeap()
for (const number of [5, 3, 8, 1]) heap.push(number)

console.log(heap.pop()) // 1
console.log(heap.pop()) // 3
```

## 복잡도 분석

| 연산 | 시간 복잡도 | 이유 |
| --- | --- | --- |
| 최솟값 확인 | `O(1)` | 루트에 저장됨 |
| 삽입 | `O(log n)` | 트리 높이만큼 위로 이동 |
| 최솟값 삭제 | `O(log n)` | 트리 높이만큼 아래로 이동 |

## 활용 사례

- 다익스트라 최단 경로 알고리즘
- 우선순위가 있는 작업 스케줄링
- 가장 크거나 작은 `k`개의 값 찾기
- 여러 정렬된 데이터 병합

## 복습 질문

1. 트리의 깊이와 높이는 무엇을 기준으로 측정하는가?
2. 이진 탐색 트리가 한쪽으로 치우치면 성능이 어떻게 변하는가?
3. 최소 힙에서 가장 작은 값이 루트에 있는 이유는 무엇인가?
