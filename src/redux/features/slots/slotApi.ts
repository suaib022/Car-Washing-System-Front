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
    updateSlot: builder.mutation({
      query: ({ slotId, updatedData }) => ({
        url: `/slots/${slotId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["slots"],
    }),
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

export const { useGetAllSlotsQuery, useUpdateSlotMutation } = slotApi;
