// var testData =
// {
//   coord: {
//     lon: -73.95,
//     lat: 40.74
//   },
//   weather: [
//     {
//       id: 320,
//       main: "Clear",
//       description: "clear sky",
//       icon: "01n"
//     }
//   ],
//   base: "stations",
//   main: {
//     temp: 21.95,
//     pressure: 1020.4,
//     humidity: 68,
//     temp_min: 21.11,
//     temp_max: 22.78
//   },
//   wind: {
//     speed: 4.3,
//     deg: 189
//   },
//   clouds: {
//     all: 0
//   },
//   dt: 1473817006,
//   sys: {
//     type: 3,
//     id: 1452377816,
//     message: 0.0416,
//     country: "US",
//     sunrise: 1473849361,
//     sunset: 1473894333
//   },
//   id: 5125125,
//   name: "Long Island City",
//   cod: 200
// }

define(['precipitation', 'temperature', 'apiKeys', 'debounce'], function(preciptation, temperature, apiKeys, debounce) {
  return {

    openWeatherApiQuery: 'http://api.openweathermap.org/data/2.5/weather?',
    openWeatherApiArgs: '&units=metric',
    darkSkyApiUrl: 'https://api.darksky.net/forecast',
    
    // Get main DOM objects and set weather object
  	init: function(){
      this.weatherBox = d3.select('#weatherBox');
      this.temperature = temperature;
      this.preciptation = preciptation;
      this.apiKeys = apiKeys;
      this.getGooglePlacesScript();
    },

    // Make API call to get weather data?????
    getWeatherData: function(lat, lon) {
      var latLon = '/' + lat + ',' + lon,
          apiCall = this.darkSkyApiUrl + '/' + this.apiKeys.darkSky + latLon,
          xhr = new XMLHttpRequest(),
          that = this;

      xhr.open('GET', apiCall);
      xhr.send(null);

      xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            that.initNewWeather(JSON.parse(xhr.responseText));            
          } 
          else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
          }
        }
      };
    },

    setText: function(weatherData) {
      var location = weatherData.name,
          conditions = weatherData.weather[0].description,
          temperature = weatherData.main.temp;
      
      document.getElementById("location").innerHTML = location;
      document.getElementById("conditions").innerHTML = conditions;
      document.getElementById("temperature").innerHTML = temperature + "&deg;";
    },

    initNewWeather: function(weatherData) {
      document.getElementById('weatherBox').innerHTML = '';

      this.weatherData = weatherData;
      this.temperature.initTemperature(weatherData.main.temp, this);
      this.preciptation.initPercipitation(weatherData.weather[0].id, this);
      this.setText(this.weatherData);
    },

    getGooglePlacesScript: function() {
      var googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKeys.googlePlaces + "&libraries=places",
          scriptTag = document.getElementById('google-maps-script'),
          that = this;

      scriptTag.addEventListener("load", function(event) {
        that.initLocation();
      });

      scriptTag.setAttribute('src', googleMapsUrl);
    },

    initLocation: function() {
      var input =  document.getElementById('input-location'),
          autocomplete = new google.maps.places.Autocomplete(input),
          that = this;

      autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        that.getWeatherData(place.geometry.location.lat(), place.geometry.location.lng());
      });
    }
  }
});
