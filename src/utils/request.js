import axios from "axios";

const services = (url) => {
  const service = axios.create({
    baseURL: url,
    timeout: 60000,
  });

  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return service;
};

export default services;
