import { createAsyncThunk } from "@reduxjs/toolkit";

import { getInvoices as getInvoicesApi } from "../../helpers/fakebackend_helper";

export const getInvoices = createAsyncThunk("chat/getInvoices", async () => {
  try {
    const response = getInvoicesApi();
    return response;
  } catch (error) {
    return error;
  }
});
