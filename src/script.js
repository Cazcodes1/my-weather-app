let now = new Date();
let datetoday = document.querySelector("#date");
let date = now.getDate();
let hours = now.getHours();
let min = now.getMinutes();

if (min < 10) {
  min = "0" + min;
} else {
  min = min + "";
}
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

datetoday.innerHTML = `${day}, ${date} ${month} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let cityTemp = document.querySelector("#city-temp");
  let tempcity = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `Temp ${tempcity}°c`;

  let humidity = document.querySelector("#humidity");
  let humidityCity = response.data.main.humidity;
  humidity.innerHTML = `Humidity ${humidityCity}%`;

  let windspeed = document.querySelector("#wind-speed");
  let speedCity = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `Wind-speed ${speedCity} km/h`;

  let description = document.querySelector("#description");
  let descriptionCity = response.data.weather[0].main;
  description.innerHTML = `${descriptionCity}`;

  let icontoday = document.setAttribute("icontoday");
  icontoday.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "ff273393a3d61766552e5813cf268b6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `Your location is ${response.data.name} and it's ${temperature}°c`;
}

function searchLocation(position) {
  let apiKey = "ff273393a3d61766552e5813cf268b6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
