import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Check,
  Copy,
  Download,
  Mail,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const uiComponents = [
  { name: "Button", category: "Actions" },
  { name: "Card", category: "Layout" },
  { name: "Input", category: "Form" },
  { name: "Textarea", category: "Form" },
  { name: "Select", category: "Form" },
  { name: "Checkbox", category: "Form" },
  { name: "Switch", category: "Form" },
  { name: "Badge", category: "Status" },
  { name: "Avatar", category: "Identity" },
  { name: "Dialog", category: "Overlay" },
  { name: "Dropdown Menu", category: "Menu" },
  { name: "Tabs", category: "Navigation" },
  { name: "Table", category: "Data" },
  { name: "Separator", category: "Layout" },
];

function SectionHeader({ title, description }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function UIComponentsShowcase() {
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState("diamond");
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Design system
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-foreground">
            UI Components
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{uiComponents.length} components</Badge>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export tokens
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component library overview</CardTitle>
          <CardDescription>
            Reusable UI primitives used across the Regnor admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            {uiComponents.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {item.category}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <SectionHeader
          title="Buttons"
          description="Primary, secondary, outline and icon variants."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon button">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Badges & status"
          description="State indicators for lightweight labels and statuses."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Forms"
          description="Inputs, selects, switches, checkboxes, and text areas."
        />
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue="Parthvi Mistry" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="priya@regnor.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="select-demo">Jewellery category</Label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger id="select-demo">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="emerald">Emerald</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2">
                  <span className="text-sm">Low stock alerts</span>
                  <Switch checked={checked} onCheckedChange={setChecked} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                defaultValue="Luxury product workflow and approval checklist."
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Checkbox checked={checked} onCheckedChange={setChecked} />
                Accept policy
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Checkbox />
                Keep in sync
              </label>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Cards & layout"
          description="Surface blocks used for content containers and metadata."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Catalog</CardTitle>
              <CardDescription>Collections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-2xl font-semibold">1,248</p>
                <p className="text-sm text-muted-foreground">Active SKUs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-2xl font-semibold">₹ 3.8L</p>
                <p className="text-sm text-muted-foreground">Gross sales</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>Priority queue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-2xl font-semibold">18</p>
                <p className="text-sm text-muted-foreground">Open tickets</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Navigation"
          description="Tabs and menu patterns with active state handling."
        />
        <Card>
          <CardContent className="pt-6">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-3 pt-4">
                <div className="rounded-md border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                  Product mix and premium customer trends are stable this week.
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-3 pt-4">
                <div className="rounded-md border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                  Revenue pacing is ahead of target by 12.4% compared with last
                  month.
                </div>
              </TabsContent>
              <TabsContent value="activity" className="space-y-3 pt-4">
                <div className="rounded-md border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                  New diamond procurement approvals and customer returns were
                  processed today.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Avatar & profile"
          description="Identity treatment for team and customer summary cards."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>PM</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sana Mehta</p>
                  <p className="text-xs text-muted-foreground">Sales Manager</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Dialogs, menus, and overlays"
          description="Interactive components that control layered actions."
        />
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update catalogue settings</DialogTitle>
                    <DialogDescription>
                      Adjust the store defaults for your jewellery collection.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Default display currency</Label>
                      <Input defaultValue="INR" />
                    </div>
                    <div className="space-y-2">
                      <Label>Default shipping zone</Label>
                      <Input defaultValue="India" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Open menu <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Messages
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Tables"
          description="Data presentation patterns for records, users, and inventory lists."
        />
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Regnor Signature Emerald Ring</TableCell>
                  <TableCell>Engagement</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>₹ 1,24,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Velvet Gold Necklace</TableCell>
                  <TableCell>Neckwear</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Draft</Badge>
                  </TableCell>
                  <TableCell>₹ 84,900</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Royal Diamond Studs</TableCell>
                  <TableCell>Earrings</TableCell>
                  <TableCell>
                    <Badge variant="outline">Archived</Badge>
                  </TableCell>
                  <TableCell>₹ 96,300</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Dividers & utilities"
          description="Supporting layout and UI structure elements."
        />
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Overview</span>
              <Separator className="flex-1" />
              <span>Design</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Search component</span>
              <Star className="h-4 w-4 text-gold" />
              <span>Premium</span>
              <Copy className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
