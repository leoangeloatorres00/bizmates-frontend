export const WEATHER_API_KEY = "009e2584bc722b5934d8e87e6bdbab87";
export const PLACE_API_KEY = "fsq30+syoSa6rlC2eMhfYmk7gaF43vcwt+ygEN6IA95TIhY=";
export const IMG_URL = "https://openweathermap.org/img/wn/";
export const CITIES = [
  "Tokyo",
  "Yokohama",
  "Kyoto",
  "Osaka",
  "Sapporo",
  "Nagoya",
];

export const getTime = (hours, minutes) => {
  let meridiem = hours > 11 ? "PM" : "AM";
  let hour = hours > 12 ? hours - 12 : hours;
  return hour + ":" + minutes + meridiem;
};

export const getHours = (milliseconds) => {
  const date = new Date(milliseconds);
  return date.getHours();
};

export const getMinutes = (milliseconds) => {
  const date = new Date(milliseconds);
  return date.getMinutes();
};

export const getWeatherIcon = (params) => {
  let icon = "";
  switch (params) {
    case "clear sky":
      icon = "bi bi-brightness-high-fill";
      break;
    case "few clouds":
      icon = "bi bi-cloud-sun-fill";
      break;
    case "overcast clouds":
    case "scattered clouds":
      icon = "bi bi-cloudy-fill";
      break;
    case "broken clouds":
      icon = "bi bi-clouds-fill";
      break;
    case "light rain":
    case "shower rain":
    case "moderate rain":
      icon = "bi bi-cloud-rain-fill";
      break;
    case "rain":
      icon = "bi bi-cloud-rain-heavy";
      break;
    case "thunderstorm":
      icon = "bi bi-cloud-lightning-rain-fill";
      break;
    case "snow":
      icon = "bi bi-cloud-snow-fill";
      break;
    case "mist":
      icon = "bi bi-cloud-haze-fill";
      break;
  }
  return icon;
};
