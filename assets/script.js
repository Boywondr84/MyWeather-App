var cityInfo = document.querySelector("div");

// get API

var getCity = function(city) {
    // insert API url
    var requestUrl = "api.openweathermap.org/data/2.5/weather?id=524901&appid=";

    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });3
        }
    })
};