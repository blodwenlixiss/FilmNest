import { Session } from "@supabase/supabase-js";
import axios, { AxiosInstance } from "axios";
import { atom } from "jotai";

const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTkyZDcyNmFkZTMwYzUyZTk1YWUwNDhkOTU5N2QxOCIsIm5iZiI6MTczNjU5NzQyMy45NjUsInN1YiI6IjY3ODI1ZmFmYWJhYmJiYTA0MGJiMWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3ZZqy-CG4PT2C-r0LY62ecBLDWQHOMMHt3TmrzTbng`,
    "Content-Type": "application/json",
  },
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);

export type User = Session | null;

export const userAtom = atom<User>(null);
