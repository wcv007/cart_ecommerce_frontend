import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api-client";

export function signUp(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.address);
  body.append("profilePic", profile);
  return apiClient.post("/user/signup", body);
}

export async function logIn(user) {
  return await apiClient.post("/user/login", user);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
