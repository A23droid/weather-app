const apiKey = "d9e2145e9cf164049d24c0c408d16531";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector(".weather").style.display ="none";
    }

    else {
        let data = await response.json();
        console.log(data["cod"]);
        

        document.querySelector('.error').style.display = "none";

        const temperature = Math.round(data["main"]["temp"]);
        const humidity = data["main"]["humidity"];
        const windSpeed = data['wind']["speed"];

        // temp city humidity wind
        document.querySelector('.temp').innerHTML = `${temperature}°C`;
        document.querySelector('.city').innerHTML = `${data["name"]}`;
        document.querySelector('.humidity').innerHTML = `${humidity}%`;
        document.querySelector('.wind').innerHTML = `${windSpeed} kmph`;

        switch (data["weather"][0]["main"]) {
            case "Clouds":
                weatherIcon.src = "/images/cloudy.png";
                break;
            case "Clear":
                weatherIcon.src = "/images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "/images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "/images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "/images/mist.png";
                break;
        }

        document.querySelector(".weather").style.display ="block";
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value;
    checkWeather(city);
})

// Press Enter to submit

