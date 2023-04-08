import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetDaysDataResponse } from "./types";

export const api = createApi({
  // highlight-start
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["DaysData"],
  // highlight-end
  endpoints: (build) => ({
    getKpis: build.query<Array<GetDaysDataResponse>, void>({
      query: () => "day/01-04-2023_01-01-2029",
      providesTags: ["DaysData"],
    }),
  }),
});

export const { useGetKpisQuery } = api;
