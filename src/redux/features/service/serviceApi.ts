import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (query) => ({
        url: "/services",
        method: "GET",
        params: query,
      }),
      providesTags: ["services"],
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
