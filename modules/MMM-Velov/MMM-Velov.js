'use strict';

Module.register("MMM-Velov",{
	// Default module config.
	defaults: {
		puissance: "",
		tsalon: "",
		conso: "test",
		updateInterval: 5000,
		initialLoadDelay: 0,
		animationSpeed: 1000,
		result: {},
		jsonData: {},
		/*sensors: [
			{
				idx: "1",
				symbolon: "fa fa-user",
				symboloff: "fa fa-user-o",
				hiddenon: false,
				hiddenoff: false,
				customTitle: "No sensor define in config",
			},
		],*/
		stations: [],
	},
	
	start: function() {
				
		Log.log('LOG' + this.name + ' is started!');
		// Set locale.
		moment.locale(config.language);
		this.title = "Loading...";
		this.loaded = false;
		var self = this;
		setInterval(function() { self.updateJeedom(); }, this.config.updateInterval);

		// first update on start
		self.updateJeedom();
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
	updateJeedom: function() {
		this.config.jsonData = {};
		this.config.stations = [];
		this.sendSocketNotification('RELOAD',this.config);
	},
	socketNotificationReceived: function(notification, payload) {
		
		this.config.jsonData = this.config.jsonData+payload;
		if(this.config.jsonData.length > 193000) {
			
			var test = this.config.jsonData.substr(15,this.config.jsonData.length);
			var parsedData = JSON.parse(test);
			
			
			for (var key in parsedData.values){
				var attrName = key;
				var attrValue = parsedData.values[key];
				
				// "Dr Long  / Aubépins"
				if(parsedData.values[key].gid == 789) {
					this.config.stations.push(attrValue); 
				}
				// Place antoinette
				if(parsedData.values[key].gid == 1002) {
					this.config.stations.push(attrValue); 
				}
				// Gare de villeurbanne
				if(parsedData.values[key].gid == 794) {
					this.config.stations.push(attrValue); 
				}	
			}
					
			
		}
		
		
		if (notification === "RELOAD_DONE" && this.config.jsonData.length > 193000) {
			this.loaded = true;
			this.updateDom(this.animationSpeed);
		} 
	}

});
