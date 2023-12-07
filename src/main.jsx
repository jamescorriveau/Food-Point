import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Profile from "./Components/Profile.jsx";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import UserDetails from "./components/UserDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantList from "./Components/RestaurantList.jsx";
import Layout from "./Components/Layout.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Somthing went wrong!</h1>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
