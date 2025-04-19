import request from "../utils/request";

export const getAllSubjects = async () => {
    const response = await request.get("subjects/");
    return response.data;
};

