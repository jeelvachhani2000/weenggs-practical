import axios, { AxiosError } from "axios";

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────
AXIOS.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────
AXIOS.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection."),
      );
    }

    // HTTP error status codes
    const status = error.response.status;
    const messages: Record<number, string> = {
      400: "Bad request.",
      401: "Unauthorised. Please log in.",
      403: "You do not have permission to do this.",
      404: "Resource not found.",
      500: "Server error. Please try again later.",
      503: "Service unavailable. Please try again later.",
    };

    const message = messages[status] ?? `Unexpected error (${status}).`;
    return Promise.reject(new Error(message));
  },
);

export default AXIOS;
