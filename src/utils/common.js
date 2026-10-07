export const checkApiResponse = (response) => {
  const apiResponse = response?.response?.data ?? response?.data ?? response;

  if (apiResponse?.success === false) {
    throw new Error(apiResponse.message || "The API request failed.");
  }

  if (apiResponse?.success === true) {
    return apiResponse.data;
  }

  if (response instanceof Error) {
    throw response;
  }

  throw new Error("The API returned an invalid response.");
};
