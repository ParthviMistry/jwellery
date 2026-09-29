import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { label: "Gross Sales", value: "₹ 18.4L", change: "+12.4%" },
  { label: "Net Profit", value: "₹ 6.9L", change: "+8.1%" },
  { label: "Purchase Value", value: "₹ 11.2L", change: "-2.3%" },
  { label: "Return Rate", value: "1.8%", change: "+0.4%" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Business performance snapshot across transactions and inventory.</p>
        </div>
        <Badge variant="outline">Updated today</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-semibold">{metric.value}</p>
                <span className="text-sm font-medium text-emerald-600">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operational Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">Outstanding Invoices</p>
              <p className="mt-2 text-2xl font-semibold">24</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">Inventory Turnover</p>
              <p className="mt-2 text-2xl font-semibold">3.7x</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <p className="mt-2 text-2xl font-semibold">11</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
