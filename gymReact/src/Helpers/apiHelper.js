import { getToken } from "./tokenRetrieval";
export async function apiFetch(endpoint, request = {}) {
  const token = getToken();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  
  const headers = {
  ...(request.body ? { "Content-Type": "application/json" } : {}),
  ...(request.headers || {}),
};

  if (token&&(token!==null)) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...request,
    headers,
  });

  let data;
  try {
    const contentType = response.headers.get("content-type");
    if(contentType&&contentType.includes("application/json")){
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
