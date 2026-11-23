import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { getApiError, getProduct } from "@/services/purchases";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getProduct(id, true)
      .then((result) => active && setProduct(result))
      .catch((requestError) => active && setError(getApiError(requestError)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <p className="p-6 text-sm text-muted-foreground">Loading product…</p>;
  if (error || !product) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        {error || "Product not found."}{" "}
        <Link to="/products" className="text-gold-deep underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="h-40 w-40 shrink-0 rounded-lg object-cover" />}
            <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {product.name}
                </h2>
                <p className="font-mono text-xs text-muted-foreground">
                  {product.sku}
                </p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link to={`/products/${product.id}/edit`}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.category && <Badge variant="secondary">{product.category}</Badge>}
              {product.subcategory && <Badge variant="outline">{product.subcategory}</Badge>}
              {product.productType && <Badge variant="outline">{product.productType}</Badge>}
              <Badge variant={product.isActive ? "secondary" : "destructive"}>
                {product.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <Separator className="my-4" />
            <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">
                  Price
                </dt>
                <dd className="font-medium tabular-nums">
                  {formatCurrency(product.price ?? product.unitPrice)}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Style</dt>
                <dd className="font-medium">{product.productStyle || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Brand</dt>
                <dd className="font-medium">{product.brand || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">
                  Stock
                </dt>
                <dd className="font-medium tabular-nums">
                  {product.stockQuantity} units
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">
                  Material
                </dt>
                <dd className="font-medium">{product.material || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Weight</dt>
                <dd className="font-medium">{product.weight ? `${product.weight} g` : "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Stone / Shape</dt>
                <dd className="font-medium">{[product.stoneName, product.shapeName].filter(Boolean).join(" / ") || "—"}</dd>
              </div>
              {product.description && <div className="col-span-full"><dt className="text-xs uppercase text-muted-foreground">Description</dt><dd className="font-medium">{product.description}</dd></div>}
            </dl>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
