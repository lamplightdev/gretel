(function() {
  'use strict';

  function App() {
    this.lat = document.getElementById("current-lat");
    this.lng = document.getElementById("current-lng");
    this.bearing = document.getElementById("current-bearing");

    this.destinationsContainer = document.getElementById("destinations-container");
    this.destinationAdd = document.getElementById("destination-add");

    this.currentPosition = new Position();

    this.destinations = [];

    this.compass = new Compass({
      container: '#compass',
      pointersContainer: '.pointers',
      rose: '#rose',
      pointer: '#pointer',
      position: this.currentPosition,
      destinations: this.destinations
    });

    this.gretel = new Gretel({
      positionUpdate: (this.positionUpdated).bind(this)
    });

    this.init();

    this.addDestination(12,13);
  }

  App.prototype.init = function() {
    this.destinationAdd.addEventListener('click', (function() {
      this.addDestination();
    }).bind(this));

    this.updatePosition();
    this.updateDestinations();
    this.compass.update();
  };

  App.prototype.positionUpdated = function(newPosition) {
    this.updatePosition(newPosition);
    this.updateDestinations();
    this.compass.update();
  };

  App.prototype.updatePosition = function(newPosition) {
    if(newPosition) {
      this.currentPosition.lat = newPosition.lat;
      this.currentPosition.lng = newPosition.lng;
      this.currentPosition.bearing = newPosition.bearing;
    }

    if(this.currentPosition.lat !== null && typeof this.currentPosition.lat !== 'undefined') {
      this.lat.textContent = this.currentPosition.lat.toFixed(2);
    } else {
      this.lat.textContent = '...';
    }

    if(this.currentPosition.lng !== null && typeof this.currentPosition.lng !== 'undefined') {
      this.lng.textContent = this.currentPosition.lng.toFixed(2);
    } else {
      this.lng.textContent = '...';
    }

    if(this.currentPosition.bearing !== null && typeof this.currentPosition.bearing !== 'undefined') {
      this.bearing.textContent = Math.round(this.currentPosition.bearing);
    } else {
      this.bearing.textContent = '...';
    }
  };

  App.prototype.addDestination = function(lat, lng) {
    var position = new Position({
      lat: typeof lat === 'undefined' ? this.currentPosition.lat : lat,
      lng: typeof lng === 'undefined' ? this.currentPosition.lng : lng
    });

    this.destinations.push(position);

    this.updateDestinations();
    this.compass.update();
  };

  App.prototype.updateDestinations = function() {
    var appThis = this;

    appThis.destinationsContainer.innerHTML = '';
    this.destinations.forEach(function(point, index) {
      var tmpl = appThis.getTemplate('destination');
      var node = appThis.buildNode(tmpl, 'destination-' + index);

      var labelDistance = node.getElementsByClassName('destination-distance')[0];
      var labelLat = node.getElementsByClassName('destination-lat')[0];
      var labelLng = node.getElementsByClassName('destination-lng')[0];
      var labelDirection = node.getElementsByClassName('destination-direction')[0];

      labelLat.value = point.lat;
      labelLat.addEventListener('change', function(event) {
        point.lat = event.target.value;
        appThis.compass.update();
      });

      labelLng.value = point.lng;
      labelLng.addEventListener('change', function(event) {
        point.lng = event.target.value;
        appThis.compass.update();
      });

      labelDistance.textContent = Hansel.distanceBetween(appThis.currentPosition, point).toFixed(2);

      var bearingTo = Hansel.bearingBetween(appThis.currentPosition, point);
      labelDirection.style.transform = "rotateZ(" + (appThis.currentPosition.bearing + bearingTo) + "deg)";

      appThis.destinationsContainer.appendChild(node);
    });
  };

  App.prototype.getTemplate = function(name) {
    switch(name) {
      case 'destination':
        return "" +
          "<input type='text' name='destination-lat' class='destination-lat'></input>" +
          "<input type='text' name='destination-lng' class='destination-lng'></input>" +
          "<span name='destination-direction' class='destination-direction'></span>" +
          "<span name='destination-distance' class='destination-distance'></span>m away" +
          "";
    }
  };

  App.prototype.buildNode = function(htmlString, containerClass) {
    htmlString = "<div class='" + containerClass + "'>" + htmlString + "</div>";

    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstChild;
  };

  return new App();
})();
