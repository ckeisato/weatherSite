
var x = document.getElementById("demo");

getLocation();

var lat,
    long;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var urlString;

function showPosition(position, function(){
  urlString = 'http://api.wunderground.com/api/79ca99c822a45bc0/conditionswe/q/'.concat(String(lat)).concat(',').concat(String(long)).concat('.json');

}) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat + ' / ' + long);

}


x.innerHTML= lat + ' ' + long;
console.log(lat + ' ' + long);





$.ajax({
  url: urlString,
  type: 'GET',
  dataType: 'json',
  sucess: function(data){
    console.log(data);
  }
});
