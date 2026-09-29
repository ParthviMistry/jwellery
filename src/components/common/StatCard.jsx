import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, delta, deltaLabel = "vs last month", icon: Icon, positive = true }) {
  return (
    <Card className="overflow-hidden border border-border/80 bg-card shadow-[0_10px_24px_rgba(14,31,54,0.04)]">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          {Icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-foreground tabular-nums sm:text-[28px]">{value}</p>
        {delta !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                positive ? "text-success" : "text-destructive"
              )}
            >
              {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {delta}
            </span>
            <span className="text-muted-foreground">{deltaLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
