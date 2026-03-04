// Variables

const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const loc = document.getElementById("location");
const locationSelect = document.getElementById("locations");
const getWeatherBtn = document.getElementById("get-weather-btn");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const feelsLikeWeather = document.getElementById("feels-like");
const weatherMain = document.getElementById("weather-main");

// Functions

async function getWeather(city) {
  try {
    const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/city/${city}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      alert("Something went wrong, please try again later");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function showWeather(city) {
  try {
    if (!city) return;
    const cityWeather = await getWeather(city);

    const {
      name: cityName,
      weather: [{ main, description, icon }],
      main: { temp, pressure, humidity, feels_like },
      visibility: visibility,
      wind: { speed, deg, gust },
    } = cityWeather;

    weatherIcon.src = icon || "";
    loc.innerHTML = cityName || "N/A";
    mainTemp.innerHTML = temp ? "".concat(temp, "&deg; C") : "N/A";
    weatherMain.innerHTML = main || "N/A";
    windEl.innerHTML = "Wind: ".concat(
      speed ? "".concat(speed, " m/s") : "N/A",
    );
    humidityEl.innerHTML = "Humidity: ".concat(
      humidity ? "".concat(humidity, "%") : "N/A",
    );
    feelsLikeWeather.innerHTML = "Feels Like: ".concat(
      feels_like ? "".concat(feels_like, "&deg; C") : "N/A",
    );
    windGust.innerHTML = "Gusts: ".concat(
      gust ? "".concat(gust, " m/s") : "N/A",
    );
  } catch (error) {
    console.error(error);
  }
}

getWeatherBtn.addEventListener("click", function () {
  showWeather(locationSelect.value);
});
