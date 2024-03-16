export const PREORDER_GUIDE = [
  "Duyệt cây theo thứ tự:",
  "   • Thăm nút gốc",
  "   • Duyệt tiền tố cây con bên trái",
  "   • Duyệt tiền tố cây con bên phải",
];

export const INORDER_GUIDE = [
  "Duyệt cây theo thứ tự:",
  "   • Duyệt trung tố cây con bên trái",
  "   • Thăm nút gốc",
  "   • Duyệt trung tố cây con bên phải",
];

export const POSTORDER_GUIDE = [
  "Duyệt cây theo thứ tự:",
  "   • Duyệt hậu tố cây con bên trái",
  "   • Duyệt hậu tố cây con bên phải",
  "   • Thăm nút gốc",
];

export const INSERT_GUIDE = [
  "B1: Bắt đầu từ nút gốc.",
  "B2: So sánh giá trị nút muốn thêm (n) với nút hiện tại (cur):",
  "      • Nếu giá trị (n) nhỏ hơn giá trị (cur), di chuyển sang nút con trái (left), (cur) = (left).",
  "      • Nếu giá trị (n) lớn hơn giá trị (cur), di chuyển sang nút con phải (right), (cur) = (right).",
  "      • Nếu giá trị (n) bằng giá trị (cur), tăng số lượng của (cur). Kết thúc quá trình chèn.",
  "B3: Lặp lại B2 cho đến gặp nút lá, nút con tiếp của (cur) là null. Chèn (n) vào vị trí nút con tiếp của (cur).",
];

export const SEARCH_GUIDE = [
  "B1: Bắt đầu từ nút gốc.",
  "B2: So sánh giá trị nút muốn tìm (n) với nút hiện tại (cur):",
  "      • Nếu giá trị (n) nhỏ hơn giá trị (cur), di chuyển sang nút con trái (left), (cur) = (left).",
  "      • Nếu giá trị (n) lớn hơn giá trị (cur), di chuyển sang nút con phải (right), (cur) = (right).",
  "B3: Lặp lại B2 cho đến khi:",
  "      • Giá trị (n) bằng giá trị (cur), trả về (cur).",
  "      • Gặp nút lá, nút con kế tiếp của (cur) là null, trả về null.",
];

export const SEARCH_MIN_GUIDE = [
  "B1: Bắt đầu từ nút gốc. Nếu nút gốc là null, trả về kết quả không tìm thấy min.",
  "B2: Di chuyển sang nút con trái nút hiện tại.",
  "B3: Lặp lại B2 cho đến khi gặp nút không còn con trái, trả về nút đó.",
];

export const SEARCH_MAX_GUIDE = [
  "B1: Bắt đầu từ nút gốc. Nếu nút gốc là null, trả về kết quả không tìm thấy max.",
  "B2: Di chuyển sang nút con phải nút hiện tại.",
  "B3: Lặp lại B2 cho đến khi gặp nút không còn con phải, trả về nút đó.",
];

export const SUCCESSOR_GUIDE = [
  "B1: Bắt đầu từ nút cần tìm successor (n).",
  "      Nếu không có (n) trên cây, trả về kết quả không tìm thấy successor của (n).",
  "B2: Nếu có (n) trên cây, xảy ra 2 trường hợp:",
  "      • Nếu (n) có nút con phải, trả về nút nhỏ nhất của cây con có gốc là nút con phải đó: min((n).left).",
  "      • Nếu (n) không có nút con phải:",
  "            ▪ Bắt đầu từ (n). Nút hiện tại (cur).",
  "            ▪ Di chuyển lên nút cha của nút hiện tại (p).",
  "              Lặp lại cho đến khi nút hiện tại là con trái của cha nó: (cur) = (p).left.",
  "            ▪ Trả về cha của nút hiện tại (p) là successor của (n).",
];

