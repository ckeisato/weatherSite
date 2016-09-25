// Precipitation module

define(function() {

  return {

    initPercipitation: function(numPrecip) {
      this.svgContainer = d3.select('#weatherBox');
      this.circle = this.svgContainer.selectAll("ellipse")
        .data(d3.range(numPrecip).map(function(datum,interval) {
          return {
            x: interval*20,
            y: 0,
            dx: 1 * (Math.random()+1),
            dy: -3 * (Math.random()+1)
          };
        }))
        .enter().append("svg:ellipse")
          .attr("ry", 2)
          .attr("rx", 1)
          .attr("fill","white")
          .attr("opacity",".8");

      this.precipTimer();
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
