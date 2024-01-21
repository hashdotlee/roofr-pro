interface GenericFetch {
  (url: string, options: FetchOptions): Promise<Response>;
}

export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
  params?: any;
};

export type CustomResponse = {
  data: any;
  error: any;
};

const defaultOptions = {
  method: "GET" as const,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const customFetch = (fn: GenericFetch) => {
  return async <T extends Response>(
    url: string,
    options: FetchOptions = defaultOptions,
  ): Promise<CustomResponse> => {
    try {
      const response = await fn(url, options);
      const { data }: { data: T } = await response.json();
      return {
        ...response,
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  };
};

const get = customFetch(
  (url: string, options: FetchOptions = defaultOptions) => {
    for (const key in options.params) {
      if (!options.params[key]) {
        delete options.params[key];
      }
    }
    const params = new URLSearchParams(options.params).toString();
    const newUrl = `${url}?${params}`;
    return fetch(newUrl, {
      method: "GET",
      ...options,
    });
  },
);

const post = customFetch(
  (url: string, options: FetchOptions = defaultOptions) => {
    return fetch(url, {
      method: "POST",
      ...options,
    });
  },
);

const put = customFetch(
  (url: string, options: FetchOptions = defaultOptions) => {
    return fetch(url, {
      method: "PUT",
      ...options,
    });
  },
);

const del = customFetch(
  (url: string, options: FetchOptions = defaultOptions) => {
    return fetch(url, {
      method: "DELETE",
      ...options,
    });
  },
);

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
