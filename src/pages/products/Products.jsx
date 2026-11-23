import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import PageHeader from "@/components/common/PageHeader";
import DeleteDialog from "@/components/common/DeleteDialog";
import { formatCurrency } from "@/lib/utils";
import { deleteProduct, getApiError, getProducts } from "@/services/purchases";
import { toast } from "sonner";

function stockStatus(stock) {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "Active";
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  useEffect(() => {
    getProducts(undefined, true).then(setProducts).catch((requestError) => setError(getApiError(requestError))).finally(() => setLoading(false));
  }, []);
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].sort();
  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.sku} ${product.category || ""} ${product.subcategory || ""} ${product.productType || ""} ${product.productStyle || ""} ${product.brand || ""}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesStatus = status === "all" || (status === "active" ? product.isActive : !product.isActive);
    return matchesQuery && matchesCategory && matchesStatus;
  }), [products, query, category, status]);

  async function handleDelete() {
    if (!productToDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteProduct(productToDelete.id);
      setProducts((current) => current.map((product) =>
        product.id === productToDelete.id ? { ...product, isActive: false } : product,
      ));
      setProductToDelete(null);
      toast.success("Product deactivated.");
    } catch (requestError) {
      setDeleteError(getApiError(requestError));
    } finally {
      setDeleting(false);
    }
  }

  return <div className="space-y-4">
    <PageHeader title="Products" subtitle="Manage your catalog and product details." />
    <Card><CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1"><Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search products" placeholder="Search name, SKU, category, type, style, brand" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8" /></div>
      <Select value={category} onValueChange={setCategory}><SelectTrigger aria-label="Filter by category" className="sm:w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
      <Select value={status} onValueChange={setStatus}><SelectTrigger aria-label="Filter by product status" className="sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select>
      <Button variant="gold" asChild><Link to="/products/new"><Plus className="mr-2 h-4 w-4" />Add product</Link></Button>
    </CardContent></Card>
    <Card><CardContent className="p-0">
      {error && <p role="alert" className="p-4 text-sm text-destructive">{error}</p>}
      <Table><TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Category</TableHead><TableHead>Subcategory</TableHead><TableHead>Type</TableHead><TableHead>Style</TableHead><TableHead>Brand</TableHead><TableHead>Price</TableHead><TableHead>Weight</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>
        {loading ? <TableRow><TableCell colSpan={11} className="py-10 text-center text-muted-foreground">Loading products…</TableCell></TableRow>
          : filtered.map((product) => <TableRow key={product.id}><TableCell><Link to={`/products/${product.id}`} className="font-medium hover:underline">{product.name}</Link><div className="font-mono text-xs text-muted-foreground">{product.sku}</div></TableCell><TableCell>{product.category || "—"}</TableCell><TableCell>{product.subcategory || "—"}</TableCell><TableCell>{product.productType || "—"}</TableCell><TableCell>{product.productStyle || "—"}</TableCell><TableCell>{product.brand || "—"}</TableCell><TableCell>{formatCurrency(product.price ?? product.unitPrice)}</TableCell><TableCell>{product.weight ? `${product.weight} g` : "—"}</TableCell><TableCell><Badge variant={product.stockQuantity <= 0 ? "destructive" : product.stockQuantity <= 5 ? "warning" : "secondary"}>{product.stockQuantity} · {stockStatus(product.stockQuantity)}</Badge></TableCell><TableCell><Badge variant={product.isActive ? "success" : "secondary"}>{product.isActive ? "Active" : "Inactive"}</Badge></TableCell><TableCell><Button variant="ghost" size="icon" aria-label={`Edit ${product.name}`} asChild><Link to={`/products/${product.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button><Button variant="ghost" size="icon" aria-label={`Delete ${product.name}`} onClick={() => { setProductToDelete(product); setDeleteError(""); }} disabled={!product.isActive}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>)}
        {!loading && filtered.length === 0 && <TableRow><TableCell colSpan={11} className="py-10 text-center text-muted-foreground">No products match the current filters.</TableCell></TableRow>}
      </TableBody></Table>
    </CardContent></Card>
    <DeleteDialog
      open={Boolean(productToDelete)}
      onOpenChange={(open) => {
        if (!deleting && !open) {
          setProductToDelete(null);
          setDeleteError("");
        }
      }}
      onConfirm={handleDelete}
      itemName="product"
      description="This product will be deactivated. Existing purchase and inventory history will be preserved."
      confirmDisabled={deleting}
      error={deleteError}
    />
  </div>;
}
