import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { orders, statusStyles } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status);

  if (!order) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Order not found.{" "}
        <Link to="/orders" className="text-gold-deep underline">
          Back to orders
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
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">{order.id}</h2>
          <p className="text-sm text-muted-foreground">
            Placed on {formatDate(order.date)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusStyles[order.payment]}>{order.payment}</Badge>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>
                  {item.name}{" "}
                  <span className="text-muted-foreground">× {item.qty}</span>
                </span>
              </div>
              <span className="font-medium tabular-nums">
                {formatCurrency(item.price * item.qty)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(order.total)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4" /> Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to={`/customers/${order.customerId}`}
              className="text-sm font-medium text-gold-deep hover:underline"
            >
              {order.customer}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" /> Shipping address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
