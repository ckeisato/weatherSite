// Temperature module

define(function() {

  return {
    darkestBlue: "#12213d",
    darkBlue: "#14107d",
    blue: "#04A2F4",
    lightGreen: "#12bce2",
    lightestGreen: "#cee3bb",
    seaGreen: "#3c7550",
    yellow: "#fec26f",
    orange: "#FCA94C",
    red: "#fb4a36",
    beige: "#e8d499",
    colorOne: "",
    colorTwo: "",
    colorThree: "",
    x2: "0%",
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


      this.setLinearGradientColors(25);
      this.setLinearGradient();
      this.fillWeatherBox();
    },

    setLinearGradientColors: function(temperature) {
      switch (true) {
        case (temperature < 7):
          this.colorOne = this.darkBlue;
          this.colorTwo = this.lightGreen;
          this.colorThree = this.lightestGreen
          break;
        case (temperature < 18):
          this.colorOne = this.darkestBlue;
          this.colorTwo = this.seaGreen;
          this.colorThree = this.lightestGreen
          break;
        case (temperature < 29):
          this.colorOne = this.darkBlue;
          this.colorTwo = this.lightGreen;
          this.colorThree = this.beige;
          break;
        case (temperature < 38):
          this.colorOne = this.orange;
          this.colorTwo = this.yellow;
          this.colorThree = this.red;
          break;     
        default:
          alert("none");
          break;
      }
    },

    setLinearGradient: function() {
      this.linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", this.colorOne);

      this.linearGradient.append("stop")
        .attr("offset", "70%")
        .attr("stop-color", this.colorTwo);

      this.linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", this.colorThree);
    },

    fillWeatherBox: function() {
        this.parent.weatherBox.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("fill", "url(#linearGradient)");
    }
  }
});
