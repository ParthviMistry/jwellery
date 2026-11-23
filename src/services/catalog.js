import apiClient from "@/services";
import { getApiError } from "@/services/purchases";

function unwrap(response) {
  const body = response.data;
  if (body?.success === false) throw new Error(body.message || "Request failed.");
  return body?.data ?? body;
}

export async function getCatalogItems(resource, params = {}) {
  try {
    return unwrap(await apiClient.get(`/Catalog/${resource}`, { params }));
  } catch (error) {
    throw new Error(getApiError(error));
  }
}

export async function getCatalogItem(resource, id) {
  try {
    return unwrap(await apiClient.get(`/Catalog/${resource}/${id}`));
  } catch (error) {
    throw new Error(getApiError(error));
  }
}

export async function saveCatalogItem(resource, payload, id) {
  try {
    const response = id
      ? await apiClient.put(`/Catalog/${resource}/${id}`, payload)
      : await apiClient.post(`/Catalog/${resource}`, payload);
    return unwrap(response);
  } catch (error) {
    throw new Error(getApiError(error));
  }
}

export async function deleteCatalogItem(resource, id) {
  try {
    await apiClient.delete(`/Catalog/${resource}/${id}`);
  } catch (error) {
    throw new Error(getApiError(error));
  }
}
