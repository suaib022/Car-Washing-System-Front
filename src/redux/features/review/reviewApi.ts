import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (query) => ({
        url: "/reviews",
        method: "GET",
        params: query,
      }),
      providesTags: ["reviews"],
    }),
    // getUsersAllBookings: builder.query({
    //   query: (query) => ({
    //     url: "/my-bookings",
    //     method: "GET",
    //     params: query,
    //   }),
    //   providesTags: ["bookings"],
    // }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["services", "reviews"],
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewsQuery } = reviewApi;
