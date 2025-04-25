import apiClient from "../utils/api-client";

export async function myOrderAPI() {
  return await apiClient.get(`/order`);
}
