import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const mediaUrl = "/Media";

export const getMedia = async () => {
  try {
    const response = await apiClient.get(`${mediaUrl}/GetAllMedia`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching media:", error);
    return checkApiResponse(error);
  }
};

export const getMediaById = async (id) => {
  try {
    const response = await apiClient.get(`${mediaUrl}/GetMediaById/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching media by ID:", error);
    return checkApiResponse(error);
  }
};

export const createMedia = async (media) => {
  try {
    const response = await apiClient.post(`${mediaUrl}/AddMedia`, media);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating media:", error);
    return checkApiResponse(error);
  }
};

export const updateMedia = async (id, media) => {
  try {
    const response = await apiClient.put(
      `${mediaUrl}/UpdateMedia/${id}`,
      media,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating media:", error);
    return checkApiResponse(error);
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await apiClient.delete(`${mediaUrl}/DeleteMedia/${id}`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting media:", error);
    return checkApiResponse(error);
  }
};
