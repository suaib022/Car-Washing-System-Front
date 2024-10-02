import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (query) => ({
        url: "/bookings",
        method: "GET",
        params: query,
      }),
      providesTags: ["bookings"],
    }),
    getUsersAllBookings: builder.query({
      query: (query) => ({
        url: "/my-bookings",
        method: "GET",
        params: query,
      }),
      providesTags: ["bookings"],
    }),
    getSingleBooking: builder.query({
      query: (slotId) => ({
        url: `/bookings/${slotId}`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),

    addBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["bookings", "services", "slots"],
    }),
    payBooking: builder.mutation({
      query: (slotId) => ({
        url: `/bookings/${slotId}`,
        method: "POST",
      }),
      invalidatesTags: ["bookings", "services", "slots"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetUsersAllBookingsQuery,
  useAddBookingMutation,
  usePayBookingMutation,
  useGetSingleBookingQuery,
} = bookingApi;
