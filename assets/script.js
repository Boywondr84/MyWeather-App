var cityInfo = document.querySelector("div");

// get API

var getCity = function() {
    // insert API url
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
    console.log("testing");
    fetch(requestUrl).then(function (response) {
        // if successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log("working?");
            })
        }
    });
};

getCity();

// submit button create and functionality