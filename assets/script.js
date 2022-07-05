var saveCityName = [];

// get Geocoding API

var getCity = function (city) {
    // insert API url
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=386d421121bbbad42dc1ad82319e7fc0";
    console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data, "geocoding");
                for (var i = 0; i < data.length; i++) {
                    if (data[i].lat) {
                        lat = data[i].lat;
                        console.log(lat);
                    }
                    if (data[i].lon) {
                        lon = data[i].lon;
                        console.log(lon);
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
                console.log(data, "one call");
                // pull data values for temp, alerts, uvi, etc.
                //     for (var i = 0; i < data.length; i++) {
                //         if (data[i].value()) {
                //             alerts = data[i].value();
                //             console.log(alerts);
            });
            // get the 5 day forecast
            var city5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
            fetch(city5Day).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data, "5 day");
                    })
                }
            });
        };
    });
}


// 5 day forecast
// var getCityNameWithLatLon = function (lat, lon) {
//     var city5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=386d421121bbbad42dc1ad82319e7fc0";
//     fetch(city5Day).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);
//             })
//         }
//     });
// }


// Form info capture
var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");

// Form submission
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityNameEl.value.trim();

     // store city name
    localStorage.setItem("saved city", JSON.stringify(cityName));

    console.log(cityName);

     // retrieve city name
    document.getElementById("retrieve city").innerHTML =
    localStorage.getItem("saved city");

    // for (var i = 0; i <)

    if (cityName) {
        getCity(cityName);
        cityNameEl.value = "";

    } else {
        alert("Please enter a city name.");
    }
    // console.log(event);
}
citySearchEl.addEventListener("submit", formSubmitHandler);

