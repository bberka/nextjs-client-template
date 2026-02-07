import type { Result, ResultT } from "@/types/api";
import { SeverityLevel } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type RequestOptions = Omit<RequestInit, "method" | "body"> & {
  params?: Record<string, string | number | boolean | null | undefined>;
};

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): string {
  const base = BASE_URL.startsWith("http") ? BASE_URL : window.location.origin + BASE_URL;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalizedBase + normalizedPath);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value != null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("auth_token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<ResultT<T>> {
  const { params, ...init } = options;
  const url = buildUrl(path, params);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...init.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...init,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        value: null,
        message: data.message ?? "An error occurred",
        severity: SeverityLevel.Error,
        validationErrors: data.validationErrors,
      };
    }

    return data as ResultT<T>;
  } catch {
    return {
      value: null,
      message: "Network error",
      severity: SeverityLevel.Error,
    };
  }
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>("GET", path, undefined, options);
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("POST", path, body, options);
  },
  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PUT", path, body, options);
  },
  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>("PATCH", path, body, options);
  },
  delete<T>(path: string, options?: RequestOptions) {
    return request<T>("DELETE", path, undefined, options);
  },
};
