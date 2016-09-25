// Precipitation module
// weather conditions http://openweathermap.org/weather-conditions
define(function() {

  return {

    initPercipitation: function(weatherCode, parent) {
      this.parent = parent;
      this.svgContainer = this.parent.weatherBox;

      if(this.setPrecip(weatherCode)) {
        this.attachPrecip(100);
        this.precipTimer();
      }
    },

    setPrecip: function(weatherCode) {
      switch (true) {
        case ([200, 210, 230, 231, 300, 310, 311, 500, 520].indexOf(weatherCode) >= 0): // light rain
          this.numPrecip = 200;
          this.rx = 1;
          this.ry = 2;
          this.dy = -3;
          return true;
          break;
        case ([201, 211, 221, 302, 313, 321, 501, 521].indexOf(weatherCode) >= 0):  // medium rain?
          this.numPrecip = 400;
          this.rx = 1;
          this.ry = 2.5;
          this.dy = -5;
          return true;
          break;
        case ([202, 212, 231, 232, 312, 314, 502, 503, 504, 511, 522, 531].indexOf(weatherCode) >= 0):  // heavy rain 
          this.numPrecip = 500;
          this.rx = 1.5;
          this.ry = 3;
          this.dy = -7;
          return true;
          break;
        case (weatherCode < 600):
          this.numPrecip = 200;
          this.rx = 1;
          this.ry = 2;
          this.dy = -2;
          return true;
        default:
          return false;
          break;
      }
    },

    attachPrecip: function() {
      var that = this;
      this.circle = this.svgContainer.selectAll("ellipse")
        .data(d3.range(that.numPrecip).map(function(datum,interval) {
          return {
            x: interval*20,
            y: 0,
            dx: 1 * (Math.random()+1),
            dy: that.dy * (Math.random()+1)
          };
        }))
        .enter().append("svg:ellipse")
          .attr("ry", that.ry)
          .attr("rx", that.rx)
          .attr("fill","white")
          .attr("opacity",".8");
    },

    precipTimer: function() {

      var w = 960;
      var h = 500;

      var that = this;
      var start = Date.now();
      var frames = 0;

      return d3.timer(function() {
        // Update the FPS meter.
        var now = Date.now();
        var duration = now - start;
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
});
