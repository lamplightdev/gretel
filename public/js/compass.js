(function() {
  'use strict';

  function Compass(options) {
    var defaults = {
      container: null,
      pointersContainer: null,
      rose: null,
      position: null,
      destinations: [],
      pointers: []
    };

    this.lastPosition = new Position();
    this.distanceThreshold = 1;
    this.angleThreshold = 1;
    this.roseRotations = 0;

    this.options = {};

    for(var name in defaults) {
      this.options[name] = typeof options[name] === 'undefined' ? defaults[name] : options[name];
    }

    this.init();
  }

  Compass.prototype.init = function() {
    this.container = document.querySelector(this.options.container);
    this.rose = this.container.querySelector(this.options.rose);
    this.pointersContainer = this.container.querySelector(this.options.pointersContainer);
  };

  Compass.prototype.setLastPosition = function() {
    this.lastPosition.lat = this.options.position.lat;
    this.lastPosition.lng = this.options.position.lng;
    this.lastPosition.bearing = this.options.position.bearing;
  };

  Compass.prototype.update = function() {
    var angle = Hansel.angleBetween(this.options.position, this.lastPosition);
    var distance = Hansel.distanceBetween(this.options.position, this.lastPosition);

    if(angle > this.angleThreshold || distance > this.distanceThreshold || isNaN(distance) || isNaN(angle)) {
      this.updateRose();
      this.updatePointers();
      this.setLastPosition();
    }
  };

  Compass.prototype.updateRose = function() {
    var diff = Hansel.angleBetween(this.options.position, this.lastPosition);
    if(diff > 300) {
      if(this.options.position.bearing - this.lastPosition.bearing < 0) {
        this.roseRotations++;
      } else {
        this.roseRotations--;
      }
    }
    this.rose.style.transform = "rotateZ(" + (this.options.position.bearing + this.roseRotations*360) + "deg)";
  };

  Compass.prototype.updatePointer = function(index) {
    var bearingTo = Hansel.bearingBetween(this.options.position, this.options.destinations[index]);
    this.options.pointers[index].style.transform = "rotateZ(" + (bearingTo + this.options.position.bearing + this.roseRotations*360) + "deg)";
  };

  Compass.prototype.updatePointers = function(changes) {
    var appThis = this;

    var tmpl = "<img class='pointer' src='img/pointer.png'>";

    this.options.destinations.forEach(function(destination, index) {
      if(!appThis.options.pointers[index]) {
        var div = document.createElement('div');
        div.innerHTML = tmpl;
        var img = div.firstChild;

        appThis.pointersContainer.appendChild(img);
        appThis.options.pointers.push(img);
      }

      appThis.updatePointer(index);
    });
  };

  window.Compass = Compass;
})();
