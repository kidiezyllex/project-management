// Import các hàm cần thiết từ thư viện Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho state ban đầu
export interface initialStateTypes {
  isSidebarCollapsed: boolean;
}

// Khởi tạo giá trị ban đầu cho state
const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
};
// Tạo một slice trong Redux store
export const globalSlice = createSlice({
  name: "global",
  initialState,
  // Định nghĩa các reducers để xử lý các actions
  reducers: {
    // Reducer để cập nhật trạng thái thu gọn của sidebar
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      // Cập nhật giá trị isSidebarCollapsed trong state
      // action.payload chứa giá trị boolean mới
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
