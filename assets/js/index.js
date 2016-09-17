// separate out weather sections?
// TODO:
//  separate out preciptation function
//  separate out cloud rendering function

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

var indexPage = {
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
    this.setPercipitation(testData.weather[0].id);
  },

  // Make API call to get weather data
  getWeatherData: function(lat, lon) {
    var latLon = 'lat=' + lat + '&lon=' + lon;
    var apiCall = this.apiQuery + latLon + this.apiKey + this.apiArgs;
    console.log(apiCall);

    var xhr = new XMLHttpRequest();
  },

  // Set precipitation variables
  setPercipitation: function(weatherCode) {
    var numPrecip = 100;



    this.initPercipitation(numPrecip);
  },

  initPercipitation: function(numPrecip) {
    this.circle = this.svgContainer.selectAll("circle")
      .data(d3.range(numPrecip).map(function(datum,interval) {
        return {
          x: interval*20,
          y: 0,
          dx: 1 * (Math.random()+1),
          dy: -4 * (Math.random()+1),
          mu: Math.random()*2
        };
      }))
      .enter().append("svg:circle")
        .attr("r", 2)
        .attr("fill","white")
        .attr("opacity",".8");

    this.precipTimer();
  },

  precipTimer: function() {
    // var text = this.svgContainer.append("svg:text")
    //   .attr("x", 20)
    //   .attr("y", 20);

    var w = 960;
    var h = 500;

    var that = this;
    var start = Date.now();
    var frames = 0;

    return d3.timer(function() {
      // Update the FPS meter.
      var now = Date.now();
      var duration = now - start;
      // text.text(~~(++frames * 1000 / duration));
      if (duration >= 1000) frames = 0, start = now;

      // Update the circle positions.
      that.circle
        .attr("cx", function(d) {
          d.x += d.dx;
          if (d.x > w) {
            d.x -= w;
          }
          else if (d.x < 0) {
            d.x += w;
          }
          return d.x;
        })
        .attr("cy", function(d) {
          d.y -= d.dy;
          if (d.y > h) {
            d.y -= h;
          }
          else if (d.y < 0) {
             d.y += h;
           }
           return d.y;
         });
    });
  }
}

indexPage.init();
