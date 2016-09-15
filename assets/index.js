// separate out weather sections?

var testData =
{
  coord: {
    lon: -73.95,
    lat: 40.74
  },
  weather: [
    {
      id: 320,
      // id: 800,
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

var indexPage = {
  apiKey: '&appid=4f16dd1b43b18739eed18f43379a5287',
  apiQuery: 'api.openweathermap.org/data/2.5/weather?',
  apiArgs: '&units=metric',


	init: function(){
    console.log("hello");
    // var item = this.getWeatherData('40.727944', '-73.951844');
    this.weatherContainer = document.getElementById('weatherBox');
    this.svgContainer = d3.select('#weatherBox').append("svg").attr("width", 500).attr("height", 500);

    // For testing
    this.data = testData;
    this.initPercipitation(testData.weather[0].id);
  },

  getWeatherData: function(lat, lon) {
    var latLon = 'lat=' + lat + '&lon=' + lon;
    var apiCall = this.apiQuery + latLon + this.apiKey + this.apiArgs;
    console.log(apiCall);

    var xhr = new XMLHttpRequest();
  },

  initPercipitation: function(weatherCode) {
    var numCircles = 100;

    if ((weatherCode > 300) && (weatherCode < 400)) {

      for (var i = 0; i < numCircles; i++) {
        var circle = svgContainer.append("circle").attr("r", 20);
        this.svgContainer.appendChild(circle).attr("r", 20);
      }
      var circles = d3.selectAll("circle");
      circles.style("fill", "steelblue");
      // circles.transition().duration(500).attr("cy", 100)
    }
  }
}

// d3.select("#circ").transition().duration(500)
//     .attr("cx", Math.random() * 200) // change this to random 2px
//   .attr("cy", Math.random() * 200) // change this to random 2px
//     .each("end", function () {
//     myTransf();
// });


indexPage.init();
