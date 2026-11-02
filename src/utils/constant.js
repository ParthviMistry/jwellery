import React from "react";
import StatusBadge from "@/components/common/StatusBadge";

export const stonePageSize = 8;

export const stoneEnumOptions = {
  colorType: ["White", "Fancy"],
  whiteColorCode: "DEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  fancyColorCode: [
    "Yellow",
    "Orange",
    "Pink",
    "Blue",
    "Green",
    "Brown",
    "Red",
    "White",
    "Violet",
    "Purple",
    "Gray",
    "Olive",
    "Black",
    "Other",
  ],
  fancyOvertone: [
    "Yellow",
    "Yellowish",
    "Pink",
    "Pinkish",
    "Blue",
    "Bluish",
    "Red",
    "Reddish",
    "Green",
    "Greenish",
    "Purple",
    "Purplish",
    "Orange",
    "Orangy",
    "Violet",
    "Violetish",
    "Gray",
    "Grayish",
    "Black",
    "Brown",
    "Brownish",
    "Champagne",
    "Cognac",
    "Chameleon",
    "White",
    "Other",
  ],
  fancyIntensity: [
    "Fancy Deep",
    "Fancy Dark",
    "Fancy Vivid",
    "Fancy Intense",
    "Fancy",
    "Very Light",
    "Fancy Light",
    "Light",
    "Faint",
  ],
  clarity: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"],
  growthType: ["Natural", "CVD", "HPHT"],
};

export const stoneTextFields = [
  ["stoneType", "Stone Type", 100],
  ["stockId", "Stock ID", 100],
  ["lab", "Lab", 50],
  ["report", "Report", 100],
  ["colorCode", "Color Code", 100],
  ["overtone", "Overtone", 100],
  ["intensity", "Intensity", 100],
  ["cut", "Cut", 100],
  ["polish", "Polish", 100],
  ["symmetry", "Symmetry", 100],
  ["fluorescence", "Fluorescence", 100],
  ["certificateLink", "Certificate Link", 2000],
  ["culetSize", "Culet Size", 100],
  ["girdleName", "Girdle Name", 100],
];

export const stoneDecimalFields = [
  ["carat", "Carat", true],
  ["table", "Table", false],
  ["depth", "Depth", false],
  ["ratio", "Ratio", false],
  ["length", "Length", false],
  ["width", "Width", false],
  ["rapo", "Rapo", false],
  ["percent", "Percent", false],
  ["total", "Total", false],
  ["crownAngle", "Crown Angle", false],
  ["crownHeight", "Crown Height", false],
  ["pavilionAngle", "Pavilion Angle", false],
  ["pavilionHeight", "Pavilion Height", false],
  ["girdlePercentage", "Girdle Percentage", false],
];

export const stoneNonNegativeDecimalFields = new Set([
  "carat",
  "table",
  "depth",
  "ratio",
  "length",
  "width",
]);

export const emptyStoneForm = {
  stoneType: "",
  stockId: "",
  lab: "",
  report: "",
  shapeId: "",
  carat: "",
  colorType: "White",
  colorCode: "",
  overtone: "",
  intensity: "",
  clarity: "IF",
  cut: "",
  polish: "",
  symmetry: "",
  fluorescence: "",
  table: "",
  depth: "",
  ratio: "",
  length: "",
  width: "",
  rapo: "",
  percent: "",
  total: "",
  certificateLink: "",
  productImgLinks: "",
  productImgPaths: "",
  productVideoLinks: "",
  productVideoPaths: "",
  crownAngle: "",
  crownHeight: "",
  pavilionAngle: "",
  pavilionHeight: "",
  culetSize: "",
  girdleName: "",
  girdlePercentage: "",
  growthType: "Natural",
  description: "",
  isAvailable: true,
};

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

export const shapeColumns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "imgPath", name: "Image Path" },
  {
    id: "createdAt",
    name: "Created Date",
    render: (shape) =>
      shape.createdAt
        ? new Date(shape.createdAt).toLocaleDateString("en-IN")
        : "—",
  },
];

export const stoneColumns = [
  { id: "id", name: "ID" },
  { id: "stockId", name: "Stock ID" },
  { id: "stoneType", name: "Stone Type" },
  { id: "shapeName", name: "Shape" },
  { id: "carat", name: "Carat" },
  { id: "colorCode", name: "Color" },
  { id: "clarity", name: "Clarity" },
  { id: "total", name: "Total" },
  {
    id: "media",
    name: "Media",
    render: (stone) =>
      [stone.productImg && "Image", stone.productVideo && "Video"]
        .filter(Boolean)
        .join(", ") || "—",
  },
  {
    id: "isAvailable",
    name: "Availability",
    render: (stone) => (stone.isAvailable ? "Available" : "Unavailable"),
  },
  {
    id: "createdAt",
    name: "Created Date",
    render: (stone) =>
      stone.createdAt
        ? new Date(stone.createdAt).toLocaleDateString("en-IN")
        : "—",
  },
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
    render: (user) =>
      React.createElement(StatusBadge, { isActive: user.isActive }),
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
