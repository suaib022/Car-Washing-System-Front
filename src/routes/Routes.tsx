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
        path: "/services",
        element: <Service />,
      },
      {
        path: "/services/:serviceId",
        element: <ServiceDetails />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "my-profile",
            element: <MyProfile />,
          },
          {
            path: "my-bookings",
            element: <MyBookings />,
          },
          {
            path: "userManagement",
            element: <UserManagement />,
          },
          {
            path: "serviceManagement",
            element: <ServiceManagement />,
          },
          {
            path: "trashManagement",
            element: <TrashManagement />,
          },
          {
            path: "booking-management",
            element: <BookingManagement />,
          },
          {
            path: "slotManagement",
            element: <SlotManagement />,
            children: [
              {
                path: "manageSlots",
                element: <Slots />,
              },
              {
                path: "addSlot",
                element: <AddSlot />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default router;
