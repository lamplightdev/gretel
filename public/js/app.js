function Gretel(options) {
  this.options = options;
}

Gretel.prototype.getOptions = function() {
  console.log(this.options);
};

(function() {
  'use strict';

  var g = new Gretel({
    'maxNumberPoints': 3,
    'maxNumberWaypoints': 10
  });

  init();

  function init() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(eventData) {
        var dir = eventData.alpha;

        var pointer = document.getElementById("pointer");
        pointer.style.transform = "rotateZ(" + dir + "deg)";
        }, false);
    } else {
      console.log('Not supported on your device or browser.  Sorry.');
    }
  }

})();
