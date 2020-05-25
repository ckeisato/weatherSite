define(['precipitation', 'temperature', 'apiKeys', 'debounce', 'testData'], function(preciptation, temperature, apiKeys, debounce, testData) {
  return {

    openWeatherApiQuery: 'http://api.openweathermap.org/data/2.5/weather?',
    openWeatherApiArgs: '&units=imperial',

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
      var latLon = 'lat=' + lat + '&lon=' + lon,
          apiCall = this.openWeatherApiQuery + latLon + this.apiKeys.openWeather + this.openWeatherApiArgs,
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
          humidity = weatherData.main.humidity;

      document.getElementById("location").innerHTML = location;
      document.getElementById("conditions").innerHTML = conditions;
      document.getElementById("humidity").innerHTML = "humidity: " + humidity + '%';
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
