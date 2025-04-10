import request from "../utils/request";

export const getAllTutors = async () => {
  const response = await request.get("tutors/");
  return response.data;
};

export const getTutorById = async (id) => {
  const response = await request.get(`tutors/${id}`);
  return response.data;
};

export const createTutor = async (data) => {
  const response = await request.post("tutors/", data);
  return response.data;
};

export const updateTutor = async (id, data) => {
  const response = await request.put(`tutors/${id}`, data);
  return response.data;
};

export const deleteTutor = async (id) => {
  const response = await request.delete(`tutors/${id}`);
  return response.data;
};
