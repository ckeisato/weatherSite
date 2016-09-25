// Gets location based on city input and gets longitude and latitude
// Also handles google maps autocomplete
// API KEY AIzaSyCrt7n0_Iz2PKOJ9cNwszr0JFRW1PDX9vM


// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API KEY

define(function() {

  return {
  	apiKey: "AIzaSyCrt7n0_Iz2PKOJ9cNwszr0JFRW1PDX9vM",
  	apiCall: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=",

  	initLocation: function() {
	  var input =  document.getElementById('input-location');
	  var autocomplete = new google.maps.places.Autocomplete(input);


	  autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place.geometry.location.lat());
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
	     }
	  });
  	}
  }
});
