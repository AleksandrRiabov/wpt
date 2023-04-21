import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetDaysDataResponse, GetTrailersDataResponse } from "./types";

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
    getTrailersData: build.query<Array<GetTrailersDataResponse>, string>({
      query: (query) => `trailers/?${query}`,
      providesTags: ["DaysData"],
    }),
  }),
});

export const { useGetDaysDataQuery, useGetTrailersDataQuery } = api;
