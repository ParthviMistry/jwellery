import { createElement } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Products from "@/pages/products/Products";
import ProductForm from "@/pages/products/ProductForm";
import ProductDetail from "@/pages/products/ProductDetail";
import Orders from "@/pages/orders/Orders";
import OrderDetail from "@/pages/orders/OrderDetail";
import Customers from "@/pages/customers/Customers";
import CustomerDetail from "@/pages/customers/CustomerDetail";
import Inventory from "@/pages/inventory/Inventory";
import Coupons from "@/pages/coupons/Coupons";
import Settings from "@/pages/settings/Settings";
import FinancialYearPage from "@/pages/settings/FinancialYearPage";
import CategoryPage from "@/pages/masters/CategoryPage";
import SubCategoryPage from "@/pages/masters/SubCategoryPage";
import BrandPage from "@/pages/masters/BrandPage";
import ProductStylePage from "@/pages/masters/ProductStylePage";
import ProductTypePage from "@/pages/masters/ProductTypePage";
import ShapePage from "@/pages/masters/ShapePage";
import StonePage from "@/pages/masters/StonePage";
import MetalTypePage from "@/pages/masters/MetalTypePage";
import MetalColorPage from "@/pages/masters/MetalColorPage";
import MetalCaretPage from "@/pages/masters/MetalCaretPage";
import CountryPage from "@/pages/masters/CountryPage";
import StatePage from "@/pages/masters/StatePage";
import CityPage from "@/pages/masters/CityPage";
import CustomerPage from "@/pages/users/CustomerPage";
import AdminUserPage from "@/pages/users/AdminUserPage";
import PurchaseMasterPage from "@/pages/transactions/PurchaseMasterPage";
import PurchaseReturnMasterPage from "@/pages/transactions/PurchaseReturnMasterPage";
import SalesMasterPage from "@/pages/transactions/SalesMasterPage";
import SalesReturnMasterPage from "@/pages/transactions/SalesReturnMasterPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import UIComponentsShowcase from "@/pages/settings/UIComponentsShowcase";
import UIComponents from "@/pages/UIComponents";

export const appRoutes = [
  {
    path: "/login",
    element: createElement(Login),
  },
  {
    path: "/",
    element: createElement(AdminLayout),
    children: [
      { path: "", element: createElement(Dashboard) },
      { path: "products", element: createElement(Products) },
      { path: "products/new", element: createElement(ProductForm) },
      { path: "products/:id", element: createElement(ProductDetail) },
      { path: "products/:id/edit", element: createElement(ProductForm) },
      { path: "orders", element: createElement(Orders) },
      { path: "orders/:id", element: createElement(OrderDetail) },
      { path: "customers", element: createElement(Customers) },
      { path: "customers/:id", element: createElement(CustomerDetail) },
      { path: "inventory", element: createElement(Inventory) },
      { path: "coupons", element: createElement(Coupons) },
      { path: "settings", element: createElement(Settings) },
      {
        path: "settings/financial-year",
        element: createElement(FinancialYearPage),
      },
      // {
      //   path: "settings/ui-components",
      //   element: createElement(UIComponentsShowcase),
      // },
      {
        path: "settings/ui-components",
        element: createElement(UIComponents),
      },
      { path: "masters/category", element: createElement(CategoryPage) },
      { path: "masters/subcategory", element: createElement(SubCategoryPage) },
      { path: "masters/brand", element: createElement(BrandPage) },
      {
        path: "masters/product-style",
        element: createElement(ProductStylePage),
      },
      { path: "masters/product-type", element: createElement(ProductTypePage) },
      { path: "stone/stone-master", element: createElement(StonePage) },
      { path: "stone/shape-master", element: createElement(ShapePage) },
      { path: "metal/metal-type", element: createElement(MetalTypePage) },
      { path: "metal/metal-color", element: createElement(MetalColorPage) },
      { path: "metal/metal-caret", element: createElement(MetalCaretPage) },
      { path: "location/country", element: createElement(CountryPage) },
      { path: "location/state", element: createElement(StatePage) },
      { path: "location/city", element: createElement(CityPage) },
      { path: "users/customer", element: createElement(CustomerPage) },
      { path: "users/admin-user", element: createElement(AdminUserPage) },
      {
        path: "transactions/purchase-master",
        element: createElement(PurchaseMasterPage),
      },
      {
        path: "transactions/purchase-return-master",
        element: createElement(PurchaseReturnMasterPage),
      },
      {
        path: "transactions/sales-master",
        element: createElement(SalesMasterPage),
      },
      {
        path: "transactions/sales-return-master",
        element: createElement(SalesReturnMasterPage),
      },
      { path: "reports", element: createElement(ReportsPage) },
    ],
  },
];
