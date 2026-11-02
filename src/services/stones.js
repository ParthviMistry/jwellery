import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const stonesUrl = "/Stone";

export const getStones = async () => {
  try {
    const response = await apiClient.get(`${stonesUrl}/GetAllStones`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching stones:", error);
    return checkApiResponse(error);
  }
};

export const getStoneById = async (id) => {
  try {
    const response = await apiClient.get(`${stonesUrl}/GetStoneById/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching stone by ID:", error);
    return checkApiResponse(error);
  }
};

export const createStone = async (stone) => {
  try {
    const response = await apiClient.post(`${stonesUrl}/AddStone`, stone);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating stone:", error);
    return checkApiResponse(error);
  }
};

export const updateStone = async (id, stone) => {
  try {
    const response = await apiClient.put(
      `${stonesUrl}/UpdateStone/${id}`,
      stone,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating stone:", error);
    return checkApiResponse(error);
  }
};

export const deleteStone = async (id) => {
  try {
    const response = await apiClient.delete(`${stonesUrl}/DeleteStone/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting stone:", error);
    return checkApiResponse(error);
  }
};
