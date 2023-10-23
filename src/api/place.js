import request from "@/utils/request";

const local_url = "http://localhost:8000";
const api_ninja_url = "https://api.api-ninjas.com";

const api_key = "8E00pDAzzdwyVTcGk3z4Ig==OvTo0ZJPqpRwSVbY";

const axios1 = request(local_url);
const axios2 = request(api_ninja_url);

export const getPlace = () => {
  return axios1.get(`/api/location`).then((res) => {
    const { data } = res;
    return data;
  });
};

export const addPlace = (params) => {
  const data = {
    name: params.name,
  };

  return axios1.post(`/api/location`, data).then((res) => {
    const { data } = res;
    return data;
  });
};

export const getPlaceByName = (params) => {
  const city = params.city;
  return axios2
    .get(`/v1/city?name=${city}`, {
      headers: { "X-Api-Key": api_key },
    })
    .then((res) => {
      const { data } = res;
      return data.filter(
        (item) => item.name.toUpperCase() == city.toUpperCase()
      );
    });
};
