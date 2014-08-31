function Hansel() {

};

//calculations inspired by: http://www.yourhomenow.com/house/haversine.html

Hansel.R  = 6371;

Hansel.toRad = function(deg) {
  return deg * Math.PI / 180;
}

Hansel.toDeg = function(rad) {
  return rad * 180 / Math.PI;
}

Hansel.toBrng = function(rad) {
  return (Hansel.toDeg(rad)+360) % 360;
}

Hansel.distanceBetween = function (location1, location2) {
  return Math.acos(
    Math.sin(location1.lat) * Math.sin(location2.lat) +
    Math.cos(location1.lat) * Math.cos(location2.lat) * Math.cos(location2.lng-location1.lng)
  ) * Hansel.R;
};

Hansel.bearingBetween = function (location1, location2) {
  var dLon = location2.lng - location1.lng;
  var y = Math.sin(dLon) * Math.cos(location2.lat);
  var x = Math.cos(location1.lat)*Math.sin(location2.lat) -
          Math.sin(location1.lat)*Math.cos(location2.lat)*Math.cos(dLon);
  return Hansel.toBrng(Math.atan2(y, x));
};
