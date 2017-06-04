var userCity;
var countryCode;
var weatherData;
var tempKelvin;
var tempCelcius;
var tempFarenheit;
var isCelcius = true;

var APIKey = "d93ea9433d5445c3dcae1dc6351df11a"; // I have to expose the key on Client for this FreeCodeCamp Project.

$(document).ready(function () {
    getLocation().then(function () {
        getWeather().then(function () {
            changeDOM();
        });
    });
});

$('.button').click(function () {
    toggleUnits();
});

function getLocation() {
    return new Promise((resolve, reject) => {
        var request = $.ajax({
            url: "https://ipapi.co/json/",
            type: 'GET',
            dataType: 'json'
        });
        request.onload = function () {
            if (request.status === 200) {
                resolve(geoLocation = request.response);
                geoLocation = JSON.parse(geoLocation);
                userCity = geoLocation.city;
                countryCode = geoLocation.country;
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
    console.log(weatherData);
    $("#weather-text").html(weatherData.weather[0].description);
    tempKelvin = weatherData.main.temp;
    tempCelcius = tempKelvin - 273.15;
    tempFarenheit = tempCelcius * 1.8 + 32;
    $("#degree").html(tempCelcius + "° C");
    $('#city').html(userCity);
    $('#icon').attr("src","http://openweathermap.org/img/w/"+ weatherData.weather[0].icon +".png")
}

function toggleUnits(){
    if (isCelcius){
        $("#degree").html(tempFarenheit + "° F");
        isCelcius = false;
    } else {
        $("#degree").html(tempCelcius + "° C");
        isCelcius = true;
    }
}