async function fetchWeather(){
    console.log(`it should be fetching something`);

    var city = document.querySelector('#searchCity').value;

    var APIkey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then( displayWeather ) ;
}

function displayWeather ( cityData ) {
    console.log (`[displayWeather-cityData]`, cityData);

    saveSearchedCity(cityData.name);

    document.querySelector('.city-name').textContent = cityData.name;

    var iconURL = "http://openweathermap.org/img/w/" + cityData.weather[0].icon + ".png";
    var cityIcon = $("<img>");
    cityIcon.attr("src", iconURL);
    $('.city-name').append(cityIcon); 

    var timeStamp = (cityData.dt)*1000;
    var date_ob = new Date(timeStamp);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    console.log( month + "." + date + "." + year);
    document.querySelector('.date').textContent = month + "/" + date + "/" + year;

    document.querySelector('.temperature').textContent = `Temperature: `+ (cityData.main.temp - 273.15).toFixed(1) + `°C`;
    document.querySelector('.humidity').textContent = `Humidity: `+ cityData.main.humidity + `%`;
    document.querySelector('.wind-speed').textContent = `Wind Speed: ` + (cityData.wind.speed * 2.2369).toFixed(1) + ` MPH`;

    var latitude = cityData.coord.lat;
    var longitude = cityData.coord.lon;
    fetchUVindex (latitude, longitude);

}

function fetchUVindex (latitude, longitude) {
    var APIkey = "166a433c57516f51dfab1f7edaed8413";
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + latitude + "&lon=" + longitude;
    $.ajax({ url: uvURL, method: "GET" }).then( displayUVindex )
}

function displayUVindex (UVindexData) {
    console.log ('[displayUVindex', UVindexData);
    document.querySelector('.uv-index').innerHTML = 
    `UV Index: <span id='uv-color'>${UVindexData.value}</span>`;
    
    if ( 0 <= UVindexData.value && UVindexData.value <= 2 ){
        $('#uv-color').addClass('green');
    }
    else if ( 3 <= UVindexData.value && UVindexData.value <= 5 ){
        $('#uv-color').addClass('yellow');
    } 
    else if ( 6 <= UVindexData.value && UVindexData.value <= 7 ){
        $('#uv-color').addClass('orange');
    }
    else if ( 8 <= UVindexData.value && UVindexData.value <= 10 ){
        $('#uv-color').addClass('red');
    }
    else if ( UVindexData >= 11 ) {
        $('#uv-color').addClass('violet');
    }

    fetchForecast();
}

function fetchForecast () {    
    var city = document.querySelector('#searchCity').value;
    var APIkey = "166a433c57516f51dfab1f7edaed8413";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" +APIkey;

    $.ajax({ url: forecastURL, method: "GET" }).then( displayForecast ) ;
}

