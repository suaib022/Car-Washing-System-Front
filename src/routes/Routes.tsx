import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Service from "../pages/Service/Service";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import SlotManagement from "../pages/Admin/SlotManagement";

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
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "userManagement",
            element: <UserManagement />,
          },
          {
            path: "serviceManagement",
            element: <ServiceManagement />,
          },
          {
            path: "slotManagement",
            element: <SlotManagement />,
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
