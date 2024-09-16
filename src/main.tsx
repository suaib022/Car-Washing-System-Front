import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import router from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="max-w-screen-xl mx-auto">
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </div>
);
