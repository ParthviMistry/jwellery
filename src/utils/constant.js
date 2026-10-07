import React from "react";
import StatusBadge from "@/components/common/StatusBadge";

export const countryColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "phoneCode", name: "Phone Code" },
  { id: "alias", name: "Alias" },
];

export const stateColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "alias", name: "Alias" },
  { id: "countryName", name: "Country" },
];

export const cityColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "stateName", name: "State" },
  { id: "countryName", name: "Country" },
];

export const financialYearColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Financial Year" },
  {
    id: "startDate",
    name: "Start Date",
    render: (financialYear) =>
      financialYear.startDate
        ? new Date(financialYear.startDate).toLocaleDateString("en-IN")
        : "—",
  },
  {
    id: "endDate",
    name: "End Date",
    render: (financialYear) =>
      financialYear.endDate
        ? new Date(financialYear.endDate).toLocaleDateString("en-IN")
        : "—",
  },
  {
    id: "isActive",
    name: "Status",
    render: (financialYear) =>
      React.createElement(StatusBadge, { isActive: financialYear.isActive }),
  },
];

export const adminUserColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "userType", name: "User Type" },
  { id: "phoneNo", name: "Phone" },
  {
    id: "isActive",
    name: "Status",
    render: (user) => React.createElement(StatusBadge, { isActive: user.isActive }),
  },
  {
    id: "createdAt",
    name: "Created Date",
    render: (user) =>
      user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN")
        : "—",
  },
];
