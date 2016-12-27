'use strict'

var xml2js = require('xml2js');

function GenericEvent () {

}

GenericEvent.prototype = {
	
	parse : function(data) {
		var that = this;
	 try {
		 new xml2js.Parser().parseString(data.LastChange, function (err, json) {
	 	 if (err) return callback(err)
      	   that.eventData = json;
      	 });
      
  } catch (err) {
	  
	  console.log("Parsing Error " , err);
  }
 }
} ;

module.exports = GenericEvent;