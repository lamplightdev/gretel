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

  Compass.prototype.update = function() {
    this.updateRose();
    this.updatePointers();
  };

  Compass.prototype.updateRose = function() {
    this.rose.style.transform = "rotateZ(" + this.options.position.bearing + "deg)";
    this.updatePointers();
  };

  Compass.prototype.updatePointer = function(index) {
    var bearingTo = Hansel.bearingBetween(this.options.position, this.options.destinations[index]);
    this.options.pointers[index].style.transform = "rotateZ(" + (bearingTo + this.options.position.bearing) + "deg)";
  };

  Compass.prototype.updatePointers = function(changes) {
    var appThis = this;

    var tmpl = "<img class='pointer' src='img/pointer.png'>";

    this.pointersContainer.innerHTML = '';
    this.options.pointers = [];

    this.options.destinations.forEach(function(destination, index) {
      var div = document.createElement('div');
      div.innerHTML = tmpl;
      var img = div.firstChild;

      appThis.options.pointers.push(img);
      appThis.pointersContainer.appendChild(img);
      appThis.updatePointer(index);
    });
  };

  window.Compass = Compass;
})();
