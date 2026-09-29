import { orders, revenueTrend, categorySales, inventoryAlerts } from "@/data/mockData";

export function getDashboardMetrics() {
  const totalRevenue = revenueTrend.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = revenueTrend.reduce((sum, month) => sum + month.orders, 0);

  return {
    totalRevenue,
    totalOrders,
    activeCustomers: 1248,
    inventoryAlertsCount: inventoryAlerts.length,
    revenueTrend,
    categorySales,
    inventoryAlerts,
  };
}

export function getRecentOrders(limit = 5) {
  return [...orders].slice(0, limit);
}

export function getCategorySales() {
  return categorySales;
}

export function getInventoryAlerts() {
  return inventoryAlerts;
}
