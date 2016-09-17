// Precipitation module
// Gets the number of "preciptation" and type??

define(function() {

  return {

    initPercipitation: function(numPrecip) {
      this.svgContainer = d3.select('#weatherBox');
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
});
