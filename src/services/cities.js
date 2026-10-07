import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const citiesUrl = "/City";

export const getCities = async () => {
  try {
    const response = await apiClient.get(`${citiesUrl}/GetAllCities`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return checkApiResponse(error);
  }
};

export const getCitiesByStateId = async (stateId) => {
  try {
    const response = await apiClient.get(
      `${citiesUrl}/GetCitiesByStateId/${stateId}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching cities by state ID:", error);
    return checkApiResponse(error);
  }
};

export const getCityById = async (id) => {
  try {
    const response = await apiClient.get(`${citiesUrl}/GetCityById/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching city by ID:", error);
    return checkApiResponse(error);
  }
};

export const createCity = async (city) => {
  try {
    const response = await apiClient.post(`${citiesUrl}/AddCity`, city);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating city:", error);
    return checkApiResponse(error);
  }
};

export const updateCity = async (id, city) => {
  try {
    const response = await apiClient.put(`${citiesUrl}/UpdateCity/${id}`, city);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating city:", error);
    return checkApiResponse(error);
  }
};

export const deleteCity = async (id) => {
  try {
    const response = await apiClient.delete(`${citiesUrl}/DeleteCity/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting city:", error);
    return checkApiResponse(error);
  }
};
