import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Info,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import IconButton from "@/components/common/IconButton";
import AutocompleteDropdown from "@/components/common/AutocompleteDropdown";
import FilterChip from "@/components/common/FilterChip";
import AccessToggle from "@/components/common/AccessToggle";
import SelectionGroup from "@/components/common/SelectionGroup";
import PinConfirmationDialog from "@/components/common/PinConfirmationDialog";
import MenuItems from "@/components/common/MenuItems";
import NoRecordFound from "@/components/common/NoRecordFound";
import FileUpload from "@/components/common/FileUpload";
import DatePicker from "@/components/common/DatePicker";
import Loader from "@/components/common/Loader";
import NotificationToast from "@/components/common/NotificationToast";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import SearchToolbar from "@/components/common/SearchToolbar";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import DataTable from "@/components/common/DataTable";
import DeleteDialog from "@/components/common/DeleteDialog";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "buttons", label: "Buttons" },
  { id: "form-controls", label: "Form Controls" },
  { id: "selection", label: "Selection & Filters" },
  { id: "feedback", label: "Feedback & Utility" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays & Menus" },
  { id: "data-display", label: "Data Display" },
  { id: "common", label: "Common Components" },
];

const Section = ({ id, number, title, description, children }) => (
  <section id={id} className="scroll-mt-24 space-y-5">
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {String(number).padStart(2, "0")}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
    </div>
    {children}
  </section>
);

const Demo = ({ title, description, children, code }) => (
  <Card className="overflow-hidden">
    <CardHeader className="border-b bg-muted/20">
      <CardTitle className="text-base">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-6">
      {children}
      {code && (
        <div className="mt-5 rounded-md bg-muted p-3">
          <code className="break-all text-xs text-muted-foreground">
            {code}
          </code>
        </div>
      )}
    </CardContent>
  </Card>
);

