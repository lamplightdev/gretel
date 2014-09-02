(function() {
  'use strict';

  function Hansel() {

  }

  //calculations inspired by: http://www.yourhomenow.com/house/haversine.html

  Hansel.R  = 6371;

  Hansel.toRad = function(deg) {
    return deg * Math.PI / 180;
  };

  Hansel.toDeg = function(rad) {
    return rad * 180 / Math.PI;
  };

  Hansel.toBrng = function(rad) {
    return (Hansel.toDeg(rad)+360) % 360;
  };

  Hansel.distanceBetween = function (position1, position2) {
    return Math.acos(
      Math.sin(position1.lat) * Math.sin(position2.lat) +
      Math.cos(position1.lat) * Math.cos(position2.lat) * Math.cos(position2.lng-position1.lng)
    ) * Hansel.R;
  };

  Hansel.bearingBetween = function (position1, position2) {
    var dLon = position2.lng - position1.lng;
    var y = Math.sin(dLon) * Math.cos(position2.lat);
    var x = Math.cos(position1.lat)*Math.sin(position2.lat) -
            Math.sin(position1.lat)*Math.cos(position2.lat)*Math.cos(dLon);
    return Hansel.toBrng(Math.atan2(y, x));
  };

  window.Hansel = Hansel;
})();
