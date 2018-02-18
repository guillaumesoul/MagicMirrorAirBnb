var NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
	start: function() {
	},
	
	reload: function(refConfig) {
		
		var self=this;
		self.httpsRequestData = '';

		var options = {
		  hostname: refConfig.opendataURL,
		  port: refConfig.opendataPORT,
		  path: refConfig.opendataAPIPath,
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		 }
		};
		
		var dateRequest = self.getCurrentDate();
		options.path += '&q=date_start>' + dateRequest;
		options.path += '&q=date_start<' + '2018/02/28';
				
		var req = https.request(options, (res) => {
			
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
				self.httpsRequestData += chunk;
				try{
					var JSONParsed = JSON.parse(self.httpsRequestData);
					self.sendSocketNotification("RELOAD_DONE",JSONParsed);
				
				}catch(error) {
				}	
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
	},
	
	getCurrentDate: function() {
		var today = new Date();
		var currentMonth = (today.getMonth() < 10 ? '0' : '') + parseInt(parseInt(today.getMonth())+1);
		return today.getFullYear() + '/' + currentMonth + '/' + today.getDate();	 
	}
});






