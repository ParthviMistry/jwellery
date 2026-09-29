import { products as initialProducts, categories } from "@/data/mockData";

export function getProducts() {
  return initialProducts;
}

export function getProductCategories() {
  return categories;
}

export function getProductById(id) {
  return initialProducts.find((product) => product.id === id);
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
    const matchesStatus = status === "all" || product.status === status;
    return matchesCategory && matchesStatus;
  });
}
