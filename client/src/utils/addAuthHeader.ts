import { RegisterRequest } from "../redux/services/authApi";

export const addAuthHeader = (headers: Headers) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.token) {
    headers.set("authorization", `Bearer ${user?.token}`);
  }

  return headers;
};

export const generateToken = (userDetails: RegisterRequest): string => {
  const rawString = Object.values(userDetails).join("|");

  // Simple hash function (not cryptographically secure)
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  // Convert to base64-like string
  return btoa(hash.toString());
};
