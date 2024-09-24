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
      query: (accessToken) => ({
        url: "/my-bookings",
        method: "GET",
        headers: accessToken,
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
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetUsersAllBookingsQuery,
  useAddBookingMutation,
} = bookingApi;
