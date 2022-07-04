

// get API

var getCity = function(city) {
    // insert API url
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
    console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log("working?");
            })
        } else {
            alert("Error. City not found.");
        }
    });
};

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
};
citySearchEl.addEventListener("submit", formSubmitHandler);