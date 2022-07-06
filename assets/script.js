var date = moment();
function displayDate() {
    document.getElementById("date").innerText = "Date: " + date.format("MMMM Do, h:mm");
};
displayDate();

var cityContainerEl = document.getElementById("retrieve city");
var cityNameContainerEl = document.getElementById("city");

var cityNameHistory = [];
var weatherEl = document.getElementById("weather conditions");

// get Geocoding API

var getCity = function (city) {
    // insert API url
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=386d421121bbbad42dc1ad82319e7fc0";
    // console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].lat) {
                        lat = data[i].lat;
                        // console.log(lat);
                    }
                    if (data[i].lon) {
                        lon = data[i].lon;
                        // console.log(lon);
                    }
                }
                var lat = data[0].lat;
                var lon = data[0].lon;
                getCityNameWithLatLon(lat, lon);

            })
        }
        else {
            alert("Error. City not found.");
        }
    });
}

// get lat/lon API (allows for UVI)
var getCityNameWithLatLon = function (lat, lon) {
    // insert API url
    var cityLatLonUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely&appid=386d421121bbbad42dc1ad82319e7fc0";
    fetch(cityLatLonUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                // console.log(data.current.weather[0].icon);
                // console.log(data.current.wind_speed);
                // for (var i = 0; i < data.length; i++) {
                //     // console.log (data[i].daily.temp.day);
                // }
                var temp = data.current.temp;
                var humidity = data.current.humidity;
                var uvi = data.current.uvi;
                var windSpeed = data.current.wind_speed;
                var img = data.current.weather[0].icon;

                $("#temp").append(" : " + temp + "&#176; F");
                $("#humidity").append(" : " + humidity + " % ");
                $("#windSpeed").append(" : " + windSpeed + " MPH ");
                $("#UVI").append(" : " + uvi);
                // $("#w-icon").attr("src", "https://api.openweathermap.org/img/wn/" + img + "png");
                // $("#w-icon").append("img src = "https://api.openweathermap.org/img/wn/" + img + "png");
                for (var i = 0; i < data.daily.length; i++) {
                    console.log(data.daily[i]);
                    var time = moment(data.daily[i].dt *1000).format("MMMM Do");
                    temp = data.daily[i].temp.day;
                    wind = data.daily[i].wind_speed;
                    humidity = data.daily[i].humidity;
                    // console.log(time);

                $(`#day-${i}`).append("Date: ", time);
                $(`#temp-${i}`).text("Temp: " + temp + " F");
                $(`#wind-${i}`).text("Wind: " + wind + " MPH");
                $(`#humidity-${i}`).text("Humidity: " + humidity + " % ");
                }
            })
        }
    })
};

// Form info capture
var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");

// Form submission
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityNameEl.value.trim();
    cityNameHistory.push(cityName);
    cityNameEl.value = "";
    

    // store city name
    localStorage.setItem("saved city", JSON.stringify(cityNameHistory));

    // console.log(cityNameHistory);


    // retrieve city name: placed in history and weather outlook
        // document.getElementById("retrieve city").textContent =
        // cityNameHistory = JSON.parse(localStorage.getItem("saved city")) || [];
    // Load history
    function loadHistory() {
        populate = JSON.parse(localStorage.getItem("saved city"));
        

        for (i = 0; i < populate.length; i++) {
            // cityName = populate[i];
            // console.log(cityName);

        // create container
        var citySearch = document.createElement("p");
        citySearch.classlist = "retrieve-city"

        cityContainerEl.append(cityNameHistory);
        }

    }
    loadHistory();

    // cityContainerEl.append(cityName);



    document.getElementById("city").textContent =
        localStorage.getItem("saved city");



    if (cityName) {
        getCity(cityName);
        cityNameEl.value = "";

    } else {
        alert("Please enter a city name.");
    }
    // console.log(event);
}
citySearchEl.addEventListener("submit", formSubmitHandler);