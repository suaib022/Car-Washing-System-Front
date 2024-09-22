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
    getSingleService: builder.query({
      query: (serviceId: string) => ({
        url: `/services/${serviceId}`,
        method: "GET",
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
    updateService: builder.mutation({
      query: ({
        serviceId,
        updatedData,
      }: {
        serviceId: string;
        updatedData: any;
      }) => ({
        url: `/services/${serviceId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useAddServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} = serviceApi;
