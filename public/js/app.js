(function() {
  'use strict';

  var rose = document.getElementById("rose");
  var pointer = document.getElementById("pointer");
  var lat = document.querySelectorAll(".lat")[0];
  var lng = document.querySelectorAll(".lng")[0];
  var bearing = document.querySelectorAll(".bearing")[0];

  window.g = new Gretel({
    positionUpdate: function(position) {
      rose.style.transform = "rotateZ(" + position.bearing + "deg)";

      lat.innerText = position.location.lat.toFixed(2);
      lng.innerText = position.location.lng.toFixed(2);
      bearing.innerText = Math.round(360-position.bearing);

      var position2 = {
        location: {
          lat: 50,
          lng: 0
        }
      };

      var bearingTo = Hansel.bearingBetween(position.location, position2.location);

      console.log('distance', Hansel.distanceBetween(position.location, position2.location));
      console.log('bearing', bearingTo, position.bearing);

      pointer.style.transform = "rotateZ(" + (bearingTo + position.bearing) + "deg)";
    }
  });
})();
