// Temperature module
// Gets the number of "preciptation" and type??

// change color based on time out

define(function() {

  return {
    lightBlue:"",
    darkBlue: "",
    black: "",
    yellow: "",
    orange: "",
    x2: "50%",
    y2: "90%",

    initTemperature: function(mainTemperature, parent) {
      this.parent = parent;
      this.defs = parent.weatherBox.append("defs");
      this.linearGradient = this.defs.append("linearGradient").attr("id", "linearGradient");
      this.linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", this.x2)
        .attr("y2", this.y2);

      this.linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "blue"); //light blue

      this.linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "black")

      this.parent.weatherBox.append("rect")
      	.attr("width", "100%")
      	.attr("height", "100%")
      	.style("fill", "url(#linearGradient)");

      console.log(this.linearGradient);




    }
  }
});