export const PREDECESSOR_GUIDE = [
  "B1: Bắt đầu từ nút cần tìm predecessor (n).",
  "      Nếu không có (n) trên cây, trả về kết quả không tìm thấy predecessor của (n).",
  "B2: Nếu có (n) trên cây, xảy ra 2 trường hợp:",
  "      • Nếu (n) có nút con trái, trả về nút lớn nhất của cây con có gốc là nút con trái đó: max((n).left).",
  "      • Nếu (n) không có nút con trái:",
  "            ▪ Bắt đầu từ (n). Nút hiện tại (cur).",
  "            ▪ Di chuyển lên nút cha của nút hiện tại (p).",
  "              Lặp lại cho đến khi nút hiện tại là con phải của cha nó: (cur) = (p).right.",
  "            ▪ Trả về cha của nút hiện tại (p) là predecessor của (n).",
];

export const REMOVE_GUIDE = [
  "B1: Tìm nút cần xóa (r), nếu không tìm thấy (r) kết thúc quá trình xóa.",
  "B2: Nếu tìm thấy (r), xác định trường hợp xóa:",
  "      • Nếu số lượng của (r) lớn hơn 1, giảm số lượng của (r).",
  "      • Nếu (r) là nút lá - là không có nút con, xóa trực tiếp nút (r).",
  "      • Nếu (r) là nút có 1 nút con, thay thế (r) bằng nút con của nó.",
  "      • Nếu (r) là nút có 2 nút con, thay thế (r) bằng nút kế nhiệm của nó successor(r). ",
];

export const FIND_NODE_AT_RANK_GUIDE = [
  "✦ Gọi hàm tìm kiếm nút theo thứ hạng (r) trong cây nhị phân có gốc (root) là nodeAtRank(root, r).",
  "",
  "B1: Bắt đầu từ nút gốc (root). Gọi (ls) là số lượng nút của cây con trái nút hiện tại, (r) là thứ hạng cần tìm nút.",
  "B2: So sánh (r) với (ls):",
  "      • Nếu (r) = (ls) + 1, trả về nút hiện tại (root).",
  "      • Nếu (r) <= (ls), trả về nút có thứ hạng (r) trên cây con trái: nodeAtRank((root).left, r).",
  "      • Nếu (r) > (ls), trả về nút có thứ hạng (r - ls - 1) trên cây con phải: nodeAtRank((root).right, r - ls - 1).",
  "      • Nếu nút hiện tại null hoặc (r) <= 0, trả về null - không tìm thấy nút.",
];

export const FIND_NODE_RANK_GUIDE = [
  "✦ Gọi hàm tìm kiếm thứ hạng của một nút (n) trên cây nhị phân có gốc (root) là rank(root, n)",
  "",
  "B1: Bắt đầu từ nút gốc. Gọi (ls) là số lượng nút của cây con trái nút hiện tại.",
  "B2: So sánh giá trị nút muốn tìm thứ hạng (n) với nút hiện tại (cur):",
  "      • Nếu giá trị (n) nhỏ hơn giá trị (cur), trả về thứ hạng của (n) trong cây con trái: rank((cur).left, n).",
  "      • Nếu giá trị (n) lớn hơn giá trị (cur), trả về ls + 1 + rank((cur).right, n).",
  "      • Nếu giá trị (n) bằng giá trị (cur), trả về ls + 1.",
  "      • Nếu (cur) là null, trả về 0.",
];

export const FIND_NODE_LEVEL_GUIDE = [
  "B1: Bắt đầu từ nút gốc. Khởi tạo mức ban đầu (level) là 0.",
  "B2: So sánh giá trị nút muốn tìm mức (n) với nút hiện tại (cur):",
  "      • Nếu giá trị (n) nhỏ hơn giá trị (cur), di chuyển sang nút con trái (left) và tăng (level) 1 đơn vị:",
  "        (cur) = (left), (level) = (level) + 1.",
  "      • Nếu giá trị (n) lớn hơn giá trị (cur), di chuyển sang nút con phải (right) và tăng (level) 1 đơn vị:",
  "        (cur) = (right), (level) = (level) + 1.",
  "B3: Lặp lại B2 cho đến khi:",
  "      • Giá trị (n) bằng giá trị (cur), trả về (level) là mức của nút (n).",
  "      • Gặp nút lá - nút không có nút con, trả về kết quả không tìm thấy (n).",
];
