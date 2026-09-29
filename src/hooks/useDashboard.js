import { useMemo } from "react";
import { getDashboardMetrics, getRecentOrders } from "@/services/dashboard";

export function useDashboard() {
  return useMemo(() => {
    const metrics = getDashboardMetrics();

    return {
      ...metrics,
      recentOrders: getRecentOrders(5),
    };
  }, []);
}
