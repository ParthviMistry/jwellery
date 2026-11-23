import { useEffect, useMemo, useState } from "react";
import { deleteProduct, getApiError } from "@/services/purchases";
import { getProducts, searchProducts, filterProducts } from "@/services/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getProducts()
      .then((result) => active && setProducts(result))
      .catch((requestError) => active && setError(getApiError(requestError)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const filteredProducts = useMemo(() => {
    const searchable = searchProducts(products, query);
    return filterProducts(searchable, { category, status });
  }, [products, query, category, status]);

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
    } catch (requestError) {
      setError(getApiError(requestError));
      throw requestError;
    }
  }

  return {
    products,
    loading,
    error,
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
