let cityData = [
    { name: "", lat: "", lon: ""},
    { name: "台北", lat: 25.0856513, lon: 121.421409 },
    { name: "新北", lat: 24.91571, lon: 121.6739 },
    { name: "桃園", lat: 24.93759, lon: 121.2168},
    { name: "台南", lat: 23.1417, lon: 120.2513 },
    { name: "彰化", lat: 23.99297, lon: 120.4818},
    { name: "屏東", lat: 22.54951, lon: 120.62 },
    { name: "雲林", lat: 23.75585, lon: 120.3897},
    { name: "苗栗", lat: 24.48927, lon: 120.9417 },
    { name: "嘉義", lat: 23.45889, lon: 120.574 },
    { name: "新竹", lat: 24.70328, lon: 121.1252},
    { name: "南投", lat: 23.83876, lon: 120.9876 },
    { name: "宜蘭", lat: 24.69295, lon: 121.7195 },
    { name: "基隆", lat: 25.10898, lon: 121.7081 },
    { name: "花蓮", lat: 23.7569, lon: 121.3542 },
    { name: "台東", lat: 22.98461, lon: 120.9876 },
    { name: "台中", lat: 24.1852333, lon: 120.4946381 },
    { name: "高雄", lat: 22.7000444, lon: 120.0508691 }, 
    { name: "元智", lat: 24.9703173, lon: 121.2608673 }
];

$(function(){
    for(let x=0;x<cityData.length;x++){
        $("#citySelect").append(
            `<option value='${x}'>${cityData[x].name}</option>`
        );
    }
    $("#citySelect").on("change", loadServerData);
});

function loadServerData(){
    console.log("[loadServerData] in");
    // debugger;
    $("#result").empty();
    if(this.value == 0) return;
    // Request Weather Data
    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
    let weatherMapAPIKey = "8a45358b08ee4beb43ace3e4914a7dd8";
    $.getJSON(weatherAPI_URL,{
        lat:cityData[this.value].lat,
        lon:cityData[this.value].lon,
        appid:weatherMapAPIKey,
        units:'metric',
        lang:'zh_tw'
    })
    .done(function(data){
        console.log(data);
        $("#result").append(
            `<p>氣溫：${data.main.temp_min} ~ ${data.main.temp_max}</p>`
        );
        $("#result").append(
            `<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>${data.weather[0].description}</p>`
        );
    })
    .fail(function(){console.log("Error")})
    .always(function(){console.log("Always")});

}