(function() {
  'use strict';

  function App() {
    this.lat = document.getElementById("current-lat");
    this.lng = document.getElementById("current-lng");
    this.bearing = document.getElementById("current-bearing");

    this.destinationLat = document.getElementById("destination-lat");
    this.destinationLng = document.getElementById("destination-lng");

    this.currentPosition = new Position();
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
  }

  App.prototype.positionUpdate = function(newPosition) {
    this.currentPosition.lat = newPosition.lat;
    this.currentPosition.lng = newPosition.lng;
    this.currentPosition.bearing = newPosition.bearing;

    if(typeof this.currentPosition.lat !== 'undefined') {
      this.lat.innerText = this.currentPosition.lat.toFixed(2);
    }

    if(typeof this.currentPosition.lng !== 'undefined') {
      this.lng.innerText = this.currentPosition.lng.toFixed(2);
    }

    if(typeof this.currentPosition.bearing !== 'undefined') {
      this.bearing.innerText = Math.round(360-this.currentPosition.bearing);
    }
  };

  //destinationLat.value = destination.location.lat;
  //destinationLng.value = destination.location.lng;
  //updatePointer();

  /*

  function initWatches() {
    Object.observe(destination.location, updatePointer);

    destinationLat.addEventListener('change', function(event) {
      destination.location.lat = event.target.value;
    });

    destinationLng.addEventListener('change', function(event) {
      destination.location.lng = event.target.value;
    });
  }

  function updatePointer(changes) {
    var bearingTo = Hansel.bearingBetween(position.location, destination.location);
    pointer.style.transform = "rotateZ(" + (bearingTo + position.bearing) + "deg)";
  }
  */



  //initWatches();

  return new App();
})();
