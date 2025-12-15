# Tài Liệu: Logic Thêm Node Ngẫu Nhiên & Thuật Toán Dijkstra

## 📋 Tổng Quan

Tài liệu này giải thích chi tiết về logic thêm node động (`addNode` function) và cách nó tương tác với thuật toán Dijkstra để tìm đường đi ngắn nhất trong đồ thị.

---

## 🎯 Mục Đích

Hệ thống được thiết kế để:

1. **Tạo đồ thị ngẫu nhiên** với các node và edge được sinh tự động
2. **Đảm bảo tính kết nối** - luôn có đường đi từ Home đến School
3. **Tạo sự đa dạng** - nhiều đường đi khác nhau với trọng số khác nhau
4. **Hỗ trợ visualize** thuật toán Dijkstra trên đồ thị động

---

## 📦 Cấu Trúc Dữ Liệu

### Graph Data Structure

```javascript
gData = {
  nodes: [
    { id: "home", name: "Home", icon: "home" },
    { id: "school", name: "School", icon: "school" },
    { id: "A", name: "A", icon: "A" },
    // ... các node khác
  ],
  links: [
    { source: "home", target: "A", weight: 5 },
    { source: "A", target: "school", weight: 10 },
    // ... các edge khác
  ],
};
```

### Key Variables

- **`nextChar`**: Ký tự tiếp theo cho node ID (A-Z)
- **`isDirectedGraph`**: Boolean xác định đồ thị có hướng hay vô hướng
- **`gData.nodes`**: Mảng chứa tất cả các node
- **`gData.links`**: Mảng chứa tất cả các edge với trọng số

---

## 🔧 Function `addNode` (Core Logic)

### Signature

```javascript
function addNode(id, name, icon, linkToNodeId = null, weight = 1)
```

### Parameters

- **`id`**: ID duy nhất của node (A-Z)
- **`name`**: Tên hiển thị của node
- **`icon`**: Icon/ký tự đại diện
- **`linkToNodeId`**: Node cha để kết nối (null = không kết nối)
- **`weight`**: Trọng số của edge (mặc định = 1)

### Logic Flow

```
1. Clear saved directed graph
   ↓
2. Tạo node mới và thêm vào gData.nodes
   ↓
3. Nếu có linkToNodeId:
   ├─ Tạo link: linkToNodeId → id
   └─ Nếu undirected: tạo link ngược: id → linkToNodeId
   ↓
4. Cập nhật forces và refresh graph
```

### Code Example

```javascript
// Thêm node A, kết nối từ home với weight = 5
addNode("A", "A", "A", "home", 5);

// Trong undirected graph, tự động tạo 2 links:
// 1. home → A (weight: 5)
// 2. A → home (weight: 5)
```

---

## 🎲 Logic Random Add Node (2 Giai Đoạn)

### 📌 GIAI ĐOẠN 1: Main Path Formation (Node A-D)

**Mục đích**: Tạo đường đi chính từ Home → School qua 4 node trung gian

#### **Node A (First Node)**

```
BEFORE:  Home ──────────→ School

AFTER:   Home ───→ A ───→ School
              (w1)    (w2)
```

**Logic**:

```javascript
if (nonSchoolNodes.length === 1) {
  // Node A: Chèn giữa Home và School
  linkFrom = "home";
  linkToSchool = true;

  // XÓA link home → school cũ
  removeLink("home", "school");

  // THÊM: home → A (weight ngẫu nhiên 1-20)
  // THÊM: A → school (weight ngẫu nhiên 1-20)
}
```

**Kết quả**:

- ✅ Luôn có đường từ Home → School
- 🎲 Trọng số ngẫu nhiên (1-20) cho cả 2 edge

---

#### **Node B, C, D (Extending Main Path)**

```
BEFORE:  Home → A → School

AFTER:   Home → A → B → School

BEFORE:  Home → A → B → School

AFTER:   Home → A → B → C → School
```

**Logic**:

```javascript
else {
  // Tìm node hiện đang kết nối đến School
  const nodeBeforeSchool = gData.links.find(
    link => link.target === "school"
  );

  // Chèn node mới vào giữa
  linkFrom = nodeBeforeSchool.source;

  // XÓA link cũ: X → school
  removeLink(linkFrom, "school");

  // THÊM: X → NewNode → school
}
```

**Minh Họa Đầy Đủ (A-D)**:

```
Step 1 (A):  Home ──5──→ A ──10──→ School

Step 2 (B):  Home ──5──→ A ──3──→ B ──7──→ School

Step 3 (C):  Home ──5──→ A ──3──→ B ──12──→ C ──4──→ School

Step 4 (D):  Home ──5──→ A ──3──→ B ──12──→ C ──8──→ D ──6──→ School
```

