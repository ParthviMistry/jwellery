import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import DeleteDialog from "@/components/common/DeleteDialog";
import PageHeader from "@/components/common/PageHeader";
import { deleteCatalogItem, getCatalogItems, saveCatalogItem } from "@/services/catalog";
import { getApiError } from "@/services/purchases";

const emptyForm = { name: "", description: "", image: "", logo: "", website: "", categoryId: "", isActive: true };

export default function CatalogMasterPage({ resource, title, subtitle, fields = [] }) {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  async function loadRecords() {
    setError("");
    try {
      const [items, categoryItems] = await Promise.all([
        getCatalogItems(resource),
        resource === "subcategories" ? getCatalogItems("categories") : Promise.resolve([]),
      ]);
      setRecords(items);
      setCategories(categoryItems);
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, [resource]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return records;
    return records.filter((record) =>
      [record.name, record.description, record.categoryName, record.website]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [records, search]);
  const visibleFields = fields.filter((field) => field.list !== false);

  function openCreate() {
    setSelected(null);
    setForm({ ...emptyForm, categoryId: categories[0] ? String(categories[0].id) : "" });
    setError("");
    setDialogOpen(true);
  }

  function openEdit(record) {
    setSelected(record);
    setForm({
      ...emptyForm,
      ...record,
      image: record.image || "",
      logo: record.logo || "",
      website: record.website || "",
      categoryId: record.categoryId ? String(record.categoryId) : "",
      isActive: record.isActive ?? true,
    });
    setError("");
    setDialogOpen(true);
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        image: form.image.trim() || null,
        logo: form.logo.trim() || null,
        website: form.website.trim() || null,
        categoryId: resource === "subcategories" ? Number(form.categoryId) : null,
        isActive: Boolean(form.isActive),
      };
      const saved = await saveCatalogItem(resource, payload, selected?.id);
      setRecords((current) => selected
        ? current.map((item) => item.id === saved.id ? saved : item)
        : [saved, ...current]);
      setDialogOpen(false);
      toast.success(`${title} ${selected ? "updated" : "created"}.`);
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteCatalogItem(resource, toDelete.id);
      setRecords((current) => current.filter((item) => item.id !== toDelete.id));
      setToDelete(null);
      toast.success(`${title} deleted.`);
    } catch (requestError) {
      setDeleteError(getApiError(requestError));
    } finally {
      setDeleting(false);
    }
  }

  function renderField(field) {
    if (field.key === "categoryId") {
      return (
        <Select value={form.categoryId} onValueChange={(value) => setForm((current) => ({ ...current, categoryId: value }))}>
          <SelectTrigger><SelectValue placeholder="Choose a category" /></SelectTrigger>
          <SelectContent>
            {categories.filter((item) => item.isActive).map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (field.key === "description") {
      return <Textarea id={field.key} maxLength={1000} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />;
    }
    return <Input id={field.key} type={field.type || "text"} maxLength={field.maxLength} required={field.required} value={form[field.key] || ""} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} />;
  }

  return (
    <div className="space-y-4">
      <PageHeader title={title} subtitle={subtitle} />
      <Card><CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()}`} value={search} onChange={(event) => setSearch(event.target.value)} className="pl-8" />
        </div>
        <Button variant="gold" onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add {title}</Button>
      </CardContent></Card>
      <Card><CardContent className="p-0">
        {error && <p role="alert" className="p-4 text-sm text-destructive">{error}</p>}
        <Table>
          <TableHeader><TableRow>
            {visibleFields.map((field) => <TableHead key={field.key}>{field.label}</TableHead>)}
            <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={visibleFields.length + 2} className="py-10 text-center text-muted-foreground">Loading {title.toLowerCase()}…</TableCell></TableRow>
              : filtered.map((record) => <TableRow key={record.id}>
                {visibleFields.map((field) => <TableCell key={field.key}>{["image", "logo"].includes(field.key) ? ((record[field.key] || record.image) ? <a href={record[field.key] || record.image} target="_blank" rel="noreferrer" className="text-gold-deep underline">View image</a> : "—") : record[field.key] || "—"}</TableCell>)}
                <TableCell><Badge variant={record.isActive ? "success" : "secondary"}>{record.isActive ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" aria-label={`Edit ${record.name}`} onClick={() => openEdit(record)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${record.name}`} onClick={() => { setToDelete(record); setDeleteError(""); }}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>)}
            {!loading && filtered.length === 0 && <TableRow><TableCell colSpan={visibleFields.length + 2} className="py-10 text-center text-muted-foreground">No {title.toLowerCase()} found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Dialog open={dialogOpen} onOpenChange={(open) => !saving && setDialogOpen(open)}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{selected ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
              <DialogDescription>Enter the catalog details and status.</DialogDescription>
            </DialogHeader>
            {error && <p role="alert" className="my-3 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              {fields.filter((field) => field.form !== false).map((field) => (
                <div key={field.key} className={field.fullWidth ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}>
                  <Label htmlFor={field.key}>{field.label}{field.required && " *"}</Label>
                  {renderField(field)}
                </div>
              ))}
              <div className="flex items-center justify-between rounded-md border p-3 sm:col-span-2">
                <div><p className="text-sm font-medium">Active</p><p className="text-xs text-muted-foreground">Inactive items cannot be selected for new products.</p></div>
                <Switch checked={Boolean(form.isActive)} onCheckedChange={(checked) => setForm((current) => ({ ...current, isActive: checked }))} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
              <Button type="submit" variant="gold" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!deleting && !open) { setToDelete(null); setDeleteError(""); } }} onConfirm={handleDelete} itemName={title.toLowerCase()} description="This item will be deactivated. Items linked to products cannot be deleted." confirmDisabled={deleting} error={deleteError} />
    </div>
  );
}
