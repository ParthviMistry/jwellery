import React, { useState } from "react";
import { Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { coupons as initialCoupons } from "@/data/mockData";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function Coupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", type: "Percentage", value: "", minOrder: "", expiry: "" });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCreate(e) {
    e.preventDefault();
    setCoupons((prev) => [
      {
        id: `CPN-${String(prev.length + 1).padStart(2, "0")}`,
        code: form.code.toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minOrder: Number(form.minOrder) || 0,
        uses: 0,
        limit: null,
        expiry: form.expiry,
        status: "Active",
      },
      ...prev,
    ]);
    setForm({ code: "", type: "Percentage", value: "", minOrder: "", expiry: "" });
    setOpen(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{coupons.length} coupons</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="gold"><Plus className="h-4 w-4" /> Create coupon</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Create coupon</DialogTitle>
                <DialogDescription>Set up a new discount code for your storefront.</DialogDescription>
              </DialogHeader>
              <div className="space-y-1.5">
                <Label htmlFor="code">Coupon code</Label>
                <Input id="code" required value={form.code} onChange={(e) => update("code", e.target.value)} placeholder="SUMMER20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Discount type</Label>
                  <Select value={form.type} onValueChange={(v) => update("type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Flat">Flat amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="value">{form.type === "Percentage" ? "Percent off" : "Amount off (₹)"}</Label>
                  <Input id="value" type="number" min="0" required value={form.value} onChange={(e) => update("value", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="minOrder">Minimum order (₹)</Label>
                  <Input id="minOrder" type="number" min="0" value={form.minOrder} onChange={(e) => update("minOrder", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input id="expiry" type="date" required value={form.expiry} onChange={(e) => update("expiry", e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="gold">Create coupon</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min. order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <button
                      className="flex items-center gap-1.5 font-mono text-sm font-medium hover:text-gold-deep"
                      onClick={() => navigator.clipboard?.writeText(c.code)}
                      title="Copy code"
                    >
                      {c.code} <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </TableCell>
                  <TableCell className="text-sm">{c.type === "Percentage" ? `${c.value}%` : formatCurrency(c.value)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.minOrder ? formatCurrency(c.minOrder) : "—"}</TableCell>
                  <TableCell className="text-sm tabular-nums">{c.uses}{c.limit ? ` / ${c.limit}` : ""}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(c.expiry)}</TableCell>
                  <TableCell><Badge variant={{ Active: "success", Expired: "destructive", Paused: "secondary" }[c.status]}>{c.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
