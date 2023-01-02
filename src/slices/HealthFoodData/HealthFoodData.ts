import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

// 데이터 전부 받아오기
export const GetAllData = createAsyncThunk("GetAllData", async setData => {
  try {
    const response = await axios.get(`http://localhost:3000/item`);
    return response;
  } catch (err) {
    console.log(err);
  }
});

// 데이터 하나만 받아오기
export const GetOneData = createAsyncThunk("GetAllData", async value => {
  const response = await axios.get(`localhost:3000/item/:id`);
});

// 데이터 수정하기
export const PutData = createAsyncThunk("GetAllData", async value => {
  const response = await axios.put(`localhost:3000/item/:id`);
});

// 데이터 지우기
export const DeleteData = createAsyncThunk("GetAllData", async value => {
  const response = await axios.delete(`localhost:3000/item/:id`);
});

// 데이터 생성하기
export const CreateData = createAsyncThunk("GetAllData", async value => {
  const response = await axios.post(`localhost:3000/item`);
});

interface ItemDataType {
  ItemDatas: Array<any>;
  error?: string | object | null | undefined | unknown;
}
export const initialState: ItemDataType = {
  ItemDatas: [],
  error: {},
};

const itemSlice = createSlice({
  name: "itemData",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllData.fulfilled, (state: any, action: any) => {
      state.ItemDatas = action.payload;
    });
  },
});

export default itemSlice.reducer;
