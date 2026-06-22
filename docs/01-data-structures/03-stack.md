---
title: JavaScript 스택(Stack)
description: LIFO 구조인 스택의 연산과 JavaScript 배열을 이용한 구현을 알아봅니다.
---

# JavaScript 스택(Stack)

## 학습 목표

- 스택의 LIFO 원칙을 설명한다.
- `push`, `pop`, `peek`, `isEmpty` 연산을 구현한다.
- 스택이 필요한 문제의 특징을 식별한다.

## 핵심 개념

스택은 **나중에 들어온 데이터가 먼저 나가는** LIFO(Last In, First Out) 자료구조다. 접시를 차곡차곡 쌓고 위에서부터 꺼내는 모습을 떠올리면 된다.

```text
push C       pop
  ↓           ↑
┌───┐       ┌───┐
│ C │ top   │ C │
├───┤       ├───┤
│ B │       │ B │
├───┤       ├───┤
│ A │       │ A │
└───┘       └───┘
```

| 연산 | 설명 | 시간 복잡도 |
| --- | --- | --- |
| `push` | 맨 위에 원소 삽입 | `O(1)` 상각 |
| `pop` | 맨 위 원소 제거 및 반환 | `O(1)` |
| `peek` | 맨 위 원소 확인 | `O(1)` |
| `isEmpty` | 스택이 비었는지 확인 | `O(1)` |

## JavaScript 구현

JavaScript 배열의 끝에서 일어나는 `push()`와 `pop()`을 사용하면 스택을 간단히 구현할 수 있다.

```js
class Stack {
  #items = []

  push(value) {
    this.#items.push(value)
  }

  pop() {
    return this.#items.pop()
  }

  peek() {
    return this.#items.at(-1)
  }

  isEmpty() {
    return this.#items.length === 0
  }

  get size() {
    return this.#items.length
  }
}

const stack = new Stack()
stack.push('A')
stack.push('B')
stack.push('C')

console.log(stack.peek()) // C
console.log(stack.pop()) // C
console.log(stack.size) // 2
```

빈 배열에서 `pop()`이나 `at(-1)`을 호출하면 `undefined`가 반환된다. 문제의 요구사항에 따라 이 값을 그대로 사용하거나 명시적으로 예외를 던질 수 있다.

## 스택을 사용하는 대표 상황

- 함수 호출 스택과 재귀
- 괄호의 올바른 짝 검사
- 브라우저의 뒤로 가기
- 실행 취소(Undo)
- DFS를 재귀 없이 구현할 때

### 괄호 검사 예제

```js
function isValidParentheses(text) {
  const stack = []
  const pairs = { ')': '(', ']': '[', '}': '{' }

  for (const char of text) {
    if ('([{'.includes(char)) {
      stack.push(char)
      continue
    }

    if (char in pairs && stack.pop() !== pairs[char]) {
      return false
    }
  }

  return stack.length === 0
}

console.log(isValidParentheses('{[()]}')) // true
console.log(isValidParentheses('([)]')) // false
```

문자열을 한 번 순회하므로 시간 복잡도는 `O(n)`, 최악의 경우 모든 여는 괄호를 저장하므로 공간 복잡도는 `O(n)`이다.

## 복습 질문

1. LIFO는 어떤 처리 순서를 의미하는가?
2. JavaScript에서 스택을 구현할 때 `shift()`보다 `pop()`이 적합한 이유는 무엇인가?
3. 괄호 검사에서 마지막에 스택이 비어 있는지 확인해야 하는 이유는 무엇인가?
