'use strict';

Module.register("MMM-TCL",{
	// Default module config.
	defaults: {
		updateInterval: 5000,
		initialLoadDelay: 0,
		animationSpeed: 1000,
		result: {},
		jsonData: {},
		stations: [],
	},
	
	start: function() {
				
		Log.log('LOG' + this.name + ' is started!');
		
		
		// Set locale.
		moment.locale(config.language);
		this.title = "Loading...";
		this.loaded = false;
		var self = this;
		setInterval(function() { self.updateVelov(); }, this.config.updateInterval);

		// first update on start
		self.updateVelov();
	},
	getStyles: function() {
	    return ['font-awesome.css', 'MMM-TCL.css'];
	},
	
	// Override dom generator.
	getDom: function() {
		
		var wrapper = document.createElement("div");
		var data = this.result;
		if (!this.loaded) {
			wrapper.innerHTML = "Loading...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		var tableWrap = document.createElement("table");
		tableWrap.className = "small";

		
		for (var c in this.config.stations) {
			var station = this.config.stations[c];
			
			var sensorWrapper = document.createElement("tr");
			sensorWrapper.className = "normal";

			var titleTD = document.createElement('td');
			titleTD.className = "title bright align-left";
			titleTD.innerHTML = station.ligne;
			sensorWrapper.appendChild(titleTD);
			
			var titleTD = document.createElement('td');
			titleTD.className = "title bright align-left";
			titleTD.innerHTML = station.direction;
			sensorWrapper.appendChild(titleTD);

			var statusTD = document.createElement('td');
			statusTD.className = "time light align-right";
			statusTD.innerHTML = station.delaipassage;
			sensorWrapper.appendChild(statusTD);

			tableWrap.appendChild(sensorWrapper);
			
		}
		
		wrapper.appendChild(tableWrap);
		return wrapper;

	},
	updateVelov: function() {
		this.config.jsonData = {};
		this.config.stations = [];
		this.sendSocketNotification('RELOAD',this.config);
	},
	isInStations: function() {
		console.log('is in stations');
	},
	socketNotificationReceived: function(notification, payload) {
		
		//console.log('flute');
		console.log('zut');
		
		for (var key in payload.values){	
			var attrName = key;
			var attrValue = payload.values[key];
			
			if(
				payload.values[key].id == '42616' ||
				payload.values[key].id == '35664' ||
				payload.values[key].id == '35665' ||
				payload.values[key].id == '42616' ||
				payload.values[key].id == '11002' ||
				payload.values[key].id == '43120' ||
				payload.values[key].id == '43119' 
			) {				
				var alreadyLoaded = false;
				
				for(var i in this.config.stations) {
					if(this.config.stations[i].id == attrValue.id) {
						alreadyLoaded = true;
					}
				}				
				
				if(!alreadyLoaded) {
					this.config.stations.push(attrValue); 
				}
			} 
			
			
		}
		
		if (notification === "RELOAD_DONE") {
			this.loaded = true;
			this.updateDom(this.animationSpeed);
		} 
	},
	
	
	
	/*isInStations: function(stationId) {
		this.config.stations.each(function(station) {
			console.log(station);
			if(station.id == stationId) {
				console.log('station exisrts');
			}
		});
	}*/

});
