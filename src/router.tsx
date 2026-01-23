import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
    ],
  },
]);
