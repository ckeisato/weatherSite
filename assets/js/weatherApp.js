// Precipitation module
// Gets the number of "preciptation" and type??
// Get better way of getting location for UI
var testData =
{
  coord: {
    lon: -73.95,
    lat: 40.74
  },
  weather: [
    {
      id: 320,
      main: "Clear",
      description: "clear sky",
      icon: "01n"
    }
  ],
  base: "stations",
  main: {
    temp: 21.95,
    pressure: 1020.4,
    humidity: 68,
    temp_min: 21.11,
    temp_max: 22.78
  },
  wind: {
    speed: 4.3,
    deg: 189
  },
  clouds: {
    all: 0
  },
  dt: 1473817006,
  sys: {
    type: 3,
    id: 1452377816,
    message: 0.0416,
    country: "US",
    sunrise: 1473849361,
    sunset: 1473894333
  },
  id: 5125125,
  name: "Long Island City",
  cod: 200
}

define(['precipitation'], function(preciptation) {
  return {

    apiKey: '&appid=4f16dd1b43b18739eed18f43379a5287',
    apiQuery: 'api.openweathermap.org/data/2.5/weather?',
    apiArgs: '&units=metric',

    // Get main DOM objects and set weather object
  	init: function(){
      console.log("hello");
      // var item = this.getWeatherData('40.727944', '-73.951844');
      this.svgContainer = d3.select('#weatherBox');

      // For testing
      this.data = testData;
      preciptation.initPercipitation(testData.weather[0].id);
    },

    // Make API call to get weather data?????
    getWeatherData: function(lat, lon) {
      var latLon = 'lat=' + lat + '&lon=' + lon;
      var apiCall = this.apiQuery + latLon + this.apiKey + this.apiArgs;
      console.log(apiCall);

      var xhr = new XMLHttpRequest();
    }

  }
});
