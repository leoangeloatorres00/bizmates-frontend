import request from "@/utils/request";

const url = "https://api.openweathermap.org/data/2.5";
const key = "009e2584bc722b5934d8e87e6bdbab87";
const axios = request(url);

export const getWeatherByCity = (params) => {
  let city = params.city;

  return axios.get(`/weather?q=${city}&appid=${key}`).then((res) => {
    const { data } = res;
    return data;
  });
};

export const getForeCastByCity = (params) => {
  let city = params.city;

  return axios.get(`forecast?q=${city}&appid=${key}`).then((res) => {
    const { data } = res;
    return data;
  });
};
