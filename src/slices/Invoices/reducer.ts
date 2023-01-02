import { createSlice } from "@reduxjs/toolkit";
import { getInvoices } from "./thunk";

interface InvoiceStateType {
  invoices: Array<any>;
  invoiceDetail: object;
  error?: string | object | null | undefined | unknown;
}
export const initialState: InvoiceStateType = {
  invoices: [],
  invoiceDetail: {},
  error: {},
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getInvoices.fulfilled, (state: any, action: any) => {
      state.invoices = action.payload;
    });
    builder.addCase(getInvoices.rejected, (state, action) => {
      state.error = action.payload || null;
    });
  },
});

export default invoiceSlice.reducer;