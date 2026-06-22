---
title: 그래프(Graph)의 표현
description: 인접 행렬과 인접 리스트로 그래프를 표현하고 복잡도를 비교합니다.
---

# 그래프(Graph)의 표현

## 학습 목표

- 정점과 간선으로 그래프를 설명한다.
- 인접 행렬과 인접 리스트를 JavaScript로 구현한다.
- 정점 수와 간선 수에 따라 적절한 표현 방식을 선택한다.

## 그래프

그래프는 사물이나 상태를 **정점(vertex)**으로, 정점 사이의 관계를 **간선(edge)**으로 표현하는 자료구조다.

```text
A ─── B
│   ／
│ ／
C ─── D
```

그래프는 간선의 성질에 따라 구분할 수 있다.

- 방향 그래프 / 무방향 그래프
- 가중치 그래프 / 무가중치 그래프

JavaScript에서는 주로 인접 행렬 또는 인접 리스트로 그래프를 표현한다.

## 인접 행렬

인접 행렬은 정점이 `V`개일 때 `V × V` 크기의 2차원 배열을 만든다. `matrix[a][b]`에 정점 `a`에서 `b`로 가는 간선 정보를 저장한다.

### 무방향 무가중치 그래프

```js
const vertexCount = 4
const matrix = Array.from(
  { length: vertexCount },
  () => Array(vertexCount).fill(0)
)

function addUndirectedEdge(a, b) {
  matrix[a][b] = 1
  matrix[b][a] = 1
}

addUndirectedEdge(0, 1)
addUndirectedEdge(0, 2)
addUndirectedEdge(1, 3)

console.table(matrix)
```

무방향 그래프에서는 `a → b`와 `b → a`를 모두 기록하므로 행렬이 대칭이다.

### 방향 가중치 그래프

```js
const INF = Number.POSITIVE_INFINITY
const weightedMatrix = [
  [0, 4, INF],
  [INF, 0, 2],
  [7, INF, 0]
]
```

자기 자신으로 가는 비용은 `0`, 직접 연결되지 않은 정점은 `Infinity`, 연결된 간선은 가중치를 저장할 수 있다.

## 인접 리스트

인접 리스트는 각 정점마다 직접 연결된 이웃만 저장한다. JavaScript에서는 배열 안에 배열을 두는 방식이 일반적이다.

### 무방향 무가중치 그래프

```js
const graph = Array.from({ length: 4 }, () => [])

function addUndirectedEdge(a, b) {
  graph[a].push(b)
  graph[b].push(a)
}

addUndirectedEdge(0, 1)
addUndirectedEdge(0, 2)
addUndirectedEdge(1, 3)

console.log(graph)
// [ [1, 2], [0, 3], [0], [1] ]
```

### 방향 가중치 그래프

```js
const weightedGraph = Array.from({ length: 3 }, () => [])

function addDirectedEdge(from, to, cost) {
  weightedGraph[from].push({ to, cost })
}

addDirectedEdge(0, 1, 4)
addDirectedEdge(1, 2, 2)
addDirectedEdge(2, 0, 7)

console.log(weightedGraph)
```

## 표현 방식 비교

정점 수를 `V`, 간선 수를 `E`라고 하자.

| 기준 | 인접 행렬 | 인접 리스트 |
| --- | --- | --- |
| 공간 복잡도 | `O(V²)` | `O(V + E)` |
| 두 정점의 연결 확인 | `O(1)` | `O(degree)` |
| 특정 정점의 모든 이웃 순회 | `O(V)` | `O(degree)` |
| 적합한 그래프 | 간선이 많은 밀집 그래프 | 간선이 적은 희소 그래프 |

`degree`는 해당 정점에 연결된 간선 수다. 현실의 도로망처럼 가능한 모든 정점 쌍 중 일부만 연결되는 경우에는 인접 리스트가 공간과 순회 비용에서 유리하다. 반면 두 정점의 직접 연결 여부를 매우 자주 확인한다면 인접 행렬이 단순하고 빠르다.

::: tip 선택 기준
그래프의 모양만 보지 말고 문제에서 가장 자주 수행하는 연산을 기준으로 선택한다.
:::

## 복습 질문

1. 무방향 그래프의 인접 행렬이 대칭인 이유는 무엇인가?
2. 간선 수가 적은 그래프에서 인접 리스트가 유리한 이유는 무엇인가?
3. 인접 행렬에서 연결 여부를 `O(1)`에 확인할 수 있는 이유는 무엇인가?
