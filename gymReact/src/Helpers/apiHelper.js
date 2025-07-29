
export async function apiFetch(endpoint, request = {}) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const TEST_URL = import.meta.env.VITE_LOCAL_API_URL;

  const headers = {
    ...(request.body ? { "Content-Type": "application/json" } : {}),
    ...(request.headers || {}),
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...request,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    
      const refresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (refresh.ok) {
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...request,
          headers,
          credentials: "include",
        });
      }
      else{
        throw new Error ("invalid, login again")
      }
    } 
  
  let data;
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log(data);
    }
  } catch (error) {
    throw new Error("error in parsing JSON");
  }
  if (!response.ok) {
    throw new Error(data.message || `failed with status ${response.status}`);
  }
  return data;
}

