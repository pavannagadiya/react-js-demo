import api from "../api";
import http from "../utils/http";

export async function getAllProducts() {
  return http.get(api.products);
};