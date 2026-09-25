const apiKey = "YOUR_API_KEY"; const apikey="3d2c00f0f3e5b6de18a5ba82bb658dfd ";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const errorMsg = document.getElementById("error-msg");
const weatherDisplay = document.getElementById("weather-display");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorMsg.style.display = "block";
        weatherDisplay.style.display = "none";
    } else {
        var data = await response.json();

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity-val").innerText = data.main.humidity + "%";
        document.getElementById("wind-val").innerText = data.wind.speed + " km/h";

        // Weather condition ke hisaab se icon update karna
        const weatherCondition = data.weather[0].main;
        
        if (weatherCondition == "Clouds") {
            weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
        } else if (weatherCondition == "Clear") {
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
        } else if (weatherCondition == "Mist" || weatherCondition == "Haze") {
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
        }

        weatherDisplay.style.display = "block";
        errorMsg.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});