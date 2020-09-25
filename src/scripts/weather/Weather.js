//Creates an HTML representation of a weather forecast for a specific day
export const WeatherHTML = (weather) => {
    const precipitationChance = Math.round(weather.pop * 100)
    return `
    <p><strong>${weather.dt_txt.split(" ")[0]}</strong></p>
    <ul class="weatherListing">
        <li>-- High: ${Math.round(weather.main.temp_max)} °F</li>
        <li>-- Low: ${Math.round(weather.main.temp_min)} °F</li>
        <li>-- Chance of Precipitation: ${precipitationChance}%</li>
    </ul>
    `
}
