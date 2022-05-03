const apiKey = "2df674138d044db88c1ab34f314bc364";
const baseUrl = "https://api.openweathermap.org/data/2.5";
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

function displayFutureWeatherCondition(response) {
  console.log(response.data);

  document.querySelector("#days").innerHTML = `
        <div class="col day">${formatDate(days.dt)}</div>
        <div class="col day">${response.data.list[11].dt_txt}</div>
        <div class="col day">${response.data.list[19].dt_txt}</div>
        <div class="col day">${response.data.list[27].dt_txt}</div>
        <div class="col day">${response.data.list[35].dt_txt}</div>
  `;
  //  document.querySelector("#temperatures").innerHTML = `
  //       <div class="col temperature">${response.data.list[3].main.temp_max}K/${response.data.list[3].main.temp_min}K</div>
  //       <div class="col temperature">${response.data.list[11].main.temp_max}K/${response.data.list[11].main.temp_min}K</div>
  //       <div class="col temperature">${response.data.list[19].main.temp_max}K/${response.data.list[19].main.temp_min}K</div>
  //       <div class="col temperature">${response.data.list[27].main.temp_max}K/${response.data.list[27].main.temp_min}K</div>
  //       <div class="col temperature">${response.data.list[35].main.temp_max}K/${response.data.list[35].main.temp_min}K</div>
  //       <div class="col temperature">11°C / 8°C</div>
  // `;
}

function displayWeatherCondition(response) {
  document.querySelector("#city-element").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  // use another api for displaying future weather conditions
  searchWeatherForecast(response.data.coord.lat, response.data.coord.lon);
}

function searchWeatherForecast(latitude, longitude) {
  let oneCallWeatherUrl = `${baseUrl}/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}
&units=metric`;
  axios.get(oneCallWeatherUrl).then(displayForecast);
}

function displayForecast(response) {
  const daysElement = document.querySelector("#days");
  let forecastHtml = `<div class='row'>`;
  let forecastDays = response.data.daily;

  forecastDays.shift();
  forecastDays.pop();
  console.log(forecastDays);

  response.data.daily.forEach((day, index) => {
    forecastHtml =
      forecastHtml +
      `
      <div class = "col-2">
    <div class = "dayName">${formatDay(day.dt)}</div>
    <div class = "dayTemperature">${Math.round(day.temp.day)}°C/${Math.round(
        day.temp.night
      )}°C</div>
    <div class = "dayIcon">
      <img
          src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
</div>
</div>
    `;
  });

  document.querySelector("#days").innerHTML = forecastHtml;
}

function searchCity(city) {
  let apiUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
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