const ComponentPage = () => {
  const [search, setSearch] = useState("");
  const [autoValue, setAutoValue] = useState(null);
  const [access, setAccess] = useState(true);
  const [radio, setRadio] = useState("admin");
  const [checks, setChecks] = useState(["view"]);
  const [pinOpen, setPinOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const autocompleteOptions = [
    { label: "Round", value: "round" },
    { label: "Oval", value: "oval" },
    { label: "Princess", value: "princess" },
    { label: "Emerald", value: "emerald" },
    { label: "Cushion", value: "cushion" },
    { label: "Pear", value: "pear" },
    { label: "Marquise", value: "marquise" },
    { label: "Radiant", value: "radiant" },
  ];

  const tableData = [
    {
      id: 1,
      name: "Round Diamond",
      sku: "DIA-001",
      status: "Active",
      stock: 24,
    },
    {
      id: 2,
      name: "Oval Diamond",
      sku: "DIA-002",
      status: "Active",
      stock: 12,
    },
    {
      id: 3,
      name: "Emerald Diamond",
      sku: "DIA-003",
      status: "Inactive",
      stock: 0,
    },
  ];

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return tableData;

    return tableData.filter((row) =>
      `${row.name} ${row.sku} ${row.status}`.toLowerCase().includes(query),
    );
  }, [search]);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  const Demo = ({ title, description, children, className = "" }) => (
    <Card
      className={`overflow-visible border-border/80 bg-card shadow-none ${className}`}
    >
      <CardHeader className="px-5 pb-3 pt-5">
        <CardTitle className=" text-xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm leading-6">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1">{children}</CardContent>
    </Card>
  );

  const SectionTitle = ({ title, description }) => (
    <div className="space-y-1">
      <h2 className=" text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );

  return (
    <TooltipProvider delayDuration={250}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top header */}
        <header className="border-b bg-background">
          <div className="flex min-h-[106px] items-center justify-between gap-6 px-4 py-4 lg:px-6">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xl text-muted-foreground">
                <span>Components</span>
                <span>/</span>
                <span>Common Components</span>
              </div>

              <h1 className="text-xl font-semibold tracking-tight">
                UI Component Showcase
              </h1>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1.5 text-sm font-normal"
              >
                React
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1.5 text-sm font-normal"
              >
                Vite
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1.5 text-sm font-normal"
              >
                shadcn/ui
              </Badge>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
          <div className="space-y-4">
            {/* Intro */}
            <Card className="border-border/80 shadow-none">
              <CardContent className="px-5 py-5">
                <h2 className="text-2xl font-semibold">
                  Common Component Testing
                </h2>
                <p className="mt-1 text-base text-muted-foreground">
                  Each component below is interactive so you can verify it
                  before using it in the actual admin portal.
                </p>
              </CardContent>
            </Card>

            {/* Form / common controls */}
            <section className="space-y-5">
              <SectionTitle
                title="Form & Input Components"
                description="Reusable controls for master screens, forms, filters and CRUD pages."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo
                  title="AutocompleteDropdown"
                  description="Search, select, clear and reopen the dropdown."
                >
                  <div className="space-y-4">
                    <AutocompleteDropdown
                      options={autocompleteOptions}
                      value={autoValue}
                      onChange={setAutoValue}
                      placeholder="Select stone shape"
                      searchPlaceholder="Search stone shape..."
                    />

                    <p className="text-sm text-muted-foreground">
                      Selected:{" "}
                      <span className="font-medium text-foreground">
                        {autoValue || "None"}
                      </span>
                    </p>
                  </div>
                </Demo>

                <Demo
                  title="DatePicker"
                  description="Open calendar, select a date and clear it."
                >
                  <div className="space-y-4">
                    <DatePicker
                      value={date}
                      onChange={setDate}
                      placeholder="Select purchase date"
                      clearable
                    />

                    <p className="text-sm text-muted-foreground">
                      Selected:{" "}
                      <span className="font-medium text-foreground">
                        {date ? date.toLocaleDateString() : "None"}
                      </span>
                    </p>
                  </div>
                </Demo>

                <Demo
                  title="Search field"
                  description="Controlled search field with clear action."
                >
                  <SearchToolbar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                  />
                </Demo>

                <Demo title="Input & Label">
                  <div className="space-y-2">
                    <Label htmlFor="showcase-product-name">Product name</Label>
                    <Input
                      id="showcase-product-name"
                      placeholder="Enter product name"
                    />
                  </div>
                </Demo>

                <Demo title="Textarea">
                  <Textarea
                    placeholder="Enter product description..."
                    className="min-h-[110px]"
                  />
                </Demo>

                <Demo title="Select">
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </Demo>
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-5">
              <SectionTitle
                title="Buttons & Actions"
                description="Standard actions and compact icon actions used throughout the admin portal."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo
                  title="Button Variants"
                  description="Use semantic variants instead of client-specific colors."
                >
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Delete</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </Demo>

                <Demo
                  title="IconButton + Tooltip"
                  description="Your common IconButton component."
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <IconButton
                      icon={<Plus className="h-4 w-4" />}
                      tooltip="Add"
                      variant="default"
                    />
                    <IconButton
                      icon={<Eye className="h-4 w-4" />}
                      tooltip="View"
                    />
                    <IconButton
                      icon={<Edit className="h-4 w-4" />}
                      tooltip="Edit"
                    />
                    <IconButton
                      icon={<Copy className="h-4 w-4" />}
                      tooltip="Copy"
                    />
                    <IconButton
                      icon={<Trash2 className="h-4 w-4" />}
                      tooltip="Delete"
                      variant="destructive"
                    />
                  </div>
                </Demo>

                <Demo
                  title="Tooltip"
                  description="Tooltip must have TooltipProvider, Trigger and Content."
                >
                  <div className="flex flex-wrap gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
                          <CircleHelp className="mr-2 h-4 w-4" />
                          Hover me
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        This is a tooltip
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View record</TooltipContent>
                    </Tooltip>
                  </div>
                </Demo>

                <Demo title="Dropdown Menu">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreHorizontal className="mr-2 h-4 w-4" />
                        Open Dropdown
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      sideOffset={6}
                      className="w-48"
                    >
                      <DropdownMenuItem
                        onSelect={() => NotificationToast.info("View clicked")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={() => NotificationToast.info("Edit clicked")}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onSelect={() =>
                          NotificationToast.error("Delete clicked")
                        }
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Demo>
              </div>
            </section>

            {/* Selection */}
            <section className="space-y-5">
              <SectionTitle
                title="Selection & Filters"
                description="Reusable controls for permissions, filters and access settings."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo
                  title="AccessToggle"
                  description="Permission/access control."
                >
                  <AccessToggle
                    label="Product access"
                    description="Allow this user to manage products."
                    checked={access}
                    onCheckedChange={setAccess}
                  />
                </Demo>

                <Demo title="FilterChip">
                  <div className="flex flex-wrap gap-2">
                    <FilterChip label="Status: Active" onRemove={() => {}} />
                    <FilterChip label="Category: Diamond" onRemove={() => {}} />
                    <FilterChip label="Stock: Available" onRemove={() => {}} />
                  </div>
                </Demo>

                <Demo title="Radio Selection">
                  <SelectionGroup
                    type="radio"
                    name="role"
                    value={radio}
                    onChange={setRadio}
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "Supplier", value: "supplier" },
                      { label: "Order Management", value: "orders" },
                    ]}
                    orientation="horizontal"
                  />
                </Demo>

                <Demo title="Checkbox Selection">
                  <SelectionGroup
                    type="checkbox"
                    name="permissions"
                    value={checks}
                    onChange={setChecks}
                    options={[
                      { label: "View", value: "view" },
                      { label: "Create", value: "create" },
                      { label: "Edit", value: "edit" },
                      { label: "Delete", value: "delete" },
                    ]}
                    orientation="horizontal"
                  />
                </Demo>

                <Demo title="Checkbox">
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                </Demo>

                <Demo title="Switch">
                  <div className="flex items-center gap-3">
                    <Switch id="switch-demo" />
                    <Label htmlFor="switch-demo">Enable notifications</Label>
                  </div>
                </Demo>
              </div>
            </section>

            {/* Feedback */}
            <section className="space-y-5">
              <SectionTitle
                title="Feedback & Utility"
                description="Status, empty states, loaders, notifications and file handling."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo title="StatusBadge">
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Active" />
                    <StatusBadge status="Inactive" />
                    <StatusBadge status="Pending" />
                    <StatusBadge status="Completed" />
                  </div>
                </Demo>

                <Demo title="Badge">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </Demo>

                <Demo title="Loader">
                  <div className="space-y-4">
                    <Loader size="sm" text="Loading..." />
                    <Loader size="default" text="Please wait..." />
                    <div>
                      <Button onClick={simulateLoading}>Show loader</Button>
                      {loading && (
                        <div className="mt-4">
                          <Loader size="sm" text="Loading records..." />
                        </div>
                      )}
                    </div>
                  </div>
                </Demo>

                <Demo title="NotificationToast">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() =>
                        NotificationToast.success("Saved successfully.")
                      }
                    >
                      Success
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        NotificationToast.error("Something went wrong.")
                      }
                    >
                      Error
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        NotificationToast.info(
                          "This is an information message.",
                        )
                      }
                    >
                      Info
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        NotificationToast.warning("Please review the data.")
                      }
                    >
                      Warning
                    </Button>
                  </div>
                </Demo>

                <Demo title="NoRecordFound">
                  <NoRecordFound
                    title="No customers found"
                    description="Try changing your search or filter criteria."
                    actionLabel="Clear filters"
                    onAction={() => setSearch("")}
                  />
                </Demo>

                <Demo title="EmptyState">
                  <EmptyState
                    title="No records yet"
                    description="Create your first record to get started."
                  />
                </Demo>

                <Demo
                  title="FileUpload"
                  description="Drag-and-drop or browse files."
                  className="lg:col-span-2"
                >
                  <FileUpload
                    value={files}
                    onChange={setFiles}
                    multiple
                    maxFiles={5}
                    maxSizeMB={5}
                  />
                </Demo>
              </div>
            </section>

            {/* Overlays and menus */}
            <section className="space-y-5">
              <SectionTitle
                title="Overlays & Menus"
                description="Dialogs, confirmation flows, dropdown actions and PIN-protected operations."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo title="Dialog">
                  <Button onClick={() => setDialogOpen(true)}>
                    Open Dialog
                  </Button>

                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit customer</DialogTitle>
                        <DialogDescription>
                          Update customer information and save your changes.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="customer-name">Name</Label>
                          <Input
                            id="customer-name"
                            placeholder="Customer name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customer-email">Email</Label>
                          <Input
                            id="customer-email"
                            placeholder="customer@example.com"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            NotificationToast.success("Changes saved.");
                            setDialogOpen(false);
                          }}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Demo>

                <Demo title="PinConfirmationDialog">
                  <Button onClick={() => setPinOpen(true)}>
                    Confirm with PIN
                  </Button>

                  <PinConfirmationDialog
                    open={pinOpen}
                    onOpenChange={setPinOpen}
                    onConfirm={async () => {
                      NotificationToast.success("PIN verified successfully.");
                      setPinOpen(false);
                    }}
                  />
                </Demo>

                <Demo
                  title="MenuItems"
                  description="Reusable application-level action menu."
                >
                  <MenuItems
                    label="Product Actions"
                    trigger={
                      <Button variant="outline">
                        <MoreHorizontal className="mr-2 h-4 w-4" />
                        Actions
                      </Button>
                    }
                    items={[
                      {
                        key: "view",
                        label: "View",
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => NotificationToast.info("View clicked"),
                      },
                      {
                        key: "edit",
                        label: "Edit",
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => NotificationToast.info("Edit clicked"),
                      },
                      { separator: true },
                      {
                        key: "delete",
                        label: "Delete",
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: "destructive",
                        onClick: () => setDeleteOpen(true),
                      },
                    ]}
                  />

                  <DeleteDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    onConfirm={() => {
                      NotificationToast.success("Record deleted.");
                      setDeleteOpen(false);
                    }}
                  />
                </Demo>
              </div>
            </section>

            {/* Navigation */}
            <section className="space-y-5">
              <SectionTitle
                title="Navigation Components"
                description="Tabs and contextual navigation patterns."
              />

              <div className="grid gap-8 lg:grid-cols-2">
                <Demo title="Tabs">
                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="inventory">Inventory</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="details"
                      className="pt-4 text-sm text-muted-foreground"
                    >
                      Product details content.
                    </TabsContent>

                    <TabsContent
                      value="inventory"
                      className="pt-4 text-sm text-muted-foreground"
                    >
                      Inventory content.
                    </TabsContent>

                    <TabsContent
                      value="history"
                      className="pt-4 text-sm text-muted-foreground"
                    >
                      History content.
                    </TabsContent>
                  </Tabs>
                </Demo>

                <Demo title="Separator">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Product information</p>
                      <p className="text-sm text-muted-foreground">
                        General product details.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <p className="font-medium">Inventory information</p>
                      <p className="text-sm text-muted-foreground">
                        Stock and availability details.
                      </p>
                    </div>
                  </div>
                </Demo>
              </div>
            </section>

            {/* Data */}
            <section className="space-y-5">
              <SectionTitle
                title="Data Display"
                description="Tables and application-level data display patterns."
              />

              <div className="space-y-8">
                <Demo
                  title="Search + Table"
                  description="Example master-screen data table."
                >
                  <SearchToolbar
                    value={search}
                    onChange={setSearch}
                    onAdd={() => toast.info("Add product clicked")}
                    addLabel="Add product"
                    placeholder="Search product..."
                  />

                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Stock</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {filteredRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="font-medium">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.sku}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  row.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {row.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {row.stock}
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <IconButton
                                  icon={<Eye className="h-4 w-4" />}
                                  tooltip="View"
                                />
                                <IconButton
                                  icon={<Edit className="h-4 w-4" />}
                                  tooltip="Edit"
                                />
                                <IconButton
                                  icon={<Trash2 className="h-4 w-4" />}
                                  tooltip="Delete"
                                  variant="ghost"
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}

                        {!filteredRows.length && (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-24 text-center text-muted-foreground"
                            >
                              No records found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Demo>

                <Demo
                  title="DataTable"
                  description="Application-level DataTable wrapper."
                >
                  <DataTable
                    data={filteredRows}
                    columns={[
                      {
                        accessorKey: "name",
                        header: "Product",
                      },
                      {
                        accessorKey: "sku",
                        header: "SKU",
                      },
                      {
                        accessorKey: "status",
                        header: "Status",
                      },
                      {
                        accessorKey: "stock",
                        header: "Stock",
                      },
                    ]}
                  />
                </Demo>
              </div>
            </section>

            {/* Higher-level common components */}
            <section className="space-y-5">
              <SectionTitle
                title="Application Common Components"
                description="Higher-level components used to keep admin screens consistent."
              />

              <div className="space-y-8">
                <Demo title="PageHeader">
                  <PageHeader
                    title="Stone Master"
                    description="Manage stone inventory and specifications."
                    action={
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stone
                      </Button>
                    }
                  />
                </Demo>

                <Demo title="SearchToolbar">
                  <SearchToolbar
                    value={search}
                    onChange={setSearch}
                    onAdd={() => toast.info("Add action clicked")}
                    addLabel="Add stone"
                    placeholder="Search stone..."
                  />
                </Demo>

                <Demo title="StatCard">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Stones" value="1,248" />
                    <StatCard title="Available" value="986" />
                    <StatCard title="Sold" value="174" />
                    <StatCard title="Low Stock" value="88" />
                  </div>
                </Demo>

                <Demo
                  title="Master Page Pattern"
                  description="Example of how the common components fit together on a real CRUD screen."
                >
                  <Card className="border bg-background shadow-none">
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="">Category Master</CardTitle>
                        <CardDescription>
                          Standard CRUD layout for master collections.
                        </CardDescription>
                      </div>

                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <SearchToolbar
                          value=""
                          onChange={() => {}}
                          placeholder="Search category..."
                          className="w-full sm:max-w-sm"
                        />

                        <div className="flex gap-2">
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>

                          <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Import
                          </Button>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {[
                              "Diamond",
                              "Gold Jewellery",
                              "Silver Jewellery",
                            ].map((name) => (
                              <TableRow key={name}>
                                <TableCell className="font-medium">
                                  {name}
                                </TableCell>

                                <TableCell>
                                  <Badge>Active</Badge>
                                </TableCell>

                                <TableCell>
                                  <div className="flex justify-end gap-1">
                                    <IconButton
                                      icon={<Edit className="h-4 w-4" />}
                                      tooltip="Edit"
                                      onClick={() =>
                                        NotificationToast.info(`Edit ${name}`)
                                      }
                                    />

                                    <IconButton
                                      icon={<Trash2 className="h-4 w-4" />}
                                      tooltip="Delete"
                                      onClick={() => setDeleteOpen(true)}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </Demo>
              </div>
            </section>

            <footer className="border-t pt-8 text-sm text-muted-foreground">
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <span>Internal UI Component Library</span>
                <span>React + Vite + shadcn/ui + Radix</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

/* Small local icon component so the showcase does not require another dependency. */
const LockIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default ComponentPage;
