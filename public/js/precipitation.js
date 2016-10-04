// Precipitation module
// weather conditions http://openweathermap.org/weather-conditions

define(['debounce'], function(debounce) {

  return {
    width: 0,
    height: 0,

    initPercipitation: function(weatherCode, parent) {
      this.parent = parent;
      this.svgContainer = this.parent.weatherBox;
      var that = this;

      if(this.setPrecip(weatherCode)) {
        this.attachPrecip();
        this.precipTimer();
      }

      var updateDimensionsDebounce = debounce.debounce(function() {
        that.updateDimensions();
      }, 200);

      window.addEventListener("resize", updateDimensionsDebounce);
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
        .data(d3.range(that.numPrecip).map(function(datum, interval) {
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

    updateDimensions: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },

    precipTimer: function() {
      this.updateDimensions();

      var that = this;

      if (this.timer) {
        this.timer.stop();
      }

      this.timer = d3.timer(function() {
        // Update the circle positions.
        that.circle
          .attr("cx", function(d) {
            d.x += d.dx;
            if (d.x > that.width) {
              d.x -= that.width;
            }
            else if (d.x < 0) {
              d.x += that.width;
            }
            return d.x;
          })
          .attr("cy", function(d) {
            d.y -= d.dy;
            if (d.y > that.height) {
              d.y -= that.height;
            }
            else if (d.y < 0) {
               d.y += that.height;
            }
            return d.y;
          });
      });
    }
  }
});
