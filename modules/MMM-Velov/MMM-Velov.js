'use strict';

Module.register("MMM-Velov",{
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
	    return ['font-awesome.css', 'MMM-Velov.css'];
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
			titleTD.innerHTML = station.name;
			sensorWrapper.appendChild(titleTD);

			var statusTD = document.createElement('td');
			statusTD.className = "time light align-right";
			statusTD.innerHTML = station.available_bikes;
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
	socketNotificationReceived: function(notification, payload) {
		
		for (var key in payload.values){
				var attrName = key;
				var attrValue = payload.values[key];
				
				// "Dr Long  / Aubépins"
				if(payload.values[key].gid == 789) {
					this.config.stations.push(attrValue); 
				}
				// Place antoinette
				if(payload.values[key].gid == 1002) {
					this.config.stations.push(attrValue); 
				}
				// Gare de villeurbanne
				if(payload.values[key].gid == 794) {
					this.config.stations.push(attrValue); 
				}	
			}
		
		if (notification === "RELOAD_DONE") {
			this.loaded = true;
			this.updateDom(this.animationSpeed);
		} 
	}

});
