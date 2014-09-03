(function() {
  'use strict';

  function App() {
    this.lat = document.getElementById("current-lat");
    this.lng = document.getElementById("current-lng");
    this.bearing = document.getElementById("current-bearing");

    this.destinationLat = document.getElementById("destination-lat");
    this.destinationLng = document.getElementById("destination-lng");

    this.currentPosition = new Position({
      bearing: 0
    });
    this.destinationPosition = new Position({
      lat: 80,
      lng: 12
    });
    this.wayPoints = [];

    this.compass = new Compass({
      container: '#compass',
      rose: '#rose',
      pointer: '#pointer',
      position: this.currentPosition,
      destination: this.destinationPosition
    });

    this.gretel = new Gretel({
      positionUpdate: (this.positionUpdate).bind(this)
    });

    this.init();
  }

  App.prototype.positionUpdate = function(newPosition) {
    if(newPosition) {
      this.currentPosition.lat = newPosition.lat;
      this.currentPosition.lng = newPosition.lng;
      this.currentPosition.bearing = newPosition.bearing;
    }

    if(this.currentPosition.lat !== null) {
      this.lat.innerText = this.currentPosition.lat.toFixed(2);
    }

    if(this.currentPosition.lng !== null) {
      this.lng.innerText = this.currentPosition.lng.toFixed(2);
    }

    if(this.currentPosition.bearing !== null) {
      this.bearing.innerText = Math.round(360-this.currentPosition.bearing);
    }
  };

  App.prototype.destinationUpdate = function() {
    this.destinationPosition.lat = this.destinationLat.value;
    this.destinationPosition.lng = this.destinationLng.value;
  };

  App.prototype.init = function() {
    this.destinationLat.addEventListener('change', (this.destinationUpdate).bind(this));
    this.destinationLng.addEventListener('change', (this.destinationUpdate).bind(this));

    this.destinationLat.value = this.destinationPosition.lat;
    this.destinationLng.value = this.destinationPosition.lng;

    this.positionUpdate();
    this.destinationUpdate();
  };

  return new App();
})();
