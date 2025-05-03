import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage"; // Corrected import
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
// 404 Page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "Not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to='/not-found'/> } // Correctly referenced
    ],
  },
  // Catch-all route for 404 errors
  
]);
