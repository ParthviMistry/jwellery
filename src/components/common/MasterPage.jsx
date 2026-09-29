import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, CirclePlus, PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/common/PageHeader";
import SearchToolbar from "@/components/common/SearchToolbar";
import DeleteDialog from "@/components/common/DeleteDialog";
import StatusBadge from "@/components/common/StatusBadge";
import DataTable from "@/components/common/DataTable";

export default function MasterPage({
  title,
  subtitle,
  resourceLabel = "record",
  initialData = [],
  columns = [],
  formFields = [],
  pageSize = 8,
}) {
  const [records, setRecords] = useState(initialData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formState, setFormState] = useState(() => ({ isActive: true }));

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return records;

    return records.filter((item) =>
      Object.values(item).some((value) =>
        `${value}`.toLowerCase().includes(query),
      ),
    );
  }, [records, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function resetForm() {
    setFormState({ isActive: true });
    setSelectedItem(null);
  }

  function openCreateDialog() {
    resetForm();
    setDialogOpen(true);
  }

  function openEditDialog(item) {
    setSelectedItem(item);
    setFormState({ ...item, isActive: item.isActive ?? true });
    setDialogOpen(true);
  }

  function openDeleteDialog(item) {
    setSelectedItem(item);
    setDeleteOpen(true);
  }

  function handleFieldChange(key, value) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    const emptyRequired = formFields.some(
      (field) =>
        field.required &&
        (!formState[field.key] || String(formState[field.key]).trim() === ""),
    );

    if (emptyRequired) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedItem) {
      setRecords((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...formState, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
    } else {
      const nextId = `ID-${String(Date.now()).slice(-6)}`;
      setRecords((prev) => [
        {
          ...formState,
          id: nextId,
          createdAt: new Date().toISOString(),
          isActive: formState.isActive ?? true,
        },
        ...prev,
      ]);
    }

    setDialogOpen(false);
    resetForm();
  }

  function handleDelete() {
    if (!selectedItem) return;
    setRecords((prev) => prev.filter((item) => item.id !== selectedItem.id));
    setDeleteOpen(false);
    setSelectedItem(null);
  }

  function handleStatusToggle(id) {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  }

  const tableColumns = [
    ...columns,
    {
      key: "isActive",
      title: "Status",
      render: (row) => <StatusBadge isActive={row.isActive ?? true} />,
    },
    {
      key: "createdAt",
      title: "Created Date",
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-IN")
            : "—"}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <PageHeader title={title} subtitle={subtitle} />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        onAdd={openCreateDialog}
        addLabel={`Add ${resourceLabel}`}
      />

      <div className="rounded-xl border border-border bg-card">
        <DataTable
          rows={paginated}
          columns={tableColumns}
          page={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={(nextPage) => setPage(nextPage)}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          onView={(item) => openEditDialog(item)}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? `Edit ${resourceLabel}` : `Add ${resourceLabel}`}
            </DialogTitle>
            <DialogDescription>
              Fill in the required values and save the changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2 md:grid-cols-2">
            {formFields.map((field) => (
              <div
                key={field.key}
                className={field.fullWidth ? "md:col-span-2" : ""}
              >
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <Textarea
                    value={formState[field.key] ?? ""}
                    onChange={(event) =>
                      handleFieldChange(field.key, event.target.value)
                    }
                    placeholder={field.placeholder}
                    className="min-h-[110px]"
                  />
                ) : (
                  <Input
                    type={field.type || "text"}
                    value={formState[field.key] ?? ""}
                    onChange={(event) =>
                      handleFieldChange(field.key, event.target.value)
                    }
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="md:col-span-2 flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-xs text-muted-foreground">
                  Enable or disable this record.
                </p>
              </div>
              <Switch
                checked={Boolean(formState.isActive ?? true)}
                onCheckedChange={(checked) =>
                  handleFieldChange("isActive", checked)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <PencilLine className="h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        itemName={resourceLabel}
      />
    </div>
  );
}