**Đặc điểm**:

- ✅ Tạo 1 đường đi chính rõ ràng
- 🎲 Mỗi edge có weight ngẫu nhiên
- 📏 Tổng độ dài thay đổi tùy vào weight

---

### 📌 GIAI ĐOẠN 2: Branch Nodes (Node E-Z)

**Mục đích**: Tạo nhiều đường đi thay thế, tăng độ phức tạp

#### **Priority System (Hệ Thống Ưu Tiên)**

```javascript
const targetPriorities = possibleTargets.map((node) => {
  let priority = 1; // Base priority

  // Rule 1: HIGH priority cho School
  if (node.id === "school") priority = 3;

  // Rule 2: HIGHER priority cho node trong main path
  if (connectedToSchool) priority = 2.5;

  // Rule 3: Boost cho node ít kết nối (< 3 connections)
  if (connectionCount < 3) priority += 1;

  return { node, priority };
});
```

**Giải thích Priority**:

- **Priority 3**: School (đảm bảo có path đến đích)
- **Priority 2.5**: Node trong main path
- **Priority 2**: Node ít kết nối
- **Priority 1**: Node khác

---

#### **Connection Logic**

##### 1️⃣ **Home Connection (30% Chance)**

```javascript
const connectToHome = Math.random() < 0.3; // Chỉ 30%

if (connectToHome) {
  // 80% chance: Home → Node
  // 20% chance: Node → Home
  const homeToNode = Math.random() < 0.8;
}
```

**Lý do giới hạn 30%**:

- ❌ Tránh tất cả node đều nối với Home
- ✅ Tạo sự đa dạng trong cấu trúc
- ✅ Khuyến khích đường đi qua nhiều node

**Minh Họa**:

```
Scenario 1 (70%):
E → [A, C, School]  (không nối Home)

Scenario 2 (30%):
Home → E → [B, School]  (có nối Home)
```

---

##### 2️⃣ **Multi-Target Connection**

```javascript
// Xác định số lượng kết nối
let numConnections = 2;
if (rand < 0.4) numConnections = 2; // 40% - kết nối 2 nodes
else if (rand < 0.8) numConnections = 3; // 40% - kết nối 3 nodes
else numConnections = 1; // 20% - kết nối 1 node
```

**Phân phối xác suất**:

- 🎲 **40%**: Kết nối đến 2 nodes
- 🎲 **40%**: Kết nối đến 3 nodes
- 🎲 **20%**: Kết nối đến 1 node

---

##### 3️⃣ **Weighted Random Selection**

```javascript
const weightedRandom = (items) => {
  const totalPriority = items.reduce((sum, item) => sum + item.priority, 0);
  let random = Math.random() * totalPriority;

  for (const item of items) {
    random -= item.priority;
    if (random <= 0) return item.node;
  }
  return items[items.length - 1].node;
};
```

**Ví dụ Cụ Thể**:

```
Available targets: [School (3), B (2.5), C (2), F (1)]
Total priority: 8.5

Random value: 0-8.5
├─ 0.0-3.0   → School (35% chance)
├─ 3.0-5.5   → B (29% chance)
├─ 5.5-7.5   → C (24% chance)
└─ 7.5-8.5   → F (12% chance)
```

---

#### **Complete Branch Node Example**

```javascript
// Thêm node E (sau D)
// Current graph: Home → A → B → C → D → School

// Step 1: Tạo node E (chưa có connection)
addNode("E", "E", "E", null, 1);

// Step 2: Home connection (30% chance)
// Giả sử KHÔNG kết nối với Home

// Step 3: Select targets với weighted random
// Priority calculation:
//   School: 3
//   D: 2.5 (connected to school)
//   C: 2.5
//   B: 2
//   A: 2

// Step 4: Số lượng kết nối = 3 (40% chance)
selectedTargets = [School, D, B]; // Weighted random

// Step 5: Tạo links
// E → School (weight: 15)
// E → D (weight: 8)
// E → B (weight: 11)
```

**Result Graph**:

```
         ┌─────→ A ────→ B ────→ C ────→ D ────┐
         │              ↗ ↑                ↑     ↓
Home ────┤            11  │               8    School
         │              ↗  │                ↑     ↑
         └─────────────→ E ─────────────────┴────15
```

---

## 🚀 Thuật Toán Dijkstra Integration

### Function `dijkstraDetailed`

#### Signature

```javascript
function dijkstraDetailed(gData, startId, isDirected = true)
```

#### Return Value

