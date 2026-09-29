import { useMemo, useState } from "react";
import { getProducts, searchProducts, filterProducts } from "@/services/products";

export function useProducts() {
  const [products, setProducts] = useState(getProducts());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredProducts = useMemo(() => {
    const searchable = searchProducts(products, query);
    return filterProducts(searchable, { category, status });
  }, [products, query, category, status]);

  function handleDelete(id) {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  }

  return {
    products,
    filteredProducts,
    query,
    category,
    status,
    setQuery,
    setCategory,
    setStatus,
    handleDelete,
  };
}
