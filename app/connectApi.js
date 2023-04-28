async function weatherData (city) {
    const forecast = await fetch(`https://api.weatherapi.com/v1/current.json?key=b170298837194937afb134328231904&q=${city}&aqi=no`);
    const convertedForecast = await forecast.json();
    return convertedForecast
}

export const connectApi = {
    weatherData,
}