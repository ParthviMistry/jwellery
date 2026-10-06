import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const statesUrl = "/State";

export const getStates = async () => {
  try {
    const response = await apiClient.get(`${statesUrl}/GetAllStates`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching states:", error);
    return checkApiResponse(error.data);
  }
};

export const getStateById = async (id) => {
  try {
    const response = await apiClient.get(`${statesUrl}/GetStateById/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching state by ID:", error);
    return checkApiResponse(error.data);
  }
};

export const createState = async (state) => {
  try {
    const response = await apiClient.post(`${statesUrl}/AddState`, state);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating state:", error);
    return checkApiResponse(error.data);
  }
};

export const updateState = async (id, state) => {
  try {
    const response = await apiClient.put(
      `${statesUrl}/UpdateState/${id}`,
      state,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating state:", error);
    return checkApiResponse(error.data);
  }
};

export const deleteState = async (id) => {
  try {
    const response = await apiClient.delete(`${statesUrl}/DeleteState/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting state:", error);
    return checkApiResponse(error.data);
  }
};
