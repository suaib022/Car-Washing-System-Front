import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Service from "../pages/Service/Service";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/services",
        element: <Service />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
