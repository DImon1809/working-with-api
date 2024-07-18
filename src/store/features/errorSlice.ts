import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  isError: boolean;
  errorMessage: string;
}

const initialState = {
  isError: false,
  errorMessage: "Ошибка",
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    addErrorRedux: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.errorMessage = action.payload;
    },

    removeErrorRedux: (state) => {
      state.isError = false;
    },
  },
});

export const { addErrorRedux, removeErrorRedux } = errorSlice.actions;
export const errorSliceReducer = errorSlice.reducer;
