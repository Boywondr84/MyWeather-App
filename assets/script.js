var cityInfo = document.querySelector("div");

// get API

var getCity = function(city) {
    // insert API url
    var requestUrl = "api.openweathermap.org/data/2.5/weather?id=524901&appid=20c7d9be36c3304993a423c8f846f4cf";

    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })
};