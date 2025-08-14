// src/api/sabbathSchool.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Quarterly {
  path: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  path: string;
  title: string;
  // Add other lesson properties as needed
}

export const sabbathSchoolApi = createApi({
  reducerPath: "sabbathSchoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sabbath-school-stage.adventech.io/api/v2/",
  }),
  endpoints: (builder) => ({
    getQuarterlies: builder.query<{ quarterlies: Quarterly[] }, void>({
      query: () => "en/quarterlies/index.json",
    }),
  }),
});

export const { useGetQuarterliesQuery } = sabbathSchoolApi;