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
    addService: builder.mutation({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const { useGetAllServicesQuery, useAddServiceMutation } = serviceApi;
