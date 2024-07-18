import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  roles: string[];
}

const initialState: IinitialState = {
  roles: [],
};

export const rolesSlice = createSlice({
  name: "rolesSlice",
  initialState,
  reducers: {
    setRolesRedux: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { setRolesRedux } = rolesSlice.actions;
export const rolesSliceReducer = rolesSlice.reducer;
