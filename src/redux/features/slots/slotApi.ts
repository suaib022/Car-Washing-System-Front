import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: (query) => ({
        url: "/slots",
        method: "GET",
        params: query,
      }),
      providesTags: ["slots"],
    }),
    // getSingleService: builder.query({
    //   query: (serviceId: string) => ({
    //     url: `/services/${serviceId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["services"],
    // }),
    // addService: builder.mutation({
    //   query: (serviceData) => ({
    //     url: "/services",
    //     method: "POST",
    //     body: serviceData,
    //   }),
    //   invalidatesTags: ["services"],
    // }),
    // updateService: builder.mutation({
    //   query: ({
    //     serviceId,
    //     updatedData,
    //   }: {
    //     serviceId: string;
    //     updatedData: any;
    //   }) => ({
    //     url: `/services/${serviceId}`,
    //     method: "PUT",
    //     body: updatedData,
    //   }),
    //   invalidatesTags: ["services"],
    // }),
    // softDeleteService: builder.mutation({
    //   query: (serviceId) => ({
    //     url: `/services/${serviceId}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["services"],
    // }),
    // permanentDeleteService: builder.mutation({
    //   query: (serviceId) => ({
    //     url: `/services/${serviceId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["services"],
    // }),
  }),
});

export const { useGetAllSlotsQuery } = slotApi;
