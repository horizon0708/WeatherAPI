var userCity;
var countryCode;
var weatherData;
var tempKelvin;
var tempCelcius;
var tempFarenheit;

var APIKey = "d93ea9433d5445c3dcae1dc6351df11a"; // I have to expose the key on Client for this FreeCodeCamp Project.

$(document).ready(function () {
    getLocation().then(function () {
        getWeather().then(function () {
            changeDOM();
        });
    });
});

$('').click(function () {

});

function getLocation() {
    return new Promise((resolve, reject) => {
        var request = $.ajax({
            url: "http://ip-api.com/json",
            type: 'GET',
            dataType: 'json'
        });
        request.onload = function () {
            if (request.status === 200) {
                resolve(geoLocation = request.response);
                geoLocation = JSON.parse(geoLocation);
                userCity = geoLocation.city;
                countryCode = geoLocation.countryCode;
            } else {
                reject(Error('There was an Error getting location'));
            }
        }
    });
}

function getWeather() {
    return new Promise((resolve, reject) => {
        var request = $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "," + countryCode + "&APPID=" + APIKey,
            type: 'GET',
            dataType: 'json'
        });
        request.onload = function () {
            if (request.status === 200) {
                resolve(weatherData = JSON.parse(request.response));
            } else {
                reject(Error('There was an Error gggg'));
            }
        }
    });
}

function changeDOM() {
    document.getElementById("weather-text").innerHTML = weatherData.weather[0].description;
    tempKelvin = weatherData.main.temp;
    tempCelcius = tempKelvin - 273.15;
    document.getElementById("degree").innerHTML = tempCelcius + " C";
}