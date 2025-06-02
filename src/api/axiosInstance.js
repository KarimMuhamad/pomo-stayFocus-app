import axios from "axios";
import {getAuthToken, logoutUser, setAuthToken} from "../utils/auth.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const { accessToken } = getAuthToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika accessToken expired dan belum pernah coba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log('test')

      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/refresh',
        );

        console.log(response);

        const newAccessToken = response.data.data.accessToken;
        setAuthToken(newAccessToken); // simpan ke localStorage

        // set token baru di header
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // ulang request sebelumnya
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Gagal refresh -> logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;