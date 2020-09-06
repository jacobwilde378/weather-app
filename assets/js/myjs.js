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
        var name = response.city.name
        $("#displayCityName").text(name)
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
        var currentIconLink = 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png'
        var currentIconAlt = weatherData.current.weather[0].main
        console.log(currentTemp, currentHumidity, currentWindSpeed, currentUV)
        $("#curIcon").attr("src", currentIconLink)
        $("#curIcon").attr("alt", currentIconAlt)
        $("#curTemp").text(currentTemp + String.fromCharCode(8457))
        $("#curHumidity").text(currentHumidity + "%")
        $("#curWindSpeed").text(currentWindSpeed + " MPH")
        $("#curUV").text(currentUV)
        var uvBox = $(".shade")
        uvBox.removeClass("favorable moderate severe")
        if (currentUV <= 2) {
            uvBox.addClass("favorable")
        }
        else if(currentUV <= 5) {
            uvBox.addClass("moderate")
        }
        else {
            uvBox.addClass("severe")
        }
        var day1 = moment()
        console.log(day1.format())






        console.log("done")
    })
}
