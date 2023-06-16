import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetDaysDataResponse,
  GetOptionsDataResponse,
  GetTrailersDataResponse,
  NewTrailer,
} from "./types";

import { getAuth, getIdToken } from "firebase/auth";

const auth = getAuth();

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      const user = auth.currentUser;
      const getAccessToken = async () => {
        if (user) {
          return await getIdToken(user);
        } else return null;
      };
      const accessToken = await getAccessToken();

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  reducerPath: "main",
  endpoints: (build) => ({
    // Get days data within the date range
    getDaysData: build.query<Array<GetDaysDataResponse>, string>({
      query: (range) => `day/?${range}`,
    }),

    // Get trailers data within the date range
    getTrailersData: build.query<Array<GetTrailersDataResponse>, string>({
      query: (query) => `trailers/?${query}`,
    }),

    // Get options (Product names, Load Types, Freight Types)
    getOptionsData: build.query<GetOptionsDataResponse, void>({
      query: () => `options`,
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
    updateTrailer: build.mutation<
      void,
      { id: string; details: GetTrailersDataResponse }
    >({
      query: ({ id, details }) => ({
        url: `/trailer/${id}`,
        method: "PUT",
        body: details,
      }),
    }),

    updateOptions: build.mutation<
      void,
      { name: string; options: string[] | { name: string; category: string }[] }
    >({
      query: (details) => ({
        url: `/options`,
        method: "PUT",
        body: details,
      }),
    }),
  }),
});

export const {
  useGetDaysDataQuery,
  useGetTrailersDataQuery,
  useGetOptionsDataQuery,
  useUpdateOptionsMutation,
  useCreateTrailerMutation,
  useUpdateTrailerMutation,
} = api;
