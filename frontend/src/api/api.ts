import { Endpoints, Methods } from "../@types/types";

export default async function apiCall(endpoint: Endpoints, method: Methods, body: {}) {
  const api = import.meta.env.VITE_API_URL;
  const options: RequestInit = {
    method: method,
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  if (method !== "GET" && Object.keys(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  return await fetch(`${api}/${endpoint}`, options);
}
