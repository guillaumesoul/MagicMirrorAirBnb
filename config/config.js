/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: [ "192.168.1.11" ,"::ffff:192.168.1.11" , "127.0.0.1", "::ffff:127.0.0.1", "::1", "192.168.1.1/24" , "::ffff:192.168.1.1/24"],
	//ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: 'MMM-Remote-Control',
			// uncomment the following line to show the URL of the remote control on the mirror
			position: 'top_left'
			// you can hide this module afterwards from the remote control itself
		},
		/*{
			module: "MMM-Admin-Interface",
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: 'MMM-Jeedom',
			header: 'Domotique',
			position: "top_right",
			config: {
				updateInterval: 3000,
				jeedomAPIKey: "m4pMPm7VeIqjphB3tefZgQjWcBYs0sAA",
				jeedomURL: "souplex.hopto.org",
				jeedomPORT: 443,
				jeedomAPIPath: "/core/api/jeeApi.php",
				sensors: [
					{
						idx: "551",
						symbol: "fa fa-thermometer-full",
						customTitle: "T° Bar ",
						unit : "C°",
					},
					{
						idx: "724",
						symbol: "fa fa-thermometer-full",
						customTitle: "T° Chambre ",
						unit : "C°",
					},
					{
						idx: "728",
						idx: "728",
						symbol: "fa fa-thermometer-full",
						customTitle: "T° Salle cinéma ",
						unit : "C°",
					},
					
					
				]
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Lyon",
				locationID: "2996944",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "6511de2cf731ca33fb823b369b56f72f"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Lyon",
				locationID: "2996944",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "6511de2cf731ca33fb823b369b56f72f"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		{
			module: 'MMM-TCL',
			header: 'TCL',
			position: "bottom_left",
			config: {
				updateInterval: 60000,
				dataGrandLyonURL: "download.data.grandlyon.com",
				dataGrandLyonPORT: 443,
				dataGrandLyonAPIPath: "/ws/rdata/tcl_sytral.tclpassagearret/all.json?compact=false&start=1&maxfeatures=1000000",
			}
		},
		{
			module: 'MMM-Velov',
			header: 'Velov disponibles',
			position: "bottom_left",
			config: {
				updateInterval: 60000,
				dataGrandLyonURL: "download.data.grandlyon.com",
				dataGrandLyonPORT: 443,
				dataGrandLyonAPIPath: "/ws/rdata/jcd_jcdecaux.jcdvelov/all.json",
			}
		},
		{
			module: 'MMM-Events',
			position: 'middle_center',
			config: {
			city: "Lyon",	           // Your City
			eventType: "",		   // Choose from Events List below
			when: "This Week",                 // "All", "Future", "Past", "Today", "Last Week", "This Week", "Next week", and months by name, e.g. "October"
			mode: "Frame",                   // "Frame" or "noFrame" (around picture)
			apikey: "NXDXJTBZQk3Rzd44",
			rotateInterval: 20 * 1000,     // New Event Appears every 5 minutes
			useHeader: false,	           // Set to true if you want a header
			header: "",
			animationSpeed: 3000,              // Event fades in and out
			picture: true,                     // true, false = no image
			}
		},
		{
			module: 'MMM-Crypto',
			position: "bottom_left",
			config: {
				currency: ['bitcoin', 'ethereum', 'neo', 'omisego', 'luxcoin', 'coss'],
				conversion: 'EUR',
				headers: ['change24h', 'change1h', 'change7d'],
				displayType: 'logo',
				showGraphs: true,
				limit: 600,
				coloredLogos: true
			}
		},
		{
			module: 'MMM-Carousel',
			config: {
				transitionInterval: 25000,
				ignoreModules: ['clock', 'alert', 'MMM-Jeedom', 'newsfeed', 'currentweather', 'weatherforecast'],
				mode: 'slides',
				slides: [
					['MMM-Crypto', ],
					['MMM-Events'],
					['MMM-TCL', 'MMM-Velov'],
				]
			}
		}*/
		
		/*{
			module: 'MMM-ModuleScheduler',
			config: {
				// SHOW AN ALERT AT 09:30 EVERY DAY (see https://github.com/MichMich/MagicMirror/tree/develop/modules/default/alert)
				notification_schedule: {
					notification: 'SHOW_ALERT', 
					schedule: '* * * * *', 
					payload: {
						type: "notification", 
						title: 'Scheduled alert!'
					}
				}
			}
		},
		{
					
			module: 'MMM-Scrobbler',
			
			position: 'middle_center',
			config: {

				username: 'famillesoullard',
			
				apikey: '18041d1ff4103d6c584b0e89c0e003ad',
			
				//time interval to search for new song (every 15 seconds)
				updateInterval: 15 * 1000,
				//how often should we try to retrieve a song if not listening
				delayCount: 5,
				//time interval to search for new song if the 5 times not listening is received.
				//set this to the same number as updateInterval to ignore this option	
				delayInterval: 120*1000,
				animationSpeed: 1000,
				showAlbumArt: true,
					showMetaData: true,
				//Determines the position of the meta text. Possible values: top, bottom, left, right
				alignment: "bottom", 
				}
			
		}*/
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
