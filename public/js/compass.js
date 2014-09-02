(function() {
  'use strict';

  function Compass(options) {
    var defaults = {
      container: null,
      rose: null,
      pointer: null,
      position: null,
      destination: null
    };

    this.options = {};

    for(var name in defaults) {
      this.options[name] = typeof options[name] === 'undefined' ? defaults[name] : options[name];
    }

    this.init();
  }

  Compass.prototype.init = function() {
    this.container = document.querySelector(this.options.container);
    this.rose = this.container.querySelector(this.options.rose);
    this.pointer = this.container.querySelector(this.options.pointer);

    Object.observe(this.options.position, (this.updateRose).bind(this));
    Object.observe(this.options.destination, (this.updateRose).bind(this));
  };

  Compass.prototype.updateRose = function() {
    this.rose.style.transform = "rotateZ(" + this.options.position.bearing + "deg)";
    this.updatePointer();
  };

  Compass.prototype.updatePointer = function(changes) {
    var bearingTo = Hansel.bearingBetween(this.options.position, this.options.destination);
    this.pointer.style.transform = "rotateZ(" + (bearingTo + this.options.position.bearing) + "deg)";
  };

  window.Compass = Compass;
})();
