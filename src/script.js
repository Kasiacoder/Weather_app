function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//homework 5
let apiKey = "2df674138d044db88c1ab34f314bc364";

function displayFutureWeatherCondition(response) {
  console.log(response.data);

  document.querySelector("#days").innerHTML = `
        <div class="col day">${response.data.list[3].dt_txt}</div>
        <div class="col day">${response.data.list[11].dt_txt}</div>
        <div class="col day">${response.data.list[19].dt_txt}</div>
        <div class="col day">${response.data.list[27].dt_txt}</div>
        <div class="col day">${response.data.list[35].dt_txt}</div>
  `;
  document.querySelector("#temperatures").innerHTML = `
        <div class="col temperature">${response.data.list[3].main.temp_max}K/${response.data.list[3].main.temp_min}K</div>
        <div class="col temperature">${response.data.list[11].main.temp_max}K/${response.data.list[11].main.temp_min}K</div>
        <div class="col temperature">${response.data.list[19].main.temp_max}K/${response.data.list[19].main.temp_min}K</div>
        <div class="col temperature">${response.data.list[27].main.temp_max}K/${response.data.list[27].main.temp_min}K</div>
        <div class="col temperature">${response.data.list[35].main.temp_max}K/${response.data.list[35].main.temp_min}K</div>
        <div class="col temperature">11°C / 8°C</div>
  `;
}

function displayWeatherCondition(response) {
  document.querySelector("#city-element").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector("#city-element").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  // use another api for displaying future weather conditions

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}`;
  axios.get(apiUrl2).then(displayFutureWeatherCondition);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// #1
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}
// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Berlin");
