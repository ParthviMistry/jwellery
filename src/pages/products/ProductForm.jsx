import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { products, categories } from "@/data/mockData";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit ? products.find((p) => p.id === id) : null;

  const [form, setForm] = useState({
    name: existing?.name || "",
    category: existing?.category || categories[0],
    material: existing?.material || "",
    sku: existing?.sku || "",
    price: existing?.price || "",
    stock: existing?.stock ?? "",
    description: "",
    active: existing ? existing.status !== "Out of Stock" : true,
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In a real app: POST/PUT to your API here.
    navigate("/products");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </button>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? "Edit product" : "Add a new product"}</CardTitle>
            <CardDescription>Details shown to shoppers on your storefront.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-secondary/50 text-muted-foreground">
                {existing?.image ? (
                  <img src={existing.image} alt="" className="h-full w-full rounded-md object-cover" />
                ) : (
                  <UploadCloud className="h-6 w-6" />
                )}
              </div>
              <div>
                <Button type="button" variant="outline" size="sm">Upload image</Button>
                <p className="mt-1 text-xs text-muted-foreground">PNG or JPG, at least 800×800px.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">Product name</Label>
                <Input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Aurelia Solitaire Ring" />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => update("category", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" required value={form.sku} onChange={(e) => update("sku", e.target.value)} placeholder="RG-AUR-001" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="material">Material</Label>
                <Input id="material" value={form.material} onChange={(e) => update("material", e.target.value)} placeholder="18K Gold, Diamond" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" min="0" required value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="48500" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="stock">Stock quantity</Label>
                <Input id="stock" type="number" min="0" required value={form.stock} onChange={(e) => update("stock", e.target.value)} placeholder="12" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the craftsmanship, stone details, and finish…" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <div>
                <p className="text-sm font-medium">Visible on storefront</p>
                <p className="text-xs text-muted-foreground">Turn off to hide this product from shoppers.</p>
              </div>
              <Switch checked={form.active} onCheckedChange={(v) => update("active", v)} />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2 border-t border-border pt-5">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="gold">{isEdit ? "Save changes" : "Add product"}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
