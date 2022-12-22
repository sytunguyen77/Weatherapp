const input = document.querySelector(".input-search");

function changeWeatherUI(weather) {
    const city = document.querySelector(".name .city");
    const country = document.querySelector(".name .country");
    const time = document.querySelector(".time");
    const temperature = document.querySelector(".temperature .value");
    const icon = weather.weather[0].icon;
    document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    const shortDesc = document.querySelector(".short-desc");

    const visibility = document.querySelector(".visibility span");
    const wind = document.querySelector(".wind span");
    const cloud = document.querySelector(".cloud span");

    const date = new Date(weather.dt * 1000 + weather.timezone * 1000);

    city.innerHTML = weather.name;
    country.innerHTML = weather.sys.country;

    time.innerText = date.toDateString();

    shortDesc.innerHTML = weather.weather[0].description;

    const temp = Math.round(weather.main.temp);
    temperature.innerHTML = temp;

    if (temp >= 25) {
        document.body.className = "hot";
    } else if (temp >= 21) {
        document.body.className = "warm";
    } else if (temp >= 15) {
        document.body.className = "cool";
    } else {
        document.body.className = "cold";
    }

    visibility.innerHTML = weather.visibility + " (m)";
    wind.innerHTML = weather.wind.speed + " (m/s)";
    cloud.innerHTML = weather.clouds.all + " (%)";
}

input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        getWeather(e.target.value);
    }
});

async function getWeather(input) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`;

    const res = await fetch(url);
    const weather = await res.json();

    changeWeatherUI(weather);
}

getWeather("Houston");
