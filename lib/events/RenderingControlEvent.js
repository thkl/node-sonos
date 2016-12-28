'use strict';

var GenericEvent = require('./GenericEvent.js');
var util = require("util");


function RenderingControlEvent () {
    RenderingControlEvent.super_.apply();
    this.name = "RenderingControlEvent";
    this.volume = {};
}

console.log(JSON.stringify(GenericEvent));

util.inherits(RenderingControlEvent, GenericEvent);


RenderingControlEvent.prototype.parse = function(data) {
  var that = this;

  Object.getPrototypeOf(RenderingControlEvent.prototype).parse(data);
  var payload = this.eventData.Event.InstanceID[0];
  // Check Volume Event
   // Check Volume Event
  if ((payload) && (payload.Volume)) {
	  
	  payload.Volume.forEach(function (entry){
		  that.volume[entry.$.channel] = entry.$.val;
	  })
  }
}



module.exports = RenderingControlEvent;