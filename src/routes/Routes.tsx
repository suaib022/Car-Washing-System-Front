import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Service from "../pages/Service/Service";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import TrashManagement from "../pages/Admin/TrashManagement";
import SlotManagement from "../pages/Admin/SlotManagement";
import Slots from "../pages/Admin/Slots";
import AddSlot from "../pages/Admin/AddSlot";
import ServiceDetails from "../pages/Service/ServiceDetails";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyBookings from "../pages/Dashboard/MyBookings";
import BookingManagement from "../pages/Admin/BookingManagement";
import Review from "../pages/Review/Review";
import BookService from "../pages/Booking/BookService";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NonUserRoute from "../components/layout/NonUserRoute";
import CompareService from "../pages/Service/CompareService";
import NotFound from "../pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/services/:serviceId1/:serviceId2",
        element: <CompareService />,
      },
      {
        path: "/services/:serviceId",
        element: <ServiceDetails />,
      },
      {
        path: "/book-service/:slotId",
        element: (
          <ProtectedRoute role="user">
            <BookService />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "my-profile",
            element: (
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-bookings",
            element: (
              <ProtectedRoute role="user">
                <MyBookings />
              </ProtectedRoute>
            ),
          },
          {
            path: "userManagement",
            element: (
              <ProtectedRoute role="admin">
                <UserManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "serviceManagement",
            element: (
              <ProtectedRoute role="admin">
                <ServiceManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "trashManagement",
            element: (
              <ProtectedRoute role="admin">
                <TrashManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "booking-management",
            element: (
              <ProtectedRoute role="admin">
                <BookingManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "slotManagement",
            element: (
              <ProtectedRoute role="admin">
                <SlotManagement />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "manageSlots",
                element: (
                  <ProtectedRoute role="admin">
                    <Slots />
                  </ProtectedRoute>
                ),
              },
              {
                path: "addSlot",
                element: (
                  <ProtectedRoute role="admin">
                    <AddSlot />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <NonUserRoute>
        <Login />
      </NonUserRoute>
    ),
  },
  {
    path: "/signUp",
    element: (
      <NonUserRoute>
        <SignUp />
      </NonUserRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
