import apiClient from "../utils/api-client";

export async function autoSuggestion(search) {
  return await apiClient.get(`/products/suggestions?search=${search}`);
}
