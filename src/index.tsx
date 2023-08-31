import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { Path } from "./paths";
import Login from "./pages/login/";
import Register from "./pages/register/";
import Home from "./pages/home";

import "./index.css";
import { ConfigProvider, theme } from "antd";
import { Auth } from "./features/auth/auth";
import Employees from "./pages/employess";

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <Home />,
  },
  {
    path: Path.login,
    element: <Login />,
  },
  {
    path: Path.register,
    element: <Register />,
  },
  {
    path: Path.employees,
    element: <Employees />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
