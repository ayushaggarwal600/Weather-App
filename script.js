const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("btn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const error = document.querySelector(".error");
const clientError = document.querySelector(".clientError");
const weather_body = document.querySelector(".weather-body");
const toggle = document.getElementById("theme");
const body = document.body;

async function checkWeather(city) {
  try {
    const api_key = PASTE_YOUR_API_KEY_HERE;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const reponse = await fetch(url);
    const weather_data = await reponse.json();

    console.log(weather_data);

    if (weather_data.cod === "404") {
      weather_body.style.display = "none";
      error.style.display = "flex";
      clientError.style.display = "none";
      throw new Error("Not Found");
    } else if (weather_data.cod === "400") {
      weather_body.style.display = "none";
      error.style.display = "none";
      clientError.style.display = "flex";
      throw new Error("Bad Request");
    } else {
      weather_body.style.display = "flex";
      error.style.display = "none";
      clientError.style.display = "none";
      temperature.innerHTML = `${Math.round(
        weather_data.main.temp - 273.15
      )} <sup> °C </sup>`;
      description.innerHTML = `${weather_data.weather[0].description}`;
      humidity.innerHTML = `${weather_data.main.humidity}%`;
      wind_speed.innerHTML = `${weather_data.wind.speed}Km/Hr`;

      switch (weather_data.weather[0].main) {
        case "Clouds":
          weather_img.src = "./images/cloud.png";
          break;
        case "Clear":
          weather_img.src = "./images/clear.png";
          break;
        case "Rain":
          weather_img.src = "./images/rain.png";

          break;
        case "Mist":
          weather_img.src = "./images/mist.png";
          break;
        case "Snow":
          weather_img.src = "./images/snow.png";
          break;
      }
    }
  } catch (error) {
    console.log(error.message);
    // console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

toggle.addEventListener("click", () => {
  body.classList.toggle("lightTheme");
  if (body.classList.contains("lightTheme")) {
    toggle.classList.replace("fa-sun", "fa-moon");
    body.style.transition = "2s";
  } else {
    toggle.classList.replace("fa-moon", "fa-sun");
    body.style.transition = "2s";
  }
});
