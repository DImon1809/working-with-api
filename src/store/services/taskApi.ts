import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://193.19.100.32:7000/" }),
  endpoints: (builder) => ({
    getRoles: builder.query<{ roles: string[] }, void>({
      query: () => ({
        url: "api/get-roles",
      }),
    }),

    addToTable: builder.mutation<
      any,
      {
        last_name: string;
        first_name: string;
        email: string;
        role: string;
      }
    >({
      query: (userData) => ({
        url: "api/sign-up",
        method: "POST",
        body: userData,
      }),
    }),

    getCode: builder.query<string, string>({
      query: (email) => ({
        url: `/api/get-code?email=${email}`,
      }),
    }),

    setStatus: builder.mutation<string, string>({
      query: (token) => ({
        url: "api/set-status",
        method: "POST",
        body: { token, status: "increased" },
      }),
    }),
  }),
});

export const {
  useLazyGetRolesQuery,
  useAddToTableMutation,
  useLazyGetCodeQuery,
  useSetStatusMutation,
} = taskApi;
