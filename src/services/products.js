import {
  deleteProduct as deleteProductRequest,
  getProduct as getProductRequest,
  getProducts as getProductsRequest,
} from "@/services/purchases";

export async function getProducts() {
  return getProductsRequest();
}

export async function getProductCategories() {
  const products = await getProductsRequest();
  return [...new Set(products.map((product) => product.category).filter(Boolean))];
}

export function getProductById(id) {
  return getProductRequest(id);
}

export function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return products;

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.sku.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterProducts(products, { category = "all", status = "all" } = {}) {
  return products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const stockStatus = product.stockQuantity <= 0
      ? "Out of Stock"
      : product.stockQuantity <= 5
        ? "Low Stock"
        : "Active";
    const matchesStatus = status === "all" || stockStatus === status;
    return matchesCategory && matchesStatus;
  });
}

export async function deleteProduct(id) {
  return deleteProductRequest(id);
}
