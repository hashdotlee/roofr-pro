interface GenericFetch {
  <T>(url: string, options: FetchOptions): Promise<T>;
}

export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
  params?: any;
};

const defaultOptions = {
  method: "GET" as const,
  headers: {
    "Content-Type": "application/json",
  },
};

const customFetch = async (
  url: string,
  options: FetchOptions = defaultOptions,
) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const get: GenericFetch = async (
  url: string,
  options: FetchOptions = defaultOptions,
) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const post: GenericFetch = async (url: string, options: FetchOptions) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const put: GenericFetch = async (url: string, options: FetchOptions) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const del: GenericFetch = async (url: string, options: FetchOptions) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
