var api_key = "c49acaab6fd47abd921dc6918d8cf53b"
var convertKelvin = function (kTemp) {
    var fTemp = Math.round(((kTemp - 273.15) * (9 / 5) + 32))
    return fTemp
}
var populateHistory = function () {
    
    $("#hist-1").html(localStorage.getItem("city-1"))
    $("#hist-2").html(localStorage.getItem("city-2"))
    $("#hist-3").html(localStorage.getItem("city-3"))
    $("#hist-4").html(localStorage.getItem("city-4"))
    $("#hist-5").html(localStorage.getItem("city-5"))
    $("#hist-6").html(localStorage.getItem("city-6"))
    $("#hist-7").html(localStorage.getItem("city-7"))
    $("#hist-8").html(localStorage.getItem("city-8"))
    $("#hist-9").html(localStorage.getItem("city-9"))
    $("#hist-10").html(localStorage.getItem("city-10"))
}

var adjustLocalStorage = function (newCityName) {

    if(localStorage.getItem("city-9")){
        localStorage.setItem("city-10", localStorage.getItem("city-9"))
    }

    if(localStorage.getItem("city-8")){
        localStorage.setItem("city-9", localStorage.getItem("city-8"))
    }

    if(localStorage.getItem("city-7")){
        localStorage.setItem("city-8", localStorage.getItem("city-7"))
    }

    if(localStorage.getItem("city-6")){
        localStorage.setItem("city-7", localStorage.getItem("city-6"))
    }

    if(localStorage.getItem("city-5")){
        localStorage.setItem("city-6", localStorage.getItem("city-5"))
    }

    if(localStorage.getItem("city-4")){
        localStorage.setItem("city-5", localStorage.getItem("city-4"))
    }

    if(localStorage.getItem("city-3")){
        localStorage.setItem("city-4", localStorage.getItem("city-3"))
    }

    if(localStorage.getItem("city-2")){
        localStorage.setItem("city-3", localStorage.getItem("city-2"))
    }

    if(localStorage.getItem("city-1")){
        localStorage.setItem("city-2", localStorage.getItem("city-1"))
    }

    localStorage.setItem("city-1", newCityName)
}

function findCityName() {
    var cityName = document.querySelector("#searchCityName").value;
    weatherSearch(cityName);
}

let checkFetch = function (response) {
    if (response.status === 404) {
        alert("City Name not found.  Please try again!")
        return
    }
    return response
}

var weatherSearch = function (cityName) {
    adjustLocalStorage(cityName);
    populateHistory();
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?'
        + 'q=' + cityName
        + '&appid=' + api_key
    )
        .then(checkFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;
            var name = response.city.name
            $("#displayCityName").text(name + " " + moment().format("L"))
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?'
                + 'lat=' + lat
                + '&lon=' + lon
                + '&appid=' + api_key
            );
        })
        .then(function (formatData) {
            return formatData.json();
        })
        .then(function (weatherData) {
            var currentTemp = convertKelvin(weatherData.current.temp)
            var currentHumidity = weatherData.current.humidity
            var currentWindSpeed = weatherData.current.wind_speed
            var currentUV = weatherData.current.uvi
            var currentIconLink = 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png'
            var currentIconAlt = weatherData.current.weather[0].main
            $("#curIcon").attr("src", currentIconLink)
            $("#curIcon").attr("alt", currentIconAlt)
            $("#curTemp").text(currentTemp + String.fromCharCode(8457))
            $("#curHumidity").text(currentHumidity + "%")
            $("#curWindSpeed").text(currentWindSpeed + " MPH")
            $("#curUV").text(currentUV)
            $("#day-1-icon").attr("src", "http://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + "@2x.png")
            $("#day-1-icon").attr("alt", weatherData.daily[1].weather[0].main)
            $("#day-1-temp").text("Temperature:  " + convertKelvin(weatherData.daily[1].temp.day) + String.fromCharCode(8457))
            $("#day-1-humidity").text("Humidity:  " + weatherData.daily[1].humidity + "%")

            $("#day-2-icon").attr("src", "http://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + "@2x.png")
            $("#day-2-icon").attr("alt", weatherData.daily[2].weather[0].main)
            $("#day-2-temp").text("Temperature:  " + convertKelvin(weatherData.daily[2].temp.day) + String.fromCharCode(8457))
            $("#day-2-humidity").text("Humidity:  " + weatherData.daily[2].humidity + "%")

            $("#day-3-icon").attr("src", "http://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + "@2x.png")
            $("#day-3-icon").attr("alt", weatherData.daily[3].weather[0].main)
            $("#day-3-temp").text("Temperature:  " + convertKelvin(weatherData.daily[3].temp.day) + String.fromCharCode(8457))
            $("#day-3-humidity").text("Humidity:  " + weatherData.daily[3].humidity + "%")

            $("#day-4-icon").attr("src", "http://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + "@2x.png")
            $("#day-4-icon").attr("alt", weatherData.daily[4].weather[0].main)
            $("#day-4-temp").text("Temperature:  " + convertKelvin(weatherData.daily[4].temp.day) + String.fromCharCode(8457))
            $("#day-4-humidity").text("Humidity:  " + weatherData.daily[4].humidity + "%")

            $("#day-5-icon").attr("src", "http://openweathermap.org/img/wn/" + weatherData.daily[5].weather[0].icon + "@2x.png")
            $("#day-5-icon").attr("alt", weatherData.daily[5].weather[0].main)
            $("#day-5-temp").text("Temperature:  " + convertKelvin(weatherData.daily[5].temp.day) + String.fromCharCode(8457))
            $("#day-5-humidity").text("Humidity:  " + weatherData.daily[5].humidity + "%")
            var uvBox = $(".shade")
            uvBox.removeClass("favorable moderate severe")
            if (currentUV <= 2) {
                uvBox.addClass("favorable")
            }
            else if (currentUV <= 5) {
                uvBox.addClass("moderate")
            }
            else {
                uvBox.addClass("severe")
            }
            $("#day-1-day").text(moment().add(1, 'days').format("dddd"))
            $("#day-1-date").text(moment().add(1, 'days').format("L"))
            $("#day-2-day").text(moment().add(2, 'days').format("dddd"))
            $("#day-2-date").text(moment().add(2, 'days').format("L"))
            $("#day-3-day").text(moment().add(3, 'days').format("dddd"))
            $("#day-3-date").text(moment().add(3, 'days').format("L"))
            $("#day-4-day").text(moment().add(4, 'days').format("dddd"))
            $("#day-4-date").text(moment().add(4, 'days').format("L"))
            $("#day-5-day").text(moment().add(5, 'days').format("dddd"))
            $("#day-5-date").text(moment().add(5, 'days').format("L"))
        })
}
populateHistory();
$(".city-button").on('click', function (event) {
    var cityName = $(event.target).text()
    weatherSearch(cityName);
})
$(".clear").on('click', function () {
    localStorage.clear();
    populateHistory();
})