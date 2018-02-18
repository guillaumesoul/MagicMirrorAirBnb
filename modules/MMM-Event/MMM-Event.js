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
		setInterval(function() { self.updateEvents(); }, this.config.updateInterval);

		// first update on start
		self.updateEvents();
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
			var eventWrapper = document.createElement("tr");
			eventWrapper.className = "normal";

			var titleTD = document.createElement('td');
			titleTD.className = "title bright align-left";
			titleTD.innerHTML = event.fields.title;
			eventWrapper.appendChild(titleTD);

			var statusTD = document.createElement('td');
			statusTD.className = "time light align-right";
			statusTD.innerHTML = event.fields.date_start;
			eventWrapper.appendChild(statusTD);

			tableWrap.appendChild(eventWrapper);
			
		}
		
		wrapper.appendChild(tableWrap);
		return wrapper;

	},
	updateEvents: function() {
		this.config.jsonData = {};
		this.config.events = [];
		this.sendSocketNotification('RELOAD',this.config);
	},
	socketNotificationReceived: function(notification, payload) {
		
		this.config.events = payload.records;
		
		if (notification === "RELOAD_DONE") {
			this.loaded = true;
			this.updateDom(this.animationSpeed);
		} 
	}

});
