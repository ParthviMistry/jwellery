import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonDialog from "@/components/common/CommonDialog";
import DataTable from "@/components/common/DataTable";
import DeleteDialog from "@/components/common/DeleteDialog";
import PageHeader from "@/components/common/PageHeader";
import SearchToolbar from "@/components/common/SearchToolbar";
import { useLoader } from "@/hooks/use-loader";
import { useToast } from "@/hooks/use-toast";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "@/services/adminUsers";
import { adminUserColumns } from "@/utils/constant";

const pageSize = 8;
const userTypes = ["Admin", "Supplier", "OrderManagement"];

const AdminUserPage = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [selectedAdminUser, setSelectedAdminUser] = useState(null);
  const nameInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { showToasts } = useToast();

  const handleError = (error) => {
    showToasts("error", error?.message || "Something went wrong.", 5000, true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      userType: "",
      phoneNo: "",
      address: "",
      isActive: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Name is required.";
      } else if (values.name.trim().length > 200) {
        errors.name = "Name cannot exceed 200 characters.";
      }

      if (!values.email.trim()) {
        errors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = "Enter a valid email address.";
      } else if (values.email.trim().length > 256) {
        errors.email = "Email cannot exceed 256 characters.";
      }

      if (!selectedAdminUser && !values.password) {
        errors.password = "Password is required.";
      } else if (values.password && values.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }

      if (!userTypes.includes(values.userType)) {
        errors.userType = "Please select a user type.";
      }
      if (values.phoneNo.length > 50) {
        errors.phoneNo = "Phone number cannot exceed 50 characters.";
      }
      if (values.address.length > 500) {
        errors.address = "Address cannot exceed 500 characters.";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const isEditing = Boolean(selectedAdminUser);
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        userType: values.userType,
        phoneNo: values.phoneNo.trim() || null,
        address: values.address.trim() || null,
        isActive: values.isActive,
        ...(!isEditing ? { password: values.password } : {}),
        ...(isEditing && values.password ? { password: values.password } : {}),
      };

      setSaving(true);
      showLoader(
        isEditing ? "Updating admin user" : "Creating admin user",
        "Please wait while the admin user is saved.",
        null,
        { scope: "dialog", blocking: true },
      );
      try {
        const adminUser = selectedAdminUser
          ? await updateAdminUser(selectedAdminUser.id, payload)
          : await createAdminUser(payload);

        setAdminUsers((previous) =>
          selectedAdminUser
            ? previous.map((user) =>
                user.id === adminUser.id ? adminUser : user,
              )
            : [adminUser, ...previous],
        );
        setActiveDialog(null);
        setSelectedAdminUser(null);
        resetForm();
        setPage(1);
        showToasts(
          "success",
          isEditing
            ? "Admin user updated successfully."
            : "Admin user created successfully.",
          3000,
        );
      } catch (saveError) {
        handleError(saveError);
      } finally {
        setSaving(false);
        hideLoader();
      }
    },
  });

  useEffect(() => {
    let active = true;

    const loadAdminUsers = async () => {
      setLoading(true);
      try {
        const result = await getAdminUsers();
        if (active) setAdminUsers(result);
      } catch (error) {
        if (active) handleError(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAdminUsers();
    return () => {
      active = false;
    };
  }, []);

  const filteredAdminUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return adminUsers;

    return adminUsers.filter((user) =>
      [
        user.id,
        user.name,
        user.email,
        user.userType,
        user.phoneNo,
        user.address,
      ].some((value) => `${value ?? ""}`.toLowerCase().includes(query)),
    );
  }, [adminUsers, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAdminUsers.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleAdminUsers = filteredAdminUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const openCreateDialog = () => {
    setSelectedAdminUser(null);
    formik.resetForm({
      values: {
        name: "",
        email: "",
        password: "",
        userType: "",
        phoneNo: "",
        address: "",
        isActive: true,
      },
    });
    setActiveDialog("form");
  };

  const openEditDialog = (adminUser) => {
    setSelectedAdminUser(adminUser);
    formik.resetForm({
      values: {
        name: adminUser.name ?? "",
        email: adminUser.email ?? "",
        password: "",
        userType: adminUser.userType ?? "",
        phoneNo: adminUser.phoneNo ?? "",
        address: adminUser.address ?? "",
        isActive: Boolean(adminUser.isActive),
      },
    });
    setActiveDialog("form");
  };

  const handleDelete = async () => {
    if (!selectedAdminUser) return;

    setDeleting(true);
    showLoader(
      "Deleting admin user",
      "Please wait while the admin user is removed.",
      null,
      { scope: "dialog", blocking: true },
    );
    try {
      await deleteAdminUser(selectedAdminUser.id);
      setAdminUsers((previous) =>
        previous.filter((user) => user.id !== selectedAdminUser.id),
      );
      setActiveDialog(null);
      setSelectedAdminUser(null);
      showToasts("success", "Admin user deleted successfully.", 3000);
    } catch (deleteError) {
      handleError(deleteError);
    } finally {
      setDeleting(false);
      hideLoader();
    }
  };

  return (
    <div className="space-y-3">
      <PageHeader
        title="Admin User"
        subtitle="Manage internal admin personnel and operational roles."
      />

      <SearchToolbar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={openCreateDialog}
        addLabel="Add admin user"
        disabled={loading || saving}
      />

      <DataTable
        rows={visibleAdminUsers}
        columns={adminUserColumns}
        page={currentPage}
        pageSize={pageSize}
        total={filteredAdminUsers.length}
        onPageChange={setPage}
        onEdit={openEditDialog}
        onDelete={(adminUser) => {
          setSelectedAdminUser(adminUser);
          setActiveDialog("delete");
        }}
      />

      <CommonDialog
        openDialog={activeDialog === "form"}
        setOpenDialog={(open) => {
          if (!saving) setActiveDialog(open ? "form" : null);
        }}
        onClose={() => {
          formik.resetForm();
          setSelectedAdminUser(null);
        }}
        disableClose={saving}
        header="Admin user management"
        title={selectedAdminUser ? "Edit admin user" : "Add admin user"}
        subheader="Enter the user details and assign an operational role."
        initialFocusRef={nameInputRef}
        className="max-w-2xl"
        content={
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="admin-user-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="admin-user-name"
                  ref={nameInputRef}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.name && formik.errors.name,
                  )}
                  placeholder="Full name"
                  maxLength={200}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="admin-user-email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email<span className="ml-1 text-destructive">*</span>
                </label>
                <Input
                  id="admin-user-email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.email && formik.errors.email,
                  )}
                  placeholder="name@example.com"
                  maxLength={256}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="admin-user-password"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Password
                  {!selectedAdminUser && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </label>
                <Input
                  id="admin-user-password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.password && formik.errors.password,
                  )}
                  placeholder={
                    selectedAdminUser
                      ? "Leave blank to keep current password"
                      : "At least 6 characters"
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="admin-user-type"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  User Type<span className="ml-1 text-destructive">*</span>
                </label>
                <Select
                  value={formik.values.userType}
                  onValueChange={(value) =>
                    formik.setFieldValue("userType", value)
                  }
                  onOpenChange={(open) => {
                    if (!open) formik.setFieldTouched("userType", true);
                  }}
                  disabled={saving}
                >
                  <SelectTrigger
                    id="admin-user-type"
                    aria-invalid={Boolean(
                      formik.touched.userType && formik.errors.userType,
                    )}
                  >
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((userType) => (
                      <SelectItem key={userType} value={userType}>
                        {userType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.userType && formik.errors.userType && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.userType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="admin-user-phone"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <Input
                  id="admin-user-phone"
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.phoneNo && formik.errors.phoneNo,
                  )}
                  placeholder="+91 99999 99999"
                  maxLength={50}
                />
                {formik.touched.phoneNo && formik.errors.phoneNo && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.phoneNo}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="admin-user-address"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Address
                </label>
                <textarea
                  id="admin-user-address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.address && formik.errors.address,
                  )}
                  placeholder="User address"
                  maxLength={500}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="mt-1 text-sm text-destructive">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-xs text-muted-foreground">
                    Allow this user to access the admin portal.
                  </p>
                </div>
                <Switch
                  checked={formik.values.isActive}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("isActive", checked)
                  }
                  disabled={saving}
                  aria-label="Active status"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => {
                  setActiveDialog(null);
                  formik.resetForm();
                  setSelectedAdminUser(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="gap-2">
                <PencilLine className="h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        }
      />

      <DeleteDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!deleting) setActiveDialog(open ? "delete" : null);
        }}
        onConfirm={handleDelete}
        itemName="admin user"
        description="This admin user will be removed from active records."
        confirmDisabled={deleting}
      />
    </div>
  );
};

export default AdminUserPage;
