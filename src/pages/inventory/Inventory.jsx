import React, { useState } from "react";
import { AlertTriangle, PackageCheck, Pencil } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { products as initialProducts, statusStyles } from "@/data/mockData";

function deriveStatus(stock) {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "Active";
}

export default function Inventory() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);
  const [newStock, setNewStock] = useState("");

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  function openEdit(product) {
    setEditing(product);
    setNewStock(String(product.stock));
  }

  function saveStock() {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editing.id
          ? {
              ...p,
              stock: Number(newStock),
              status: deriveStatus(Number(newStock)),
            }
          : p,
      ),
    );
    setEditing(null);
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total SKUs"
          value={products.length}
          icon={PackageCheck}
        />
        <StatCard
          label="Low stock"
          value={lowStock}
          icon={AlertTriangle}
          positive={false}
        />
        <StatCard
          label="Out of stock"
          value={outOfStock}
          icon={AlertTriangle}
          positive={false}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>In stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="h-9 w-9 rounded-md object-cover"
                      />
                      <span className="text-sm font-medium">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-sm font-medium tabular-nums">
                    {p.stock} units
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusStyles[p.status]}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust stock</DialogTitle>
            <DialogDescription>{editing?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="stock">Quantity in stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={saveStock}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
