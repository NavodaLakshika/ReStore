import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage"; // Corrected import
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
// 404 Page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth/>, children:[
      { path: "checkout", element: <CheckoutPage /> },
      ]},
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "Not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      
       
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
      { path: "*", element: <Navigate replace to='/not-found'/> } // Correctly referenced
    ],
  },
  // Catch-all route for 404 errors
  
]);
