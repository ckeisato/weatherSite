// Wind module
// weather conditions http://openweathermap.org/weather-conditions

define(['debounce'], function(debounce) {

  return {
    initWind: function(weatherCode, parent) {
      this.parent = parent;
    },
  }
});
