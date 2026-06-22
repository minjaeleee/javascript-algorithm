---
title: JavaScript 큐(Queue)
description: FIFO 구조인 큐를 이해하고 JavaScript에서 O(1) 연산으로 구현합니다.
---

# JavaScript 큐(Queue)

## 학습 목표

- 큐의 FIFO 원칙을 설명한다.
- head와 tail을 이용해 효율적인 큐를 구현한다.
- 배열의 `shift()`를 반복할 때 발생하는 비용을 이해한다.

## 핵심 개념

큐는 **먼저 들어온 데이터가 먼저 나가는** FIFO(First In, First Out) 자료구조다. 줄의 뒤에서 대기하고 앞에서부터 처리되는 모습을 떠올리면 된다.

```text
dequeue ← [A] [B] [C] ← enqueue
           head        tail
```

| 연산 | 설명 | 목표 시간 복잡도 |
| --- | --- | --- |
| `enqueue` | tail에 원소 삽입 | `O(1)` |
| `dequeue` | head 원소 제거 및 반환 | `O(1)` |
| `front` | head 원소 확인 | `O(1)` |
| `isEmpty` | 큐가 비었는지 확인 | `O(1)` |

## 배열의 shift가 비효율적인 이유

다음 구현은 간단하지만 `shift()`를 호출할 때 남은 원소들의 인덱스를 앞으로 옮겨야 하므로 한 번의 제거가 `O(n)`이 될 수 있다.

```js
const queue = []
queue.push('A')
queue.push('B')
queue.shift() // 반복 사용 시 비효율적일 수 있다.
```

작은 입력에서는 충분할 수 있지만 데이터가 많은 BFS나 시뮬레이션 문제에서는 head 인덱스를 별도로 관리하는 방식이 안전하다.

## JavaScript 큐 구현

객체의 숫자 키와 head, tail 인덱스를 이용하면 앞의 원소를 이동하지 않고 삽입과 삭제를 수행할 수 있다.

```js
class Queue {
  #items = Object.create(null)
  #head = 0
  #tail = 0

  enqueue(value) {
    this.#items[this.#tail] = value
    this.#tail += 1
  }

  dequeue() {
    if (this.isEmpty()) return undefined

    const value = this.#items[this.#head]
    delete this.#items[this.#head]
    this.#head += 1
    return value
  }

  front() {
    return this.#items[this.#head]
  }

  isEmpty() {
    return this.#head === this.#tail
  }

  get size() {
    return this.#tail - this.#head
  }
}

const queue = new Queue()
queue.enqueue('A')
queue.enqueue('B')
queue.enqueue('C')

console.log(queue.dequeue()) // A
console.log(queue.front()) // B
console.log(queue.size) // 2
```

이 구현에서 각 원소는 한 번 저장되고 한 번 삭제된다. `enqueue`, `dequeue`, `front`, `isEmpty`는 모두 평균적으로 `O(1)`에 수행된다.

## 큐를 사용하는 대표 상황

- BFS(너비 우선 탐색)
- 요청이나 작업을 도착 순서대로 처리하는 스케줄링
- 프린터 대기열
- 순서가 중요한 시뮬레이션

## 복습 질문

1. FIFO는 어떤 처리 순서를 의미하는가?
2. `Array.prototype.shift()`를 반복하는 큐의 문제점은 무엇인가?
3. head와 tail이 같으면 큐가 비었다고 판단할 수 있는 이유는 무엇인가?
