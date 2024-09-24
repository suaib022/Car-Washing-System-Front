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
    addSlot: builder.mutation({
      query: (slotData) => ({
        url: "/services/slots",
        method: "POST",
        body: slotData,
      }),
      invalidatesTags: ["slots"],
    }),
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

export const {
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
  useAddSlotMutation,
} = slotApi;
