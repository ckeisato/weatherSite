define(function(){return{toolBox:"#6F73D2",winterWizard:"#A3D5FF",popStar:"#B84A62",turkishRose:"#AC7B84",electricBlue:"#90F3FF",lightCyan:"#DFFDFF",greenOne:"#073B3A",greenTwo:"#6BBF59",yellow:"#fec26f",orange:"#FCA94C",red:"#fb4a36",beige:"#e8d499",colorOne:"",colorTwo:"",colorThree:"",x2:"0",y2:"0",initTemperature:function(t,e){this.parent=e,this.defs=e.weatherBox.append("defs"),this.linearGradient=this.defs.append("linearGradient").attr("id","linearGradient"),this.linearGradient.attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","100%").attr("spreadMethod","reflect"),this.setLinearGradientColors(t),this.setLinearGradient(),this.fillWeatherBox()},setLinearGradientColors:function(t){switch(!0){case t<20:this.colorOne=this.lightCyan,this.colorTwo=this.electricBlue;break;case t<45:this.colorOne=this.toolBox,this.colorTwo=this.winterWizard;break;case t<62:this.colorOne=this.popStar,this.colorTwo=this.turkishRose;break;case t<78:this.colorOne=this.greenTwo,this.colorTwo=this.greenOne;break;case t<90:this.colorOne=this.orange,this.colorTwo=this.beige;break;case 90<t:this.colorOne=this.orange,this.colorTwo=this.yellow;break;default:alert("none")}},setLinearGradient:function(){var t=[this.colorOne,this.colorTwo,this.colorOne];this.linearGradient.selectAll(".stop").data(t).enter().append("stop").attr("offset",function(e,r){return r/(t.length-1)}).attr("stop-color",function(t){return t}),this.linearGradient.append("animate").attr("attributeName","x1").attr("values","0%;200%").attr("dur","12s").attr("repeatCount","indefinite"),this.linearGradient.append("animate").attr("attributeName","x2").attr("values","100%;300%").attr("dur","12s").attr("repeatCount","indefinite")},fillWeatherBox:function(){this.parent.weatherBox.append("rect").attr("width","100%").attr("height","100%").style("fill","url(#linearGradient)")}}});