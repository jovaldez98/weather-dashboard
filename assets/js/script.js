var searchCity = document.getElementById('enter-city');
var searchBtn = document.getElementById('search-button');
var clearBtn = document.getElementById('clear-history');
var nameEl = document.getElementById('city-name');
var todayWeather = document.getElementById('today-weather');
var historyEl = document.getElementById('history');
var currentImg = document.getElementById('current-img');
var mainTempEl = document.getElementById('temperature');
var mainHumEl = document.getElementById('humidity');
var mainWndEl = document.getElementById('wind-speed');
var fiveDay = document.getElementById('fiveday-header');
var ApiKey = "c177e89e479e96adeb080c247a54d560";
var cityName = [];
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

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


    });
}

// 5-day forecast
function getForecastWeather(lat, lon) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + ApiKey + '&units=imperial';

    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        fiveDay.classList.remove("d-none");
                        
        //  display forecast for next 5 days

        var forecastEls = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastEls.length; i++) {
            forecastEls[i].innerHTML = "";
            var forecastIndex = i * 8 + 4;
            var forecastDate = new Date(data.list[forecastIndex].dt * 1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            var forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEls[i].append(forecastDateEl);

            var weatherImgEl = document.createElement("img");
            weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
            weatherImgEl.setAttribute("alt", data.list[forecastIndex].weather[0].description);
            forecastEls[i].append(weatherImgEl);
            var forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + (data.list[forecastIndex].main.temp) + " &#176F";
            forecastEls[i].append(forecastTempEl);
            var forecastHumEl = document.createElement("p");
            forecastHumEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumEl);
        }

        getSearchHistory(searchBtn, clearBtn);
    });
}


 // Local storage for search

 searchBtn.addEventListener("click", function () {
    var searchName = searchCity.value;
    getWeather(searchName);
    searchHistory.push(searchName);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    getSearchHistory();
});

 // Clear History button

 clearBtn.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    getSearchHistory();
});

function getSearchHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        var historyInput = document.createElement("input");
        historyInput.setAttribute("type", "text");
        historyInput.setAttribute("readonly", true);
        historyInput.setAttribute("class", "form-control d-block bg-white");
        historyInput.setAttribute("value", searchHistory[i]);
        historyInput.addEventListener("click", function () {
            getWeather(historyItem.value);
        })
        historyEl.append(historyInput);
    }
}

getSearchHistory();
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
}
