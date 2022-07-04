

// get Geocoding API

var getCity = function(city) {
    // insert API url
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
    console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
        //         for (var i = 0; i < data.length; i++) {
        //             if (data[0].lat) {
        //                 lat = data[0].lat;
        //             }
        //         }
        //         var lat = data[0].lat;
        //         var lon = data[0].lon;
        //         retainCityName (lat, lon);
        //     })
        // }
        else {
            alert("Error. City not found.");
        }
    });
}       
        
// get lat/lon API
var retainCityName = function(lat, lon) {
    // insert API url
    var cityLatLonUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=386d421121bbbad42dc1ad82319e7fc0";
    fetch(cityLatLonUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    });
}
// getCity("Albany");

// Form info capture
var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");

// Form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityNameEl.value.trim();
    console.log(cityName);
if (cityName) {
    getCity(cityName);
    cityNameEl.value = "";
} else {
    alert("Please enter a city name.");
}
    // console.log(event);
}
citySearchEl.addEventListener("submit", formSubmitHandler);