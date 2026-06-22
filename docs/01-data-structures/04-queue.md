---
title: JavaScript 큐(Queue)
description: FIFO 구조인 큐를 이해하고 JavaScript에서 O(1) 연산으로 구현합니다.
---

# JavaScript 큐(Queue)

## 학습 목표

- 큐의 FIFO 원칙을 설명한다.
- 배열과 연결 리스트로 구현한 큐의 차이를 비교한다.
- head와 tail 포인터를 이용해 연결 리스트 큐를 구현한다.
- 배열의 `shift()`를 반복할 때 발생하는 시간 비용을 이해한다.

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

## 큐는 어떻게 구현하면 좋을까?

큐를 구현하려면 양 끝의 역할을 분리해야 한다.

- **head**: 현재 큐에서 가장 먼저 들어온 원소를 가리킨다. `dequeue`는 이 위치에서 수행한다.
- **tail**: 현재 큐에서 가장 나중에 들어온 원소를 가리킨다. `enqueue`는 이 위치에서 수행한다.

```text
dequeue                              enqueue
   ↓                                    ↓
 head                                  tail
  [A | next] → [B | next] → [C | null]
```

배열과 연결 리스트 모두 큐의 모양을 만들 수 있다. 중요한 차이는 맨 앞 원소를 제거할 때 발생하는 비용이다.

## 배열로 구현한 큐

다음 구현은 간단하지만 `shift()`를 호출할 때 남은 원소들의 인덱스를 앞으로 옮겨야 하므로 한 번의 제거가 `O(n)`이 될 수 있다.

```js
const queue = []
queue.push('A')
queue.push('B')
queue.push('C')

console.log(queue.shift()) // A
// 남아 있는 B와 C의 인덱스를 한 칸씩 앞으로 조정해야 한다.
```

배열의 뒤에 원소를 추가하는 `push()`는 일반적으로 상각 `O(1)`이지만, 맨 앞 원소를 제거하는 `shift()`는 `O(n)`이다. 원소가 `n`개인 큐를 빌 때까지 `shift()`를 반복하면 전체 비용이 `O(n²)`까지 커질 수 있다.

작은 입력에서는 이 방식도 충분히 단순하고 편리하다. 하지만 데이터가 많은 BFS나 시뮬레이션 문제에서는 병목이 될 수 있다.

## 연결 리스트로 구현한 큐

연결 리스트는 노드가 다음 노드의 위치를 가리킨다. head와 tail을 모두 가지고 있으면 원소를 옮기지 않고 양 끝에서 필요한 연산을 수행할 수 있다.

### enqueue 동작

1. 새 노드를 만든다.
2. 큐가 비었다면 head와 tail이 모두 새 노드를 가리키게 한다.
3. 큐가 비어 있지 않다면 기존 tail의 `next`를 새 노드에 연결한다.
4. tail을 새 노드로 변경한다.

```text
추가 전: head → [A] → [B] ← tail
추가 후: head → [A] → [B] → [C] ← tail
```

### dequeue 동작

1. head가 가리키는 값을 보관한다.
2. head를 다음 노드로 이동한다.
3. 마지막 원소를 제거했다면 tail도 `null`로 초기화한다.
4. 보관했던 값을 반환한다.

```text
제거 전: head → [A] → [B] → [C] ← tail
제거 후:        head → [B] → [C] ← tail
```

노드의 연결과 head 또는 tail만 변경하므로 `enqueue`와 `dequeue` 모두 `O(1)`이다.

## 배열과 연결 리스트 비교

| 구현 방식 | enqueue | dequeue | 특징 |
| --- | --- | --- | --- |
| 배열 `push` + `shift` | `O(1)` 상각 | `O(n)` | 간단하지만 앞 원소 제거 시 재배치 발생 |
| 연결 리스트 + head/tail | `O(1)` | `O(1)` | 각 노드에 `next`를 저장해야 하지만 재배치 없음 |

