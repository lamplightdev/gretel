(function() {
  'use strict';

  function App() {
    this.lat = document.getElementById("current-lat");
    this.lng = document.getElementById("current-lng");
    this.bearing = document.getElementById("current-bearing");

    /*
    this.destinationLat = document.getElementById("destination-lat");
    this.destinationLng = document.getElementById("destination-lng");
    this.destinationDistance = document.getElementById("destination-distance");
    */

    this.waypointsContainer = document.getElementById("waypoints-container");
    this.waypointAdd = document.getElementById("waypoint-add");

    this.currentPosition = new Position();
    this.destinationPosition = new Position({
      lat: 80,
      lng: 12
    });
    this.destinationMeta = {
      distance: null
    };

    this.wayPoints = [{
      position: new Position({
        lat: 60,
        lng: 20
      }),
      distance: null
    }, {
      position: new Position({
        lat: 20,
        lng: 60
      }),
      distance: null
    }];

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

    if(this.currentPosition.lat !== null && typeof this.currentPosition.lat !== 'undefined') {
      this.lat.innerText = this.currentPosition.lat.toFixed(2);
    } else {
      this.lat.innerText = '...';
    }

    if(this.currentPosition.lng !== null && typeof this.currentPosition.lng !== 'undefined') {
      this.lng.innerText = this.currentPosition.lng.toFixed(2);
    } else {
      this.lng.innerText = '...';
    }

    if(this.currentPosition.bearing !== null && typeof this.currentPosition.bearing !== 'undefined') {
      this.bearing.innerText = Math.round(360-this.currentPosition.bearing);
    } else {
      this.bearing.innerText = '...';
    }

    this.updateDestinationDistance();
  };

  App.prototype.destinationUpdate = function() {
    //this.destinationPosition.lat = this.destinationLat.value;
    //this.destinationPosition.lng = this.destinationLng.value;

    this.updateDestinationDistance();
  };

  App.prototype.updateDestinationDistance = function() {
    if(this.currentPosition.isSet() && this.destinationPosition.isSet()) {
      this.destinationMeta.distance = Hansel.distanceBetween(this.currentPosition, this.destinationPosition);
    }
  };

  App.prototype.destinationMetaUpdate = function() {
    if(this.destinationMeta.distance !== null && typeof this.destinationMeta.distance !== 'undefined') {
      this.destinationDistance.innerText = Math.round(this.destinationMeta.distance);
    } else {
      this.destinationDistance = '...';
    }
  };

  App.prototype.init = function() {
    //this.destinationLat.addEventListener('change', (this.destinationUpdate).bind(this));
    //this.destinationLng.addEventListener('change', (this.destinationUpdate).bind(this));

    //this.destinationLat.value = this.destinationPosition.lat;
    //this.destinationLng.value = this.destinationPosition.lng;

    this.waypointAdd.addEventListener('click', (this.addWaypoint).bind(this));

    Object.observe(this.destinationMeta, (this.destinationMetaUpdate).bind(this));

    this.positionUpdate();
    this.destinationUpdate();

    this.showWayPoints();
  };

  App.prototype.addWaypoint = function() {
    this.wayPoints.push(new Position({
      lat: 44,
      lng: 30
    }));

    this.showWayPoints();
  };

  App.prototype.showWayPoints = function() {
    var appThis = this;

    appThis.waypointsContainer.innerHTML = '';
    this.wayPoints.forEach(function(point, index) {
      var tmpl = appThis.getTemplate('waypoint');
      var node = appThis.buildNode(tmpl, 'waypoint-' + index);

      appThis.waypointsContainer.appendChild(node);
    });
  };

  App.prototype.getTemplate = function(name) {
    switch(name) {
      case 'waypoint':
        return "" +
          "<input type='text' name='destination-lat' class='destination-lat'></input>" +
          "<input type='text' name='destination-lng' class='destination-lng'></input>" +
          "<span name='destination-distance' class='destination-distance'></span>m away";
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
