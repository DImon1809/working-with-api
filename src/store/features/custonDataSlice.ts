import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  customEmail: string;
  customCode: string;
  customToken: string;
  customStatus: boolean;
}

const initialState: IinitialState = {
  customEmail: "",
  customCode: "",
  customToken: "",
  customStatus: false,
};

export const customDataSlice = createSlice({
  name: "customDataSlice",
  initialState,
  reducers: {
    addEmailRedux: (state, action: PayloadAction<string>) => {
      state.customEmail = action.payload;
    },

    addCodeRedux: (state, action: PayloadAction<string>) => {
      state.customCode = action.payload;
    },

    addTokenRedux: (state, action: PayloadAction<string>) => {
      state.customToken = action.payload;
    },

    addStatusRedux: (state) => {
      state.customStatus = true;
    },
  },
});

export const { addEmailRedux, addCodeRedux, addTokenRedux, addStatusRedux } =
  customDataSlice.actions;
export const customDataSliceReducer = customDataSlice.reducer;
