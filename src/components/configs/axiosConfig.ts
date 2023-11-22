import axios from "axios";

// Create a new Axios instance
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add a custom header to the request
    config.headers["Authorization"] = `${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
