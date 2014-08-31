function Gretel(options) {
  var defaults = {
    trackLocation: true,
    trackBearing: true,
    geoHighAccuracy: false,
    geoMaximumAge: 30000,
    geoTimeout: 27000,
  };

  this.callbacks = {
    locationUpdate: null,
    bearingUpdate: null,
    positionUpdate: null
  };

  this.options = {};

  for(var name in defaults) {
    this.options[name] = typeof options[name] === 'undefined' ? defaults[name] : options[name];
  }

  for(var callback in this.callbacks) {
    this.callbacks[callback] = typeof options[callback] === 'function' ? options[callback] : null;
  }

  this.geoData = {
    location: {
      lat: null,
      lng: null
    },
    bearing: null
  };

  this.geoOptions = {
    enableHighAccuracy: this.options.geoHighAccuracy,
    maximumAge: this.options.geoMaximumAge,
    timeout: this.options.geoTimeout
  }

  this.locationTrackID = null

  this.trackLocation(this.options.trackLocation);
  this.trackBearing(this.options.trackBearing);
}

Gretel.prototype.trackLocation = function(track) {
  this.options.trackLocation = track;
  if(this.options.trackLocation) {
    this.locationTrackID = navigator.geolocation.watchPosition((this.updateLocation).bind(this), (this.updateLocationFailed).bind(this), this.geoOptions);
  } else {
    navigator.geolocation.clearWatch(this.locationTrackID);
  }
};

Gretel.prototype.trackBearing = function(track) {
  this.options.trackBearing = track;

  if(this.options.trackBearing) {
    window.addEventListener('deviceorientation', this, false);
  } else {
    window.removeEventListener('deviceorientation', this, false);
  }
};

Gretel.prototype.handleEvent = function (event) {
  switch(event.type) {
    case 'deviceorientation':
      this.updateBearing(event.alpha);
      break;
  }
};

Gretel.prototype.updateBearing = function(alpha) {
  this.geoData.bearing = alpha;

  if(typeof this.callbacks.bearingUpdate === 'function') {
    this.callbacks.bearingUpdate(this.geoData.bearing);
  }

  this.callPositionCallback();
};

Gretel.prototype.updateLocation = function(position) {
  this.geoData.location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  if(typeof this.callbacks.locationUpdate === 'function') {
    this.callbacks.locationUpdate(this.geoData.location);
  }

  this.callPositionCallback();
};

Gretel.prototype.callPositionCallback = function() {
  if(typeof this.callbacks.positionUpdate === 'function') {
    this.callbacks.positionUpdate(this.geoData);
  }
};

Gretel.prototype.updateLocationFailed = function() {
  console.log('geolocation fail');
};

Gretel.prototype.on = function(eventName, callback) {
  this.callbacks[eventName] = callback;
};