```javascript
{
  steps: [
    {
      type: "init" | "select" | "check" | "update" | "end",
      chosen: nodeIndex,
      from: nodeIndex,
      to: nodeIndex,
      newDistance: number,
      description: string,
      distances: [...],
      previous: [...],
      visited: [...]
    }
  ],
  result: {
    [nodeId]: {
      id: string,
      name: string,
      distance: number,
      totalWeight: number,
      reachable: boolean,
      pathIds: string[],
      pathNames: string[],
      pathString: string
    }
  }
}
```

---

### 📊 Dijkstra Algorithm Steps

#### **Phase 1: Initialization**

```javascript
// 1. Initialize data structures
distances[startIndex] = 0; // Start node = 0
distances[otherNodes] = Infinity; // All others = ∞

previous[all] = null; // No predecessors
visited[all] = false; // Not visited

// 2. Update neighbors của start node
startNeighbors.forEach(({ to, weight }) => {
  distances[to] = weight;
  previous[to] = startIndex;
});

visited[startIndex] = true;
```

**Minh Họa**:

```
Graph: Home → A (5), Home → E (direct: 15)

After init:
┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  TRUE   │
│  A   │    5     │   Home   │  FALSE  │
│  E   │   15     │   Home   │  FALSE  │
│School│    ∞     │   null   │  FALSE  │
└──────┴──────────┴──────────┴─────────┘
```

---

#### **Phase 2: Main Loop**

##### Step 1: Select Minimum Distance Node

```javascript
for (let i = 0; i < n; i++) {
  if (!visited[i] && distances[i] < minDist) {
    minDist = distances[i];
    minNode = i;
  }
}
```

##### Step 2: Mark as Visited

```javascript
visited[minNode] = true;
```

##### Step 3: Check & Update Neighbors

```javascript
neighbors.forEach(({ to, weight }) => {
  if (!visited[to]) {
    const newDist = distances[minNode] + weight;

    if (newDist < distances[to]) {
      distances[to] = newDist; // CẬP NHẬT
      previous[to] = minNode; // LƯU ĐƯỜNG ĐI
    }
  }
});
```

---

### 📈 Complete Dijkstra Example

**Graph**:

```
Home ──5──→ A ──3──→ B ──7──→ School
  │                    ↑
  └────────15─────────→ E ──8──→ School
```

**Execution Steps**:

#### **Iteration 0: Initialize**

```
Choose: Home (distance = 0)
Update neighbors:
  - Home → A: distance[A] = 5
  - Home → E: distance[E] = 15

┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  [✓]    │
│  A   │    5     │   Home   │  [ ]    │
│  B   │    ∞     │   null   │  [ ]    │
│  E   │   15     │   Home   │  [ ]    │
│School│    ∞     │   null   │  [ ]    │
└──────┴──────────┴──────────┴─────────┘
```

#### **Iteration 1: Process A**

```
Select minimum unvisited: A (distance = 5)
Check neighbors:
  - A → B: 5 + 3 = 8 < ∞ → UPDATE distance[B] = 8

┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  [✓]    │
│  A   │    5     │   Home   │  [✓]    │
│  B   │    8     │    A     │  [ ]    │
│  E   │   15     │   Home   │  [ ]    │
│School│    ∞     │   null   │  [ ]    │
└──────┴──────────┴──────────┴─────────┘
```

#### **Iteration 2: Process B**

```
Select minimum unvisited: B (distance = 8)
Check neighbors:
  - B → School: 8 + 7 = 15 < ∞ → UPDATE distance[School] = 15

┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  [✓]    │
│  A   │    5     │   Home   │  [✓]    │
│  B   │    8     │    A     │  [✓]    │
│  E   │   15     │   Home   │  [ ]    │
│School│   15     │    B     │  [ ]    │
└──────┴──────────┴──────────┴─────────┘
```

#### **Iteration 3: Process E**

```
Select minimum unvisited: E (distance = 15)
Check neighbors:
  - E → School: 15 + 8 = 23 > 15 → NO UPDATE (đã có đường tốt hơn)

┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  [✓]    │
│  A   │    5     │   Home   │  [✓]    │
│  B   │    8     │    A     │  [✓]    │
│  E   │   15     │   Home   │  [✓]    │
│School│   15     │    B     │  [ ]    │
└──────┴──────────┴──────────┴─────────┘
```

#### **Iteration 4: Process School**

