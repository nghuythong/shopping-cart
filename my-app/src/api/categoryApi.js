import axiosClient from "./axiosClient.js";

const categoryApi = {
  getAll(params) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/categories";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.post(url, data);
  },

  remove(data) {
    const url = `/categories/${data}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
