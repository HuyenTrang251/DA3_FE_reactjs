import request from "../utils/request";

export const createResponse = async (data) => {
  const response = await request.post("responses/", data); 
  return response.data;
};