import request from "../utils/request";

export const getAllStudents = async () => {
  const response = await request.get("students/");
  return response.data;
};

export const getAllForAdminPost = async () => {
  const response = await request.get("students/getAllForAdminPost");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await request.get(`students/${id}`);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await request.post("students/", data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await request.put(`students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await request.delete(`students/${id}`);
  return response.data;
};
