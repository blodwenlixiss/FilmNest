import axios, { AxiosInstance } from "axios";

const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTkyZDcyNmFkZTMwYzUyZTk1YWUwNDhkOTU5N2QxOCIsIm5iZiI6MTczNjU5NzQyMy45NjUsInN1YiI6IjY3ODI1ZmFmYWJhYmJiYTA0MGJiMWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3ZZqy-CG4PT2C-r0LY62ecBLDWQHOMMHt3TmrzTbng`,
    "Content-Type": "application/json",
  },
};

export const httpClientMovie: AxiosInstance = axios.create(axiosConfig);
