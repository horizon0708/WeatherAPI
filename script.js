var userLatitude;
var userLongitude;
var userCity;
var CountryCode;
var geoLocation;
var test;
var APIKey = "d93ea9433d5445c3dcae1dc6351df11a"; // I have to expose the key on JS for this FreeCodeCamp Project.

$(document).ready(function () {
            getLocation().then(function(){
                console.log(CountryCode);
                LoadWeather();
            });

            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(function (position) {
            //         userLatitude = position.coords.latitude;
            //         userLongitude = position.coords.longitude;
            //     });
            //     console.log(userLatitude);
            //     waitForElement();

            // }
        });

        $('').click(function () {

        });

        function waitForElement() {
                    if (userLatitude !== "undefined") {
                        LoadWeather().then(
                            console.log(test));
                    } else {
                        setTimeout(waitForElement, 1000);
                        console.log("WAIT");
                    }
                }

        function getLocation(){
            return new Promise((resolve, reject) => {
                var request = $.ajax({
                    url: "http://ip-api.com/json",
                    type: 'GET',
                    dataType: 'json'
                });
                request.onload = function(){
                    if (request.status === 200){
                        resolve(geoLocation = request.response);
                        geoLocation = JSON.parse(geoLocation);
                        userCity = geoLocation.city;
                        CountryCode = geoLocation.countryCode;
                        console.log(geoLocation);
                        console.log(CountryCode);
                    } else {
                        reject(Error('There was an Error getting location'));
                    }
                }
            });
        }

        function LoadWeather() {
            return new Promise((resolve, reject) => {
                var request = $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/weather?q="+ userCity +","+ CountryCode +"&APPID=" + APIKey,
                    type: 'GET',
                    dataType: 'json'
                });
                request.onload = function () {
                    if (request.status === 200) {
                        resolve(test = JSON.parse(request.response));
                        console.log(request.response);
                        console.log(test);
                    } else {
                        reject(Error('There was an Error getting an Error gggg'));
                    }
                }
            });
        }