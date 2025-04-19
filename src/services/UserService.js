import request from "../utils/request";

export const getAllUsers = async () => {
    const response = await request.get("users/");
    return response.data;
};

export const getUserById = async (id) => {
    const response = await request.get(`users/${id}`);
    return response.data;
};

export const createUserWithImg = async (data) => {
    const response = await request.post("users/img/", data, {
        headers: {
            "Content-Type": "multipart/form-data", 
        },
    });
    return response.data;
};

export const createUser = async (data) => {
    const response = await request.post("users/", data);
    return response.data;
  };

export const updateUser = async (data) => {
    const response = await request.put("users/", data, {
        headers: {
            "Content-Type": "multipart/form-data", 
        },
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await request.delete(`users/${id}`);
    return response.data;
};