import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { customers, orders, statusStyles } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const tierVariant = { Platinum: "gold", Gold: "gold", Silver: "secondary", New: "outline" };

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter((o) => o.customerId === id);

  if (!customer) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Customer not found.{" "}
        <Link to="/customers" className="text-gold-deep underline">Back to customers</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-base">{initials(customer.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-semibold">{customer.name}</h2>
                <Badge variant={tierVariant[customer.tier]}>{customer.tier}</Badge>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-muted-foreground sm:grid-cols-2">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {customer.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {customer.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {customer.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Joined {formatDate(customer.joined)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Lifetime orders</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{customer.orders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Total spent</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{formatCurrency(customer.totalSpent)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order history</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    <Link to={`/orders/${o.id}`} className="hover:underline">{o.id}</Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(o.date)}</TableCell>
                  <TableCell><Badge variant={statusStyles[o.status]}>{o.status}</Badge></TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{formatCurrency(o.total)}</TableCell>
                </TableRow>
              ))}
              {customerOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">No orders yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
