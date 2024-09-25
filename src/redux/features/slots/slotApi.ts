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
  }),
});

export const {
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
  useAddSlotMutation,
} = slotApi;
