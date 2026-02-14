import api from "./api";

export const createProjectApi = async (data) => {
  const res = await api.post("/projects/create", data);
  return res.data;
};

export const getProjectsApi = async () => {
  const res = await api.get("/projects");
  return res.data;
};
