(function() {
  'use strict';

  function Position(options) {
    var defaults = {
      lat: null,
      lng: null,
      bearing: null
    };

    if(options) {
      for(var name in defaults) {
        this[name] = typeof options[name] === 'undefined' ? defaults[name] : options[name];
      }
    }
  }

  window.Position = Position;
})();
