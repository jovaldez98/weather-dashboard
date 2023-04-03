var searchCity = document.getElementById('enter-city');
var searchBtn = document.getElementById('search-button');
var clearBtn = document.getElementById('clear-history');
var name = document.getElementById('city-name');
var todayWeather= document.getElementById('today-weather');
var currentImg = document.getElementById('current-img');
var currentTemp = document.getElementById('temperature');
var currentHum = document.getElementById('humidity');
var currentWnd = document.getElementById('wind');
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



//weather icon url 
//https://openweathermap.org/img/w/01d.png