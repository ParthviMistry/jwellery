export const checkApiResponse = (response) => {
  const result = response?.data;
  if (!result?.success) {
    console.error("API request failed:", result.message || "Unknown error");
    return result.message || "The API request failed.";
  }
  return result.data;
};
