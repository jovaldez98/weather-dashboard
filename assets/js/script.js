var searchCity = document.getElementById('enter-city');
var searchBtn = document.getElementById('search-button');
var clearBtn = document.getElementById('clear-history');
var nameEl = document.getElementById('city-name');
var todayWeather= document.getElementById('today-weather');
var currentImg = document.getElementById('current-img');
var mainTempEl = document.getElementById('temperature');
var mainHumEl = document.getElementById('humidity');
var mainWndEl = document.getElementById('wind-speed');
var fiveDay = document.getElementById('fiveday-header');
var ApiKey = "c177e89e479e96adeb080c247a54d560";
var cityName = [];

//fetch api url

 searchBtn.addEventListener ('click', function() {
    getWeather(searchCity.value);
 })


function getWeather(cityName) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + ApiKey + '&units=imperial';

    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);

         todayWeather.classList.remove("d-none");

        // data to display current weather
        var currentDate = new Date(data.dt * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
        var weatherImg = data.weather[0].icon;
        currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
        currentImg.setAttribute("alt", data.weather[0].description);
        mainTempEl.innerHTML = "temperature: " + (data.main.temp) + " &#176F";
        mainHumEl.innerHTML = "humidity: " + data.main.humidity + "%";
        mainWndEl.innerHTML = "wind-speed: " + data.wind.speed + " MPH";

        getForecastWeather(data.coord.lat, data.coord.lon);


    })
}

function getForecastWeather(lat, lon) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + ApiKey + '&units=imperial';

    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        //function call for creating weather cards
    })
}



