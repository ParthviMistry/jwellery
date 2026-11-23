import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCatalogItems } from "@/services/catalog";
import { getShapes } from "@/services/shapes";
import { getStones } from "@/services/stones";
import { getApiError, getProduct, saveProduct } from "@/services/purchases";

const initialForm = {
  name: "",
  sku: "",
  categoryId: "",
  subcategoryId: "",
  productTypeId: "",
  productStyleId: "",
  brandId: "",
  stoneId: "",
  shapeId: "",
  description: "",
  unitPrice: "",
  weight: "",
  images: "",
  isActive: true,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [masters, setMasters] = useState({ categories: [], subcategories: [], types: [], styles: [], brands: [], stones: [], shapes: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getCatalogItems("categories"),
      getCatalogItems("subcategories"),
      getCatalogItems("product-types"),
      getCatalogItems("styles"),
      getCatalogItems("brands"),
      getStones(),
      getShapes(),
      id ? getProduct(id, true) : Promise.resolve(null),
    ]).then(([categories, subcategories, types, styles, brands, stones, shapes, product]) => {
      if (!active) return;
      setMasters({ categories, subcategories, types, styles, brands, stones, shapes });
      if (product) setForm({
        ...initialForm,
        name: product.name || "",
        sku: product.sku || "",
        categoryId: product.categoryId ? String(product.categoryId) : "",
        subcategoryId: product.subcategoryId ? String(product.subcategoryId) : "",
        productTypeId: product.productTypeId ? String(product.productTypeId) : "",
        productStyleId: product.productStyleId ? String(product.productStyleId) : "",
        brandId: product.brandId ? String(product.brandId) : "",
        stoneId: product.stoneId ? String(product.stoneId) : "",
        shapeId: product.shapeId ? String(product.shapeId) : "",
        description: product.description || "",
        unitPrice: String(product.price ?? product.unitPrice ?? ""),
        weight: String(product.weight ?? ""),
        images: (product.images || []).join("\n"),
        isActive: product.isActive ?? true,
      });
    }).catch((requestError) => {
      if (active) setLoadError(getApiError(requestError));
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); }

  const availableSubcategories = masters.subcategories.filter((item) =>
    item.isActive && String(item.categoryId) === form.categoryId,
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.categoryId || !form.productTypeId) {
      setError("Choose a category and product type before saving.");
      return;
    }
    setSaving(true);
    try {
      await saveProduct({
        name: form.name.trim(),
        sku: form.sku.trim(),
        categoryId: Number(form.categoryId),
        subcategoryId: form.subcategoryId ? Number(form.subcategoryId) : null,
        productTypeId: Number(form.productTypeId),
        productStyleId: form.productStyleId ? Number(form.productStyleId) : null,
        brandId: form.brandId ? Number(form.brandId) : null,
        stoneId: form.stoneId ? Number(form.stoneId) : null,
        shapeId: form.shapeId ? Number(form.shapeId) : null,
        description: form.description.trim() || null,
        price: Number(form.unitPrice),
        weight: Number(form.weight || 0),
        images: form.images.split(/\r?\n/).map((image) => image.trim()).filter(Boolean),
        isActive: form.isActive,
      }, id);
      toast.success(id ? "Product updated." : "Product created. Initial stock is zero.");
      navigate("/products");
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally { setSaving(false); }
  }

  if (loading) return <p className="p-6 text-sm text-muted-foreground">Loading product catalog…</p>;
  if (loadError) return <div className="space-y-4"><p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{loadError}</p><Button variant="outline" asChild><Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to products</Link></Button></div>;
  return <div className="space-y-4">
    <Button variant="ghost" asChild><Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to products</Link></Button>
    <form onSubmit={handleSubmit}>
      <Card><CardHeader><CardTitle>{id ? "Edit product" : "Add a product"}</CardTitle><CardDescription>Choose catalog details for the product. Stock is received through purchases.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="name">Product name *</Label><Input id="name" required maxLength={200} value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="sku">SKU *</Label><Input id="sku" required maxLength={100} value={form.sku} onChange={(e) => update("sku", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Category *</Label><Select required value={form.categoryId} onValueChange={(value) => setForm((current) => ({ ...current, categoryId: value, subcategoryId: "" }))}><SelectTrigger><SelectValue placeholder="Choose a category" /></SelectTrigger><SelectContent>{masters.categories.filter((item) => item.isActive).map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Subcategory</Label><Select value={form.subcategoryId || "none"} onValueChange={(value) => update("subcategoryId", value === "none" ? "" : value)} disabled={!form.categoryId}><SelectTrigger><SelectValue placeholder="Choose a subcategory" /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{availableSubcategories.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Product type *</Label><Select required value={form.productTypeId} onValueChange={(value) => update("productTypeId", value)}><SelectTrigger><SelectValue placeholder="Choose a product type" /></SelectTrigger><SelectContent>{masters.types.filter((item) => item.isActive).map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Product style</Label><Select value={form.productStyleId || "none"} onValueChange={(value) => update("productStyleId", value === "none" ? "" : value)}><SelectTrigger><SelectValue placeholder="Choose a style" /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{masters.styles.filter((item) => item.isActive).map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Brand</Label><Select value={form.brandId || "none"} onValueChange={(value) => update("brandId", value === "none" ? "" : value)}><SelectTrigger><SelectValue placeholder="Choose a brand" /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{masters.brands.filter((item) => item.isActive).map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Stone</Label><Select value={form.stoneId || "none"} onValueChange={(value) => update("stoneId", value === "none" ? "" : value)}><SelectTrigger><SelectValue placeholder="Choose a stone" /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{masters.stones.filter((item) => item.isAvailable).map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.stoneType} · {item.stockId}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Shape</Label><Select value={form.shapeId || "none"} onValueChange={(value) => update("shapeId", value === "none" ? "" : value)}><SelectTrigger><SelectValue placeholder="Choose a shape" /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{masters.shapes.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label htmlFor="price">Price (₹) *</Label><Input id="price" required type="number" min="0" step="0.01" value={form.unitPrice} onChange={(e) => update("unitPrice", e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="weight">Weight (g)</Label><Input id="weight" type="number" min="0" step="0.001" value={form.weight} onChange={(e) => update("weight", e.target.value)} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="description">Description</Label><Textarea id="description" maxLength={4000} value={form.description} onChange={(e) => update("description", e.target.value)} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="images">Product image URLs</Label><Textarea id="images" placeholder="Enter one image URL per line" value={form.images} onChange={(e) => update("images", e.target.value)} /><p className="text-xs text-muted-foreground">Use one URL per line. The first image is used as the product preview.</p></div>
            <div className="flex items-center justify-between rounded-md border p-3 sm:col-span-2"><div><Label htmlFor="active">Product status</Label><p className="text-xs text-muted-foreground">Inactive products are hidden from purchase forms.</p></div><Switch id="active" checked={form.isActive} onCheckedChange={(checked) => update("isActive", checked)} /></div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t border-border pt-5"><Button type="button" variant="outline" asChild><Link to="/products">Cancel</Link></Button><Button type="submit" variant="gold" disabled={saving}>{saving ? "Saving…" : id ? "Save changes" : "Add product"}</Button></CardFooter>
      </Card>
    </form>
  </div>;
}
