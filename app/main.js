import { connectApi } from "./connectApi.js";

const content = document.querySelector('.main__content');
const searchBar = document.querySelector('.search__bar');
const searchBtn = document.querySelector('.search__btn');

searchBar.addEventListener('keydown', function(e){
    if(e.which==13){
        constructElements()
    }
})

searchBtn.addEventListener('click', ()=>{
    constructElements()
})

const body = document.querySelector('body');

async function constructElements () {
    try{
        const weatherData = await connectApi.weatherData(searchBar.value);
        const weatherImg = getWeatherImage(weatherData.current.condition.text)
        console.log(weatherImg)
        console.log(weatherData)
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
    const imgReferences = {
        cloudy:{
            bg: `url('./assets/weatherBgImages/partlyCloudySky.jpg')`,
            icon: `./assets/weatherIcons/partlyCloudy.png`
        },
        partlyCloudy:{
            bg: `url('./assets/weatherBgImages/partlyCloudySky.jpg')`,
            icon: `./assets/weatherIcons/partlyCloudy.png`
        },
        sunny:{
            bg: `url('./assets/weatherBgImages/clearSky.jpg')`,
            icon: `./assets/weatherIcons/sunny.png`
        },
        rainy:{
            bg: `url('./assets/weatherBgImages/rainySky.jpg')`,
            icon: `./assets/weatherIcons/rainy.png`
        },
        snowy:{
            bg: `url('./assets/weatherBgImages/snowySky.jpg')`,
            icon: `./assets/weatherIcons/snowy.png`
        },
        breezy:{
            bg: `url('./assets/weatherBgImages/breezySky.jpg')`,
            icon: `./assets/weatherIcons/breezy.png`
        },
        stormy:{
            bg: `url('./assets/weatherBgImages/stormySky.jpg')`,
            icon: `./assets/weatherIcons/stormy.png`
        }
    }
    switch (condition){
        case 'Partly cloudy':
            body.style.backgroundImage = imgReferences.partlyCloudy.bg;
            return imgReferences.partlyCloudy.icon;

        case 'Cloudy':
        case 'Overcast':
            body.style.backgroundImage = imgReferences.cloudy.bg;
            return imgReferences.cloudy.icon;
        
        case 'Sunny':
        case 'Clear':
            body.style.backgroundImage = imgReferences.sunny.bg;
            return imgReferences.sunny.icon;

        case 'Rainy':
        case 'Patchy light rain':
        case 'Patchy rain possible':
        case 'Light rain':
            body.style.backgroundImage = imgReferences.rainy.bg;
            return imgReferences.rainy.icon;
        
        case 'Snowy':
            body.style.backgroundImage = imgReferences.snowy.bg;
            return imgReferences.snowy.icon;

        case 'Breezy':
            body.style.backgroundImage = imgReferences.breezy.bg;
            return imgReferences.breezy.icon;

        case 'Stormy':
        case 'Heavy rain':
        case 'Moderate or heavy rain with thunder':
            body.style.backgroundImage = imgReferences.stormy.bg;
            return imgReferences.stormy.icon;

        default:
            body.style.backgroundImage = imgReferences.partlyCloudy.bg;
            return imgReferences.partlyCloudy.icon;
    }
}