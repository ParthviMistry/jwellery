import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const adminUsersUrl = "/AdminUser";

export const getAdminUsers = async () => {
  try {
    const response = await apiClient.get(`${adminUsersUrl}/GetAllAdminUsers`);
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return checkApiResponse(error.data);
  }
};

export const getAdminUserById = async (id) => {
  try {
    const response = await apiClient.get(
      `${adminUsersUrl}/GetAdminUserById/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching admin user by ID:", error);
    return checkApiResponse(error.data);
  }
};

export const createAdminUser = async (adminUser) => {
  try {
    const response = await apiClient.post(
      `${adminUsersUrl}/AddAdminUser`,
      adminUser,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating admin user:", error);
    return checkApiResponse(error.data);
  }
};

export const updateAdminUser = async (id, adminUser) => {
  try {
    const response = await apiClient.put(
      `${adminUsersUrl}/UpdateAdminUser/${id}`,
      adminUser,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating admin user:", error);
    return checkApiResponse(error.data);
  }
};

export const deleteAdminUser = async (id) => {
  try {
    const response = await apiClient.delete(
      `${adminUsersUrl}/DeleteAdminUser/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting admin user:", error);
    return checkApiResponse(error.data);
  }
};
