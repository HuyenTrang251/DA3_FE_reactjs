import request from "../utils/request";

export const getAllPosts = async () => {
  const response = await request.get("posts/"); 
  return response.data;
};

export const getPostsApproved = async () => {
  const response = await request.get("posts/approved"); 
  return response.data;
};

export const getPostByUserId = async (id) => {
  const response = await request.get(`posts/getByIdUser/${id}`); 
  return response.data;
};

export const getPostById = async (id) => {
  const response = await request.get(`posts/${id}`); 
  return response.data;
};

export const createPost = async (data) => {
  const response = await request.post("posts/", data); 
  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await request.put(`posts/${id}`, data); 
  return response.data;
};

export const deletePost = async (id) => {
  const response = await request.delete(`posts/${id}`); 
  return response.data;
};

export const searchPosts = async (province, district, subject, method, audience) => {
    const response = await request.get('posts/search', {
      params: {
        province: province || null,
        district: district || null,
        subject: subject || null,
        method: method || null,
        audience: audience || null,
      },
    });
    return response.data;
};