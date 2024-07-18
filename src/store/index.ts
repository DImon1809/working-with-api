import { configureStore } from "@reduxjs/toolkit";

import { errorSlice, errorSliceReducer } from "./features/errorSlice";
import { taskApi } from "./services/taskApi";
import { rolesSlice, rolesSliceReducer } from "./features/rolesSlice";
import {
  customDataSlice,
  customDataSliceReducer,
} from "./features/custonDataSlice";

export const store = configureStore({
  reducer: {
    [errorSlice.reducerPath]: errorSliceReducer,
    [rolesSlice.reducerPath]: rolesSliceReducer,
    [customDataSlice.reducerPath]: customDataSliceReducer,

    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (baseMiddleware) => baseMiddleware().concat(taskApi.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
