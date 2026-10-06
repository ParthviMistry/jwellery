import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const countriesUrl = "/Country";

export const getCountries = async () => {
  try {
    const response = await apiClient.get(countriesUrl);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return checkApiResponse(error.data);
  }
};

export const createCountry = async (country) => {
  try {
    const response = await apiClient.post(countriesUrl, country);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating country:", error);
    return checkApiResponse(error.data);
  }
};

export const updateCountry = async (id, country) => {
  try {
    const response = await apiClient.put(`${countriesUrl}/${id}`, country);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating country:", error);
    return checkApiResponse(error.data);
  }
};

export const deleteCountry = async (id) => {
  try {
    const response = await apiClient.delete(`${countriesUrl}/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting country:", error);
    return checkApiResponse(error.data);
  }
};
