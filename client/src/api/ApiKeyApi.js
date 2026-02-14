import api from "./api";

export const createApiKeyApi = async (data) => {
  const res = await api.post("/apikeys/create", data);
  return res.data;
};

export const getApiKeysApi = async () => {
  const res = await api.get("/apikeys");
  return res.data;
};