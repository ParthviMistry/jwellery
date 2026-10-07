import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const countriesUrl = "/Country";

export const getCountries = async () => {
  try {
    const response = await apiClient.get(`${countriesUrl}/GetAllCountries`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return checkApiResponse(error);
  }
};

export const getCountryById = async (id) => {
  try {
    const response = await apiClient.get(
      `${countriesUrl}/GetCountryById/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    return checkApiResponse(error);
  }
};

export const createCountry = async (country) => {
  try {
    const response = await apiClient.post(
      `${countriesUrl}/AddCountry`,
      country,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating country:", error);
    return checkApiResponse(error);
  }
};

export const updateCountry = async (id, country) => {
  try {
    const response = await apiClient.put(
      `${countriesUrl}/UpdateCountry/${id}`,
      country,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating country:", error);
    return checkApiResponse(error);
  }
};

export const deleteCountry = async (id) => {
  try {
    const response = await apiClient.delete(
      `${countriesUrl}/DeleteCountry/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting country:", error);
    return checkApiResponse(error);
  }
};
