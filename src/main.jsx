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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Somthing went wrong!</h1>,
    children: [
      {
        path: "/",
        element: <RestaurantList />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      // {
      //   path: "/about",
      //   element: <About />,
      // },

      // {
      //   path: "/user/:id",
      //   element: <UserDetails />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
