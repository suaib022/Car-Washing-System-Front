import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (query) => ({
        url: "/auth/users",
        method: "GET",
        params: query,
      }),
      providesTags: ["auth"],
    }),
    getSingleUser: builder.query({
      query: (userEmail) => ({
        url: `/auth/users/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["auth", "services", "bookings", "slots"],
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["auth", "services", "bookings", "slots"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedData }) => ({
        url: `/auth/updateUser/${userId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["auth", "services", "bookings", "slots"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authApi;