```
Select minimum unvisited: School (distance = 15)
No neighbors to process (destination reached)

FINAL RESULT:
┌──────┬──────────┬──────────┬─────────┐
│ Node │ Distance │ Previous │ Visited │
├──────┼──────────┼──────────┼─────────┤
│ Home │    0     │   null   │  [✓]    │
│  A   │    5     │   Home   │  [✓]    │
│  B   │    8     │    A     │  [✓]    │
│  E   │   15     │   Home   │  [✓]    │
│School│   15     │    B     │  [✓]    │
└──────┴──────────┴──────────┴─────────┘
```

---

### 🎯 Path Reconstruction

```javascript
// Trace back from School to Home
let cur = schoolIndex; // Start from destination
let pathIndexes = [];

while (cur !== null) {
  pathIndexes.push(cur);
  cur = previous[cur]; // Follow previous pointers
}

pathIndexes.reverse(); // Reverse to get Home → School

// Result: [0, 1, 2, 4] = [Home, A, B, School]
```

**Result Object**:

```javascript
result["school"] = {
  id: "school",
  name: "School",
  distance: 15,
  totalWeight: 15,
  reachable: true,
  pathIds: ["home", "A", "B", "school"],
  pathNames: ["Home", "A", "B", "School"],
  pathString: "Home → A → B → School",
};
```

---

## 🔄 Integration: Add Node ↔ Dijkstra

### How Random Nodes Affect Dijkstra

#### Scenario 1: Main Path Only (A-D)

```
Graph: Home → A → B → C → D → School

Dijkstra finds:
  Shortest path: Home → A → B → C → D → School
  Total weight: depends on random weights
```

**Đặc điểm**:

- ✅ Chỉ có 1 đường duy nhất
- 🎲 Độ dài tùy weight ngẫu nhiên
- ⚡ Dijkstra nhanh (ít node để kiểm tra)

---

#### Scenario 2: With Branch Nodes (E-Z)

```
         ┌→ A → B → C → D ┐
         │   ↘   ↘        ↓
Home ────┤     E → F →  School
         │   ↗   ↗        ↑
         └→ G → H ────────┘
```

**Dijkstra behavior**:

- 🔍 Kiểm tra TẤT CẢ các đường đi có thể
- ✅ Chọn đường ngắn nhất dựa trên tổng weight
- 🎯 Có thể tìm đường tối ưu qua branch nodes

**Example Results**:

```javascript
// Nếu weights hợp lý:
Path 1: Home → A → B → C → D → School (weight: 25)
Path 2: Home → E → F → School (weight: 18) ← NGẮN HƠN!
Path 3: Home → G → H → School (weight: 30)

→ Dijkstra chọn Path 2
```

---

### Why Random Weights Matter

#### Case 1: Low Random Weights in Main Path

```
Home ─1─→ A ─1─→ B ─1─→ C ─1─→ D ─1─→ School
  │                                      ↑
  └─────────────────20───────────────────┘

Main path total: 5
Direct path total: 20

→ Dijkstra chọn: Home → A → B → C → D → School
```

#### Case 2: High Random Weights in Main Path

```
Home ─10─→ A ─15─→ B ─12─→ C ─18─→ D ─20─→ School
  │                                           ↑
  └─────────────────25────────────────────────┘

Main path total: 75
Direct path total: 25

→ Dijkstra chọn: Home → School (direct)
```

---

## 🎨 Visualization Steps

### Step Types trong `steps` Array

#### 1. **init**

```javascript
{
  type: "init",
  chosen: startIndex,
  description: "Initialize: selected node Home (index 0)"
}
```

- 🎬 Bước đầu tiên
- ✅ Đánh dấu node xuất phát

#### 2. **select**

```javascript
{
  type: "select",
  chosen: minNode,
  description: "Chọn node A (index 1) với distance 5"
}
```

- 🔍 Chọn node chưa visit với distance nhỏ nhất
- 📍 Highlight node này

#### 3. **check**

```javascript
{
  type: "check",
  from: minNode,
  to: targetNode,
  newDistance: newDist,
  description: "Check edge A → B: 5 + 3 = 8"
}
```

- 🔎 Kiểm tra edge
- 🧮 Tính toán distance mới
- 💡 Hiển thị edge đang xem xét

#### 4. **update**

```javascript
{
  type: "update",
  from: minNode,
  to: targetNode,
  newDistance: newDist,
  description: "→ UPDATE: distance B = 8, previous = A"
}
```

- ✏️ Cập nhật distance
- 📝 Lưu previous node
- ✨ Highlight edge được chọn

#### 5. **end**

```javascript
{
  type: "end",
  description: "Algorithm complete - all shortest paths found",
  chosen: null
}
```

- 🏁 Thuật toán hoàn thành
- 📊 Hiển thị kết quả cuối

---

## 🧪 Testing Scenarios

### Test Case 1: Simple Path

