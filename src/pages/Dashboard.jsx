import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { IndianRupee, ShoppingBag, Users, PackageX, ArrowRight } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { orders, revenueTrend, categorySales, inventoryAlerts, statusStyles } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const PIE_COLORS = ["#8a6a34", "#b08d57", "#d1b98a", "#e7dcc4", "#efe9dc"];

export default function Dashboard() {
  const totalRevenue = revenueTrend.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = revenueTrend.reduce((sum, m) => sum + m.orders, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (6mo)" value={formatCurrency(totalRevenue)} delta="+13.8%" icon={IndianRupee} />
        <StatCard label="Orders (6mo)" value={totalOrders} delta="+9.2%" icon={ShoppingBag} />
        <StatCard label="Active Customers" value="1,248" delta="+4.6%" icon={Users} />
        <StatCard label="Low / Out of Stock" value={inventoryAlerts.length} delta="Needs attention" positive={false} icon={PackageX} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Revenue trend</CardTitle>
              <CardDescription>Monthly revenue across all channels</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pl-0 pr-4">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueTrend} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(38 42% 55%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(38 42% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(30 12% 91%)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} stroke="hsl(30 6% 55%)" />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  stroke="hsl(30 6% 55%)"
                  tickFormatter={(v) => `₹${v / 1000}k`}
                  width={48}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(30 12% 88%)", fontSize: 13 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(36 55% 34%)" strokeWidth={2} fill="url(#goldFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
            <CardDescription>Share of units sold, last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categorySales} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={2}>
                  {categorySales.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {categorySales.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="ml-auto font-medium tabular-nums">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>Latest activity across your storefront</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/orders">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs font-medium">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(o.date)}</TableCell>
                    <TableCell>
                      <Badge variant={statusStyles[o.status]}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(o.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock alerts</CardTitle>
            <CardDescription>Items running low or unavailable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inventoryAlerts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku}</p>
                </div>
                <Badge variant={statusStyles[p.status]}>{p.stock} left</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/inventory">Manage inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