function displayForecast (forecastData) {
    console.log(`[display forecastAPI]`, forecastData );

    var timeStampOne = new Date ((forecastData.list[7].dt)*1000) ;
    var year = timeStampOne.getFullYear();
    var month = ("0" + (timeStampOne.getMonth() + 1)).slice(-2);
    var date = ("0" + timeStampOne.getDate()).slice(-2);
    document.querySelector('.date-one').textContent = month + "/" + date + "/" + year;

    var timeStampTwo = new Date ((forecastData.list[15].dt)*1000) ;
    var year = timeStampTwo.getFullYear();
    var month = ("0" + (timeStampTwo.getMonth() + 1)).slice(-2);
    var date = ("0" + timeStampTwo.getDate()).slice(-2);
    document.querySelector('.date-two').textContent = month + "/" + date + "/" + year;

    var timeStampThree = new Date ((forecastData.list[23].dt)*1000) ;
    var year = timeStampThree.getFullYear();
    var month = ("0" + (timeStampThree.getMonth() + 1)).slice(-2);
    var date = ("0" + timeStampThree.getDate()).slice(-2);
    document.querySelector('.date-three').textContent = month + "/" + date + "/" + year;

    var timeStampFour = new Date ((forecastData.list[31].dt)*1000) ;
    var year = timeStampFour.getFullYear();
    var month = ("0" + (timeStampFour.getMonth() + 1)).slice(-2);
    var date = ("0" + timeStampFour.getDate()).slice(-2);
    document.querySelector('.date-four').textContent = month + "/" + date + "/" + year;

    var timeStampFive = new Date ((forecastData.list[39].dt)*1000) ;
    var year = timeStampFive.getFullYear();
    var month = ("0" + (timeStampFive.getMonth() + 1)).slice(-2);
    var date = ("0" + timeStampFive.getDate()).slice(-2);
    document.querySelector('.date-five').textContent = month + "/" + date + "/" + year;

    var oneiconURL = "http://openweathermap.org/img/w/" + forecastData.list[7].weather[0].icon + ".png";
    var onedayIcon = $("<img>");
    onedayIcon.attr("src", oneiconURL);
    $('.date-one').append(onedayIcon);

    var twoiconURL = "http://openweathermap.org/img/w/" + forecastData.list[15].weather[0].icon + ".png";
    var twodayIcon = $("<img>");
    twodayIcon.attr("src", twoiconURL);
    $('.date-two').append(twodayIcon); 

    var threeiconURL = "http://openweathermap.org/img/w/" + forecastData.list[23].weather[0].icon + ".png";
    var threedayIcon = $("<img>");
    threedayIcon.attr("src", threeiconURL);
    $('.date-three').append(threedayIcon); 

    var fouriconURL = "http://openweathermap.org/img/w/" + forecastData.list[31].weather[0].icon + ".png";
    var fourdayIcon = $("<img>");
    fourdayIcon.attr("src", fouriconURL);
    $('.date-four').append(fourdayIcon); 

    var fiveiconURL = "http://openweathermap.org/img/w/" + forecastData.list[39].weather[0].icon + ".png";
    var fivedayIcon = $("<img>");
    fivedayIcon.attr("src", fiveiconURL);
    $('.date-five').append(fivedayIcon); 

   
    document.querySelector('.temp-one').textContent = `Temp: `+ (forecastData.list[7].main.temp - 273.15).toFixed(1) + `°C`;
    document.querySelector('.temp-two').textContent = `Temp: `+ (forecastData.list[15].main.temp - 273.15).toFixed(1) + `°C`;
    document.querySelector('.temp-three').textContent = `Temp: `+ (forecastData.list[23].main.temp - 273.15).toFixed(1) + `°C`;
    document.querySelector('.temp-four').textContent = `Temp: `+ (forecastData.list[31].main.temp - 273.15).toFixed(1) + `°C`;
    document.querySelector('.temp-five').textContent = `Temp: `+ (forecastData.list[39].main.temp - 273.15).toFixed(1) + `°C`;

    document.querySelector('.humid-one').textContent = `Humidity: `+ forecastData.list[7].main.humidity + `%`;
    document.querySelector('.humid-two').textContent = `Humidity: `+ forecastData.list[15].main.humidity + `%`;
    document.querySelector('.humid-three').textContent = `Humidity: `+ forecastData.list[23].main.humidity + `%`;
    document.querySelector('.humid-four').textContent = `Humidity: `+ forecastData.list[31].main.humidity + `%`;
    document.querySelector('.humid-five').textContent = `Humidity: `+ forecastData.list[39].main.humidity + `%`;
    
}

function saveSearchedCity (city) {
    var cityList = localStorage.cityList ? JSON.parse(localStorage.cityList) : [];
    

    if (localStorage.cityList) {
        cityList = JSON.parse(localStorage.cityList);
        console.log(`[if]`, cityList);
        
        cityList.push (city);
        localStorage.setItem('cityList', JSON.stringify(cityList));
    }
    else {
        console.log(`[else]`, cityList);
        
        cityList.push (city);
        localStorage.setItem('cityList', JSON.stringify(cityList));
    }

  renderButtons(cityList);
}

function renderButtons(cityList) {
    
    var buttonViewEl = document.querySelector('#buttons-view');
    
    buttonViewEl.innerHTML='';

    cityList.forEach (
        function (item){
        buttonViewEl.innerHTML += 
        `
        <button class='btn btn-light' data-name='city' style='background-color: lightblue; width: 200px'>${item}</button>
        `
        }
    )
}

