import http from "./httpService";
import { getCurrentLocation } from "./locationService";
import { apiUrl, apiKey } from "../config.json";

const currentWeatherUrl = `${apiUrl}/weather?appid=${apiKey}`;
const forecastUrl = `${apiUrl}/forecast?appid=${apiKey}`;
const findCityUrl = `${apiUrl}/find?appid=${apiKey}`;

// To get weather for current location
export async function getWeather() {
  const { latitude, longitude } = await getCurrentLocation();
  /*  console.log(
    `${currentWeatherUrl}&lat=${latitude}&lon=${longitude}&units=metric`
  ); */

  return http.get(
    `${currentWeatherUrl}&lat=${latitude}&lon=${longitude}&units=metric`
  );
}

export async function getForecast(id) {
  if (id) {
    return http.get(`${forecastUrl}&id=${id}&units=metric`);
  } else {
    const { latitude, longitude } = await getCurrentLocation();
    return http.get(
      `${forecastUrl}&lat=${latitude}&lon=${longitude}&units=metric`
    );
  }
}

export async function getCityWeather(id) {
  return http.get(`${currentWeatherUrl}&id=${id}&units=metric`);
}

export async function getCity(name) {
  return http.get(`${findCityUrl}&units=metric&q=${name}`);
}
