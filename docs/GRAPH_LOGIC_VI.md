# Tài Liệu Logic Sinh Graph

## Tổng Quan

Tài liệu này giải thích chi tiết logic đằng sau thuật toán tự động tạo node và link trong dự án Trực Quan Hóa Graph Home to School.

## Mục Lục

1. [Trạng Thái Ban Đầu](#trạng-thái-ban-đầu)
2. [Quy Tắc Sinh Node](#quy-tắc-sinh-node)
3. [Giai Đoạn 1: Tạo Đường Chính (Nodes A-D)](#giai-đoạn-1-tạo-đường-chính-nodes-a-d)
4. [Giai Đoạn 2: Tạo Node Nhánh (Nodes E-Z)](#giai-đoạn-2-tạo-node-nhánh-nodes-e-z)
5. [Xác Suất Kết Nối](#xác-suất-kết-nối)
6. [Ví Dụ Minh Họa](#ví-dụ-minh-họa)

---

## Trạng Thái Ban Đầu

Khi ứng dụng khởi động, graph chỉ chứa hai node:

```
Home → School (weight: 1)
```

- **Home Node**: Màu xanh lá, điểm xuất phát cho tất cả các đường đi
- **School Node**: Màu cam, điểm đích
- **Link Ban Đầu**: Kết nối trực tiếp từ Home đến School

---

## Quy Tắc Sinh Node

Graph hỗ trợ tối đa 26 nodes (A-Z). Các nodes được thêm tuần tự khi click nút "Add Node".

### Hai Giai Đoạn Riêng Biệt:

1. **Giai Đoạn 1**: Nodes A, B, C, D (4 nodes đầu tiên)
   - Hình thành **đường chính** từ Home đến School
   - Cấu trúc kết nối tuyến tính
   
2. **Giai Đoạn 2**: Nodes E-Z (Các nodes còn lại)
   - Tạo **đường nhánh** với nhiều kết nối đa dạng
   - Cấu trúc mạng lưới với nhiều tuyến đường

---

## Giai Đoạn 1: Tạo Đường Chính (Nodes A-D)

### Mục Tiêu
Tạo một đường chính tuyến tính duy nhất từ Home đến School qua các node trung gian.

### Logic Hoạt Động

#### Khi Thêm Node A:
```
Trước:  Home → School
Sau:    Home → A → School
```

**Các Bước:**
1. Xóa link trực tiếp `Home → School`
2. Tạo link `Home → A` với trọng số ngẫu nhiên (1-20)
3. Tạo link `A → School` với trọng số ngẫu nhiên (1-20)

#### Khi Thêm Nodes B, C, D:
```
Ví dụ với Node B:
Trước:  Home → A → School
Sau:    Home → A → B → School
```

**Các Bước:**
1. Tìm link hiện tại đang trỏ đến School (ví dụ: `A → School`)
2. Xóa link đó
3. Tạo link từ node trước đến node mới (ví dụ: `A → B`)
4. Tạo link từ node mới đến School (ví dụ: `B → School`)

### Kết Quả Sau Giai Đoạn 1
```
Home → A → B → C → D → School
```

Một đường chính duy nhất với 4 node trung gian.

---

## Giai Đoạn 2: Tạo Node Nhánh (Nodes E-Z)

### Mục Tiêu
Tạo một graph dạng mạng lưới đa dạng với nhiều đường đi thay thế từ Home đến School.

### Triết Lý Cốt Lõi
- **Giảm thiểu kết nối trực tiếp với Home** (chỉ 30% nodes)
- **Tối đa hóa kết nối giữa các nodes** (giữa các random nodes)
- **Đảm bảo kết nối đến School** (luôn tồn tại ít nhất một đường đi đến School)

---

### Quy Trình Từng Bước

#### Bước 1: Thêm Node Mới
```javascript
addNode(nodeId, nodeName, nodeIcon, null, 1);
```
Node được tạo mà không có bất kỳ kết nối nào ban đầu.

---

#### Bước 2: Kết Nối Tùy Chọn Với Home (Xác Suất 30%)

**Xác suất**: Chỉ **30%** các branch nodes kết nối với Home

**Khi có kết nối:**
- **Xác suất 80%**: `Home → Node Mới` (hướng tiến)
- **Xác suất 20%**: `Node Mới → Home` (hướng lùi)

**Trọng số**: Giá trị ngẫu nhiên từ 1-20

**Ví dụ:**
```
Node E: Không có kết nối home (70% trường hợp)
Node F: Home → F (30% × 80% = 24% trường hợp)
Node G: Không có kết nối home (70% trường hợp)
Node H: H → Home (30% × 20% = 6% trường hợp)
```

---

#### Bước 3: Tạo Kết Nối Đến Các Nodes Khác

Đây là nơi **sự đa dạng** được tạo ra!

##### 3.1 Chọn Target Nodes

**Targets khả dụng:**
- Tất cả các nodes hiện có **TRỪ Home** (A, B, C, D, E, F, ...)
- Node School

**Hệ Thống Ưu Tiên** (lựa chọn ngẫu nhiên có trọng số):

| Loại Node | Ưu Tiên | Mục Đích |
|-----------|---------|----------|
| School | 3.0 | Đảm bảo tồn tại đường đi đến đích |
| Nodes kết nối với School | 2.5 | Ưu tiên nodes trên đường đến School |
| Nodes có < 3 kết nối | +1.0 | Cân bằng graph |
| Nodes khác | 1.0 | Ưu tiên cơ bản |

##### 3.2 Số Lượng Kết Nối

**Phân Bố Xác Suất:**
- **40%**: Kết nối đến **2 nodes**
- **40%**: Kết nối đến **3 nodes**
- **20%**: Kết nối đến **1 node**

Điều này đảm bảo hầu hết các nodes có nhiều đường đi ra.

##### 3.3 Lựa Chọn Ngẫu Nhiên Có Trọng Số

Thuật toán sử dụng hàm random có trọng số:

```javascript
function weightedRandom(items) {
    totalPriority = tổng tất cả các ưu tiên
    random = số ngẫu nhiên × totalPriority
    
    for mỗi item:
        random -= item.priority
        if random <= 0:
            return item
}
```

Điều này cho các nodes có ưu tiên cao (như School) cơ hội được chọn nhiều hơn.

---

#### Bước 4: Tạo Directed Links

**Hướng**: Luôn là `Node Mới → Target Nodes`

**Trọng số**: Giá trị ngẫu nhiên từ 1-20 cho mỗi link

**Ví dụ:**
```
Node E được thêm vào:
- E → B (weight: 15)
- E → D (weight: 8)
- E → School (weight: 12)
```

---

## Xác Suất Kết Nối

### Bảng Tóm Tắt

| Loại Kết Nối | Xác Suất | Ghi Chú |
|--------------|----------|---------|
| Home → Node Mới | 24% | 30% × 80% |
| Node Mới → Home | 6% | 30% × 20% |
| Không kết nối Home | 70% | Phổ biến nhất |
| 1 kết nối đầu ra | 20% | Thường là đến School |
| 2 kết nối đầu ra | 40% | Cân bằng đường đi |
| 3 kết nối đầu ra | 40% | Đa dạng tối đa |

### Trọng Số Ưu Tiên

```
School:                   ưu tiên = 3.0
Node kết nối với School:  ưu tiên = 2.5
Node ít kết nối:          ưu tiên = cơ bản + 1.0
Node thường:              ưu tiên = 1.0
```

---

## Ví Dụ Minh Họa

### Ví Dụ 1: Graph Tối Giản (Đường Chính A-D)

```
Home → A → B → C → D → School
```

### Ví Dụ 2: Với Branch Nodes (E, F, G)

```
Đường Chính:
Home → A → B → C → D → School

Branch E (không có home, 3 kết nối):
E → B (weight: 7)
E → D (weight: 15)
E → School (weight: 10)

Branch F (có home, 2 kết nối):
Home → F (weight: 12)
F → C (weight: 8)
F → School (weight: 14)

Branch G (không có home, 3 kết nối):
G → A (weight: 5)
G → E (weight: 9)
G → School (weight: 11)
```

### Các Đường Đi Có Thể Từ Home Đến School:

1. **Đường chính**: `Home → A → B → C → D → School` (trực tiếp)
2. **Qua F**: `Home → F → School` (đường tắt)
3. **Qua F và C**: `Home → F → C → D → School` (thay thế)
4. **Qua A và E**: `Home → A → B → E → School` (qua nhánh)
5. **Qua A, G, E**: `Home → A → G → E → School` (đường phức tạp)
6. Và nhiều tổ hợp khác...

---

## Ví Dụ 3: Visualization Graph Hoàn Chỉnh

```
                    ┌─────────────────┐
                    │      HOME       │
                    └────────┬────────┘
                             │
                    ┌────────┼────────┐
                    │        │        │
                    ↓        ↓        ↓
                   [A]      [F]     (30%)
                    │        │
                    ↓        ↓
                   [B]──────[E]
                    │        │ ╲
                    ↓        │  ╲
                   [C]←─────[G]  ╲
                    │        │    ╲
                    ↓        ↓     ╲
                   [D]──────→→─────→→
                    │                 ╲
                    ↓                  ↓
                ┌───────────────────────┐
                │       SCHOOL          │
                └───────────────────────┘

Chú thích:
→  Link có hướng
[X] Node thường (A-Z)
```

---

## Lợi Ích Của Thiết Kế Thuật Toán

### 1. **Đa Dạng Lựa Chọn Đường Đi**
- Nhiều tuyến đường từ Home đến School
- Độ dài và trọng số đường đi khác nhau
- Lý tưởng để so sánh các thuật toán tìm đường (Dijkstra, BFS, DFS)

### 2. **Cấu Trúc Graph Cân Bằng**
- Không quá thưa (nodes bị cô lập)
- Không quá dày (kết nối quá nhiều)
- Topology mạng lưới thực tế

### 3. **Ngẫu Nhiên Có Kiểm Soát**
- Ưu tiên có trọng số đảm bảo kết nối đến School
- Phân bố xác suất tạo sự đa dạng
- Mỗi instance graph là độc nhất nhưng hợp lệ

### 4. **Khả Năng Mở Rộng**
- Hoạt động với bất kỳ số lượng nodes nào (A-Z)
- Force layout tự điều chỉnh theo kích thước graph
- Performance vẫn tốt khi có nhiều nodes

---

## Triển Khai Kỹ Thuật

### Các Hàm Chính

#### `addNode(id, name, icon, linkToNodeId, weight)`
Tạo node mới và tùy chọn link nó với node khác.

#### `weightedRandom(items)`
Chọn một item ngẫu nhiên dựa trên trọng số ưu tiên.

#### `findLink(node1Id, node2Id)`
Tìm link hiện có giữa hai nodes.

### Cấu Trúc Dữ Liệu

**Node:**
```javascript
{
    id: 'a',           // Định danh duy nhất
    name: 'Location A', // Tên hiển thị
    icon: 'A'          // Ký tự icon
}
```

**Link:**
```javascript
{
    source: 'a',       // ID node nguồn
    target: 'b',       // ID node đích
    weight: 15         // Trọng số cạnh (1-20)
}
```

---

## Thuộc Tính Graph

### Directed Graph (Graph Có Hướng)
- Tất cả links có hướng (source → target)
- Mũi tên chỉ hướng di chuyển
- Ma trận kề bất đối xứng

### Weighted Graph (Graph Có Trọng Số)
- Mỗi link có trọng số nguyên dương (1-20)
- Trọng số đại diện cho khoảng cách/chi phí
- Được sử dụng trong tính toán đường đi ngắn nhất

### Connected Graph (Graph Liên Thông)
- Luôn duy trì ít nhất một đường đi từ Home đến School
- School có ưu tiên cao (3.0) trong lựa chọn
- Đường chính (A-D) đảm bảo kết nối cơ bản

---

## Kiểm Tra Logic

### Kiểm Tra Thủ Công
1. Click "Add Node" nhiều lần
2. Quan sát console logs để thấy pattern kết nối
3. Kiểm tra visualization graph để thấy sự đa dạng đường đi

### Patterns Mong Đợi
- **Giai đoạn 1 (A-D)**: Hình thành chuỗi tuyến tính
- **Giai đoạn 2 (E-Z)**: 
  - ~30% nodes kết nối với Home
  - ~70% nodes không có kết nối Home
  - Hầu hết nodes có 2-3 outgoing links
  - School xuất hiện thường xuyên như target

### Ví Dụ Console Output
```
Main path started: home -> a -> school
Main path extended: a -> b -> school
Main path extended: b -> c -> school
Main path extended: c -> d -> school
Branch node: no home link | e → [b, d, school]
Branch node: home → f | f → [c, school]
Branch node: no home link | g → [a, e, school]
```

---

## Cải Tiến Trong Tương Lai

### Các Cải Tiến Có Thể
1. **Bidirectional Links**: Cho phép một số cạnh không hướng
2. **Clustering**: Nhóm nodes theo độ gần
3. **Custom Weights**: Phạm vi trọng số do người dùng định nghĩa
4. **Constraints**: Giới hạn max/min kết nối mỗi node
5. **Templates**: Các mẫu graph định nghĩa sẵn

---

## Kết Luận

Thuật toán này tạo ra các directed graphs đa dạng, thực tế, phù hợp cho:
- **Giáo Dục**: Dạy lý thuyết graph và tìm đường đi
- **So Sánh Thuật Toán**: Test Dijkstra vs BFS vs DFS
- **Trực Quan Hóa**: Hiểu cấu trúc mạng lưới
- **Thử Nghiệm**: Phân tích các topology graph khác nhau

Sự cân bằng giữa **cấu trúc** (đường chính) và **ngẫu nhiên** (kết nối nhánh) tạo ra các graphs vừa có ý nghĩa vừa đa dạng.

---

**Cập Nhật Lần Cuối**: Tháng 10, 2025  
**Phiên Bản**: 1.0  
**Tác Giả**: IzukiNo
