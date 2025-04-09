import request from "../utils/request";

export const login = async (username, password) => {
  try {
    const response = await request.post("auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Đăng nhập thất bại!";
  }
};