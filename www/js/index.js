'use strict';

import { addZero, dayName } from './helpers.js';
import { myApiKey } from './config.js';

// Elementos del html necesarios
const body = document.querySelector('body');
const form = document.forms.search_city;
const logoContainer = document.querySelector('div.logo_container');
const actualCity = document.querySelector('div.actual_city');
const mainIconDiv = document.querySelector('div.main_icon');
const containerCity = document.querySelector('div.container_city');
const astroDiv = document.querySelector('div.astro');
const section2 = document.querySelector('section.section-2');

// Evento submit del form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valor del form select
    const city = form.elements.select_city.value;

    getCity(city);
});

// Llamada a la API del tiempo, esto irá dentro del evento submit del formulario
const getCity = async (city = '') => {
    // URL
    const response = await fetch(
        `http://api.weatherstack.com/forecast?access_key=${myApiKey}&query=${city}`
    );

    // Variables para obtener el la hora y fecha actuales
    const now = new Date();
    const actualDate = `${dayName(now.getDay())}, ${addZero(now.getDate())}/${
        now.getMonth() + 1
    }/${now.getFullYear()}`;

    // Destructuring para obtener los valores que nos interesan del JSON
    const { request, location, current, forecast } = await response.json();

    console.log(response);

    // Accedo a la primera propiedad de forecast, ya que es una fecha y se cambiará diariamente
    // creo la constante forecastDate para usar sus propiedades
    const forecastDate = Object.values(forecast)[0];

    // Empiezo a pintar el HTML

    // Header > div.actual_city
    actualCity.innerHTML = `
    <h2>${request.query}</h2>
    <p>${actualDate}</p>
    <p>${location.timezone_id}</p>
    `;

    // Main > Section.principal | Icono tiempo actual, ciudad y descripción
    mainIconDiv.innerHTML = `
        <img
            src="${current.weather_icons[0]}"
            alt="Actual weather icon"
            id="main_weather_icon"
        />
        <div class="hour_temp">
            <p>${addZero(now.getHours())}:${addZero(now.getMinutes())} </p>
            <p>${current.temperature} °C</p>
        </div>
        `;
    containerCity.innerHTML = `
    <h2>${location.name}, ${location.region}, ${location.country}</h2>
    <p>
        ${current.weather_descriptions[0]}
    </p>
    `;

    // Section.principal > div.astro | Horas de salida y puesta del sol/luna
    astroDiv.innerHTML = `
    <div class="icon_time">
        <img
            src="./img/sunrise.png"
            alt="Next Weather Icon"
            title="Salida del Sol"
        />        
        <p>${forecastDate.astro.sunrise}</p>
    </div>
    <hr />
    <div class="icon_time">
        <img
            src="./img/sunset.png"
            alt="Next Weather Icon"
            title="Puesta del Sol"
        />
        <p>${forecastDate.astro.sunset}</p>
    </div>
    <hr />
    <div class="icon_time">
        <img
            src="./img/moonrise.png"
            alt="Next Weather Icon"
            title="Moonrise"
        />
        <p>${forecastDate.astro.moonrise}</p>
    </div>
    <hr />
    <div class="icon_time">
        <img
            src="./img/moonset.png"
            alt="Next Weather Icon"
            title="Moonset"
        />
        <p>${forecastDate.astro.moonset}</p>
    </div>
    `;

    // Cambio el fondo del body si es de día o de noche
    if (current.is_day === 'no') {
        body.classList.remove('day');
        body.classList.add('night');
        logoContainer.innerHTML = '';
        logoContainer.innerHTML = `
        <img src="./img/moon.png" alt="Moon Logo" class="logo" />
        <h1>My Weather App</h1>
        `;
    } else {
        body.classList.remove('night');
        body.classList.add('day');
        logoContainer.innerHTML = '';
        logoContainer.innerHTML = `
        <img src="./img/sun.png" alt="Sun Logo" class="logo" />
        <h1>My Weather App</h1>
        `;
    }

    // Section 2 | Temperaturas y Dirección, velocidad del viento
    section2.innerHTML = `
    <div class="icon_time">
        <img src="./img/hot.png"
            alt="Hot temperature"
            title="Temperaturas máximas"
            height="48px"
            width="48px"
            />
            <p> Máximas: ${forecastDate.maxtemp}° </p>
    </div>
    <div class="icon_time">
        <img src="./img/cold.png"
            alt="Cold temperature"
            title="Temperaturas mínimas"
            height="48px"
            width="48px"
            />
        <p>Mínimas: ${forecastDate.mintemp}° </p>
    </div>
    <div class="icon_time">
        <img src="./img/wind.png"
            alt="Hot temperature"
            title="Temperaturas máximas"
            height="48px"
            width="48px"
            />
        <p>Vientos: ${current.wind_speed}km/h ${current.wind_degree}°${current.wind_dir} </p>
    </div>
    `;
};

getCity(form.elements.select_city.value);
