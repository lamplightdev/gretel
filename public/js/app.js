(function() {
  'use strict';

  var pointer = document.getElementById("pointer");

  window.g = new Gretel({
    positionUpdate: function(position) {
      pointer.style.transform = "rotateZ(" + position.bearing + "deg)";

      var position2 = {
        location: {
          lat: 50,
          lng: 0
        }
      };

      console.log('distance', Hansel.distanceBetween(position.location, position2.location));
      console.log('bearing', Hansel.bearingBetween(position.location, position2.location));
    }
  });
})();
