import {
  LayoutDashboard,
  Gem,
  ShoppingBag,
  Users,
  Boxes,
  Settings,
  BarChart3,
  Map,
  Sparkles,
  ShieldCheck,
  ReceiptText,
  Ticket,
} from "lucide-react";

export const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Products", icon: Gem },
  {
    label: "Transaction",
    icon: ReceiptText,
    children: [
      { to: "/transactions/purchase-master", label: "Purchase Master" },
      {
        to: "/transactions/purchase-return-master",
        label: "Purchase Return Master",
      },
      { to: "/transactions/sales-master", label: "Sales Master" },
      { to: "/transactions/sales-return-master", label: "Sales Return Master" },
    ],
  },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  {
    label: "Product Masters",
    icon: Gem,
    children: [
      { to: "/masters/category", label: "Category" },
      { to: "/masters/subcategory", label: "SubCategory" },
      { to: "/masters/brand", label: "Brand" },
      { to: "/masters/product-style", label: "Product Style" },
      { to: "/masters/product-type", label: "Product Type" },
    ],
  },
  {
    label: "Stone",
    icon: Sparkles,
    children: [
      { to: "/stone/stone-master", label: "Stone Master" },
      { to: "/stone/shape-master", label: "Shape Master" },
    ],
  },
  {
    label: "Metal Master",
    icon: ShieldCheck,
    children: [
      { to: "/metal/metal-type", label: "Metal Type" },
      { to: "/metal/metal-color", label: "Metal Color" },
      { to: "/metal/metal-caret", label: "Metal Caret" },
    ],
  },
  {
    label: "Location",
    icon: Map,
    children: [
      { to: "/location/country", label: "Country" },
      { to: "/location/state", label: "State" },
      { to: "/location/city", label: "City" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    children: [
      { to: "/users/customer", label: "Customer" },
      { to: "/users/admin-user", label: "Admin User" },
    ],
  },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/coupons", label: "Coupons", icon: Ticket },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { to: "/settings", label: "Settings" },
      { to: "/settings/ui-components", label: "UI Components" },
    ],
  },
];

export const pageTitles = {
  "/": "Dashboard",
  "/orders": "Orders",
  "/reports": "Reports",
  "/inventory": "Inventory",
  "/settings": "Setting",
  "/settings/ui-components": "UI Components",
  "/customers": "Customers",
  "/products": "Products",
  "/transactions": "Transactions",
  "/masters": "Masters",
  "/stone": "Stone",
  "/metal": "Metal",
  "/location": "Location",
  "/users": "Users",
};