따라서 **배열의 `push()`와 `shift()`로 구현한 큐보다 head와 tail을 가진 연결 리스트 큐가 반복적인 삽입·삭제의 시간 측면에서 효율적이다.** 특히 큐 연산이 많은 코딩 테스트에서는 이 차이가 커질 수 있다.

::: info 배열도 항상 느린 것은 아니다
배열에서 `shift()`를 사용하지 않고 head 인덱스만 증가시키면 `dequeue`를 `O(1)`에 가깝게 구현할 수 있다. 다만 이미 꺼낸 원소의 공간을 정리하거나 배열을 주기적으로 압축해야 한다. 이 문서에서는 큐의 구조를 명확하게 보여주기 위해 연결 리스트 구현을 사용한다.
:::

## JavaScript 큐 구현

먼저 큐의 각 원소를 표현할 `QueueNode`를 만든다. 각 노드는 실제 값인 `value`와 다음 노드를 가리키는 `next`를 가진다.

```js
class QueueNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  #head = null
  #tail = null
  #size = 0

  enqueue(value) {
    const newNode = new QueueNode(value)

    // 빈 큐에서는 첫 노드가 head이면서 tail이다.
    if (this.isEmpty()) {
      this.#head = newNode
      this.#tail = newNode
    } else {
      // 기존 마지막 노드 뒤에 새 노드를 연결한다.
      this.#tail.next = newNode
      this.#tail = newNode
    }

    this.#size += 1
  }

  dequeue() {
    if (this.isEmpty()) return undefined

    const value = this.#head.value

    // 두 번째 노드가 새로운 head가 된다.
    this.#head = this.#head.next
    this.#size -= 1

    // 마지막 노드를 꺼냈다면 head와 tail을 모두 비운다.
    if (this.#head === null) {
      this.#tail = null
    }

    return value
  }

  front() {
    return this.#head?.value
  }

  isEmpty() {
    return this.#size === 0
  }

  get size() {
    return this.#size
  }
}

const queue = new Queue()
queue.enqueue('A')
queue.enqueue('B')
queue.enqueue('C')

console.log(queue.dequeue()) // A
console.log(queue.front()) // B
console.log(queue.size) // 2
console.log(queue.isEmpty()) // false

console.log(queue.dequeue()) // B
console.log(queue.dequeue()) // C
console.log(queue.dequeue()) // undefined
console.log(queue.isEmpty()) // true
```

### 구현에서 주의할 점

- 빈 큐에서 `dequeue()`를 호출하면 이 구현은 `undefined`를 반환한다.
- 마지막 노드를 제거할 때 head만 `null`로 만들면 tail이 제거된 노드를 계속 참조한다. 따라서 tail도 반드시 `null`로 초기화한다.
- 노드 수를 매번 순회해서 세지 않고 `#size`로 관리해야 `size`와 `isEmpty()`를 `O(1)`에 처리할 수 있다.

### 구현 복잡도

| 연산 | 시간 복잡도 | 이유 |
| --- | --- | --- |
| `enqueue` | `O(1)` | tail 뒤에 새 노드 하나를 연결 |
| `dequeue` | `O(1)` | head를 다음 노드로 이동 |
| `front` | `O(1)` | head가 가진 값을 바로 확인 |
| `isEmpty` | `O(1)` | 저장된 size를 확인 |
| 전체 공간 | `O(n)` | 원소마다 노드 하나와 next 참조를 저장 |

## 큐를 사용하는 대표 상황

- BFS(너비 우선 탐색)
- 요청이나 작업을 도착 순서대로 처리하는 스케줄링
- 프린터 대기열
- 순서가 중요한 시뮬레이션

## 복습 질문

1. FIFO는 어떤 처리 순서를 의미하는가?
2. `Array.prototype.shift()`를 반복하는 큐의 시간 복잡도는 왜 커지는가?
3. 연결 리스트 큐에서 head와 tail은 각각 어떤 역할을 하는가?
4. 마지막 노드를 `dequeue()`할 때 tail도 `null`로 만들어야 하는 이유는 무엇인가?
