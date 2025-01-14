import axios, { AxiosInstance } from "axios";

console.log(import.meta.env.VITE_BASE_URL);
const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};
console.log(axiosConfig.baseURL);

export const httpClientMovie: AxiosInstance = axios.create(axiosConfig);
