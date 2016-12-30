'use strict';

var GenericEvent = require('./GenericEvent.js');
var util = require("util");
var xml2js = require('xml2js')

function TransportControlEvent () {
    TransportControlEvent.super_.apply();
    this.name = "TransportControlEvent";
    this.currentTrack;
    this.nextTrack;
    this.transportState;
    this.currentPlayMode;
    
}

util.inherits(TransportControlEvent, GenericEvent);


TransportControlEvent.prototype.parseDIDL = function (didl) {
  if ((!didl) || (!didl['DIDL-Lite']) || (!util.isArray(didl['DIDL-Lite'].item)) || (!didl['DIDL-Lite'].item[0])) {
	return {};
  }
  var item = didl['DIDL-Lite'].item[0]
  return {
    title: util.isArray(item['dc:title']) ? item['dc:title'][0] : null,
    artist: util.isArray(item['dc:creator']) ? item['dc:creator'][0] : null,
    album: util.isArray(item['upnp:album']) ? item['upnp:album'][0] : null,
    albumArtURI: util.isArray(item['upnp:albumArtURI']) ? item['upnp:albumArtURI'][0] : null
  }
}


TransportControlEvent.prototype.parse = function(data) {
  var that = this;

  Object.getPrototypeOf(TransportControlEvent.prototype).parse(data);
  try {
	  var payload = this.eventData.Event.InstanceID[0];
	  if (payload) {
	  this.transportState = payload.TransportState[0].$.val;
	  this.currentPlayMode = payload.CurrentPlayMode[0].$.val;
  
	  new xml2js.Parser().parseString(payload.CurrentTrackMetaData[0].$.val, function (err, data) {
	  	that.currentTrack = that.parseDIDL(data);
  	  });

      new xml2js.Parser().parseString(payload["r:NextTrackMetaData"][0].$.val, function (err, data) {
	    that.nextTrack = that.parseDIDL(data);
      });

  } catch (err) {
	 
  } 
  }
}



module.exports = TransportControlEvent;