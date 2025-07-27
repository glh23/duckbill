import { refreshAccessToken } from "./auth";

// This wraps the fetch API to handle token refresh logic
export async function secureFetch(url, options = {}, retry = true) {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });
    // If the response is 401 Unauthorized, try to refresh the access token
    if (res.status === 401 && retry) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return secureFetch(url, options, false);
      }
    }

    return res;
  } catch (err) {
    console.error("secureFetch error:", err);
    throw err;
  }
}
