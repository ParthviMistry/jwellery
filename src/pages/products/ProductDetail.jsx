import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products, statusStyles } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Product not found.{" "}
        <Link to="/products" className="text-gold-deep underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <img src={product.image} alt="" className="h-40 w-40 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-semibold">{product.name}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/products/${product.id}/edit`}><Pencil className="h-3.5 w-3.5" /> Edit</Link>
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant={statusStyles[product.status]}>{product.status}</Badge>
              </div>
              <Separator className="my-4" />
              <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Price</dt>
                  <dd className="font-medium tabular-nums">{formatCurrency(product.price)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Stock</dt>
                  <dd className="font-medium tabular-nums">{product.stock} units</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Material</dt>
                  <dd className="font-medium">{product.material}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Added</dt>
                  <dd className="font-medium">{formatDate(product.createdAt)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