```javascript
// Setup
resetGraph(); // Home → School

// Add nodes
addNode("A", "A", "A"); // Home → A → School
```

**Expected Dijkstra Result**:

```
Shortest path to School: Home → A → School
Distance: (random weight 1) + (random weight 2)
```

---

### Test Case 2: Complex Graph

```javascript
// Setup
resetGraph();
for (let i = 0; i < 10; i++) {
  addNodeBtn.click(); // Add A-J
}
```

**Expected**:

- ✅ Main path: Home → A → B → C → D → School
- ✅ Branch nodes: E, F, G, H, I, J với connections đa dạng
- ✅ Multiple paths từ Home → School
- ✅ Dijkstra tìm đường ngắn nhất

---

### Test Case 3: Directed vs Undirected

```javascript
// Directed Graph
isDirectedGraph = true;
addNode("A"); // Only Home → A

// Undirected Graph
isDirectedGraph = false;
addNode("A"); // Both Home → A and A → Home
```

**Impact on Dijkstra**:

- **Directed**: Chỉ đi theo hướng mũi tên
- **Undirected**: Có thể đi cả 2 chiều

---

## 📚 Key Concepts Summary

### Random Node Addition

1. **Phase 1 (A-D)**: Sequential main path
2. **Phase 2 (E-Z)**: Random branch connections
3. **Weights**: Always random (1-20)
4. **Diversity**: Weighted random selection

### Dijkstra Algorithm

1. **Initialize**: Start node = 0, others = ∞
2. **Select**: Pick minimum unvisited node
3. **Update**: Check neighbors, update if better
4. **Repeat**: Until all nodes visited
5. **Reconstruct**: Trace back previous pointers

### Integration Benefits

- ✅ Dynamic graph generation
- ✅ Always connected (Home → School)
- ✅ Multiple path alternatives
- ✅ Visual step-by-step demonstration
- ✅ Real-time algorithm visualization

---

## 🎓 Advanced Topics

### 1. Priority System Tuning

```javascript
// Current priorities:
School: 3.0      // Highest
Main path: 2.5   // High
Less connected: +1.0  // Bonus

// Possible adjustments:
// - Increase School priority → more direct paths
// - Decrease main path priority → more shortcuts
// - Add distance-based priority → prefer closer nodes
```

### 2. Connection Count Distribution

```javascript
// Current: 40% (2 conn), 40% (3 conn), 20% (1 conn)
// Alternative: 30% (2), 50% (3), 20% (1) → denser graph
```

### 3. Weight Distribution

```javascript
// Current: Uniform random 1-20
// Alternative: Weighted random (favor shorter edges)
const weight =
  Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 10);
// → More weights around 5-15
```

---

## 🐛 Common Issues & Solutions

### Issue 1: No Path to School

**Cause**: Branch node không kết nối với main path

**Solution**: Priority system đảm bảo School có priority cao

```javascript
if (node.id === "school") priority = 3;
```

### Issue 2: Too Dense Graph

**Cause**: Tất cả node đều có 3 connections

**Solution**: Điều chỉnh phân phối numConnections

```javascript
// Giảm 3-connection chance
if (rand < 0.5) numConnections = 2; // 50%
else if (rand < 0.8) numConnections = 3; // 30%
else numConnections = 1; // 20%
```

### Issue 3: Dijkstra Too Slow

**Cause**: Quá nhiều nodes (A-Z = 26 nodes)

**Solution**: Giới hạn số node hoặc optimize algorithm

```javascript
// Limit to 15 nodes
if (nextChar > "O") {
  // Stop at O
  alert("Maximum 15 nodes reached");
  return;
}
```

---

## 📖 References

### Related Files

- **`js/script.js`**: Main graph logic & event handlers
- **`js/algorithm.js`**: Dijkstra implementation
- **`js/visualizer.js`**: Step-by-step visualization
- **`css/styles.css`**: Visual styling

### Key Functions

- `addNode()`: Core node addition logic
- `dijkstraDetailed()`: Dijkstra with visualization
- `getNeighbors()`: Get adjacent nodes
- `updateForces()`: Update graph physics

---

## 🎉 Conclusion

Hệ thống kết hợp **random graph generation** và **Dijkstra visualization** tạo ra một công cụ học tập mạnh mẽ:

1. **Dynamic**: Graph thay đổi mỗi lần add node
2. **Educational**: Visualize từng bước Dijkstra
3. **Interactive**: User có thể add nodes và chạy algorithm
4. **Flexible**: Hỗ trợ cả directed và undirected graph

**Perfect for**: Học thuật toán, demo Dijkstra, hiểu shortest path!
