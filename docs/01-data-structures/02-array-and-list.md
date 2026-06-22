---
title: 배열(Array)과 리스트(List)
description: 배열과 연결 리스트의 구조, 연산 복잡도와 JavaScript 배열의 특징을 비교합니다.
---

# 배열(Array)과 리스트(List)

## 학습 목표

- 배열과 연결 리스트의 저장 구조를 비교한다.
- 조회, 삽입, 삭제 연산의 복잡도를 설명한다.
- JavaScript 배열의 동적 특성과 주의점을 이해한다.

## 배열

배열은 여러 값을 순서대로 저장하고, 각 값에 0부터 시작하는 인덱스를 부여하는 자료구조다.

```js
const fruits = ['apple', 'banana', 'orange']

console.log(fruits[0]) // apple
console.log(fruits[2]) // orange
```

인덱스를 알고 있다면 원하는 원소에 바로 접근할 수 있으므로 조회는 `O(1)`이다. 전통적인 배열은 연속된 메모리 공간을 이용하므로 순차 접근 시 캐시 효율도 좋다.

다만 중간에 값을 넣거나 삭제하면 뒤의 원소들을 이동해야 하므로 `O(n)`이 필요하다.

```js
const numbers = [10, 20, 40]

numbers.splice(2, 0, 30) // [10, 20, 30, 40]
numbers.splice(1, 1) // [10, 30, 40]
```

## 연결 리스트

연결 리스트는 각 노드가 값과 다음 노드의 위치를 함께 저장한다. 노드는 메모리상에서 연속될 필요가 없다.

```text
[10 | next] → [20 | next] → [30 | null]
```

특정 노드의 위치를 이미 알고 있다면 연결 관계만 바꾸어 `O(1)`에 삽입하거나 삭제할 수 있다. 반면 `k`번째 노드를 찾으려면 첫 노드부터 순서대로 이동해야 하므로 조회는 `O(n)`이다.

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  prepend(value) {
    const node = new Node(value)
    node.next = this.head
    this.head = node
    this.size += 1
  }

  find(value) {
    let current = this.head

    while (current !== null) {
      if (current.value === value) return current
      current = current.next
    }

    return null
  }
}

const list = new SinglyLinkedList()
list.prepend(20)
list.prepend(10)
console.log(list.find(20))
```

## 배열과 연결 리스트 비교

| 연산 | 배열 | 연결 리스트 |
| --- | --- | --- |
| 인덱스 조회 | `O(1)` | `O(n)` |
| 값 탐색 | `O(n)` | `O(n)` |
| 앞쪽 삽입·삭제 | `O(n)` | `O(1)` |
| 끝 삽입 | 일반적으로 `O(1)` 상각 | tail이 있으면 `O(1)` |
| 중간 삽입·삭제 | `O(n)` | 노드를 찾은 뒤 `O(1)` |

::: info 연결 리스트의 O(1) 조건
삽입·삭제 대상 노드나 바로 앞 노드의 위치를 이미 알고 있을 때만 `O(1)`이다. 해당 위치를 찾는 과정까지 포함하면 `O(n)`일 수 있다.
:::

## JavaScript 배열의 특징

JavaScript의 `Array`는 길이가 동적으로 변하며 `push`, `pop`, `splice` 같은 메서드를 제공한다. 일반적으로 배열과 스택 용도로 편리하지만, 내부 저장 방식은 JavaScript 엔진과 원소 형태에 따라 달라질 수 있다. 따라서 항상 전통적인 연속 메모리 배열이나 연결 리스트처럼 구현된다고 가정하지 않는다.

```js
const stack = []

stack.push('A')
stack.push('B')
console.log(stack.pop()) // B
```

`push`와 `pop`은 일반적으로 상각 `O(1)`이다. 반면 `shift`와 `unshift`는 나머지 원소의 인덱스를 조정해야 하므로 큐에서 반복적으로 사용하면 비효율적일 수 있다.

## 복습 질문

1. 배열의 인덱스 조회가 빠른 이유는 무엇인가?
2. 연결 리스트의 삽입이 항상 `O(1)`이라고 말할 수 없는 이유는 무엇인가?
3. JavaScript 배열로 큰 큐를 구현할 때 `shift()`를 피해야 하는 이유는 무엇인가?
