import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetDaysDataResponse,
  GetTrailersDataResponse,
  NewTrailer,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "main",
  endpoints: (build) => ({
    getDaysData: build.query<Array<GetDaysDataResponse>, string>({
      query: (range) => `day/?${range}`,
    }),
    getTrailersData: build.query<Array<GetTrailersDataResponse>, string>({
      query: (query) => `trailers/?${query}`,
    }),
    // POST request with form data
    createTrailer: build.mutation<void, NewTrailer>({
      query: (formData) => ({
        url: "/trailer",
        method: "POST",
        body: formData,
      }),
    }),
    // PUT request to update trailer details
    updateTrailer: build.mutation<void, { id: string, details: GetTrailersDataResponse }>({
      query: ({ id, details }) => ({
        url: `/trailer/${id}`,
        method: "PUT",
        body: details,
      }),
    }),
  }),
});

export const {
  useGetDaysDataQuery,
  useGetTrailersDataQuery,
  useCreateTrailerMutation,
  useUpdateTrailerMutation
} = api;
