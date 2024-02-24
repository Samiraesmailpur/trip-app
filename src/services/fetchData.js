const API_KEY = "XNVDW3Q5FEDMMHBH23PNN3DXJ";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

async function fetchWeatherForToday(city) {
  const response = await fetch(
    `${BASE_URL}/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  );
  const weather = await response.json();

  return weather;
}

async function fetchForecast(city, startDate, endDate) {
  const response = await fetch(
    `${BASE_URL}/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  );
  const weather = await response.json();

  return weather;
}

export { fetchWeatherForToday, fetchForecast };
