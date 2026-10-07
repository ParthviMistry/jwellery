import { apiClient } from "@/services";
import { checkApiResponse } from "@/utils/common";

const financialYearsUrl = "/FinancialYear";

export const getFinancialYears = async () => {
  try {
    const response = await apiClient.get(
      `${financialYearsUrl}/GetAllFinancialYears`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching financial years:", error);
    return checkApiResponse(error);
  }
};

export const getActiveFinancialYear = async () => {
  try {
    const response = await apiClient.get(
      `${financialYearsUrl}/GetActiveFinancialYear`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching active financial year:", error);
    return checkApiResponse(error);
  }
};

export const getFinancialYearById = async (id) => {
  try {
    const response = await apiClient.get(
      `${financialYearsUrl}/GetFinancialYearById/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error fetching financial year by ID:", error);
    return checkApiResponse(error);
  }
};

export const createFinancialYear = async (financialYear) => {
  try {
    const response = await apiClient.post(
      `${financialYearsUrl}/AddFinancialYear`,
      financialYear,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error creating financial year:", error);
    return checkApiResponse(error);
  }
};

export const updateFinancialYear = async (id, financialYear) => {
  try {
    const response = await apiClient.put(
      `${financialYearsUrl}/UpdateFinancialYear/${id}`,
      financialYear,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error updating financial year:", error);
    return checkApiResponse(error);
  }
};

export const activateFinancialYear = async (id) => {
  try {
    const response = await apiClient.post(
      `${financialYearsUrl}/ActivateFinancialYear/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error activating financial year:", error);
    return checkApiResponse(error);
  }
};

export const deleteFinancialYear = async (id) => {
  try {
    const response = await apiClient.delete(
      `${financialYearsUrl}/DeleteFinancialYear/${id}`,
    );
    return checkApiResponse(response);
  } catch (error) {
    console.error("Error deleting financial year:", error);
    return checkApiResponse(error);
  }
};
