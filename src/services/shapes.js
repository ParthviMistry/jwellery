import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const shapesUrl = "/Shape";

export const getShapes = async () => {
  try {
    const response = await apiClient.get(`${shapesUrl}/GetAllShapes`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching shapes:", error);
    return checkApiResponse(error);
  }
};

export const getShapeById = async (id) => {
  try {
    const response = await apiClient.get(`${shapesUrl}/GetShapeById/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching shape by ID:", error);
    return checkApiResponse(error);
  }
};

export const createShape = async (shape) => {
  try {
    const response = await apiClient.post(`${shapesUrl}/AddShape`, shape);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating shape:", error);
    return checkApiResponse(error);
  }
};

export const updateShape = async (id, shape) => {
  try {
    const response = await apiClient.put(
      `${shapesUrl}/UpdateShape/${id}`,
      shape,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating shape:", error);
    return checkApiResponse(error);
  }
};

export const deleteShape = async (id) => {
  try {
    const response = await apiClient.delete(`${shapesUrl}/DeleteShape/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting shape:", error);
    return checkApiResponse(error);
  }
};
