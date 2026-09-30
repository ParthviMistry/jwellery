import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Mail,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { admins } from "@/data/mockData";
import {
  clientOnboardingChecklist,
  getClientOnboardingStatus,
} from "@/config/clientOnboarding";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Settings() {
  const [notifications, setNotifications] = useState({
    orders: true,
    lowStock: true,
    marketing: false,
    weeklyDigest: true,
  });
  const onboarding = getClientOnboardingStatus("default");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Client onboarding
              </CardTitle>
              <CardDescription>
                {onboarding.complete}/{onboarding.total} steps complete
              </CardDescription>
            </div>
            <Badge variant="secondary">White-label setup</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {clientOnboardingChecklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              {item.complete ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <span className="rounded-full bg-muted px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  pending
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="team">Admin users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-base">PD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change photo
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullname">Full name</Label>
                  <Input id="fullname" defaultValue="Parthvi Mistry" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Super Admin" disabled />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="parthvi@gmail.com"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t border-border pt-5">
              <Button variant="gold">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store details</CardTitle>
              <CardDescription>
                Shown to shoppers at checkout and in emails.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="storename">Store name</Label>
                  <Input id="storename" defaultValue="Regnor Jewellery" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="INR (₹)" disabled />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="support">Support email</Label>
                  <Input
                    id="support"
                    type="email"
                    defaultValue="support@gmail.com"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="address">Business address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    defaultValue="Level 4, Diamond Bourse, Surat, Gujarat 395007, India"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t border-border pt-5">
              <Button variant="gold">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Admin users</CardTitle>
                <CardDescription>
                  People with access to this dashboard.
                </CardDescription>
              </div>
              <Button size="sm" variant="gold">
                <Plus className="h-4 w-4" /> Invite
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{initials(a.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{a.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {a.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{a.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            a.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Resend invite
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Remove access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                {
                  key: "orders",
                  label: "New orders",
                  desc: "Get notified the moment a new order comes in.",
                },
                {
                  key: "lowStock",
                  label: "Low stock alerts",
                  desc: "When a product drops to 5 units or fewer.",
                },
                {
                  key: "marketing",
                  label: "Marketing performance",
                  desc: "Weekly summary of coupon and campaign usage.",
                },
                {
                  key: "weeklyDigest",
                  label: "Weekly digest",
                  desc: "A Monday morning summary of store performance.",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border-b border-border py-3.5 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(v) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: v }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
