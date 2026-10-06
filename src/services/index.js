import axios from "axios";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const attachTokenInterceptor = (client) => {
  return client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        const authToken =
          token.startsWith('"') && token.endsWith('"')
            ? token.slice(1, -1)
            : token;
        if (authToken) {
          config.headers.set("Authorization", `Bearer ${authToken}`);
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: defaultHeaders,
});
attachTokenInterceptor(apiClient);

apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(new Error(error.response?.data?.message || error.message)),
);

export default apiClient;
