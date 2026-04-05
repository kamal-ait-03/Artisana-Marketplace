import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { HomePage } from "@/pages/customer/HomePage"
import { ShopPage } from "@/pages/customer/ShopPage"
import { ProductDetailPage } from "@/pages/customer/ProductDetailPage"
import { CartPage } from "@/pages/customer/CartPage"
import { CheckoutPage } from "@/pages/customer/CheckoutPage"
import { VendorDashboard } from "@/pages/vendor/VendorDashboard"
import { AdminDashboard } from "@/pages/admin/AdminDashboard"
import { BlogPage } from "@/pages/customer/BlogPage"

// In a real app, VendorDashboard and AdminDashboard would be 
// wrapped in a <RoleRoute role="vendor" /> wrapper component.
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "vendor",
        element: <VendorDashboard />
      },
      {
        path: "admin",
        element: <AdminDashboard />
      }
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
