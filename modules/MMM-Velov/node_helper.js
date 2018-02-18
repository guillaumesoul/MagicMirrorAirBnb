var NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
	start: function() {
	},
	
	reload: function(refConfig) {
		var self=this;
		var options = {
		  hostname: refConfig.dataGrandLyonURL,
		  port: refConfig.dataGrandLyonPORT,
		  path: refConfig.dataGrandLyonAPIPath,
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		 }
		};
				
		var req = https.request(options, (res) => {
			
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		    self.sendSocketNotification("RELOAD_DONE",chunk);
		  });
		  res.on('end', () => {
			
		  });
		  req.on('error', (e) => {
		  console.log(`problem with request: ${e.message}`);
			});
		});

		req.end();
		
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'RELOAD') {
	      this.reload(payload);
	    }
	}
});






