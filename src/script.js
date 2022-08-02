//Date and Hour
let dayHours = document.querySelector ("#dayWeek-hours");
let dateIntro = document.querySelector ("#introDate");
let date = new Date ();
let hour = date.getHours();
let minutes = date.getMinutes ();
let day = date.getDate ();
let year = date.getFullYear();
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
let dayWeek = weekDays [date.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months [date.getMonth()];

dayHours.innerHTML =`${dayWeek}, ${hour}:${minutes}`;
dateIntro.innerHTML = `Hello! This is the weather for today, ${day} ${month} ${year}.`

//Geolocation and Temperature
//Search City
let searchCityInput = document.querySelector ("#form-city #search-city");
let city = document.querySelector ("#weather-today #city");

function showTemperature (response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureNowHtml = document.querySelector("#temperature-today");
    temperatureNowHtml.innerHTML = `${temperature} º`;
    celsius.style.color = 'black'
    fahrenheit.style.color = 'dimgray'

    let city = response.data.name;
    let cityNowHtml = document.querySelector ("#weather-today #city");
    cityNowHtml.innerHTML = `📍 ${city}`;

    let humidity = Math.round (response.data.main.humidity);
    let humidityNowHtml = document.querySelector ("#humidity-today");
    humidityNowHtml.innerHTML = `${humidity} %`;

    let wind = Math.round ((response.data.wind.speed)* 5/18);
    let windNowHtml = document.querySelector ("#wind-today");
    windNowHtml.innerHTML = `${wind} km/h`;

    let weatherDescription = response.data.weather[0].description;
    let weatherdescriptionHTML = document.querySelector ("#weather-description-today");
    weatherdescriptionHTML.innerHTML = `${weatherDescription}`;
}

function searchCity (event) {
    event.preventDefault ();
    
    if (searchCityInput.value) {
        let apiKey1="468b942dd84e0479f43dd4f5fcae3253";
        let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&appid=${apiKey}&units=metric`;
    
        axios.get(apiUrl1).then(showTemperature);      
    }else {
        alert ("Please insert a city!");
    }
}
let formChangecity = document.querySelector ("#form-city");
formChangecity.addEventListener ("submit", searchCity);

//Current location (default)
function logPosition (position) {
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey="468b942dd84e0479f43dd4f5fcae3253";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(logPosition);

//Button Current Position
let buttonCurrentPosition = document.querySelector ("#button-currentLocation");
function useCurrentLocation (event) {
    event.preventDefault ();
    navigator.geolocation.getCurrentPosition(logPosition);
}
buttonCurrentPosition.addEventListener ("click", useCurrentLocation);


//change celsius to fahrenheit
let fahrenheit = document.querySelector ("#fahrenheit");
let celsius = document.querySelector ("#celsius");

function changeToCelsius (event) {
    event.preventDefault ();
    celsius.style.color = 'black'
    fahrenheit.style.color = 'dimgray'
    let temperature = document.querySelector ("#temperature-today");
    temperature.innerHTML = "20º";
}

function changeToFahrenheit (event) {
    event.preventDefault ();
    celsius.style.color = 'dimgray'
    fahrenheit.style.color = 'black'
    let temperature = document.querySelector ("#temperature-today");
    temperature.innerHTML = "70º";
}

fahrenheit.addEventListener ("click", changeToFahrenheit);
celsius.addEventListener ("click", changeToCelsius);
