import { connectApi } from "./connectApi.js";

const content = document.querySelector('.main__content');
const searchBar = document.querySelector('.search__bar');
const searchBtn = document.querySelector('.search__btn');

// ['click', ].forEach( e => 
//     searchBtn.addEventListener(e, ()=>{constructElements()})
// )

searchBtn.addEventListener('click', ()=>{
    constructElements()
})

const body = document.querySelector('body');

async function constructElements () {
    try{
        const weatherData = await connectApi.weatherData(searchBar.value);
        const weatherImg = getWeatherImage(weatherData.current.condition.text)
        console.log (weatherData);
        console.log (weatherImg);
        content.innerHTML = `
        <h1 class="city">${weatherData.location.name}</h1>
        <img class="weather__icon" src="${weatherImg}">
        <h3 class="condition">${weatherData.current.condition.text}</h3>
        <h2 class="temperature">${weatherData.current.temp_c}°C</h2>
        <div class="description">
            <p class="description__text">Rain: ${weatherData.current.precip_mm}mm</p>
            <p class="description__text">Humidity: ${weatherData.current.humidity}%</p>
            <p class="description__text">Wind: ${weatherData.current.wind_kph} km/h</p>
        </div>`;
        
    } catch {
        content.innerHTML=`<h2 class="temperature">This city could not be found!</h2>`
    }
}

function getWeatherImage(condition){
    switch (condition){
        case 'Partly cloudy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/partlyCloudySky.jpg')";
            return './assets/weatherIcons/partlyCloudy.png';

        case 'Cloudy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/cloudySky.jpg')";
            return './assets/weatherIcons/cloudy.png';
        
        case 'Sunny':
            body.style.backgroundImage = "url('./assets/weatherBgImages/clearSky.jpg')";
            return './assets/weatherIcons/sunny.png';

        case 'Rainy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/rainySky.jpg')";
            return './assets/weatherIcons/rainy.png';
        
        case 'Snowy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/snowySky.jpg')";
            return './assets/weatherIcons/snowy.png';

        case 'Breezy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/breezySky.jpg')";
            return './assets/weatherIcons/breezy.png';

        case 'Stormy':
            body.style.backgroundImage = "url('./assets/weatherBgImages/stormySky.jpg')";
            return './assets/weatherIcons/stormy.png';

        case 'Clear':
            body.style.backgroundImage = "url('./assets/weatherBgImages/clearSky.jpg')";
            return './assets/weatherIcons/sunny.png'
        
        case 'Patchy rain possible':
            body.style.backgroundImage = "url('./assets/weatherBgImages/rainySky.jpg')";
            return './assets/weatherIcons/rainy.png';

        case 'Patchy light rain':
            body.style.backgroundImage = "url('./assets/weatherBgImages/rainySky.jpg')";
            return './assets/weatherIcons/rainy.png';
        
        case 'Moderate or heavy rain with thunder':
            body.style.backgroundImage = "url('./assets/weatherBgImages/stormySky.jpg')";
            return './assets/weatherIcons/stormy.png';

    }
}