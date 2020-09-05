var api_key = "c49acaab6fd47abd921dc6918d8cf53b"
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
    })
}
