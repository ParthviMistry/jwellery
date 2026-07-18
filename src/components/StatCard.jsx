import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, delta, deltaLabel = "vs last month", icon: Icon, positive = true }) {
  return (
    <Card className="facet-corner overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
              <Icon className="h-4 w-4 text-ink" />
            </div>
          )}
        </div>
        <p className="mt-2 font-display text-2xl font-semibold tabular-nums sm:text-[28px]">{value}</p>
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
