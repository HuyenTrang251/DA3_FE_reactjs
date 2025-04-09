import request from "../utils/request";

export const getAllStudents = async () => {
  const response = await request.get("student/");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await request.get(`student/${id}`);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await request.post("student/", data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await request.put(`student/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await request.delete(`student/${id}`);
  return response.data;
};
