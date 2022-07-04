

// get Geocoding API

var getCity = function(city) {
    // insert API url
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=386d421121bbbad42dc1ad82319e7fc0";
    console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
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
                getCityNameWithLatLon (lat, lon);
                
    })
}
        else {
            alert("Error. City not found.");
        }
    });
}       
        
// get lat/lon API
var getCityNameWithLatLon = function(lat, lon) {
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