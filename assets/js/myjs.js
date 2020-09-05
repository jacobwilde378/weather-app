var api_key = "c49acaab6fd47abd921dc6918d8cf53b"
var convertKelvin = function (kTemp) {
   var fTemp = Math.round(((kTemp - 273.15) * (9/5) + 32))
   return fTemp
}
function weatherSearch() {
    var cityName = document.querySelector("#searchCityName").value;
    console.log(cityName)
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?'
        + 'q=' + cityName
        + '&appid=' + api_key
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        var lat = response.city.coord.lat;
        var lon = response.city.coord.lon;
        return fetch(
            'https://api.openweathermap.org/data/2.5/onecall?'
            + 'lat=' + lat
            + '&lon=' + lon
            + '&appid=' + api_key
        );
    })
    .then(function(formatData) {
        return formatData.json();
    })
    .then(function(weatherData) {
        console.log(weatherData)
        var currentTemp = convertKelvin(weatherData.current.temp)
        var currentHumidity = weatherData.current.humidity
        var currentWindSpeed = weatherData.current.wind_speed
        var currentUV = weatherData.current.uvi
        console.log(currentTemp, currentHumidity, currentWindSpeed, currentUV)
    })
}
