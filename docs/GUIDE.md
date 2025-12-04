# Hướng Dẫn Sử Dụng Chi Tiết

## 🎯 Mục Đích

Ứng dụng này giúp bạn:

- Trực quan hóa đồ thị có hướng và có trọng số
- Hiểu cách hoạt động của các thuật toán tìm đường đi
- Thực hành với ma trận kề (adjacency matrix)
- So sánh hiệu suất của các thuật toán khác nhau

## 📚 Các Khái Niệm Cơ Bản

### Đồ Thị (Graph)

- **Node (Đỉnh)**: Các điểm trong đồ thị (Home, School, A, B, C...)
- **Link (Cạnh)**: Các đường nối giữa các node
- **Weight (Trọng số)**: Giá trị của mỗi link (khoảng cách, chi phí...)
- **Directed (Có hướng)**: Link chỉ đi một chiều

### Ma Trận Kề

Ma trận vuông n×n biểu diễn đồ thị:

- Hàng i, cột j = trọng số từ node i đến node j
- Giá trị 0 = không có đường đi

Ví dụ:

```
      Home  A  B  School
Home    0   5  0    0
A       0   0  3    0
B       0   0  0    7
School  0   0  0    0
```

Nghĩa là: Home→A (5), A→B (3), B→School (7)

## 🎮 Các Thao Tác

### 1. Thêm Node

**Cách 1: Tự động thêm**

- Nhấn nút "Add Node" trên toolbar
- Node mới sẽ được gán tên A, B, C... Z
- 4 node đầu tiên tạo đường đi chính: Home → A → B → C → D → School
- Các node sau tạo đường rẽ nhánh tự động

**Cách 2: Import từ ma trận**

- Nhấn "Import"
- Nhập ma trận kề
- Hệ thống tạo đồ thị tương ứng

### 2. Tạo/Xóa Link

1. Click vào node thứ nhất (sẽ sáng màu xanh)
2. Click vào node thứ hai
3. Nếu đã có link → xóa link
4. Nếu chưa có → tạo link mới (trọng số = 1)

### 3. Thay Đổi Trọng Số

1. Double-click vào link
2. Nhập trọng số mới trong popup
3. Nhấn OK để lưu

### 4. Di Chuyển Node

- Kéo thả node đến vị trí mong muốn
- Đồ thị tự động sắp xếp lại nhờ force simulation

### 5. Export Đồ Thị

1. Nhấn "Export"
2. Xem ma trận kề
3. Copy để chia sẻ hoặc lưu lại

### 6. Reset Đồ Thị

- Nhấn "Reset Graph"
- Xác nhận
- Đồ thị về trạng thái ban đầu (chỉ có Home và School)

## 🧮 Sử Dụng Thuật Toán

### Chạy Một Thuật Toán

Mở Console (F12) và gõ:

```javascript
// Tìm đường từ home đến school
const result = dijkstra(gData, "home", "school");
console.log("Đường đi:", result.path);
console.log("Tổng khoảng cách:", result.totalDistance);
```

### So Sánh Các Thuật Toán

```javascript
// So sánh Dijkstra, DFS, BFS
const comparison = compareAlgorithms(gData, "home", "school");

// Kết quả sẽ hiển thị:
// - Đường đi của mỗi thuật toán
// - Tổng trọng số
// - Số node đã thăm
// - Thời gian thực thi
```

### Hiểu Kết Quả

**Dijkstra**

- Luôn tìm được đường đi ngắn nhất (theo trọng số)
- Thời gian chạy lâu hơn DFS/BFS một chút
- Tốt nhất cho đồ thị có trọng số

**DFS (Depth-First Search)**

- Tìm đường đi bằng cách đi sâu vào một nhánh
- Không đảm bảo đường ngắn nhất
- Nhanh nhưng có thể cho kết quả không tối ưu

**BFS (Breadth-First Search)**

- Tìm đường đi ngắn nhất (theo số node)
- Không xét đến trọng số
- Tốt cho đồ thị không có trọng số

## 💡 Mẹo & Thủ Thuật

### 1. Tạo Đồ Thị Đẹp

- Để đồ thị tự sắp xếp một lúc trước khi thao tác
- Kéo các node quan trọng ra xa nhau
- Giữ các node liên quan gần nhau

### 2. Test Thuật Toán

- Tạo nhiều đường đi khác nhau
- Thử với trọng số lớn/nhỏ
- So sánh kết quả của các thuật toán

### 3. Export/Import

- Export đồ thị trước khi reset
- Lưu các ma trận mẫu để tái sử dụng
- Chia sẻ với bạn bè qua ma trận

### 4. Hiệu Suất

- Đồ thị lớn (>15 nodes) có thể chậm
- Giảm số link để cải thiện hiệu suất
- Tắt force simulation bằng cách không kéo node

## ❓ Câu Hỏi Thường Gặp

**Q: Tại sao không tạo được link?**
A: Đảm bảo bạn click đúng 2 node khác nhau. Node thứ nhất sẽ sáng màu xanh.

**Q: Làm sao xóa một node?**
A: Hiện tại chưa hỗ trợ xóa từng node. Bạn có thể dùng "Reset Graph" để xóa tất cả.

**Q: Ma trận import không đúng?**
A: Kiểm tra:

- Ma trận phải vuông (n×n)
- Chỉ chứa số không âm
- Ngăn cách bởi dấu phẩy
- Mỗi hàng trên một dòng mới

**Q: Thuật toán nào tốt nhất?**
A: Tùy trường hợp:

- Có trọng số → Dijkstra
- Không trọng số → BFS
- Cần nhanh, không cần tối ưu → DFS

**Q: Có giới hạn số node?**
A: Có thể tạo tối đa 26 node (A-Z). Nếu cần nhiều hơn, bạn có thể import ma trận lớn hơn.

## 🎓 Bài Tập Thực Hành

### Bài 1: Đồ Thị Đơn Giản

1. Tạo đồ thị: Home → A → B → School
2. Đặt trọng số: 5, 3, 7
3. Chạy Dijkstra và xác nhận kết quả

### Bài 2: Nhiều Đường Đi

1. Tạo 2 đường:
   - Home → A → School
   - Home → B → School
2. Đặt trọng số khác nhau
3. Xem thuật toán chọn đường nào

### Bài 3: Đồ Thị Phức Tạp

1. Thêm 6-8 nodes
2. Tạo nhiều link chéo
3. So sánh cả 3 thuật toán
4. Phân tích kết quả

### Bài 4: Import/Export

1. Tạo đồ thị mẫu
2. Export ra ma trận
3. Reset đồ thị
4. Import lại và kiểm tra

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra Console (F12) xem có lỗi không
2. Thử reset đồ thị
3. Refresh trang web
4. Mở issue trên GitHub

---

Chúc bạn học tập vui vẻ! 🎉
