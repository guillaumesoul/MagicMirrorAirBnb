'use strict';

Module.register("MMM-Event",{
	// Default module config.
	defaults: {
		updateInterval: 5000,
		initialLoadDelay: 0,
		animationSpeed: 1000,
		result: {},
		jsonData: {},
		events: [],
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
	    return ['font-awesome.css', 'MMM-Event.css'];
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

		
		for (var c in this.config.events) {
			var event = this.config.events[c];
			
			console.log(event);
			
			var stationWrapper = document.createElement("tr");
			stationWrapper.className = "normal";

			var titleTD = document.createElement('td');
			titleTD.className = "title bright align-left";
			titleTD.innerHTML = event.fields.title;
			stationWrapper.appendChild(titleTD);

			var statusTD = document.createElement('td');
			statusTD.className = "time light align-right";
			statusTD.innerHTML = event.fields.date_start;
			stationWrapper.appendChild(statusTD);

			tableWrap.appendChild(stationWrapper);
			
		}
		
		wrapper.appendChild(tableWrap);
		return wrapper;

	},
	updateJeedom: function() {
		console.log('update events');
		this.config.jsonData = {};
		this.config.events = [];
		this.sendSocketNotification('RELOAD',this.config);
	},
	socketNotificationReceived: function(notification, payload) {
		
		this.config.jsonData = this.config.jsonData+payload;
		console.log(this.config.jsonData.length);
		
		/*var test = this.config.jsonData.substr(15,this.config.jsonData.length);
		console.log(test);
		var parsedData = JSON.parse(test);
		console.log(parsedData);
		
		console.log(JSON.parse(this.config.jsonData));*/
		
		//critere de fin de 
		
		if(this.config.jsonData.length > 57000) {
			
			console.log(this.config.jsonData);
			
			var test = this.config.jsonData.substr(15,this.config.jsonData.length);
			var parsedData = JSON.parse(test);
			
			console.log(parsedData.records);
			var events = parsedData.records;
			this.config.events = parsedData.records;
			
			events.forEach(function(event) {
				console.log(event);
				//this.config.events.push(event);
			});
			
			/*for (var key in parsedData.records){
				var attrName = key;
				var attrValue = parsedData.values[key];
				this.config.events.push(attrValue);
			}*/
					
			console.log(this.config.events);
		}
		
		
		if (notification === "RELOAD_DONE") {
			this.loaded = true;
			this.updateDom(this.animationSpeed);
		} 
	}

});
