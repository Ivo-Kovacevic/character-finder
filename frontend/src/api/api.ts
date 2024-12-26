export default async function apiCall(endpoint: string, method = "GET", body: {}) {
  const api = "http://localhost:3000";
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
