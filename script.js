const apiKey ="1f444f4bf08439f3e7135d121ead037a"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const location = document.getElementById('location').value;
    const weatherResult = document.getElementById('weatherResult');

    if (!location) {
        weatherResult.innerText = 'Please enter a location.';
        return;
    }

    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResult.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerText = `Error: ${error.message}`;
    }
}
