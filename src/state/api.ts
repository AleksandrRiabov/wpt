import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetDaysDataResponse } from "./types";

export const api = createApi({
  // highlight-start
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["DaysData"],
  // highlight-end
  endpoints: (build) => ({
    getDaysData: build.query<Array<GetDaysDataResponse>, string>({
      query: (range) => `day/${range}`,
      providesTags: ["DaysData"],
    }),
  }),
});

export const { useGetDaysDataQuery } = api;
