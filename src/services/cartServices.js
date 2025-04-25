import apiClient from "../utils/api-client";

export function cartServices(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export async function getCartAPI(id, quantity) {
  return await apiClient.get(`/cart`);
}

export function removeCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}

export function increaseCartAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}

export function decreaseCartAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}

export function checkoutCartAPI() {
  return apiClient.post("/order/checkout");
}
