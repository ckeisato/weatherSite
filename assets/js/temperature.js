// Temperature module

define(function() {

  return {
    toolBox: "#6F73D2",
    winterWizard: "#A3D5FF",
    popStar: "#B84A62",
    turkishRose: "#AC7B84",
    electricBlue: "#90F3FF",
    lightCyan: "#DFFDFF",
    greenOne: "#073B3A",
    greenTwo: "#6BBF59",
    yellow: "#fec26f",
    orange: "#FCA94C",
    red: "#fb4a36",
    beige: "#e8d499",
    colorOne: "",
    colorTwo: "",
    colorThree: "",
    x2: "0",
    y2: "0",

    initTemperature: function(temperature, parent) {

      this.parent = parent;
      this.defs = parent.weatherBox.append("defs");
      this.linearGradient = this.defs.append("linearGradient").attr("id", "linearGradient");
      this.linearGradient
        .attr("x1","0%")
        .attr("y1","0%")
        .attr("x2","100%")
        .attr("y2","100%")
        .attr("spreadMethod", "reflect");
      
      this.setLinearGradientColors(temperature);
      this.setLinearGradient();
      this.fillWeatherBox();
    },

    setLinearGradientColors: function(temperature) {
      switch (true) {
        case (temperature < 20):
          this.colorOne = this.lightCyan;
          this.colorTwo = this.electricBlue;
          break;
        case (temperature < 45): // 20 - 44
          this.colorOne = this.toolBox;
          this.colorTwo = this.winterWizard;
          break;
        case (temperature < 62): // 45-61
          this.colorOne = this.popStar;
          this.colorTwo = this.turkishRose;
          break;
        case (temperature < 78): // 62 - 77
          this.colorOne = this.greenTwo;
          this.colorTwo = this.greenOne;
          break;
        case (temperature < 90): // 78 - 90
          this.colorOne = this.orange;
          this.colorTwo = this.beige;
          break;
        case (90 < temperature): // > 90 
          this.colorOne = this.orange;
          this.colorTwo = this.yellow;
          break;     
        default:
          alert("none");
          break;
      }
    },

    setLinearGradient: function() {
      var colours = [this.colorOne, this.colorTwo, this.colorOne];

      this.linearGradient.selectAll(".stop")
        .data(colours)
        .enter().append("stop")
        .attr("offset", function(d,i) { return i/(colours.length-1); })   
        .attr("stop-color", function(d) { return d; });

      this.linearGradient.append("animate")
        .attr("attributeName","x1")
        .attr("values","0%;200%")
        .attr("dur","12s")
        .attr("repeatCount","indefinite");

      this.linearGradient.append("animate")
        .attr("attributeName","x2")
        .attr("values","100%;300%")
        .attr("dur","12s")
        .attr("repeatCount","indefinite");
    },

    fillWeatherBox: function() {
        this.parent.weatherBox.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("fill", "url(#linearGradient)");
    }
  }
});
